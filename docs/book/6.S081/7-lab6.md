# lab6

* [lec09-interrupts](https://mit-public-courses-cn-translatio.gitbook.io/mit6-s081/lec09-interrupts)

## 总结

中断的场景:

1. 网卡收到了一个packet，网卡会生成一个中断；
2. 用户通过键盘按下了一个按键，键盘会产生一个中断。

如何处理中断,保存当前的工作，处理中断，处理完成之后再恢复之前的工作。

保存和恢复工作和之前的 trap 机制的保存恢复一样. 系统调用，page fault，中断，都使用相同的机制,但是又不完全一样.

以下是三个差别:

