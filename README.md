# Tiny Todo List

Chrome简洁任务清单扩展,[商店地址](https://chrome.google.com/webstore/detail/pnifhdgjgkedllddoiehniiddnpccben)




####  为什么要做TTL(Tiny Todo List)

因为没有找到一款自己喜欢的简洁todolist，具体原因是自己对todolist的一个需求：

* 简单 - 简单到无需登录，但又需要支持备份
  * TTL支持自动导出任务清单到Github Issues
* 能够支持清单不同状态
  常规清单只能展示完成/未完成两个状态，有时候没有看到任务完成会有很强的挫败感
  * TTL支持通过进度条控制/展示目前任务进度
  * 支持任务完成1/3, 2/3,以及超过2/3的不同字体颜色/粗细展示
* 支持清单任务描述
  * TTL支持创建时添加
  * TTL支持双击进行编辑
* 支持强迫症模式 - 未完成todo的任务不能超过太多
  * TTL支持设置最大任务数，默认100条
* 支持遗忘模式 - 长时间未更新的任务直接进入回收站(Forgotten)
  * TTL支持自动回收，默认365天

PS.因为我想用用新框架试试手 - Svelte，对于写一些小项目，目前看来是极度适用，推荐。



#### 感谢与致敬

1. Simple To-Do List： 感谢[Simple To-Do List](https://chrome.google.com/webstore/detail/simple-to-do-list/jimdhomgkpmmhhcegiebdajlkmjgikaf)带来了真正的"简单"todoList, 实质上TTL(Tiny Todo List)本身也是一款致敬的扩展。但因为`Simple`本身存在几个致命缺陷：
   * Chrome单条数据存储，导致超过一定条数无法创建
   * 批量删除功能过于强大，容易误操作
   * 无法对任务增加描述
2. Svelte : 感谢前端轮子哥的简洁框架，找回曾经一气呵成写前端的感觉，此外还要感谢svelte的`kitty cat`