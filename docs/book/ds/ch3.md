# 第三章：栈和队列

# 1. 概述

栈是特殊的线性表，也就是只能在一端进行插入或删除。

空栈：栈中没有元素。栈顶指允许删除和插入的一端，栈底则反之。

栈是先进后出，Last In First Out 简称 LIFO

队列是先进先出，First In First Out 简称 FIFO 

题型：判断出栈顺序，出栈顺序的所有可能为卡特兰数。

# 2. 顺序栈

* 根据栈的特性思考栈的数据结构，采用两个指针，一个指向头部，一个指向栈底。

```cpp
typedef struct SqStack {
    ElemType *top; 
    ElemType *base;
}SqStack;
```

* 也可以采用静态存储，用数组直接存。

```cpp
typedef struct SqStack {
    ElemType data[Maxsize];
    int top;
}SqStack;
```

根据 top 的定义来设定其值，一般而言 top 指针存在两种定义方式。一种是指向当前栈顶元素，另一种是指向栈顶元素后面一个位置的元素。对于前者而言 top 初值为 -1 ，因为 0 位置最初没有存元素，显然不合理。所以判断栈是否为空时可以直接判断 top 是否等于 -1 即可。对于后者而言 top 初始值为 0 。

静态栈的栈满后想要扩展是比较麻烦的。

共享栈指两个栈共享同一块内存空间，二者相向生长。

## 2.1 初始化

采用静态栈，用数据来存。初始头部和尾部在同一个位置。

```cpp
bool InitStack(SqStack &S) {
    S.base = new int[Maxsize];
    if (!S.base) {
        return false;
    }
    S.top = S.base;
    return true;
}
```

## 2.2 入栈

思路：入栈前要先判断栈是否满了，没有满在进栈，头部指针加一，尾指针不动，

```cpp
bool Push(SqStack &S, int e) {
    if (S.top - S.base > Maxsize) {
        return false;
    }
    *S.top = e;
    S.top++;
    return true;
}
```
## 2.3 出栈

思路：出栈就反过来了，但是需要先判断是否到达栈底了，如果没有就出去，反之不行。下面的代码栈顶元素起始没有删除，只不过元素下次进栈时会将其覆盖掉。

```cpp
bool Pop(SqStack &S) {
    if (S.top == S.base) {
        return false;
    }
    S.top--;
    return true;
}
```

## 2.4 取栈顶元素

top 指针起始是指向栈顶元素的上一个位置。所以需要 -1 ，星号 （*） 的作用是取该地址（指针）中的值。

```cpp
int GetTop(SqStack S) {
    if (S.top != S.base) {
        return *(S.top - 1);
    }else {
        return -1;
    }
}
```

# 3. 链栈

链栈没有采用数组存储而是采用的链表的方式存储，和单链表类似。所以顺序栈的空间是连续的而链栈的空间是离散的。

## 3.1 初始化

不需要头节点，直接置空即可。

```cpp
bool InitStack(LinkStack &s) {
    s = NULL;
    return true;
}
```

## 3.2 push

创建一个新节点，指向原来的节点。

```cpp
bool Push(LinkStack &s,int e) {
    LinkStack p;
    p = new SNode;
    p->data = e;
    p->next = s;
    s = p;
    return true;
}
```

## 3.3 pop

```cpp
bool Pop(LinkStack &s) {
    LinkStack p;
    if (s == NULL) return false;
    p = s;
    delete p;
    s = s->next;
    return true;
}
```

## 3.4 拿到头节点

```cpp
int GetTop(LinkStack &s) {
    if (s != NULL) {
        return s->data;
    }
    else {
        return -1;
    }
}
```

# 4. 队列

队列表示只能在一端进行插入，另一端进行删除。先进先出（FIFO）。

术语：队头元素指执行删除元素的一端，队尾元素指指向插入元素的一端，空队列指队列中元素为空的情况。

采用静态数组来存储，结构体要分别定义队头和队尾两个指针。

循环队列，因为删除操作导致空间出现剩余，所以队尾指针经过取余操作跳转到这块内存可空间的头部。 

## 4.1 空队列和满队列的判断

队列已满的条件判断，存在以下三种方法。因为队满和队空的情况仅靠头指针和尾指针是无法区分的。第一种方法是浪费一块存储空间，后两种方法则是增加辅助变量。

1. 循环队列要空出一个元素用于判断队列是否为空，因为头指针和尾指针指向同一个位置表示队列为空，而队尾经过不断的插入循环回来最终也会指向队头指针，所以要空出一个元素。

2. 也可以在结构体中增加一个属性 size 用于判断队列长度，所以就不用浪费一个节点了。

3. 可以增加一个变量，用于判断执行的是插入操作还是删除操作。对于队满的情况，一定是插入操作所导致的，对于队列为空的情况一定是删除操作所导致的。这样就可以区分队满和对空的情况了。

## 4.2 队列元素个数计算

队列元素个数计算：`(rear + Maxsize - front)%Maxsize` 。

## 4.3 队尾指针定义

注意区分队尾指针的定义，定义不同代码实现也不同，一般存在以下两种定义方式：

1. 指向当前队尾元素。
2. 指向队尾元素的下一个元素。

