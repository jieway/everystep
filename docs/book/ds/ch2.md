# 第二章：线性表

线性表的定义和基本操作。

## 1. 线性表的定义

**同类型元素**组成的**有限序列**，除首元素和尾元素外每个元素都有唯一前驱和唯一后继，首元素只有唯一后继，尾元素只有唯一前驱。

注意位序是从 1 开始，而数组下标是从 0 开始！

线性表的存储方式：顺序存储（顺序表）和链式存储（链式表）。

顺序存储采用数组实现，而数组可以采用静态数组和动态数组分别实现。

## 2. 顺序表

顺序表中元素的存储位置是连续的。所以定位迅速，但是插入和删除需要移动后续的元素导致比较费时间。

根据分配内存的方式，顺序表可以分为静态分配和动态分配两种类型。

静态分配：提前为定长的数组申请一块空间，数组的长度固定，但是如果后续的操作导致数组的空间不够用了，那就采用动态分配的方式。

顺序表操作简单，存储密度高，可以随机存取。但是需要预先分配空间，空间分配多了可能会导致浪费反之会导致溢出。如果需要经常插入或删除的话顺序表效率低，可以考虑链式存储。

```cpp
typedef int ElemType; // typedef 相当于取一个小名，使得 ElemType 等价于 int 
#define Maxsize 100 // 预先分配的空间
typedef struct { 
    ElemType data[Maxsize]; // ElemType 是自定义的
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
## 3. 顺序表的基本操作

### 3.1 初始化

思路：首先需要为数组申请空间，一旦申请失败就返回 false 反之 true ，申请成功后还需要将当前长度设置为 0 因为此时列表中还没有元素。

```cpp
bool InitList(SqList &L) {
    L.elem = new int[Maxsize];
    if (L.elem == NULL) return false;
    L.length = 0;
    return true;   
}
```

注意，初始化的时候实际上是需要初始化的（例如全部置 0 ）因为可能存在脏数据，也就是之前申请空间之时此处遗留下来的数据。其实问题就在于操作系统在删除数据之时不会讲数据全部置零，而是标记一下这块内存没用了，但是实际上是存有数据的，等待新数据存入之后将之覆盖。
### 3.2 创建

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
### 3.3 取值

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
### 3.4 查找
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

### 3.5 插入
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

### 3.6 删除
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

## 4. 单链表

单链表分为数据域和指针域，数据域用于存放当前节点所表示的数据，而指针域则用于表示指向下一个节点的地址。

定义方式如下，其中 typedef 是为了后续方便表示，不需要加 struct 关键字了。

```cpp
typedef struct LNode {
    ElemType data;
    struct LNode *next;
} LNode, *LinkList;
```

LNode 和 LinkList 本质上是等价的都表示指针，但是在意思表达上前者表示节点，而后者表示一个链表。
## 5. 单链表的基本操作

* 初始化单链表时分带头节点和不带头节点两种类型，其中带头节点的单链表写代码更为方便。

注意，每次创建链表需要创建一个头节点，这个头节点的数据域什么都不存，目的是为了方便创建链表。每次遍历链表都从头节点开始，所以头节点很重要，头节点没了。这个链表就找不到了，而头插法则是在头节点和剩余节点之间插入。

- 例如起始部分只有头节点一个，那么直接插在头节点尾部即可。
- 当插入第二个元素之时依旧插在头节点之后紧邻头节点，第二个元素的指针域则指向第一个元素。
- 当插入第三个元素之时依旧插在头节点之后并且紧邻头节点，其指针域指向第第二个元素。
- 后续的依次，就这样，但是链表开始的位置以及是从头节点，所以头插法相当于将输入的数据逆序了。

```cpp
void CreateList_H(Linklist &L) {
    int n;
    Linklist s;
    L = new LNode;
    L->next = NULL;
    cout << "Please enter the number of elements" << endl;
    cin >> n;
    cout << "Please enter every element" << endl;
    while (n--) {
        s = new LNode;
        cin >> s->data;
        s->next = L->next;
        L->next = s;
    }
}
```

### 5.1 尾插法

尾插法是一直插在尾部，注意和头插法不同，注意需要新加一个指针 r （尾指针） ，参与迭代，头指针不能动，动了以后就找不到头就没了，需要将头部地址保存，要么自己不参与迭代复制一份给 r ，让 r 参与迭代，要么自己参与之前复制一份留在那。也就是头节点不能丢了，和头插法不同，头插法的头节点是一直不动的，新加进来的数据一指插在头节点之后！
- 例如插入第一个数据的之前，先将头节点复制一份，也就是指针 r 指向头节点 L，
- 当插入第一个数据之时指针 r 的指针域指向新数据 s，之后 r 本身再指向 s，完成了一次插入。注意因为 r 的存在头指针 L 一直没有动，所以保留了下来使得这个链表没有丢失。
- 插入第二个数据之时，r 的指针域指向新数据，而 r 本身在再指向新数据，注意每一次插入新数据后 r 一直在链表的尾部，所以也称尾指针。

```cpp
void CreateList_R(Linklist &L) {
    int n;
    Linklist s, r;
    L = new LNode;
    L->next = NULL;
    r = L;
    cout << "please input the number of elements" << endl;
    cin >> n;
    cout << "please input every elements" << endl;
    while (n--) {
        s = new LNode;
        cin >> s->data;
        s->next = NULL;
        r->next = s;
        r = s;
    }
}
```

### 5.2 取值

注意头指针非常重要，上面提过，丢失后就相当于整个链表都找不到了。所以不可改动最好提前备份。
思路：为了去某个位置的值，所以需要从头节点开始遍历。直到遍历到目标位置结束输出。注意遍历的过程中需要时刻判断链表遍历完全，如果遍历完了还没有到位置说明这个位置越界。

```cpp
bool GetElem_L(Linklist L,int i, int &e) {
    Linklist p = L->next;
    int j = 1;
    while (j < i && p == NULL) {
        p = p->next;
        j++;
    }
    if (j > i || p == NULL) return false;
    e = p->data;
    return true;
}
```

### 5.3 查找

遍历一遍即可。
```cpp
bool LocateElem_L(Linklist L,int e) {
    Linklist p = L->next;
    while (p != NULL) {
        if (p->data == e) return true;
        p = p->next;
    }
    return false;
}
```
### 5.4 插入

思路：遍历到位置后插入即可，注意指针的顺序。

```cpp
bool ListInsert_L(Linklist& L,int i ,int e) {
    int j = 1;
    Linklist p = L, s;
    while(p != NULL && j < i) {
        p = p->next;
        j++;
    }
    if (p == NULL || j > i) return false;
    s = new LNode;
    s->data = e;
    s->next = p->next;
    p->next = s;
    return true;
}
```

### 5.5 删除

注意顺序

```cpp
bool ListDelete_L(Linklist &L, int i) {
    Linklist p, q;
    p = L;
    int j = 0;
    while (j < i-1 && p->next != NULL) {
        p = p->next;
        j++;
    }
    if (j > i - 1  || p->next == NULL) return false;
    q = p->next;
    p-> next = q->next;
    delete q;
    return true;
}
```
## 6. 双向链表

单链表只有两个域，数据域和指针域，而双向链表在此基础上又增加了一个指针域，但是这个指针指向的是前一个节点的地址。

所以双向链表不仅可以现后还可以向前操作。数据结构如下。定义时加了一个指向前驱节点的指针。

```cpp
typedef struct DuLinklist {
    ElemType data;
    struct DuLinklist *prior *next;
} DuLnode, *DuLinklist;
```
## 7. 循环链表

循环链表是首尾相接，最后一个节点的指针指向头节点，这样从任何一个节点出发都可以遍历全部节点。

因为最后一个节点的指针指向头节点，所以当单链表为空的时候，头节点的指针域指向其本身。

而双向链表的头指针要指向前一个节点，同样当表为空的时候双向链表的头指针指向本身。即 `L->next = L->prior = L`

循环单链表对于需要频繁访问头节点和尾节点的操作比较友好，前提是令头指针始终指向尾节点。

因为如果令头指针始终指向尾节点的话，直接访问下一个节点就可以达到访问头节点的目的。


## 8. 循环双链表

循环双链表是在双链表的基础上构成的，双链表的尾节点的尾指针指向了头节点，而头节点的前驱指针指向了尾巴节点，最终形成了收尾相连的情况。

初始化的时候，因为只有一个节点，所以该节点的前驱指针和后继指针都是指向自己。因为自己即时头节点又是尾节点。

## 9. 静态链表

静态链表的内存空间是连续的，而单链表在内存中散乱分布。

静态链表可以采用数组来实现。存在两种定义方式，本质是相同的。

```cpp
#define Maxsize 100
struct Node {
    int data;
    int next;
}
typedef struct {
    int data;
    int next;
}SLinkList[Maxsize];
```

优点：增删操作不需要大量移动元素。

缺点：不能随机存取，只能从头节点开始依次往后查找，容量固定不可变！

可用于操作系统的 FAT 分配表。

## 10. 顺序表和单链表的比较

1. 逻辑结构：二者都是线性结构。
2. 存储结构：顺序表支持随机存取，采用整块的内存且不要单独存储指向下一个地址的指针所以存储密度高。但是改查不方便。而链表改查方便，适用于离散的小空间，但不可随机存取，并且因为需要存储指针所以存储密度低。
3. 创建，销毁，插入，删除，查找。
   1. 创建：
   2. 销毁：如果顺序表的数组是静态数组，那么这块空间由操作系统自动回收。如果是动态数组，那么需要手动 free 。链表申请的节点也需要手动 free 。
   3. 插入，删除：顺序表和链表对于插入和删除操作的平均时间复杂度都是 $O(n)$ 。但是对于前者而言时间消耗在了移动元素上，对于后者而言时间消耗在了查找元素上。实际情况中，后者耗时要少，因为和查找相比移动操作的时间开销大。
   4. 查找：查找分为按位查找和按值查找，对于顺序表而言按位查找显然是 $O(1)$ ，对于单链表而言则是 $O(n)$。对于单链表而言都是 $O(n)$ 。但是对于顺序表而言，如果有序可以采用二分查找等操作将时间复杂度压缩的 $O(log2^N)$ ，但是链表不行！

链表：表长难以估计，增加删除操作多。

顺序表：表厂可以估计，查询操作较多。

> 写于 2021/01/23 12:33