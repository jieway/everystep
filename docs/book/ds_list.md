# 概念
线性表：由 n（n>0）个相同类型的数据元素组成的有限序列。有唯一的开始和结束，除了第一个元素外每一个元素都有唯一的直接前驱，除了最后一个元素外，每个元素都有唯一的直接后继。

线性表的存储方式：顺序存储（顺序表）和链式存储（链式表）。

# 顺序表
顺序表中元素的存储位置是连续的。所以定位迅速，但是插入和删除需要移动后续的元素导致比较费时间。

根据分配内存的方式，顺序表可以分为静态分配和动态分配两种类型。

静态分配：提前为定长的数组申请一块空间，数组的长度固定，但是如果后续的操作导致数组的空间不够用了，那就采用动态分配的方式。

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

思路：目的是为了将数据存入列表中，那么什么时候是输入结束？如果提前知道输入数据的个数的话就直接一个 for 循环即可，反之需要设置一个特殊值，这里设置的是 -1 一旦输出 -1 那么就是循环结束的标志，输出 true 即可，反之需要不断的输出。
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
2. 查找
3. 插入
4. 删除

# 单链表

# 双向链表

# 循环链表

# 应用

