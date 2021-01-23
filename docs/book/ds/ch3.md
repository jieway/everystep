# 第三章：栈

# 1. 概述

栈是先进后出，Last In First Out 简称 LIFO

队列是先进先出，First In First Out 简称 FIFO 

# 顺序栈

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

## 初始化

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

## 入栈

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
## 出栈

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

## 取栈顶元素

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

# 链栈

链栈没有采用数组存储而是采用的链表的方式存储，和单链表类似。所以顺序栈的空间是连续的而链栈的空间是离散的。

## 初始化

不需要头节点，直接置空即可。

```cpp
bool InitStack(LinkStack &s) {
    s = NULL;
    return true;
}
```

## push

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

## pop

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

## 拿到头节点

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

