# BarrageDemo

纯js实现的弹幕

![预览图](https://github.com/NextChampion/BarrageDemo/blob/master/111.gif)
---

- 1.弹幕自又向左移动，默认时间10s， 可以自己设置；

- 2.弹幕组件可以设置弹道数量；

- 3.可以设置弹道高度；

- 4.新来的弹幕会逐个判断哪一个弹幕可用，如果所有的都不可用，忽略该条数据；

- 5.是否可用判断的标准是当前弹道最后一条弹幕距离屏幕右边界的距离大于2个字符的长度。代码中使用字号的大小作为字符的长度；

- 6.弹幕移除屏幕时会将该数据移除掉。避免内存越来越大的问题；
---
### demo里面包含两组组件，酌情参考
- 1.BarrageMoveView + BarrageItem （推荐）
  
  view内负责接收新的弹幕消息，负责分配弹幕弹道位置，负责移动弹幕，当弹幕移动到距离右边界一定距离时，设置为当前弹道可以添加下一个弹幕，当移动到屏幕外时，删除对应的数据。
  
  item负责显示单个弹幕的内容。 所有的逻辑都在view内，item可以视为一个普通的view。
- 2.BarrageView + BarrageMovableItem
  
  view负责接收新来的弹幕消息，分配弹幕的弹道位置。
  
  item负责显示单个弹幕的内容，并自身从右往左移动。 当移动到距离右边一定距离时，通知view，该条弹幕可以继续添加下一条弹幕。当移动到屏幕外时，通知view删除掉对应的数据。item和view耦合度比第一组高。

---

有用的话，欢迎给个star。
