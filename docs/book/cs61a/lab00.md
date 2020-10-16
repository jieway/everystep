# Lab 00

[lab00 地址](https://inst.eecs.berkeley.edu/~cs61a/sp20/lab/lab00/) 。

这个实验主要是环境搭建和 Python 的基本语法学习。

如果没有学过 Python 的语法直接做会有些吃力。

### 语法

下面的几道测试题，用于判断文中提到的 python 语法。

在下载好的 lab00 文件的工作目录中执行命令。

例如我的工作目录如下，注意网页中写的是 python3 ，我的环境略有差异，采用的是 python 执行的，差别不大。

```python
wije@LAPTOP-PJ3DJQFQ MINGW64 /f/cs61a/lab/lab00 (master)
$ python ok -q python-basics -u
```

交互式输入答案。

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

最后会出现以下信息，提示你输入邮箱，在命令中加入 --local 则可避免。

```python
OK! All cases for Python Basics unlocked.

Performing authentication
Please enter your school email (.edu):
```

### coding

通过给定的操作符，最终结果等于 2020 即可。

```python
def twenty_twenty():
    """Come up with the most creative expression that evaluates to 2020,
    using only numbers and the +, *, and - operators.

    >>> twenty_twenty()
    2020
    """
    return 2019+1
```

通过键入命令来对代码进行测试。

```shell
wije@LAPTOP-PJ3DJQFQ MINGW64 /f/cs61a/lab/lab00 (master)
$ python ok --local
=====================================================================
Assignment: Lab 0
OK, version v1.15.0
=====================================================================

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Running tests


There are still locked tests! Use the -u option to unlock them
---------------------------------------------------------------------
Test summary
    Locked: 1
    1 test cases passed! No cases failed.

Cannot backup when running ok with --local.
```