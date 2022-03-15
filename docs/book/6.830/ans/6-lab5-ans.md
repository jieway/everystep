# Lab 5: B+ Tree Index

了解 B+ 树。

BTreeFile 由四种不同的页面组成，

* BTreeInternalPage.java 内部页
* BTreeLeafPage.java 叶子页
* BTreePage.java 包含了叶子页和内部页的共同代码
* BTreeHeaderPage.java 跟踪文件中哪些页正在使用

## Exercise 1: BTreeFile.findLeafPage()

在 BTreeFile.java 中实现 findLeafPage() 方法，功能是给定一个特定的键值的情况下找到合适的叶子页。

具体流程如下图：根节点是 6 是一个内部页，两个指针分别指向了叶子页。如果输入 1 那么 findLeafPage() 应当返回第一个叶子页。如果输入 8 那么应当返回第二个叶子页。如果输入 6 此时左右叶子页都含有 6 ，函数应当返回第一个叶子页，也就是左边的叶子页。

![](image/index/1644485406419.png)

findLeafPage() 递归搜索节点，节点内部的数据可以通过 BTreeInternalPage.iterator() 访问。

当 key value 为空的时候，应当递归做左边的子页进而找到最左边的叶子页。BTreePageId.java中的pgcateg() 函数检查页面的类型。可以假设只有叶子页和内部页会被传递给这个函数。

BTreeFile.getPage() 和 BufferPool.getPage() 原理一样但需要一个额外的参数来跟踪脏页。

findLeafPage() 访问的每一个内部（非叶子）页面都应该以 READ_ONLY 权限获取，除了返回的叶子页面，它应该以作为函数参数提供的权限获取。这些权限在本实验中不重要但是后续实验中很重要。

> 这个练习很简单，上面的内容本来是文档的总结，后来发现几乎就是代码的文字版。。。

通过 BTreeFileReadTest.java 中的所有单元测试和 BTreeScanTest.java 中的系统测试。

## Exercise 2: Splitting Pages

在 BTreeFile.java 中实现 splitLeafPage() 和 splitInternalPage() 并通过 BTreeFileInsertTest.java 中的单元测试和 systemtest/BTreeFileInsertTest.java 中的系统测试。

通过 findLeafPage() 可以找到应该插入 tuple 的正确叶子页，但是页满的情况下插入 tuple 可能会导致页分裂，进而导致父节点分裂也就是递归分裂。

如果被分割的页面是根页面，你将需要创建一个新的内部节点来成为新的根页面，并更新 BTreeRootPtrPage
否则，需要以 READ_WRITE 权限获取父页，进行递归分割，并添加一个 entry。getParentWithEmptySlots()对于处理这些不同的情况非常有用。

在 splitLeafPage() 中将键“复制”到父页上，页节点中保留一份。而在 splitInternalPage() 中，你应该将键“推”到父页上，内部节点不保留。

当内部节点被分割时，需要更新所有被移动的子节点的父指针。updateParentPointers() 很有用。

每当创建一个新的页面时，无论是因为拆分一个页面还是创建一个新的根页面，都要调用 getEmptyPage() 来获取新的页面。这是一个抽象函数，它将允许我们重新使用因合并而被删除的页面（在下一节涉及）。

BTreeLeafPage.iterator() 和 BTreeInternalPage.iterator() 实现了叶子页和内部页进行交互，除此之外还提供了反向迭代器 BTreeLeafPage.reverseIterator() 和 BTreeInternalPage.reverseIterator() 。

BTreeEntry.java 中有一个 key 和两个 child pointers ，除此之外还有一个 recordId 用于识别底层页面上键和子指针的位置。

## Exercise 3: Redistributing pages

实现 BTreeFile.stealFromLeafPage(), BTreeFile.stealFromLeftInternalPage(), BTreeFile.stealFromRightInternalPage() 并通过 BTreeFileDeleteTest.java 中的一些单元测试（如testStealFromLeftLeafPage和testStealFromRightLeafPage）

删除存在两种情况，如果兄弟节点数据比较多可以从兄弟节点借，反之数据较少可以和兄弟节点合并。

stealFromLeafPage() 两个页面 tuple 加一起然后除二，平均分成两个 leaf page 。

## Exercise 4: Merging pages

实现 BTreeFile.mergeLeafPages() 和 BTreeFile.mergeInternalPages() 。

现在应该能够通过 BTreeFileDeleteTest.java 中的所有单元测试和 systemtest/BTreeFileDeleteTest.java 中的系统测试。

