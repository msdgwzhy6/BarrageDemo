/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, View, DeviceEventEmitter } from 'react-native';
import PropTypes from 'prop-types';

import BarrageItem from './BarrageItem';

export default class BarrageView extends Component {
  constructor(props) {
    super(props);
    this.items = [];
  }

  static propTypes = {
    list: PropTypes.array,
  }

  static defaultProps = {
    list: [],
  }

  componentDidMount() {
    this.subscription = DeviceEventEmitter.addListener('changeItemState', this.changeItemState);
  };

  changeItemState = (a) => {
    this.items = this.items.map(item => {
      if (item.id === a.id) {
        return {...item, isFree: a.isFree};
      }
      return item;
    })
  }

  getLine =  (b,index) => {
    if (this.items.length === 0) {
      return 0
    }
    const item = this.items[index];
    if (item && item.line >= 0) {
      return item.line;
    }

    let lastItemOfLine1;
    let lastItemOfLine2;
    this.items.forEach(item => {
      const { id, line, isFree } = item;
      if (line === 0) {
        lastItemOfLine1 = item;
      } else {
        lastItemOfLine2 = item;
      }
    });
    if(!lastItemOfLine1){
      return 0;
    }
    if(lastItemOfLine1.isFree){
      return 0;
    }

    if(!lastItemOfLine2){
      return 1;
    }
    if(lastItemOfLine2.isFree){
      return 1;
    }
    return 2;
  }

  render() {
    const { list } = this.props;
    const views = list.map((b,index) => {
      const line = this.getLine(b,index);
      if(line === 2) { return null };
      if (!this.items[index]) {
        this.items.push({id: b.id, isFree: false, line});
      }
      return <BarrageItem line={line} key={b.id} data={b}/>
    });
    return (
      <View
        pointerEvents='none'
        removeClippedSubviews={true}
        style={styles.container}
        >
        {views}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderWidth: 1,
  },
  barrageLine: {
    overflow: 'hidden',
  },
});
