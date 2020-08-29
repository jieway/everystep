# Lab 00: Getting Started

这个实验主要是环境搭建和 Python 的基本语法学习。

地址：https://inst.eecs.berkeley.edu/~cs61a/sp20/lab/lab00/

我的环境是 win10，编辑器采用是 vscode 。

## Test

### 语法测试

下面的几道测试题，用于判断自己 python 语法掌握如何。

在下载好的 lab00 文件的工作目录中执行命令。

例如我的工作目录如下，注意网页中写的是 python3 ，我的环境略有差异，采用的是 python 执行的，差别不大。

```python
wije@LAPTOP-PJ3DJQFQ MINGW64 /f/cs61a/lab/lab00 (master)
$ python ok -q python-basics -u
```

开始测试：

```python
=====================================================================
Assignment: Lab 0
OK, version v1.15.0
=====================================================================

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Unlocking tests

At each "? ", type what you would expect the output to be.
Type exit() to quit

---------------------------------------------------------------------
Python Basics > Suite 1 > Case 1
(cases remaining: 2)

What would Python display? If you get stuck, try it out in the Python
interpreter!

>>> 10 + 2
? 12
-- OK! --

>>> 7 / 2
? 3.5
-- OK! --

>>> 7 // 2
? 3
-- OK! --

>>> 7 % 2                       # 7 modulo 2, equivalent to the remainder of 7 // 2
? 1
-- OK! --

---------------------------------------------------------------------
Python Basics > Suite 2 > Case 1
(cases remaining: 1)

What would Python display? If you get stuck, try it out in the Python
interpreter!

>>> x = 20
>>> x + 2
? 22
-- OK! --

>>> x
? 20
-- OK! --

>>> y = 5
>>> y += 3                      # Equivalent to y = y + 3
>>> y * 2
? 16
-- OK! --

>>> y //= 4                     # Equivalent to y = y // 4
>>> y + x
? 22
-- OK! --

---------------------------------------------------------------------
OK! All cases for Python Basics unlocked.
```


### coding

```python
def twenty_twenty():
    """Come up with the most creative expression that evaluates to 2020,
    using only numbers and the +, *, and - operators.

    >>> twenty_twenty()
    2020
    """
    return 2019+1
```

测试（在 [wsl](https://weijiew.com/22/) 中测试）：

```shell
# weijiew @ LAPTOP-PJ3DJQFQ in /mnt/f/cs61a/lab/lab00 on git:master x [17:03:18]
$ python3 ok
=====================================================================
Assignment: Lab 0
OK, version v1.18.1
=====================================================================

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Running tests


There are still locked tests! Use the -u option to unlock them
```