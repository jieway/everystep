# Lab 05

## Q1: List Indexing

简单的数组索引，如果越界直接填 `error` 即可。

```python
$ python ok -q list-indexing -u
=====================================================================
Assignment: Lab 5
OK, version v1.15.0
=====================================================================

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Unlocking tests

At each "? ", type what you would expect the output to be.
Type exit() to quit

---------------------------------------------------------------------
List Indexing > Suite 1 > Case 1
(cases remaining: 2)

What would Python display? If you get stuck, try it out in the Python
interpreter!

>>> x = [1, 3, [5, 7], 9] # Write the expression that indexes into x to output the 7
? x[2][1]
-- OK! --

>>> x = [[3, [5, 7], 9]] # Write the expression that indexes into x to output the 7
? x[0][1][1]
-- OK! --

---------------------------------------------------------------------
List Indexing > Suite 2 > Case 1
(cases remaining: 1)

What would Python display? If you get stuck, try it out in the Python
interpreter!

>>> lst = [3, 2, 7, [84, 83, 82]]
>>> lst[4]
? error
-- OK! --

>>> lst[3][0]
? 84
-- OK! --

---------------------------------------------------------------------
OK! All cases for List Indexing unlocked.
```

## Q2: Couple

```python
    a = []
    for i in range(len(lst1)):
        a.append([lst1[i], lst2[i]])
    return a
```

# City Data Abstraction

## Q3: Distance

```python
    x1, y1 = get_lat(city1), get_lon(city1)
    x2, y2 = get_lat(city2), get_lon(city2)

    return sqrt((x1 - x2)**2 + (y1 - y2)**2)
```

## Q4: Closer city

```python
    tmp = make_city('tmp', lat, lon)
    dis1 = distance(city1, tmp)
    dis2 = distance(city2, tmp)

    if dis1 > dis2:
        return get_name(city2)
    else:
        return get_name(city1)
```

## Q5: Don't violate the abstraction barrier!



# Trees

## Q6: Nut Finder

## Q7: Sprout leaves

## 