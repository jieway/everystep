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
## 顺序表的基本操作

### 初始化
思路：首先需要为数组申请空间，一旦申请失败就返回 false 反之 true ，申请成功后还需要将当前长度设置为 0 因为此时列表中还没有元素。

```cpp
bool InitList(SqList &L) {
    L.elem = new int[Maxsize];
    if (L.elem == NULL) return false;
    L.length = 0;
    return true;   
}
```

### 创建

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
### 取值
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
### 查找
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

### 插入
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

### 删除
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
} Lnode, *Linklist;
```
## 单链表的基本操作

### 初始化
指向下一个节点的代码类似于递归调用，自己用自己。

```cpp
typedef struct LNode {
    ElemType data;
    struct LNode *next;
} LNode, *Linklist;
```

### 创建
创建分成两种方式，头插法和尾插法，头插法故名思意在每添加一个元素都加在原来链表的头部，尾插法则是插在链表尾部，但是最终建成后头插法是逆序的和实际的输入顺序相反，尾插法和实际顺序相同。

#### 头插法
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

#### 尾插法
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



### 取值
注意头指非常重要，上面提过，丢失后就相当于整个链表都找不到了。所以不可改动最好提前备份。
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

### 查找
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
### 插入
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

### 删除
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



# 双向链表
单链表只有两个域，数据域和指针域，而双向链表在此基础上又增加了一个指针域，但是这个指针指向的是前一个节点的地址。

所以双向链表不仅可以现后还可以向前操作。数据结构如下。定义时加了一个指向前驱节点的指针。

```cpp
typedef struct DuLinklist {
    ElemType data;
    struct DuLinklist *prior *next;
} DuLnode, *DuLinklist;
```
## 双向链表的基本操作

### 初始化
申请一个节点，申请失败就返回 false 反之 true 注意申请成功后需要将前后指针域置空。

```cpp
bool InitList_L(DuLinklist &L) {
    L = new DuLNode;
    if (L == NULL) return false;
    L->prior = NULL;
    L->next = NULL;
    return true;
}
```

### 创建
双线链表依旧有头插法和尾插法两种创建方式。
#### 头插法
注意头插法创建后的顺序依旧是逆序。

取值和查找同单链表类似。
```cpp
void CreateDuList_H(DuLinkList &L)
{
	int n;
	DuLinkList s;
	L=new DuLNode;
	L->prior=L->next=NULL; 
	cout << "请输入元素个数n：" << endl;
	cin >> n;
	cout << "请依次输入n个元素：" << endl;
	cout << "前插法创建单链表..." << endl;
	while(n--)
    {
		s=new DuLNode;
		cin>> s->data;
		if(L->next)
            L->next->prior=s;
        s->next=L->next;
        s->prior=L;
        L->next=s; 
	}
}
```
### 插入

```cpp
bool ListInsert_L(DuLinkList &L,int i,int &e)//双向链表的插入
{
	//在带头结点的单链表L中第i个位置之前插入值为e的新结点
	int j;
	DuLinkList p, s;
	p=L;
	j=0;
	while(p&&j<i) //查找第i个结点，p指向该结点
    {
		p=p->next;
		j++;
	}
	if(!p||j>i)//i＞n+1或者i＜1
		return false;
	s=new DuLNode;     //生成新结点
	s->data=e;       //将新结点的数据域置为e
	p->prior->next=s;
	s->prior=p->prior;
	s->next=p;
	p->prior=s;
	return true;
}
```
### 删除
```cpp
bool ListDelete_L(DuLinkList &L,int i) 
{
	DuLinkList p;
	int j;
	p=L;
	j=0;
	while(p&&(j<i)) 
	{
		p=p->next;
		j++;
	}
	if(!p||(j>i))
		return false;
    if(p->next) 
        p->next->prior=p->prior;
	p->prior->next=p->next;
	delete p;   
	return true;
}
```
# 循环链表
循环链表是首尾相接，最后一个节点的指针指向头节点，这样从任何一个节点出发都可以遍历全部节点。

因为最后一个节点的指针指向头节点，所以当单链表为空的时候，头节点的指针域指向其本身。

而双向链表的头指针要指向前一个节点，同样当表为空的时候双向链表的头指针指向本身。即 `L->next = L->prior = L`

# 线性表的应用
## 合并有序顺序表

## 合并有序链表

## 就地逆置单链表

## 查找链表的中间节点

## 删除链表的重复元素

# 顺序表和单链表的比较
* 空间方面，顺序表是提前分配，多了会浪费少了会溢出。而单链表则是动态分配有多少用多少。
* 时间方面，顺序表是随机存取，时间复杂度 $O(1)$ ，但是插入删除为$O(n)$ 单链表的时间复杂度 $O(n)$，但是插入删除为 $O(n)$

# 题目

|                题目                 | 难度  |      语言       |
| :---------------------------------: | :---: | :-------------: |
| [Leetcode-206](alg/Leetcode-206.md) |   💗   | cpp Java Python |
|  [Leetcode-24](alg/Leetcode-24.md)  |  💗💗   | cpp Java Python |
| [Leetcode-160](alg/Leetcode-160.md) |  💗💗   |    cpp Java     |
|  [Leetcode-21](alg/Leetcode-21.md)  |  💗💗   |    cpp Java     |
|  [Leetcode-83](alg/Leetcode-83.md)  |  💗💗   |       cpp       |
|  [Leetcode-19](alg/Leetcode-19.md)  |  💗💗   |   cpp   Java    |
| [Leetcode-234](alg/Leetcode-234.md) |  💗💗   |    cpp  Java    |
|  [❌Leetcode-2](alg/Leetcode-2.md)   |  💗💗   |       cpp       |
|  [❌Leetcode-7](alg/Leetcode-7.md)   |  💗💗   |       cpp       |
|  [❌Leetcode-9](alg/Leetcode-9.md)   |  💗💗   |       cpp       |
| [❌Leetcode-10](alg/Leetcode-10.md)  |  💗💗   |       cpp       |



# 链表

## 基本技能

链表相关的核心点

- null/nil 异常处理
- dummy node 哑巴节点
- 快慢指针
- 插入一个节点到排序链表
- 从一个链表中移除一个节点
- 翻转链表
- 合并两个链表
- 找到链表的中间节点

## 常见题型

### [remove-duplicates-from-sorted-list](https://leetcode-cn.com/problems/remove-duplicates-from-sorted-list/)

> 给定一个排序链表，删除所有重复的元素，使得每个元素只出现一次。

```go
func deleteDuplicates(head *ListNode) *ListNode {
    current := head
    for current != nil {
        // 全部删除完再移动到下一个元素
        for current.Next != nil && current.Val == current.Next.Val {
            current.Next = current.Next.Next
        }
        current = current.Next
    }
    return head
}
```

### [remove-duplicates-from-sorted-list-ii](https://leetcode-cn.com/problems/remove-duplicates-from-sorted-list-ii/)

> 给定一个排序链表，删除所有含有重复数字的节点，只保留原始链表中   没有重复出现的数字。

思路：链表头结点可能被删除，所以用 dummy node 辅助删除

```go
func deleteDuplicates(head *ListNode) *ListNode {
    if head == nil {
        return head
    }
    dummy := &ListNode{Val: 0}
    dummy.Next = head
    head = dummy

    var rmVal int
    for head.Next != nil && head.Next.Next != nil {
        if head.Next.Val == head.Next.Next.Val {
            // 记录已经删除的值，用于后续节点判断
            rmVal = head.Next.Val
            for head.Next != nil && head.Next.Val == rmVal  {
                head.Next = head.Next.Next
            }
        } else {
            head = head.Next
        }
    }
    return dummy.Next
}
```

注意点
• A->B->C 删除 B，A.next = C
• 删除用一个 Dummy Node 节点辅助（允许头节点可变）
• 访问 X.next 、X.value 一定要保证 X != nil

### [reverse-linked-list](https://leetcode-cn.com/problems/reverse-linked-list/)

> 反转一个单链表。

思路：用一个 prev 节点保存向前指针，temp 保存向后的临时指针

```go
func reverseList(head *ListNode) *ListNode {
    var prev *ListNode
    for head != nil {
        // 保存当前head.Next节点，防止重新赋值后被覆盖
        // 一轮之后状态：nil<-1 2->3->4
        //              prev   head
        temp := head.Next
        head.Next = prev
        // pre 移动
        prev = head
        // head 移动
        head = temp
    }
    return prev
}
```

### [reverse-linked-list-ii](https://leetcode-cn.com/problems/reverse-linked-list-ii/)

> 反转从位置  *m*  到  *n*  的链表。请使用一趟扫描完成反转。

思路：先遍历到 m 处，翻转，再拼接后续，注意指针处理

```go
func reverseBetween(head *ListNode, m int, n int) *ListNode {
    // 思路：先遍历到m处，翻转，再拼接后续，注意指针处理
    // 输入: 1->2->3->4->5->NULL, m = 2, n = 4
    if head == nil {
        return head
    }
    // 头部变化所以使用dummy node
    dummy := &ListNode{Val: 0}
    dummy.Next = head
    head = dummy
    // 最开始：0->1->2->3->4->5->nil
    var pre *ListNode
    var i = 0
    for i < m {
        pre = head
        head = head.Next
        i++
    }
    // 遍历之后： 1(pre)->2(head)->3->4->5->NULL
    // i = 1
    var j = i
    var next *ListNode
    // 用于中间节点连接
    var mid = head
    for head != nil && j <= n {
        // 第一次循环： 1 nil<-2 3->4->5->nil
        temp := head.Next
        head.Next = next
        next = head
        head = temp
        j++
    }
    // 循环需要执行四次
    // 循环结束：1 nil<-2<-3<-4 5(head)->nil
    pre.Next = next
    mid.Next = head
    return dummy.Next
}
```

### [merge-two-sorted-lists](https://leetcode-cn.com/problems/merge-two-sorted-lists/)

> 将两个升序链表合并为一个新的升序链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。

思路：通过 dummy node 链表，连接各个元素

```go
func mergeTwoLists(l1 *ListNode, l2 *ListNode) *ListNode {
    dummy := &ListNode{Val: 0}
    head := dummy
    for l1 != nil && l2 != nil {
        if l1.Val < l2.Val {
            head.Next = l1
            l1 = l1.Next
        } else {
            head.Next = l2
            l2 = l2.Next
        }
        head = head.Next
    }
    // 连接l1 未处理完节点
    for l1 != nil {
        head.Next = l1
        head = head.Next
        l1 = l1.Next
    }
    // 连接l2 未处理完节点
    for l2 != nil {
        head.Next = l2
        head = head.Next
        l2 = l2.Next
    }
    return dummy.Next
}
```

### [partition-list](https://leetcode-cn.com/problems/partition-list/)

> 给定一个链表和一个特定值 x，对链表进行分隔，使得所有小于  *x*  的节点都在大于或等于  *x*  的节点之前。

思路：将大于 x 的节点，放到另外一个链表，最后连接这两个链表

```go
func partition(head *ListNode, x int) *ListNode {
    // 思路：将大于x的节点，放到另外一个链表，最后连接这两个链表
    // check
    if head == nil {
        return head
    }
    headDummy := &ListNode{Val: 0}
    tailDummy := &ListNode{Val: 0}
    tail := tailDummy
    headDummy.Next = head
    head = headDummy
    for head.Next != nil {
        if head.Next.Val < x {
            head = head.Next
        } else {
            // 移除<x节点
            t := head.Next
            head.Next = head.Next.Next
            // 放到另外一个链表
            tail.Next = t
            tail = tail.Next
        }
    }
    // 拼接两个链表
    tail.Next = nil
    head.Next = tailDummy.Next
    return headDummy.Next
}
```

哑巴节点使用场景

> 当头节点不确定的时候，使用哑巴节点

### [sort-list](https://leetcode-cn.com/problems/sort-list/)

> 在  *O*(*n* log *n*) 时间复杂度和常数级空间复杂度下，对链表进行排序。

思路：归并排序，找中点和合并操作

```go
func sortList(head *ListNode) *ListNode {
    // 思路：归并排序，找中点和合并操作
    return mergeSort(head)
}
func findMiddle(head *ListNode) *ListNode {
    // 1->2->3->4->5
    slow := head
    fast := head.Next
    // 快指针先为nil
    for fast !=nil && fast.Next != nil {
        fast = fast.Next.Next
        slow = slow.Next
    }
    return slow
}
func mergeTwoLists(l1 *ListNode, l2 *ListNode) *ListNode {
    dummy := &ListNode{Val: 0}
    head := dummy
    for l1 != nil && l2 != nil {
        if l1.Val < l2.Val {
            head.Next = l1
            l1 = l1.Next
        } else {
            head.Next = l2
            l2 = l2.Next
        }
        head = head.Next
    }
    // 连接l1 未处理完节点
    for l1 != nil {
        head.Next = l1
        head = head.Next
        l1 = l1.Next
    }
    // 连接l2 未处理完节点
    for l2 != nil {
        head.Next = l2
        head = head.Next
        l2 = l2.Next
    }
    return dummy.Next
}
func mergeSort(head *ListNode) *ListNode {
    // 如果只有一个节点 直接就返回这个节点
    if head == nil || head.Next == nil{
        return head
    }
    // find middle
    middle := findMiddle(head)
    // 断开中间节点
    tail := middle.Next
    middle.Next = nil
    left := mergeSort(head)
    right := mergeSort(tail)
    result := mergeTwoLists(left, right)
    return result
}
```

注意点

- 快慢指针 判断 fast 及 fast.Next 是否为 nil 值
- 递归 mergeSort 需要断开中间节点
- 递归返回条件为 head 为 nil 或者 head.Next 为 nil

### [reorder-list](https://leetcode-cn.com/problems/reorder-list/)

> 给定一个单链表  *L*：*L*→*L*→…→*L\_\_n*→*L*
> 将其重新排列后变为： *L*→*L\_\_n*→*L*→*L\_\_n*→*L*→*L\_\_n*→…

思路：找到中点断开，翻转后面部分，然后合并前后两个链表

```go
func reorderList(head *ListNode)  {
    // 思路：找到中点断开，翻转后面部分，然后合并前后两个链表
    if head == nil {
        return
    }
    mid := findMiddle(head)
    tail := reverseList(mid.Next)
    mid.Next = nil
    head = mergeTwoLists(head, tail)
}
func findMiddle(head *ListNode) *ListNode {
    fast := head.Next
    slow := head
    for fast != nil && fast.Next != nil {
        fast = fast.Next.Next
        slow = slow.Next
    }
    return slow
}
func mergeTwoLists(l1 *ListNode, l2 *ListNode) *ListNode {
    dummy := &ListNode{Val: 0}
    head := dummy
    toggle := true
    for l1 != nil && l2 != nil {
        // 节点切换
        if toggle {
            head.Next = l1
            l1 = l1.Next
        } else {
            head.Next = l2
            l2 = l2.Next
        }
        toggle = !toggle
        head = head.Next
    }
    // 连接l1 未处理完节点
    for l1 != nil {
        head.Next = l1
        head = head.Next
        l1 = l1.Next
    }
    // 连接l2 未处理完节点
    for l2 != nil {
        head.Next = l2
        head = head.Next
        l2 = l2.Next
    }
    return dummy.Next
}
func reverseList(head *ListNode) *ListNode {
    var prev *ListNode
    for head != nil {
        // 保存当前head.Next节点，防止重新赋值后被覆盖
        // 一轮之后状态：nil<-1 2->3->4
        //              prev   head
        temp := head.Next
        head.Next = prev
        // pre 移动
        prev = head
        // head 移动
        head = temp
    }
    return prev
}
```

### [linked-list-cycle](https://leetcode-cn.com/problems/linked-list-cycle/)

> 给定一个链表，判断链表中是否有环。

思路：快慢指针，快慢指针相同则有环，证明：如果有环每走一步快慢指针距离会减 1
![fast_slow_linked_list](https://img.fuiboom.com/img/fast_slow_linked_list.png)

```go
func hasCycle(head *ListNode) bool {
    // 思路：快慢指针 快慢指针相同则有环，证明：如果有环每走一步快慢指针距离会减1
    if head == nil {
        return false
    }
    fast := head.Next
    slow := head
    for fast != nil && fast.Next != nil {
        if fast.Val == slow.Val {
            return true
        }
        fast = fast.Next.Next
        slow = slow.Next
    }
    return false
}
```

### [linked-list-cycle-ii](https://leetcode-cn.com/problems/https://leetcode-cn.com/problems/linked-list-cycle-ii/)

> 给定一个链表，返回链表开始入环的第一个节点。  如果链表无环，则返回  `null`。

思路：快慢指针，快慢相遇之后，慢指针回到头，快慢指针步调一致一起移动，相遇点即为入环点
![cycled_linked_list](https://img.fuiboom.com/img/cycled_linked_list.png)

```go
func detectCycle(head *ListNode) *ListNode {
    // 思路：快慢指针，快慢相遇之后，慢指针回到头，快慢指针步调一致一起移动，相遇点即为入环点
    if head == nil {
        return head
    }
    fast := head.Next
    slow := head

    for fast != nil && fast.Next != nil {
        if fast == slow {
            // 慢指针重新从头开始移动，快指针从第一次相交点下一个节点开始移动
            fast = head
            slow = slow.Next // 注意
            // 比较指针对象（不要比对指针Val值）
            for fast != slow {
                fast = fast.Next
                slow = slow.Next
            }
            return slow
        }
        fast = fast.Next.Next
        slow = slow.Next
    }
    return nil
}
```

坑点

- 指针比较时直接比较对象，不要用值比较，链表中有可能存在重复值情况
- 第一次相交后，快指针需要从下一个节点开始和头指针一起匀速移动

另外一种方式是 fast=head,slow=head

```go
func detectCycle(head *ListNode) *ListNode {
    // 思路：快慢指针，快慢相遇之后，其中一个指针回到头，快慢指针步调一致一起移动，相遇点即为入环点
    // nb+a=2nb+a
    if head == nil {
        return head
    }
    fast := head
    slow := head

    for fast != nil && fast.Next != nil {
        fast = fast.Next.Next
        slow = slow.Next
        if fast == slow {
            // 指针重新从头开始移动
            fast = head
            for fast != slow {
                fast = fast.Next
                slow = slow.Next
            }
            return slow
        }
    }
    return nil
}
```

这两种方式不同点在于，**一般用 fast=head.Next 较多**，因为这样可以知道中点的上一个节点，可以用来删除等操作。

- fast 如果初始化为 head.Next 则中点在 slow.Next
- fast 初始化为 head,则中点在 slow

### [palindrome-linked-list](https://leetcode-cn.com/problems/palindrome-linked-list/)

> 请判断一个链表是否为回文链表。

```go
func isPalindrome(head *ListNode) bool {
    // 1 2 nil
    // 1 2 1 nil
    // 1 2 2 1 nil
    if head==nil{
        return true
    }
    slow:=head
    // fast如果初始化为head.Next则中点在slow.Next
    // fast初始化为head,则中点在slow
    fast:=head.Next
    for fast!=nil&&fast.Next!=nil{
        fast=fast.Next.Next
        slow=slow.Next
    }

    tail:=reverse(slow.Next)
    // 断开两个链表(需要用到中点前一个节点)
    slow.Next=nil
    for head!=nil&&tail!=nil{
        if head.Val!=tail.Val{
            return false
        }
        head=head.Next
        tail=tail.Next
    }
    return true

}

func reverse(head *ListNode)*ListNode{
    // 1->2->3
    if head==nil{
        return head
    }
    var prev *ListNode
    for head!=nil{
        t:=head.Next
        head.Next=prev
        prev=head
        head=t
    }
    return prev
}
```

### [copy-list-with-random-pointer](https://leetcode-cn.com/problems/copy-list-with-random-pointer/)

> 给定一个链表，每个节点包含一个额外增加的随机指针，该指针可以指向链表中的任何节点或空节点。
> 要求返回这个链表的 深拷贝。

思路：1、hash 表存储指针，2、复制节点跟在原节点后面

```go
func copyRandomList(head *Node) *Node {
	if head == nil {
		return head
	}
	// 复制节点，紧挨到到后面
	// 1->2->3  ==>  1->1'->2->2'->3->3'
	cur := head
	for cur != nil {
		clone := &Node{Val: cur.Val, Next: cur.Next}
		temp := cur.Next
		cur.Next = clone
		cur = temp
	}
	// 处理random指针
	cur = head
	for cur != nil {
		if cur.Random != nil {
			cur.Next.Random = cur.Random.Next
		}
		cur = cur.Next.Next
	}
	// 分离两个链表
	cur = head
	cloneHead := cur.Next
	for cur != nil && cur.Next != nil {
		temp := cur.Next
		cur.Next = cur.Next.Next
		cur = temp
	}
	// 原始链表头：head 1->2->3
	// 克隆的链表头：cloneHead 1'->2'->3'
	return cloneHead
}
```

## 总结

链表必须要掌握的一些点，通过下面练习题，基本大部分的链表类的题目都是手到擒来~

- null/nil 异常处理
- dummy node 哑巴节点
- 快慢指针
- 插入一个节点到排序链表
- 从一个链表中移除一个节点
- 翻转链表
- 合并两个链表
- 找到链表的中间节点

## 练习

- [ ] [remove-duplicates-from-sorted-list](https://leetcode-cn.com/problems/remove-duplicates-from-sorted-list/)
- [ ] [remove-duplicates-from-sorted-list-ii](https://leetcode-cn.com/problems/remove-duplicates-from-sorted-list-ii/)
- [ ] [reverse-linked-list](https://leetcode-cn.com/problems/reverse-linked-list/)
- [ ] [reverse-linked-list-ii](https://leetcode-cn.com/problems/reverse-linked-list-ii/)
- [ ] [merge-two-sorted-lists](https://leetcode-cn.com/problems/merge-two-sorted-lists/)
- [ ] [partition-list](https://leetcode-cn.com/problems/partition-list/)
- [ ] [sort-list](https://leetcode-cn.com/problems/sort-list/)
- [ ] [reorder-list](https://leetcode-cn.com/problems/reorder-list/)
- [ ] [linked-list-cycle](https://leetcode-cn.com/problems/linked-list-cycle/)
- [ ] [linked-list-cycle-ii](https://leetcode-cn.com/problems/https://leetcode-cn.com/problems/linked-list-cycle-ii/)
- [ ] [palindrome-linked-list](https://leetcode-cn.com/problems/palindrome-linked-list/)
- [ ] [copy-list-with-random-pointer](https://leetcode-cn.com/problems/copy-list-with-random-pointer/)
