# BarrageDemo

纯js实现的弹幕

![预览图](https://github.com/NextChampion/BarrageDemo/blob/master/111.gif)
---

- 1.~~弹幕自又向左移动，默认时间10s， 可以自己设置；~~（弃用，固定时长会出现同一弹道内后面一条内容较长的弹幕，追上前面一条，出现重叠）

- 2.弹幕组件可以设置弹道数量；

- 3.可以设置弹道高度；

- 4.新来的弹幕会逐个判断哪一个弹幕可用，如果所有的都不可用，忽略该条数据；

- 5.是否可用判断的标准是当前弹道最后一条弹幕距离屏幕右边界的距离大于2个字符的长度。代码中使用字号的大小作为字符的长度；

- 6.弹幕移除屏幕时会将该数据移除掉。避免内存越来越大的问题；

- 7.自己在输入框输入的弹幕，会有个边框效果，区分其他弹幕
---
### demo里面包含两组组件，酌情参考
- 1.BarrageMoveView + BarrageItem （推荐）
  
  view内负责接收新的弹幕消息，负责分配弹幕弹道位置，负责移动弹幕，当弹幕移动到距离右边界一定距离时，设置为当前弹道可以添加下一个弹幕，当移动到屏幕外时，删除对应的数据。
  
  item负责显示单个弹幕的内容。 所有的逻辑都在view内，item可以视为一个普通的view。
  
  所有的移动效果，通过一个定时器实现，所有弹幕移动起来的效果更整齐。视觉效果好。
- 2.BarrageView + BarrageMovableItem
  
  view负责接收新来的弹幕消息，分配弹幕的弹道位置。
  
  item负责显示单个弹幕的内容，并自身从右往左移动。 当移动到距离右边一定距离时，通知view，该条弹幕可以继续添加下一条弹幕。当移动到屏幕外时，通知view删除掉对应的数据。item和view耦合度比第一组高。
  
  每一个弹幕对应一个定时器，弹幕较多时，有可能出现弹幕移动效果不一致引起抖动的问题。视觉效果不好。

---

有用的话，欢迎给个star。

## 报错
由于react-native版本问题，运行demo的时候，可能会遇到报错。

#### 报错1
```
Make sure you’re running a packager server or have included a .jsbundle file in your application
```
#### 解决方法：

到项目根目录下`package.json`文件所在的目录下
执行
`
npm install -g react-native-git-upgrade
`
`
react-native-git-upgrade
`


#### 报错2
```
Unknown argument type 'attribute' in method -[RCTUIManager setJSResponder:blockNativeResponder:]
```

#### 解决方法

路径： `/node_modules/react-native/React/Base/RCTModuleMethod.mm.`文件
找到 `static BOOL RCTParseUnused` 这个方法

替换成

```
static BOOL RCTParseUnused(const char **input)
{
  return RCTReadString(input, "__unused") || RCTReadString(input, "__attribute__((__unused__))") || RCTReadString(input, "__attribute__((unused))");
}
```
