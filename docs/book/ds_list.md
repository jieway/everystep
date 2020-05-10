# 概念
线性表：由 n（n>0）个相同类型的数据元素组成的有限序列。有唯一的开始和结束，除了第一个元素外每一个元素都有唯一的直接前驱，除了最后一个元素外，每个元素都有唯一的直接后继。

线性表的存储方式：顺序存储（顺序表）和链式存储（链式表）。

# 顺序表
顺序表中元素的存储位置是连续的。所以定位迅速，但是插入和删除需要移动后续的元素导致比较费时间。

根据分配内存的方式，顺序表可以分为静态分配和动态分配两种类型。

静态分配：提前为定长的数组申请一块空间，数组的长度固定，但是如果后续的操作导致数组的空间不够用了，那就采用动态分配的方式。

顺序表操作简单，存储密度高，可以随机存取。但是需要预先分配空间，空间分配多了可能会导致浪费反之会导致溢出。如果需要经常插入或删除的话顺序表效率低，可以考虑链式存储。
```cpp
typedef int ElemType; // typedef 相当于取一个小名，使得 ElemType 等价于 int 
#define Maxsize 100 // 预先分配的空间
typedef struct { 
    ElemType data[Maxsize]; // ElemType 是
    int length; // 顺序表的长度
}SqList;
```
动态分配：为数组申请空间，length 记录实际存储的元素个数，一旦空间不够用就再申请一块更大的空间，将原来数组中的数据放进去，然后再放后续存进来的数据而非在原来的地址上扩容。就像家里人多，房子太小，所以买一个新房子，然后搬家，而不是在原来的房子上进行扩建。

```cpp
#define Maxsize 100 
typedef int ElemType; 
typedef struct {
    ElemTyep *elem; // * 表示取地址中存放的内容
    int length; // 长度
}SqList;
```
# 顺序表的基本操作

## 初始化
思路：首先需要为数组申请空间，一旦申请失败就返回 false 反之 true ，申请成功后还需要将当前长度设置为 0 因为此时列表中还没有元素。

```cpp
bool InitList(SqList &L) {
    L.elem = new int[Maxsize];
    if (L.elem == NULL) return false;
    L.length = 0;
    return true;   
}
```

## 创建

思路：目的是为了将数据存入列表中，那么什么时候是输入结束？如果提前知道输入数据的个数的话就直接一个 for 循环即可，反之则需要设置一个特殊值，这里设置的是 -1 每次输入数据之前需要输入一个值来表明需要向数组中填入数据，一旦输入 -1 表明数据输入完了，不需要再填入即循环结束，例如 1 2 3 4 5 6 -1 输入填入数组中的值是 2 4 6 ，而1 3 5 -1 都是用来判断是否继续输入的，-1 则表示后面没有数据了，不输入。
在输入的同时还需要防止数组不能够越界，也就是每输入进去一个数据之前要判断数组空间是否还有剩余，如果空间以满就输出 false 反之 true 最终将数据输入其中，即可构建顺序表。

```cpp
bool CreateList(SqList &L) {
    int x, i = 0;
    cin >> x;
    while (x != -1) {
        if (L.length == Maxsize) {
            return false;
        }
        cin >> x;
        L.elem[i++] = x;
        L.length++;
        cin >> x;
    }
    return true;
}
```
## 取值
思路：首先需要判断当前数需要查找的值是否越界，越界的话就返回 false 反之取出数据即可，注意下标是从零开始。

```cpp
bool GetElement(SqList L, int i, int &a) {
    if (i < 1 || i > L.length) {
        return false;
    }
    a = L.elem[i - 1];
    return true;
}
```
## 查找
思路：判断列表中是否存在某个元素，如果存在就输出位置，反之输出 -1 ，遍历即可。

```cpp
int LocateElem(SqList L, int e) {
    for (int i = 0; i < L.length; i++) {
        if (L.elem[i] == e) {
            return i+1;
        }
    }
    return -1;
}
```


1. 插入
2. 删除

## 插入
思路：首先剩余空间是否能够容纳插入的元素，其次则是插入位置，插入之后后续位置上元素都要后移。那么函数签名则分别是列表，插入位置，插入元素。其次需要先移动元素，然后在放需要插入的元素，反之被插位置上的元素会被覆盖。注意需要先从尾部开始移动，否在元素会被覆盖。
```cpp
bool InsertElem(SqList L, int i,int e) {
    if (i < 1 || i > L.length) return false;
    for (int j = L.length-1; j >= i-1; j--) {
        L.elem[j + 1] = L.elem[j];
    }
    L.elem[i-1] = e;
    L.length++;
    return true;
}
```

## 删除
思路：首先判断范围，然后保存一下删除位置的变量，这个随意如果后续有用的话就保存反之不用。然后将原来位置的元素直接覆盖就行了，长度减一
```cpp
bool DeleteElem(SqList &L, int i,int &e){
    if (i < 1 || i > L.length) return false;
    e = L.elem[i-1];
    for (int j = i; j < L.length; j++) {
        L.elem[j - 1] = L.elem[j];
    }
    L.length--;
    return true;
}
```

# 单链表
在单链表中，存储数据的每一个单元不仅存储数据本身还存了下一个元素所在位置。也就是存在数据域和指针域，其中数据域存数据，指针域存下一个数据的位置。

随机存取：可以直接查出第位置上的元素，例如第五个元素的值直接访问即可。

顺序存取：不能直接访问，需要从第一个元素向后挨个找过去，例如第五个元素的值需要从第一个元素找第二个元素...直到找到第五个元素。

```cpp
typedef struct Lnode {
    ElemType data;
    struct Lnode *next;
} Lnode, Linklist;
```

# 单链表的基本操作

## 初始化
指向下一个节点的代码类似于递归调用，自己用自己。

```cpp
typedef struct LNode {
    ElemType data;
    struct LNode *next;
} LNode, *Linklist;
```
## 创建
创建分成两种方式，头插法和尾插法，头插法故名思意在每添加一个元素都加在原来链表的头部，尾插法则是插在链表尾部，但是最终建成后头插法是逆序的和实际的输入顺序相反，尾插法和实际顺序相同。

### 头插法

![](https://img.shields.io/github/stars/weijiew/codestep?color=%238e44ad&label=github&logoColor=%236c5ce7&style=social)
## 


# 双向链表

# 循环链表

# 应用

