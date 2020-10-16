# Hog

> 已经花了大约 8 个小时

两个人在玩掷骰子的游戏，每次可以选多个骰子但是不能超过 10 。
每轮投掷的分数为骰子的点数累加和，但是如果其中任何一枚骰子出现 1 点，那么该轮的分数就为 1 。
所以骰子选太多虽然能拿很多的分数，但是出现 1 的概率也会非常大。

# Phase 1: Simulator

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

这个函数就是实现一个整数三次方后各个位数交错加减再加一。

看明白题意后，根据 `python ok -q 02 -u` 走一遍，只有将这个解锁才能写下一个函数的代码。

### 答案

```python
$ python ok -q 02 -u
=====================================================================
Assignment: Project 1: Hog
OK, version v1.18.1
=====================================================================

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Unlocking tests

At each "? ", type what you would expect the output to be.
Type exit() to quit

---------------------------------------------------------------------
Question 2 > Suite 1 > Case 1
(cases remaining: 36)

>>> from hog import *
>>> free_bacon(4)
? 3
-- OK! --

---------------------------------------------------------------------
Question 2 > Suite 1 > Case 2
(cases remaining: 35)

>>> from hog import *
>>> free_bacon(1)
? 2
-- OK! --

---------------------------------------------------------------------
Question 2 > Suite 1 > Case 3
(cases remaining: 34)

>>> from hog import *
>>> free_bacon(20)
? 9
-- OK! --

---------------------------------------------------------------------
Question 2 > Suite 1 > Case 4
(cases remaining: 33)

>>> from hog import *
>>> free_bacon(45)
? 13
-- OK! --

---------------------------------------------------------------------
Question 2 > Suite 1 > Case 5
(cases remaining: 32)

>>> from hog import *
>>> free_bacon(15)
? 3
-- OK! --

---------------------------------------------------------------------
Question 2 > Suite 1 > Case 6
(cases remaining: 31)

>>> from hog import *
>>> free_bacon(13)
? 4
-- OK! --

---------------------------------------------------------------------
OK! All cases for Question 2 unlocked.
```

`free_bacon()` 实现如下：

```python
    num, sum, i = pow(score, 3), 0, 0
    while num != 0:
        if i%2 == 1:
            sum -= num % 10
        else:
            sum += num % 10
        i += 1
        num //= 10
    finall = abs(sum) + 1
    return finall
```

## Problem 3

同样先运行 `python ok -q 03 -u`

```python
$ python ok -q 03 -u
=====================================================================
Assignment: Project 1: Hog
OK, version v1.18.1
=====================================================================

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Unlocking tests

At each "? ", type what you would expect the output to be.
Type exit() to quit

---------------------------------------------------------------------
Question 3 > Suite 1 > Case 1
(cases remaining: 10)

>>> from hog import *
>>> take_turn(2, 0, make_test_dice(4, 5, 1))
? 9
-- OK! --

---------------------------------------------------------------------
Question 3 > Suite 1 > Case 2
(cases remaining: 9)

>>> from hog import *
>>> take_turn(3, 0, make_test_dice(4, 6, 1))
? 1
-- OK! --

---------------------------------------------------------------------
Question 3 > Suite 1 > Case 3
(cases remaining: 8)

>>> from hog import *
>>> take_turn(0, 56)
? 13
-- OK! --

---------------------------------------------------------------------
Question 3 > Suite 1 > Case 4
(cases remaining: 7)

>>> from hog import *
>>> take_turn(0, 47)
? 6
-- OK! --

---------------------------------------------------------------------
OK! All cases for Question 3 unlocked.
```

`python ok -q 03` 测试通过！

```python
    if num_rolls == 0:
        return free_bacon(opponent_score)
    else:
        return roll_dice(num_rolls,dice)
```

## Problem 4

先解锁 `python ok -q 04 -u`
```python
$ python ok -q 04 -u
=====================================================================
Assignment: Project 1: Hog
OK, version v1.18.1
=====================================================================

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Unlocking tests

At each "? ", type what you would expect the output to be.
Type exit() to quit

---------------------------------------------------------------------
Question 4 > Suite 1 > Case 1
(cases remaining: 106)

>>> from hog import *
>>> is_swap(2, 4)
? False
-- OK! --

---------------------------------------------------------------------
Question 4 > Suite 1 > Case 2
(cases remaining: 105)

>>> from hog import *
>>> is_swap(11, 1)
? False
-- OK! --

---------------------------------------------------------------------
Question 4 > Suite 1 > Case 3
(cases remaining: 104)

>>> from hog import *
>>> is_swap(1, 0)
? True
-- OK! --

---------------------------------------------------------------------
Question 4 > Suite 1 > Case 4
(cases remaining: 103)

>>> from hog import *
>>> is_swap(23, 4)
? True
-- OK! --

---------------------------------------------------------------------
Question 4 > Suite 1 > Case 5
(cases remaining: 102)

>>> from hog import *
>>> is_swap(10, 3)
? False
-- OK! --

---------------------------------------------------------------------
Question 4 > Suite 1 > Case 6
(cases remaining: 101)

>>> from hog import *
>>> is_swap(92, 3)
? False
-- OK! --
```

`python ok -q 04` 通过测试。注意如果用 log10 需要在引入 `from math import log10`

```python
    num = pow(3,player_score + opponent_score)
    a = num % 10
    b = num // pow(10,int(log10(num)))
    return (a == b)    
```

## Problem 5a

```python
$ python ok -q 05a -u
=====================================================================
Assignment: Project 1: Hog
OK, version v1.18.1
=====================================================================

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Unlocking tests

At each "? ", type what you would expect the output to be.
Type exit() to quit

---------------------------------------------------------------------
Question 5a > Suite 1 > Case 1
(cases remaining: 10)

Q: The variables score0 and score1 are the scores for Player 0
and Player 1, respectively. Under what conditions should the
game continue?
Choose the number of the correct choice:
0) While score1 is less than goal
1) While at least one of score0 or score1 is less than goal
2) While score0 and score1 are both less than goal
3) While score0 is less than goal
? 2
-- OK! --

---------------------------------------------------------------------
Question 5a > Suite 1 > Case 2
(cases remaining: 9)

Q: What is a strategy in the context of this game?
Choose the number of the correct choice:
0) A player's desired turn outcome
1) A function that returns the number of dice a player will roll
2) The number of dice a player will roll
? 1
-- OK! --

---------------------------------------------------------------------
Question 5a > Suite 1 > Case 3
(cases remaining: 8)

Q: If strategy1 is Player 1's strategy function, score0 is
Player 0's current score, and score1 is Player 1's current
score, then which of the following demonstrates correct
usage of strategy1?
Choose the number of the correct choice:
0) strategy1(score1)
1) strategy1(score0, score1)
2) strategy1(score0)
3) strategy1(score1, score0)
? 2
>>> # Play function stops at goal
>>> s0, s1 = hog.play(always(5), always(3), score0=91, score1=10, dice=always_three, feral_hogs=False)
>>> s0
? 106
-- OK! --

>>> s1
? 10
-- OK! --

---------------------------------------------------------------------
Question 5a > Suite 2 > Case 2
(cases remaining: 6)

>>> import hog
>>> always_three = hog.make_test_dice(3)
>>> always = hog.always_roll
>>> #
>>> # Goal score is not hardwired
>>> s0, s1 = hog.play(always(5), always(5), goal=10, dice=always_three, feral_hogs=False)
>>> s0
? 15
-- OK! --

>>> s1
? 0
-- OK! --

---------------------------------------------------------------------
Question 5a > Suite 2 > Case 3
(cases remaining: 5)

-- Already unlocked --

---------------------------------------------------------------------
Question 5a > Suite 3 > Case 1
(cases remaining: 4)

>>> import hog
>>> always_three = hog.make_test_dice(3)
>>> always_seven = hog.make_test_dice(7)
>>> #
>>> # Use strategies
>>> # We recommend working this out turn-by-turn on a piece of paper (use `python` for difficult calculations).
>>> strat0 = lambda score, opponent: opponent % 10
>>> strat1 = lambda score, opponent: max((score // 10) - 4, 0)
>>> s0, s1 = hog.play(strat0, strat1, score0=71, score1=80, dice=always_seven, feral_hogs=False)
>>> s0
? 78
-- OK! --

>>> s1
? 108
-- OK! --
```

测试 `python3 ok -q 05a` 通过。

```python
    who = 0  # Who is about to take a turn, 0 (first) or 1 (second)
    # BEGIN PROBLEM 5
    while (score0 < goal) and (score1 < goal):
        if who == 0:
            dice_num = strategy0(score0, score1)
            curr_score = take_turn(dice_num, score1, dice)
            score0 += curr_score

        if who == 1:
            dice_num = strategy1(score1, score0)
            curr_score = take_turn(dice_num, score0, dice)
            score1 += curr_score

        if is_swap(score0, score1):
            score0, score1 = score1, score0
        who = other(who)

    # END PROBLEM 5
```

## Problem 5b

在上一题的基础上需要添加几条规则。

```python
$ python ok -q 05b -u
=====================================================================
Assignment: Project 1: Hog
OK, version v1.18.1
=====================================================================

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Unlocking tests

At each "? ", type what you would expect the output to be.
Type exit() to quit

---------------------------------------------------------------------
Question 5b > Suite 1 > Case 1
(cases remaining: 103)

>>> import hog
>>> always_one = hog.make_test_dice(1)
>>> always_two = hog.make_test_dice(2)
>>> always_three = hog.make_test_dice(3)
>>> always = hog.always_roll
>>> # example 1
>>> def strat0(s0, s1):
...     if s0 == 0: return 3
...     if s0 == 7: return 5
...     return 8
>>> def strat1(s0, s1):
...     if s0 == 0: return 1
...     if s0 == 4: return 2
...     return 6
>>> s0, s1 = hog.play(
...   strat0, strat1, score0=0, score1=0, goal=21,
...   dice=hog.make_test_dice(2, 2, 3, 4, 2, 2, 2, 2, 2, 3, 5, 2, 2, 2, 2, 2, 2, 2, 6, 1))
>>> s0
? 43
-- OK! --

>>> s1
? 15
-- OK! --

---------------------------------------------------------------------
Question 5b > Suite 1 > Case 2
(cases remaining: 102)

>>> import hog
>>> always_one = hog.make_test_dice(1)
>>> always_two = hog.make_test_dice(2)
>>> always_three = hog.make_test_dice(3)
>>> always = hog.always_roll
>>> # example 2
>>> s0, s1 = hog.play(always(2), always(1), score0=0, score1=0, goal=5, dice=hog.make_test_dice(2, 2))
>>> s0
? 7
-- OK! --

>>> s1
? 0
-- OK! --

---------------------------------------------------------------------
Question 5b > Suite 1 > Case 3
(cases remaining: 101)

>>> import hog
>>> always_one = hog.make_test_dice(1)
>>> always_two = hog.make_test_dice(2)
>>> always_three = hog.make_test_dice(3)
>>> always = hog.always_roll
>>> # swap after feral hogs
>>> s0, s1 = hog.play(always(2), always(1), score0=17, score1=6, goal=21, dice=hog.make_test_dice(1, 2))
>>> s0
? 6
-- OK! --

>>> s1
? 21
-- OK! --
```

`python ok -q 05b` 和 `python3 ok -q 05a` 都可以通过。

```python
def play(strategy0, strategy1, score0=0, score1=0, dice=six_sided,
         goal=GOAL_SCORE, say=silence, feral_hogs=True):
    """Simulate a game and return the final scores of both players, with Player
    0's score first, and Player 1's score second.

    A strategy is a function that takes two total scores as arguments (the
    current player's score, and the opponent's score), and returns a number of
    dice that the current player will roll this turn.

    strategy0:  The strategy function for Player 0, who plays first.
    strategy1:  The strategy function for Player 1, who plays second.
    score0:     Starting score for Player 0
    score1:     Starting score for Player 1
    dice:       A function of zero arguments that simulates a dice roll.
    goal:       The game ends and someone wins when this score is reached.
    say:        The commentary function to call at the end of the first turn.
    feral_hogs: A boolean indicating whether the feral hogs rule should be active.
    """
    who = 0  # Who is about to take a turn, 0 (first) or 1 (second)
    # BEGIN PROBLEM 5
    before_score0, before_score1 = 0, 0

    while (score0 < goal) and (score1 < goal):
        if who == 0:
            dice_num = strategy0(score0, score1)
            curr_score = take_turn(dice_num, score1, dice)
            score0 += curr_score
            if feral_hogs:
                if checkNum(dice_num,before_score0):
                    score0 +=3
                before_score0 = curr_score

        if who == 1:
            dice_num = strategy1(score1, score0)
            curr_score = take_turn(dice_num, score0, dice)
            score1 += curr_score
            if feral_hogs:
                if checkNum(dice_num,before_score1):
                    score1 +=3
                before_score1 = curr_score

        if is_swap(score0, score1):
            score0, score1 = score1, score0
        who = other(who)

    # END PROBLEM 5
    # (note that the indentation for the problem 6 prompt (***YOUR CODE HERE***) might be misleading)
    # BEGIN PROBLEM 6

    # END PROBLEM 6
    return score0, score1

def checkNum(dice_num, before_num):
    return (abs(dice_num - before_num) == 2)

```

# Phase 2: Commentary

## Problem 6 
添加输出，提高交互性。

```python
$ python ok -q 06 -u
=====================================================================
Assignment: Project 1: Hog
OK, version v1.18.1
=====================================================================

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Unlocking tests

At each "? ", type what you would expect the output to be.
Type exit() to quit

---------------------------------------------------------------------
Question 6 > Suite 1 > Case 1
(cases remaining: 7)

Q: What does a commentary function return?
Choose the number of the correct choice:
0) An integer representing the score.
1) None.
2) Another commentary function.
      ? 0
-- Not quite. Try again! --

Choose the number of the correct choice:
0) An integer representing the score.
1) None.
2) Another commentary function.
? 2
-- OK! --

---------------------------------------------------------------------
Question 6 > Suite 2 > Case 1
(cases remaining: 6)

>>> from hog import play, always_roll
>>> from dice import make_test_dice
>>> #
>>> def echo(s0, s1):
...     print(s0, s1)
...     return echo
>>> s0, s1 = play(always_roll(1), always_roll(1), dice=make_test_dice(3), goal=5, say=echo)
(line 1)? 3 0
(line 2)? 3 3
(line 3)? 9 3
-- OK! --

---------------------------------------------------------------------
Question 6 > Suite 2 > Case 2
(cases remaining: 5)

>>> from hog import play, always_roll
>>> from dice import make_test_dice
>>> #
>>> def count(n):
...     def say(s0, s1):
...         print(n)
...         return count(n + 1)
...     return say
>>> s0, s1 = play(always_roll(1), always_roll(1), dice=make_test_dice(3), goal=10, say=count(1))
(line 1)? 1
(line 2)? 2
(line 3)? 3
(line 4)? 4
(line 5)? 5
-- OK! --

---------------------------------------------------------------------
Question 6 > Suite 2 > Case 3
(cases remaining: 4)

>>> from hog import play, always_roll
>>> from dice import make_test_dice
>>> #
>>> def echo(s0, s1):
...     print(s0, s1)
...     return echo
>>> strat0 = lambda score, opponent: 1 - opponent // 10
>>> strat1 = always_roll(3)
>>> s0, s1 = play(strat0, strat1, dice=make_test_dice(4, 2, 6), goal=15, say=echo)
(line 1)? 4 0
(line 2)? 4 12
(line 3)? 17 12
-- OK! --

---------------------------------------------------------------------
Question 6 > Suite 2 > Case 4
(cases remaining: 3)

>>> from hog import play, always_roll
>>> from dice import make_test_dice
>>> #
>>> # Ensure that say is properly updated within the body of play.
>>> def total(s0, s1):
...     print(s0 + s1)
...     return echo
>>> def echo(s0, s1):
...     print(s0, s1)
...     return total
>>> s0, s1 = play(always_roll(1), always_roll(1), dice=make_test_dice(2, 3), goal=15, say=echo)
(line 1)? 0 2
(line 2)? 5
(line 3)? 2 5
(line 4)?  13
(line 5)? 4 11
(line 6)? 21
-- OK! --

---------------------------------------------------------------------
Question 6 > Suite 3 > Case 1
(cases remaining: 2)

>>> from hog import play, always_roll, both, announce_lead_changes, say_scores
>>> from dice import make_test_dice
>>> #
>>> def echo_0(s0, s1):
...     print('*', s0)
...     return echo_0
>>> def echo_1(s0, s1):
...     print('**', s1)
...     return echo_1
>>> s0, s1 = play(always_roll(1), always_roll(1), dice=make_test_dice(2), goal=3, say=both(echo_0, echo_1))
(line 1)? * 0
(line 2)? ** 2
(line 3)? * 0
(line 4)? ** 4
-- OK! --

---------------------------------------------------------------------
Question 6 > Suite 3 > Case 2
(cases remaining: 1)

-- Already unlocked --
```

```python
def silence(score0, score1):
    """Announce nothing (see Phase 2)."""
    print("Player 0 now has", score0, "and Player 1 now has", score1)
    return silence
```

注意缩进！

```python
    # BEGIN PROBLEM 6
        say = say(score0, score1)
    # END PROBLEM 6
```


## Problem 7

```python
$ python ok -q 07 -u
=====================================================================
Assignment: Project 1: Hog
OK, version v1.18.1
=====================================================================

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Unlocking tests

At each "? ", type what you would expect the output to be.
Type exit() to quit

---------------------------------------------------------------------
Question 7 > Suite 1 > Case 1
(cases remaining: 5)

Q: What does announce_highest return?
Choose the number of the correct choice:
0) A string containing the largest point increase for the
   current player.
1) The current largest point increase between both
   players.
2) A commentary function that prints information about the
   biggest point increase for the current player.
? 0
-- Not quite. Try again! --

Choose the number of the correct choice:
0) A string containing the largest point increase for the
   current player.
1) The current largest point increase between both
   players.
2) A commentary function that prints information about the
   biggest point increase for the current player.
? 1
-- Not quite. Try again! --

Choose the number of the correct choice:
0) A string containing the largest point increase for the
   current player.
1) The current largest point increase between both
   players.
2) A commentary function that prints information about the
   biggest point increase for the current player.
? 2
-- OK! --

---------------------------------------------------------------------
Question 7 > Suite 1 > Case 2
(cases remaining: 4)

Q: When does the commentary function returned by announce_highest
print something out?
Choose the number of the correct choice:
0) After each turn.
1) When the current player, given by the parameter `who`,
   earns the biggest point increase yet between both
   players in the game.
2) When the current player, given by the parameter `who`,
   earns their biggest point increase yet in the game.
? 2
-- OK! --

---------------------------------------------------------------------
Question 7 > Suite 1 > Case 3
(cases remaining: 3)

Q: What does the parameter previous_score represent?
Choose the number of the correct choice:
0) The current player's score before this turn.
1) The opponent's score before this turn.
2) The previous highest gain for the current player.
? 2
-- Not quite. Try again! --

Choose the number of the correct choice:
0) The current player's score before this turn.
1) The opponent's score before this turn.
2) The previous highest gain for the current player.
? 1
-- Not quite. Try again! --

Choose the number of the correct choice:
0) The current player's score before this turn.
1) The opponent's score before this turn.
2) The previous highest gain for the current player.
? 0
-- OK! --
```

`python ok -q 07` 

```python
    # BEGIN PROBLEM 7
    def say(score0, score1):
        if who:
            curr_point = score1 - prev_score
            if curr_point > prev_high:
                print(str(curr_point)+" point(s)! That's the biggest gain yet for Player "+str(who))
                return announce_highest(who,curr_point, score1)
            else:
                return announce_highest(who,prev_high, score1)

        else :
            curr_point = score0 - prev_score
            if curr_point > prev_high:
                print(str(curr_point)+" point(s)! That's the biggest gain yet for Player "+str(who))
                return announce_highest(who,curr_point, score0)
            else:
                return announce_highest(who,prev_high, score0)
    return say
    # END PROBLEM 7
```

## Problem 8

```python
$ python ok -q 08 -u
=====================================================================
Assignment: Project 1: Hog
OK, version v1.18.1
=====================================================================

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Unlocking tests

At each "? ", type what you would expect the output to be.
Type exit() to quit

---------------------------------------------------------------------
Question 8 > Suite 1 > Case 1
(cases remaining: 7)

Q: What makes make_averaged a higher order function?
Choose the number of the correct choice:
0) It uses the *args keyword
1) It returns a function
2) It takes in a function as an argument
3) It both takes in a function as an argument and returns a function
? 3
-- OK! --

---------------------------------------------------------------------
Question 8 > Suite 1 > Case 2
(cases remaining: 6)

Q: How many arguments does the function passed into make_averaged take?
Choose the number of the correct choice:
0) An arbitrary amount, which is why we need to use *args to call it
1) Two
2) None
? 0
-- OK! --

---------------------------------------------------------------------
Question 8 > Suite 2 > Case 1
(cases remaining: 5)

>>> from hog import *
>>> dice = make_test_dice(3, 1, 5, 6)
>>> averaged_dice = make_averaged(dice, 1000)
>>> # Average of calling dice 1000 times
>>> averaged_dice()
? 3.75
-- OK! --

---------------------------------------------------------------------
Question 8 > Suite 2 > Case 2
(cases remaining: 4)

>>> from hog import *
>>> dice = make_test_dice(3, 1, 5, 6)
? 6.0
-- OK! --
```

`python ok -q 08` 结果

```python
    # BEGIN PROBLEM 8
    def avg(*args):
        i , sum = 0 , 0
        while i < num_samples:
            sum += g(*args)
            i += 1
        return sum/num_samples
    return avg
    # END PROBLEM 8
```

## Problem 9

```python
$ python ok -q 09 -u
=====================================================================
Assignment: Project 1: Hog
OK, version v1.18.1
=====================================================================

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Unlocking tests

At each "? ", type what you would expect the output to be.
Type exit() to quit

---------------------------------------------------------------------
Question 9 > Suite 1 > Case 1
(cases remaining: 8)

Q: If multiple num_rolls are tied for the highest scoring
average, which should you return?
Choose the number of the correct choice:
0) The highest num_rolls
1) A random num_rolls
2) The lowest num_rolls
? 2
-- OK! --

---------------------------------------------------------------------
Question 9 > Suite 2 > Case 1
(cases remaining: 7)

>>> from hog import *
>>> dice = make_test_dice(3)   # dice always returns 3
>>> max_scoring_num_rolls(dice, num_samples=1000)
? 10
-- OK! --

---------------------------------------------------------------------
Question 9 > Suite 2 > Case 2
(cases remaining: 6)

-- Already unlocked --

---------------------------------------------------------------------
Question 9 > Suite 2 > Case 3
(cases remaining: 5)

-- Already unlocked --

---------------------------------------------------------------------
Question 9 > Suite 3 > Case 1
(cases remaining: 4)

>>> from hog import *
>>> dice = make_test_dice(2)     # dice always rolls 2
>>> max_scoring_num_rolls(dice, num_samples=1000)
? 10
-- OK! --

---------------------------------------------------------------------
Question 9 > Suite 3 > Case 2
(cases remaining: 3)

>>> from hog import *
>>> dice = make_test_dice(1, 2)  # dice alternates 1 and 2
>>> max_scoring_num_rolls(dice, num_samples=1000)
? 1
-- OK! --

---------------------------------------------------------------------
OK! All cases for Question 9 unlocked.
```

```python
    # BEGIN PROBLEM 9
    i = 1
    max = float("-inf")
    max_index = 1
    while i <= 10:
        averaged_roll_dice = make_averaged(roll_dice, num_samples)
        curr_value = averaged_roll_dice(i, dice)
        if curr_value > max:
            max_index = i
            max = curr_value
        i += 1
    return max_index
    # END PROBLEM 9
```

## Problem 10



## Problem 11

## Problem 12

