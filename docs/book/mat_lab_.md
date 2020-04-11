---
title: MATLAB基础知识
date: 2020-03-15
---


# MATLAB基础知识

实验目的：学习MATLAB简介、向量与矩阵运算、MATLAB程序设计、MATLAB符号计算。所需设备以及所需软件：

微型计算机一台，MATLAB软件。

## 实验内容：

### 1、向量与矩阵运算；

- 直接输入向量：

```bash
>> x = [1 2 5]

x =

     1     2     5

>> y = [sin(1) sqrt(2) 2+3]

y =

    0.8415    1.4142    5.0000

>> z = y

z =

    0.8415    1.4142    5.0000
>> z = y'

z =

    0.8415
    1.4142
    5.0000
    
```   

- 利用冒号生成向量

```bash
>> x = 1 : 2 : 10

x =

     1     3     5     7     9
```

- 利用线性等分量生成向量

例如下面这个例子，生成的向量是将 0 - 1 直接平均切分成五部分。

```bash
>> x = linspace(0,1,5)

x =

         0    0.2500    0.5000    0.7500    1.0000
```

- 点积，叉积。

点积：两个向量的成绩

叉积：两个向量所形成平面的法向量

```bash
>> a = [1 2 3]

a =

     1     2     3

>> b = [4 5 6]

b =

     4     5     6

>> dot(a,b)

ans =

    32

>> c = cross(a,b)

c =

    -3     6    -3

>> dot(a ,cross(b,c))

ans =

    54
```

- 创建矩阵

```bash
>> a = [1,2,3;4,5,6;exp(1),7/6,abs(-2.8)]

a =

    1.0000    2.0000    3.0000
    4.0000    5.0000    6.0000
    2.7183    1.1667    2.8000
```

- 左除右除 

AB=C    A=C/B

AB=C    B=A\C

```bash
>> a=[1,1,1;2,3,-1;5,-2,1];
>> b=[8;7;3];
>> a\b

ans =

    1.0000
    3.0000
    4.0000
```

- 矩阵访问并修改


```bash
>> A=[1 0 6 1 2;7 1 -1 2 3;3 0 5 1 0;4 3 1 2 1];
>> A(2,:)

ans =

     7     1    -1     2     3
>> A(:,3)

ans =

     6
    -1
     5
     1

>> A(1,:)

ans =

     1     0     6     1     2

>> A(1,:)=[]

A =

     7     1    -1     2     3
     3     0     5     1     0
     4     3     1     2     1

>> A(2,:) = [0,0,0,0,0]

A =

     7     1    -1     2     3
     0     0     0     0     0
     4     3     1     2     1
```

- 初始化矩阵的方法

```bash
>> c1 = ones(2,3)

c1 =

     1     1     1
     1     1     1

>> c1 = zeros(2,3)

c1 =

     0     0     0
     0     0     0

>> c1 = eye(3)

c1 =

     1     0     0
     0     1     0
     0     0     1

>> c1 = 6 * ones(3,2)

c1 =

     6     6
     6     6
     6     6
```

### 2、MATLAB程序设计；

- Fibonnaci 计算

编写函数文件，注意文件名和函数名要一致以及切换到当前工作目录下运行。

```bash
function bb = exam1_1(n)
% Fibonnaci 计算
    bb(1) = 1;
    bb(2) = 2;
    for i = 3 : n
        bb(i) = bb(i - 1) + bb(i - 2);
    end

```

运行此程序

```bash
>> f = exam1_1(15)

f =

     1     2     3     5     8    13    21    34    55    89   144   233   377   610   987
```

- 阶乘计算

```bash
function y = example1_2(n , k)
    y = 0;
    for i = 1 : n
        y = y + i^k;
    end
```

运行得结果：

```bash
>> f = example1_2(100,1)

f =

        5050
```

- 计算本金在利率（7%）下翻倍的年数

```bash
function year = exam1_3
    year = 0;
    min = 1;
    while min < 2
        year = year +1;
        min = min * 1.07;
    end
```

运行得结果：

```bash
>> f = exam1_3

f =

    11
```

- 条件判断

```bash
function y = exam1_4(x)
if x > 2
    y = x^2 + 1;
elseif x <= 2 && x > 0
    y = x*2;
else 
    y = x^3;
end
```

运行结果：

```bash
>> f = exam1_4(3)

f =

    10

>> f = exam1_4(0.5)

f =

     1

>> f = exam1_4(-1.5)

f =

   -3.3750
```

- switch 选择

```bash
function exam1_5(x)
switch x
     case 1
         disp('Relationship between students');
     case 2
         disp('Relationship between friends');
     case 3
         disp('Relationship between students and teachers');
     otherwise
         disp('Relationship between relatives');
end
```

运行结果：

```bash
>> exam1_5(1)
Relationship between students
```

- 交互模式

使用 input 可以实现交互输入。

```bash
>> R=input('input your favorite sports - - -','s')
input your favorite sports - - -run

R =

    'run'
```
- disp()

查看变量内容

```bash
>> disp(R)
run
```

- pause

程序暂停终止，用户可以输入任意键结束。

- break
终止当前循环。和 c 类似

```bash
function [x,y]=exam1_6(m,n)
% 鸡兔同笼问题
% x- -鸡的个数，y- -兔的个数，m- -头的数目，n脚的数目
con=1；
i=1；
while con
if mod(n-2*i,4)==0&(i+(n-i*2)/4)==m
       break;
   %若不使用break，可使用控制变量con=0来跳出程序
end
i=i+1;
end
x=i;%使用con=0时x=i-1;
y=m-x;
```

运行：

```bash
>> [x1,x2]=exam1_6(36,100)

x1 =

    22


x2 =

    14
```


- 全局变量

aa,bb 是全局变量，需要提前定义。

x ,y 是局部变量。

```bash
function ss=exam1_7(x,y)
global aa bb
ss=x*aa+y*bb;

```
运行：

```bash
>> global aa bb
>> aa = 1

aa =

     1

>> bb = 1

bb =

     1

>> ss=exam1_7(3,4)

ss =

     7
```

### 3、MATLAB符号计算。

- 求导

syms: 声明一个变量

```bash
>> syms x y	
>> s=y*sin(x^2);
>> diff(s,2) 
 
ans =
 
2*y*cos(x^2) - 4*x^2*y*sin(x^2)
 
>> 
```

- 求积分

```bash
>>syms x y
>>s1=1/(x^2*sqrt(1+x^2))；
>>int(s1,x)
ans = 
-1/x*(1+x^2)^(1/2)
>> s2=exp(x)*cos(3*x);
>> int(s2,x) 
ans = 
1/10*exp(x)*cos(3*x)+3/10*exp(x)*sin(3*x)
```