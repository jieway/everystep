# Project 1

两个人在玩掷骰子的游戏，每次可以选多个骰子但是不能超过 10 。
每轮投掷的分数为骰子的点数累加和，但是如果其中任何一枚骰子出现 1 点，那么该轮的分数就为 1 。
所以骰子选太多虽然能拿很多的分数，但是出现 1 的概率也会非常大。

例如： 

## Problem 0

问题 0 是让你通过交互式的命令查看源码的，很简单的两个函数。

根据命令 `python ok -q 00 -u` 的提示，把函数表示内容看明白。

```python
$ python ok -q 00 -u
=====================================================================
Assignment: Project 1: Hog
OK, version v1.15.0
=====================================================================

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Unlocking tests

At each "? ", type what you would expect the output to be.
Type exit() to quit

---------------------------------------------------------------------
Question 0 > Suite 1 > Case 1
(cases remaining: 2)

>>> from hog import *
>>> test_dice = make_test_dice(4, 1, 2)
>>> test_dice()
? 4
-- OK! --

>>> test_dice() # Second call
? 1
-- OK! --

>>> test_dice() # Third call
? 2
-- OK! --

>>> test_dice() # Fourth call
? 4
-- OK! --

---------------------------------------------------------------------
Question 0 > Suite 2 > Case 1
(cases remaining: 1)

Q: Which of the following is the correct way to "roll" a fair, six-sided die?
Choose the number of the correct choice:
0) six_sided()
1) make_fair_dice(6)
2) make_test_dice(6)
3) six_sided
? 0
-- OK! --

---------------------------------------------------------------------
OK! All cases for Question 0 unlocked.
```

## Problem 1

### 思考
根据问题 0 的基础，来实现 roll_dice 函数。注意，需要先了解该函数要实现什么功能。（接下来有我的思考，最好先自己想一遍！）

需要先运行 **python ok -q 00 -u** 来确保自己已经理解 roll_dice 函数的功能。

通过这个测试我发现自己对 p0 中的两个函数理解的并不深刻。

### 答案

```python
$ python ok -q 01 -u
=====================================================================
Assignment: Project 1: Hog
OK, version v1.15.0
=====================================================================

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Unlocking tests

At each "? ", type what you would expect the output to be.
Type exit() to quit

---------------------------------------------------------------------
Question 1 > Suite 1 > Case 1
(cases remaining: 59)

>>> from hog import *
>>> roll_dice(2, make_test_dice(4, 6, 1))
? 10
-- OK! --

---------------------------------------------------------------------
Question 1 > Suite 1 > Case 2
(cases remaining: 58)

>>> from hog import *
>>> roll_dice(3, make_test_dice(4, 6, 1))
? 1
-- OK! --

---------------------------------------------------------------------
Question 1 > Suite 1 > Case 3
(cases remaining: 57)

>>> from hog import *
>>> roll_dice(4, make_test_dice(2, 2, 3))
? 9
-- OK! --

---------------------------------------------------------------------
Question 1 > Suite 1 > Case 4
(cases remaining: 56)

>>> from hog import *
>>> roll_dice(4, make_test_dice(1, 2, 3))
? 1
-- OK! --

---------------------------------------------------------------------
Question 1 > Suite 1 > Case 5
(cases remaining: 55)

>>> from hog import *
>>> counted_dice = make_test_dice(4, 1, 2, 6)
>>> roll_dice(3, counted_dice)
? 1
-- OK! --

>>> # Make sure you call dice exactly num_rolls times!
>>> # If you call it fewer or more than that, it won't be at the right spot in the cycle for the next roll
>>> # Note that a return statement in a for loop ends the loop
>>> roll_dice(1, counted_dice)
? 6
-- OK! --

---------------------------------------------------------------------
Question 1 > Suite 1 > Case 6
(cases remaining: 54)

>>> from hog import *
>>> roll_dice(9, make_test_dice(6))
? 54
-- OK! --

>>> roll_dice(7, make_test_dice(2, 2, 2, 2, 2, 2, 1))
? 1
-- OK! --
```

roll_dice 函数就是来统计分数，的特例就是遇到 1 要直接返回 1 。

这是我最开始的思路：

```python
    num = 0
    for i in range(0, num_rolls):
        if dice() == 1:
            return 1
        num += dice()
    return num
```


```python
    num , f = 0 , 0
    for i in range(0, num_rolls):
        t = dice()
        if t == 1:
            f = 1
        num += t
    return 1 if f else num 
```

下面这个例子过不去！

```python
>>> roll_dice(2, make_test_dice(4, 6, 1))
? 10
```

改进：

```python
    sum, f = 0, 0
    for i in range(0, num_rolls):
        tmp = dice()
        if tmp == 1:
            f = 1
        sum += tmp
    return 1 if f else sum
```

测试结果：

```python
$ python ok -q 01
=====================================================================
Assignment: Project 1: Hog
OK, version v1.15.0
=====================================================================

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Running tests

---------------------------------------------------------------------
Test summary
    59 test cases passed! No cases failed.
```


## Problem 2

