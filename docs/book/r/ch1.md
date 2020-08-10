
# 基础语法

## 命令行

* 直接键入表达式可以得到结果。

```r
> 3 + 4
[1] 7
```

## 运算符

共有 6 种运算符，加（+）减（-）乘（*）幂（^）取余（%%）。

## 给变量赋值

使用 <- 操作符给变量 x 赋值，<- 左边是变量，右边是待赋的值。

```r
# Assign the value 42 to x
x <- 42

# Print out the value of the variable x
x
```

赋值练习

```r
# Assign the value 5 to the variable my_apples
my_apples <- 5

# Print out the value of the variable my_apples
my_apples
```

## 运算符和赋值的结合

```r
# Assign a value to the variables my_apples and my_oranges
my_apples <- 5
my_oranges <- 6

# Add these two variables together
my_apples + my_oranges

# Create the variable my_fruit
my_fruit <- my_apples + my_oranges
```

注意变量类型要一致，如果不一致会导致报错。

```r
# Assign a value to the variable my_apples
my_apples <- 5 

# Fix the assignment of my_oranges
my_oranges <- "six"  

# Create the variable my_fruit and print it out
my_fruit <- my_apples + my_oranges 
my_fruit
```

修改为：

```r
# Assign a value to the variable my_apples
my_apples <- 5 

# Fix the assignment of my_oranges
my_oranges <- 6 

# Create the variable my_fruit and print it out
my_fruit <- my_apples + my_oranges 
my_fruit
```

## 查看变量类型

通过函数 class() 可以查看变量类型。

```r
# Declare variables of different types
my_numeric <- 42
my_character <- "universe"
my_logical <- FALSE 

# Check class of my_numeric
class(my_numeric)

# Check class of my_character
class(my_character)

# Check class of my_logical
class(my_logical)
```

# 

# 参考 

1. [free-introduction-to-r](https://learn.datacamp.com/courses/free-introduction-to-r)