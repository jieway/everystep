# Lab 5 翻译
Assigned: Wednesday, April 21, 2021
Due: Tuesday, May 4, 2021 11:59 PM EDT

## 0. Introduction
In this lab you will implement a B+ tree index for efficient lookups and range scans. We supply you with all of the low-level code you will need to implement the tree structure. You will implement searching, splitting pages, redistributing tuples between pages, and merging pages.

在这个实验中，你将实现一个B+树形索引，用于高效的查找和范围扫描。我们为你提供了实现树形结构所需的所有底层代码。你将实现搜索、拆分页面、在页面之间重新分配 tuple 以及合并页面。

You may find it helpful to review sections 10.3--10.7 in the textbook, which provide detailed information about the structure of B+ trees as well as pseudocode for searches, inserts and deletes.

你可能会发现复习教科书中的第10.3--10.7节很有帮助，这些章节提供了关于B+树结构的详细信息，以及搜索、插入和删除的伪代码。

As described by the textbook and discussed in class, the internal nodes in B+ trees contain multiple entries, each consisting of a key value and a left and a right child pointer. Adjacent keys share a child pointer, so internal nodes containing m keys have m+1 child pointers. Leaf nodes can either contain data entries or pointers to data entries in other database files. For simplicity, we will implement a B+tree in which the leaf pages actually contain the data entries. Adjacent leaf pages are linked together with right and left sibling pointers, so range scans only require one initial search through the root and internal nodes to find the first leaf page. Subsequent leaf pages are found by following right (or left) sibling pointers.

正如教科书所描述的和课堂上讨论的，B+树的内部节点包含多个条目，每个条目由一个键值和一个左、右子指针组成。相邻的键共享一个子指针，所以包含m个键的内部节点有m+1个子指针。叶子节点可以包含数据条目或指向其他数据库文件的数据条目的指针。为了简单起见，我们将实现一个B+树，其中叶子页实际上包含数据条目。相邻的叶子页用左右的同级指针连接在一起，所以范围扫描只需要通过根节点和内部节点进行一次初始搜索就可以找到第一个叶子页。随后的叶子页是通过跟随右（或左）同级指针找到的。

## 1. Getting started

You should begin with the code you submitted for Lab 4 (if you did not submit code for Lab 4, or your solution didn't work properly, contact us to discuss options). Additionally, we are providing extra source and test files for this lab that are not in the original code distribution you received.

你应该从你为实验4提交的代码开始（如果你没有为实验4提交代码，或者你的解决方案没有正常工作，请与我们联系，讨论各种方案）。此外，我们还为这个实验提供了额外的源文件和测试文件，这些文件不在你收到的原始代码分发中。

You will need to add these new files to your release and set up your lab4 branch. The easiest way to do this is to change to your project directory (probably called simple-db-hw), set up the branch, and pull from the master GitHub repository:

你需要把这些新文件添加到你的版本中，并建立你的lab4分支。最简单的方法是切换到你的项目目录（可能叫simple-db-hw），建立分支，然后从GitHub的主仓库拉取。

    $ cd simple-db-hw $ git pull upstream master

## 2. Search

Take a look at index/ and BTreeFile.java. This is the core file for the implementation of the B+Tree and where you will write all your code for this lab. Unlike the HeapFile, the BTreeFile consists of four different kinds of pages. As you would expect, there are two different kinds of pages for the nodes of the tree: internal pages and leaf pages. Internal pages are implemented in BTreeInternalPage.java, and leaf pages are implemented in BTreeLeafPage.java. For convenience, we have created an abstract class in BTreePage.java which contains code that is common to both leaf and internal pages. In addition, header pages are implemented in BTreeHeaderPage.java and keep track of which pages in the file are in use. Lastly, there is one page at the beginning of every BTreeFile which points to the root page of the tree and the first header page. This singleton page is implemented in BTreeRootPtrPage.java. Familiarize yourself with the interfaces of these classes, especially BTreePage, BTreeInternalPage and BTreeLeafPage. You will need to use these classes in your implementation of the B+Tree.

看一下 index/ 和 BTreeFile.java 。这是实现B+Tree的核心文件，你将在这里编写本实验的所有代码。与HeapFile不同，BTreeFile由四种不同的页面组成。正如你所期望的，树的节点有两种不同的页：内部页和叶子页。内部页在BTreeInternalPage.java中实现，而叶子页在BTreeLeafPage.java中实现。为了方便起见，我们在BTreePage.java中创建了一个抽象类，其中包含了叶子页和内部页的共同代码。此外，标题页在BTreeHeaderPage.java中实现，并跟踪文件中哪些页正在使用。最后，在每个BTreeFile的开头都有一个页面，它指向树的根页和第一个标题页。这个单子页在BTreeRootPtrPage.java中实现。熟悉这些类的接口，特别是BTreePage、BTreeInternalPage和BTreeLeafPage。你将需要在你的B+Tree的实现中使用这些类。

Your first job is to implement the findLeafPage() function in BTreeFile.java. This function is used to find the appropriate leaf page given a particular key value, and is used for both searches and inserts. For example, suppose we have a B+Tree with two leaf pages (See Figure 1). The root node is an internal page with one entry containing one key (6, in this case) and two child pointers. Given a value of 1, this function should return the first leaf page. Likewise, given a value of 8, this function should return the second page. The less obvious case is if we are given a key value of 6. There may be duplicate keys, so there could be 6's on both leaf pages. In this case, the function should return the first (left) leaf page.

你的第一个工作是在BTreeFile.java中实现findLeafPage()函数。这个函数用于在给定一个特定的键值的情况下找到合适的叶子页，并且用于搜索和插入。例如，假设我们有一个有两个叶子页的B+Tree（见图1）。根节点是一个内部页面，有一个条目，包含一个键（本例中为6）和两个子指针。给定一个值为1，这个函数应该返回第一个叶子页。同样地，如果数值为8，这个函数应该返回第二个页面。不太明显的情况是，如果我们给定的键值是6，可能有重复的键，所以两个叶子页上可能都有6。在这种情况下，这个函数应该返回第一个（左边）叶子页。

![](image/6-lab5/1644485061911.png)
Figure 1: A simple B+ Tree with duplicate keys

图1：一个简单的有重复 key 的 B+ 树

Your findLeafPage() function should recursively search through internal nodes until it reaches the leaf page corresponding to the provided key value. In order to find the appropriate child page at each step, you should iterate through the entries in the internal page and compare the entry value to the provided key value. BTreeInternalPage.iterator() provides access to the entries in the internal page using the interface defined in BTreeEntry.java. This iterator allows you to iterate through the key values in the internal page and access the left and right child page ids for each key. The base case of your recursion happens when the passed-in BTreePageId has pgcateg() equal to BTreePageId.LEAF, indicating that it is a leaf page. In this case, you should just fetch the page from the buffer pool and return it. You do not need to confirm that it actually contains the provided key value f.

你的findLeafPage()函数应该递归地搜索内部节点，直到到达与所提供的键值相对应的叶子页。为了在每一步找到合适的子页面，你应该遍历内部页面中的条目，并将条目值与提供的键值进行比较。BTreeInternalPage.iterator()使用BTreeEntry.java中定义的接口提供了对内部页面中条目的访问。这个迭代器允许你遍历内部页面中的键值，并访问每个键的左右子页面ID。当传入的BTreePageId的pgcateg()等于BTreePageId.LEAF时，你递归的基本情况就会发生，表明它是一个叶子页。在这种情况下，你应该只是从缓冲池中获取该页并返回它。你不需要确认它是否真的包含所提供的键值f。

Your findLeafPage() code must also handle the case when the provided key value f is null. If the provided value is null, recurse on the left-most child every time in order to find the left-most leaf page. Finding the left-most leaf page is useful for scanning the entire file. Once the correct leaf page is found, you should return it. As mentioned above, you can check the type of page using the pgcateg() function in BTreePageId.java. You can assume that only leaf and internal pages will be passed to this function.

你的findLeafPage()代码还必须处理所提供的键值f为空的情况。如果提供的值是空的，每次都在最左边的子页上递归，以便找到最左边的叶子页。找到最左边的叶子页对于扫描整个文件是很有用的。一旦找到正确的叶子页，你应该返回它。如上所述，你可以使用BTreePageId.java中的pgcateg()函数检查页面的类型。你可以假设只有叶子页和内部页会被传递给这个函数。

Instead of directly calling BufferPool.getPage() to get each internal page and leaf page, we recommend calling the wrapper function we have provided, BTreeFile.getPage(). It works exactly like BufferPool.getPage(), but takes an extra argument to track the list of dirty pages. This function will be important for the next two exercises in which you will actually update the data and therefore need to keep track of dirty pages.

与其直接调用BufferPool.getPage()来获取每个内部页面和叶子页面，我们建议调用我们提供的包装函数BTreeFile.getPage()。它的工作原理与BufferPool.getPage()完全一样，但需要一个额外的参数来跟踪脏页的列表。这个函数在接下来的两个练习中非常重要，你将实际更新数据，因此需要跟踪脏页。

Every internal (non-leaf) page your findLeafPage() implementation visits should be fetched with READ_ONLY permission, except the returned leaf page, which should be fetched with the permission provided as an argument to the function. These permission levels will not matter for this lab, but they will be important for the code to function correctly in future labs.

你的findLeafPage()实现访问的每一个内部（非叶子）页面都应该以READ_ONLY权限获取，除了返回的叶子页面，它应该以作为函数参数提供的权限获取。这些权限级别对本实验来说并不重要，但它们对代码在未来实验中的正常运行非常重要。

## Exercise 1: BTreeFile.findLeafPage()

Implement BTreeFile.findLeafPage().

After completing this exercise, you should be able to pass all the unit tests in BTreeFileReadTest.java and the system tests in BTreeScanTest.java.

完成这个练习后，你应该能够通过BTreeFileReadTest.java中的所有单元测试和BTreeScanTest.java中的系统测试。

## 3. Insert

In order to keep the tuples of the B+Tree in sorted order and maintain the integrity of the tree, we must insert tuples into the leaf page with the enclosing key range. As was mentioned above, findLeafPage() can be used to find the correct leaf page into which we should insert the tuple. However, each page has a limited number of slots and we need to be able to insert tuples even if the corresponding leaf page is full.

为了使B+Tree的 tuple 保持排序，并保持树的完整性，我们必须将 tuple 插入到具有包围键范围的叶页中。如上所述，findLeafPage()可以用来找到我们应该插入 tuple 的正确叶子页。然而，每个页面都有有限的槽位，我们需要能够插入 tuple ，即使相应的叶子页面已经满了。

As described in the textbook, attempting to insert a tuple into a full leaf page should cause that page to split so that the tuples are evenly distributed between the two new pages. Each time a leaf page splits, a new entry corresponding to the first tuple in the second page will need to be added to the parent node. Occasionally, the internal node may also be full and unable to accept new entries. In that case, the parent should split and add a new entry to its parent. This may cause recursive splits and ultimately the creation of a new root node.

正如教科书中所描述的，试图在一个完整的叶子页中插入一个tuple应该导致该页分裂，以便tuple均匀地分布在两个新页中。每次叶子页分裂时，需要向父节点添加一个与第二页中第一个tuple对应的新条目。偶尔，内部节点也可能是满的，无法接受新条目。在这种情况下，父节点应该拆分并向其父节点添加一个新条目。这可能会导致递归分裂，最终创建一个新的根节点。

In this exercise you will implement splitLeafPage() and splitInternalPage() in BTreeFile.java. If the page being split is the root page, you will need to create a new internal node to become the new root page, and update the BTreeRootPtrPage. Otherwise, you will need to fetch the parent page with READ_WRITE permissions, recursively split it if necessary, and add a new entry. You will find the function getParentWithEmptySlots() extremely useful for handling these different cases. In splitLeafPage() you should "copy" the key up to the parent page, while in splitInternalPage() you should "push" the key up to the parent page. See Figure 2 and review section 10.5 in the text book if this is confusing. Remember to update the parent pointers of the new pages as needed (for simplicity, we do not show parent pointers in the figures). When an internal node is split, you will need to update the parent pointers of all the children that were moved. You may find the function updateParentPointers() useful for this task. Additionally, remember to update the sibling pointers of any leaf pages that were split. Finally, return the page into which the new tuple or entry should be inserted, as indicated by the provided key field. (Hint: You do not need to worry about the fact that the provided key may actually fall in the exact center of the tuples/entries to be split. You should ignore the key during the split, and only use it to determine which of the two pages to return.)


在这个练习中，你将在 BTreeFile.java 中实现 splitLeafPage() 和 splitInternalPage() 。如果被分割的页面是根页面，你将需要创建一个新的内部节点来成为新的根页面，并更新BTreeRootPtrPage。否则，你将需要以READ_WRITE权限获取父页，必要时递归分割，并添加一个新条目。你会发现函数getParentWithEmptySlots()对于处理这些不同的情况非常有用。在splitLeafPage()中，你应该将键 "复制 "到父页上，而在splitInternalPage()中，你应该将键 "推 "到父页上。如果这一点令人困惑，请参见图2，并回顾教科书中的10.5节。记住要根据需要更新新页面的父指针（为了简单起见，我们不在图中显示父指针）。当一个内部节点被分割时，你将需要更新所有被移动的子节点的父指针。你可能会发现函数updateParentPointers()对这项任务很有用。此外，记得要更新任何被拆分的叶子页面的兄弟姐妹指针。最后，返回新的tuple或条目应该被插入的页面，如所提供的键字段所示。(提示：你不需要担心所提供的键实际上可能正好落在要分割的tuple/条目的中心。在分割过程中，你应该忽略这个键，而只是用它来决定返回两个页面中的哪一个）。

![](image/6-lab5/1644501314066.png)
Figure 2: Splitting pages

Whenever you create a new page, either because of splitting a page or creating a new root page, call getEmptyPage() to get the new page. This function is an abstraction which will allow us to reuse pages that have been deleted due to merging (covered in the next section).

每当你创建一个新的页面，无论是因为拆分一个页面还是创建一个新的根页面，都要调用getEmptyPage()来获取新的页面。这个函数是一个抽象，它将允许我们重新使用因合并而被删除的页面（在下一节涉及）。

We expect that you will interact with leaf and internal pages using BTreeLeafPage.iterator() and BTreeInternalPage.iterator() to iterate through the tuples/entries in each page. For convenience, we have also provided reverse iterators for both types of pages: BTreeLeafPage.reverseIterator() and BTreeInternalPage.reverseIterator(). These reverse iterators will be especially useful for moving a subset of tuples/entries from a page to its right sibling.

我们希望你能使用BTreeLeafPage.iterator()和BTreeInternalPage.iterator()与叶子页和内部页进行交互，以迭代每个页面中的 tuple /条目。为了方便，我们还为这两种类型的页面提供了反向迭代器。BTreeLeafPage.reverseIterator（）和BTreeInternalPage.reverseIterator（）。这些反向迭代器对于将一个页面中的 tuple /条目子集移动到其右边的同级页面中特别有用。


As mentioned above, the internal page iterators use the interface defined in BTreeEntry.java, which has one key and two child pointers. It also has a recordId, which identifies the location of the key and child pointers on the underlying page. We think working with one entry at a time is a natural way to interact with internal pages, but it is important to keep in mind that the underlying page does not actually store a list of entries, but stores ordered lists of m keys and m+1 child pointers. Since the BTreeEntry is just an interface and not an object actually stored on the page, updating the fields of BTreeEntry will not modify the underlying page. In order to change the data on the page, you need to call BTreeInternalPage.updateEntry(). Furthermore, deleting an entry actually deletes only a key and a single child pointer, so we provide the funtions BTreeInternalPage.deleteKeyAndLeftChild() and BTreeInternalPage.deleteKeyAndRightChild() to make this explicit. The entry's recordId is used to find the key and child pointer to be deleted. Inserting an entry also only inserts a key and single child pointer (unless it's the first entry), so BTreeInternalPage.insertEntry() checks that one of the child pointers in the provided entry overlaps an existing child pointer on the page, and that inserting the entry at that location will keep the keys in sorted order.

如上所述，内部页面迭代器使用BTreeEntry.java中定义的接口，它有一个key和两个child pointers。它还有一个recordId，用于识别底层页面上键和子指针的位置。我们认为一次处理一个条目是与内部页面交互的自然方式，但重要的是要记住，底层页面实际上并不存储一个条目列表，而是存储m个键和m+1个子指针的有序列表。由于BTreeEntry只是一个接口，而不是实际存储在页面上的对象，更新BTreeEntry的字段不会修改底层页面。为了改变页面上的数据，你需要调用BTreeInternalPage.updateEntry（）。此外，删除一个条目实际上只删除了一个键和一个子指针，所以我们提供了BTreeInternalPage.deleteKeyAndLeftChild()和BTreeInternalPage.deleteKeyAndRightChild()的功能来明确这一点。该条目的recordId被用来寻找要删除的key和child指针。插入一个条目也只插入一个键和单个子指针（除非它是第一个条目），所以BTreeInternalPage.insertEntry()检查所提供的条目中的一个子指针是否与页面上现有的一个子指针重叠，在该位置插入条目将保持键的排序顺序。

In both splitLeafPage() and splitInternalPage(), you will need to update the set of dirtypages with any newly created pages as well as any pages modified due to new pointers or new data. This is where BTreeFile.getPage() will come in handy. Each time you fetch a page, BTreeFile.getPage() will check to see if the page is already stored in the local cache (dirtypages), and if it can't find the requested page there, it fetches it from the buffer pool. BTreeFile.getPage() also adds pages to the dirtypages cache if they are fetched with read-write permission, since presumably they will soon be dirtied. One advantage of this approach is that it prevents loss of updates if the same pages are accessed multiple times during a single tuple insertion or deletion.

在 splitLeafPage() 和 splitInternalPage() 中，你需要用任何新创建的页面以及由于新指针或新数据而修改的页面来更新 dirtypages 的集合。这就是BTreeFile.getPage()的用武之地。每次你获取一个页面时，BTreeFile.getPage()都会检查该页面是否已经存储在本地缓存（dirtypages）中，如果它在那里找不到所请求的页面，它就会从缓冲池中获取它。BTreeFile.getPage()还将页面添加到dirtypages缓存中，如果它们是以读写权限获取的，因为据推测它们很快就会被弄脏。这种方法的一个优点是，如果在一次tuple插入或删除过程中多次访问相同的页面，它可以防止更新的损失。

Note that in a major departure from HeapFile.insertTuple(), BTreeFile.insertTuple() could return a large set of dirty pages, especially if any internal pages are split. As you may remember from previous labs, the set of dirty pages is returned to prevent the buffer pool from evicting dirty pages before they have been flushed.

请注意，与 HeapFile.insertTuple() 大相径庭的是，BTreeFile.insertTuple() 可能会返回一大组脏页，特别是在任何内部页面被分割的情况下。你可能还记得以前的实验，返回脏页集是为了防止缓冲池在脏页被刷新之前驱逐它们。

Warning: as the B+Tree is a complex data structure, it is helpful to understand the properties necessary of every legal B+Tree before modifying it. Here is an informal list:

警告：由于B+Tree是一个复杂的数据结构，在修改它之前，了解每个合法B+Tree的必要属性是很有帮助的。这里是一个非正式的列表。

If a parent node points to a child node, the child nodes must point back to those same parents.

如果一个父节点指向一个子节点，子节点必须指向那些相同的父节点。

If a leaf node points to a right sibling, then the right sibling points back to that leaf node as a left sibling.

如果一个叶子节点指向一个右边的兄弟姐妹，那么右边的兄弟姐妹就会作为左边的兄弟姐妹指向该叶子节点。

The first and last leaves must point to null left and right siblings respectively.
Record Id's must match the page they are actually in.
A key in a node with non-leaf children must be larger than any key in the left child, and smaller than any key in the right child.
A key in a node with leaf children must be larger or equal than any key in the left child, and smaller or equal than any key in the right child.
A node has either all non-leaf children, or all leaf children.
A non-root node cannot be less than half full.
We have implemented a mechanized check for all these properties in the file BTreeChecker.java. This method is also used to test your B+Tree implementation in the systemtest/BTreeFileDeleteTest.java. Feel free to add calls to this function to help debug your implementation, like we did in BTreeFileDeleteTest.java.

第一个和最后一个叶子必须分别指向空的左边和右边的兄弟姐妹。
记录的Id必须与它们实际所在的页面相匹配。
有非叶子的节点中的一个键必须大于左侧子节点中的任何键，并且小于右侧子节点中的任何键。
一个有叶子的节点中的键必须大于或等于左边子节点中的任何键，并且小于或等于右边子节点中的任何键。
一个节点要么有所有非叶子的孩子，要么有所有叶子的孩子。
一个非根节点不能少于一半。
我们已经在BTreeChecker.java文件中实现了对所有这些属性的机械化检查。在systemtest/BTreeFileDeleteTest.java中，这个方法也被用来测试你的B+Tree实现。请随意添加对该函数的调用，以帮助调试你的实现，就像我们在BTreeFileDeleteTest.java中做的那样。


N.B.

The checker method should always pass after initialization of the tree and before starting and after completing a full call to key insertion or deletion, but not necessarily within internal methods.

检查器方法应该总是在树的初始化之后，在开始和完成对键插入或删除的完整调用之前传递，但不一定在内部方法中传递。


A tree may be well formed (and therefore pass checkRep()) but still incorrect. For example, the empty tree will always pass checkRep(), but may not always be correct (if you just inserted a tuple, the tree should not be empty). ***

一个树可能形成得很好（因此通过了checkRep()），但是仍然不正确。例如，空的树总是能通过checkRep()，但不一定总是正确的（如果你刚刚插入了一个tuple，树不应该是空的）。***

## Exercise 2: Splitting Pages

Implement BTreeFile.splitLeafPage() and BTreeFile.splitInternalPage().

After completing this exercise, you should be able to pass the unit tests in BTreeFileInsertTest.java. You should also be able to pass the system tests in systemtest/BTreeFileInsertTest.java. Some of the system test cases may take a few seconds to complete. These files will test that your code inserts tuples and splits pages correcty, and also handles duplicate tuples.

完成这个练习后，你应该能够通过BTreeFileInsertTest.java中的单元测试。你也应该能够通过 systemtest/BTreeFileInsertTest.java 中的系统测试。一些系统测试案例可能需要几秒钟的时间来完成。这些文件将测试你的代码是否正确地插入 tuple 和分割页面，并处理重复的 tuple 。

## 4. Delete
In order to keep the tree balanced and not waste unnecessary space, deletions in a B+Tree may cause pages to redistribute tuples (Figure 3) or, eventually, to merge (see Figure 4). You may find it useful to review section 10.6 in the textbook.

为了保持树的平衡，不浪费不必要的空间，B+树中的删除可能会导致页面重新分配 tuple （图3）或最终合并（见图4）。你可能会发现复习一下教科书中的第10.6节是很有用的。

![](image/6-lab5/1644564797612.png)
Figure 3: Redistributing pages


![](image/6-lab5/1644564966538.png)
Figure 4: Merging pages

As described in the textbook, attempting to delete a tuple from a leaf page that is less than half full should cause that page to either steal tuples from one of its siblings or merge with one of its siblings. If one of the page's siblings has tuples to spare, the tuples should be evenly distributed between the two pages, and the parent's entry should be updated accordingly (see Figure 3). However, if the sibling is also at minimum occupancy, then the two pages should merge and the entry deleted from the parent (Figure 4). In turn, deleting an entry from the parent may cause the parent to become less than half full. In this case, the parent should steal entries from its siblings or merge with a sibling. This may cause recursive merges or even deletion of the root node if the last entry is deleted from the root node.

正如教科书中所描述的那样，如果试图从一个不满一半的叶子页中删除一个 tuple ，应该会导致该页从它的一个兄弟姐妹那里偷取 tuple 或与它的一个兄弟姐妹合并。如果该页的一个兄弟姐妹有多余的 tuple ，这些 tuple 应该在两个页面之间平均分配，并且父页的条目应该相应地被更新（见图3）。然而，如果兄弟姐妹也处于最小的占用率，那么这两个页面就应该合并，并从父页面删除条目（图4）。反过来，从父本中删除一个条目可能会导致父本的入住率低于一半。在这种情况下，父本应该从其兄弟姐妹那里偷取条目，或者与兄弟姐妹合并。这可能会导致递归合并，甚至是删除根节点，如果最后一个条目从根节点上被删除。


In this exercise you will implement stealFromLeafPage(), stealFromLeftInternalPage(), stealFromRightInternalPage(), mergeLeafPages() and mergeInternalPages() in BTreeFile.java. In the first three functions you will implement code to evenly redistribute tuples/entries if the siblings have tuples/entries to spare. Remember to update the corresponding key field in the parent (look carefully at how this is done in Figure 3 - keys are effectively "rotated" through the parent). In stealFromLeftInternalPage()/stealFromRightInternalPage(), you will also need to update the parent pointers of the children that were moved. You should be able to reuse the function updateParentPointers() for this purpose.

在这个练习中，你将在BTreeFile.java中实现 stealFromLeafPage(), stealFromLeftInternalPage(), stealFromRightInternalPage(), mergeLeafPages() 和 mergeInternalPages() 。在前三个函数中，你将实现代码，在兄弟姐妹有 tuple /条目的情况下均匀地重新分配 tuple /条目。记住要更新父代中相应的键字段（仔细看看图3中是如何做到的--键字在父代中被有效地 "旋转 "了）。在stealFromLeftInternalPage()/stealFromRightInternalPage()中，你还需要更新被移动的子项的父项指针。你应该可以为这个目的重新使用函数 updateParentPointers()。

In mergeLeafPages() and mergeInternalPages() you will implement code to merge pages, effectively performing the inverse of splitLeafPage() and splitInternalPage(). You will find the function deleteParentEntry() extremely useful for handling all the different recursive cases. Be sure to call setEmptyPage() on deleted pages to make them available for reuse. As with the previous exercises, we recommend using BTreeFile.getPage() to encapsulate the process of fetching pages and keeping the list of dirty pages up to date.

在mergeLeafPages()和mergeInternalPages()中，你将实现合并页面的代码，有效地执行splitLeafPage()和splitInternalPage()的逆过程。你会发现函数deleteParentEntry()对于处理所有不同的递归情况非常有用。请确保在被删除的页面上调用setEmptyPage()，以使它们可以被重新使用。与之前的练习一样，我们建议使用BTreeFile.getPage()来封装获取页面的过程，并保持脏页面列表的更新。


## Exercise 3: Redistributing pages

Implement BTreeFile.stealFromLeafPage(), BTreeFile.stealFromLeftInternalPage(), BTreeFile.stealFromRightInternalPage().

After completing this exercise, you should be able to pass some of the unit tests in BTreeFileDeleteTest.java (such as testStealFromLeftLeafPage and testStealFromRightLeafPage). The system tests may take several seconds to complete since they create a large B+ tree in order to fully test the system.

完成这个练习后，你应该能够通过BTreeFileDeleteTest.java中的一些单元测试（如testStealFromLeftLeafPage和testStealFromRightLeafPage）。系统测试可能需要几秒钟才能完成，因为它们会创建一个大的B+树，以便全面测试系统。

Exercise 4: Merging pages

Implement BTreeFile.mergeLeafPages() and BTreeFile.mergeInternalPages().

实现BTreeFile.mergeLeafPages()和BTreeFile.mergeInternalPages()。

Now you should be able to pass all unit tests in BTreeFileDeleteTest.java and the system tests in systemtest/BTreeFileDeleteTest.java.

现在你应该能够通过BTreeFileDeleteTest.java中的所有单元测试和systemtest/BTreeFileDeleteTest.java中的系统测试。

## 5. Transactions

You may remember that B+ trees can prevent phantom tuples from showing up between two consecutive range scans by using next-key locking. Since SimpleDB uses page-level, strict two-phase locking, protection against phantoms effectively comes for free if the B+ tree is implemented correctly. Thus, at this point you should also be able to pass BTreeNextKeyLockingTest.

你可能还记得，B+树可以通过使用下一个键锁定来防止幻影 tuple 在两个连续的范围扫描之间出现。由于SimpleDB使用了页级的、严格的两阶段锁定，如果B+树被正确实现，对幻影的保护实际上是免费的。因此，在这一点上，你也应该能够通过BTreeNextKeyLockingTest。

Additionally, you should be able to pass the tests in test/simpledb/BTreeDeadlockTest.java if you have implemented locking correctly inside of your B+ tree code.

此外，如果你在B+树代码中正确实现了锁定，你应该能够通过test/simpledb/BTreeDeadlockTest.java的测试。

If everything is implemented correctly, you should also be able to pass the BTreeTest system test. We expect many people to find BTreeTest difficult, so it's not required, but we'll give extra credit to anyone who can run it successfully. Please note that this test may take up to a minute to complete.

如果一切实施正确，你也应该能够通过BTreeTest系统测试。我们预计很多人会觉得BTreeTest很难，所以它不是必须的，但我们会给能够成功运行它的人加分。请注意，这个测试可能需要一分钟的时间来完成。

## 6. Extra Credit

Bonus Exercise 5: (10% extra credit)

Create and implement a class called BTreeReverseScan which scans the BTreeFile in reverse, given an optional IndexPredicate.

创建并实现一个名为BTreeReverseScan的类，该类在给定一个可选的IndexPredicate后，反向扫描BTreeFile。

You can use BTreeScan as a starting point, but you will probably need to implement a reverse iterator in BTreeFile. You will also likely need to implement a separate version of BTreeFile.findLeafPage(). We have provided reverse iterators on BTreeLeafPage and BTreeInternalPage which you may find useful. You should also write code to test that your implementation works correctly. BTreeScanTest.java is a good place to look for ideas.

你可以使用BTreeScan作为起点，但你可能需要在BTreeFile中实现一个反向迭代器。你也可能需要实现一个单独的BTreeFile.findLeafPage()版本。我们已经在BTreeLeafPage和BTreeInternalPage上提供了反向迭代器，你可能会发现它很有用。你还应该编写代码来测试你的实现是否正常工作。BTreeScanTest.java是一个寻找思路的好地方。

## 7. Logistics
You must submit your code (see below) as well as a short (1 page, maximum) writeup describing your approach. This writeup should:

你必须提交你的代码（见下文），以及描述你的方法的简短（最多1页）的文章。这篇报告应该

Describe any design decisions you made, including anything that was difficult or unexpected.

描述你所做的任何设计决定，包括任何困难或意外。

Discuss and justify any changes you made outside of BTreeFile.java.

讨论并论证你在BTreeFile.java之外所做的任何改动。

How long did this lab take you? Do you have any suggestions for ways to improve it?

这个实验花了你多长时间？你有什么建议可以改进它吗？

Optional: If you did the extra credit exercise, explain your implementation and show us that you thoroughly tested it.

可选：如果你做了加分练习，请解释你的实现，并向我们展示你彻底测试了它。

## 7.1. Collaboration
This lab should be manageable for a single person, but if you prefer to work with a partner, this is also OK. Larger groups are not allowed. Please indicate clearly who you worked with, if anyone, on your writeup.

这个实验对一个人来说应该是可以应付的，但如果你喜欢和一个伙伴一起工作，这也是可以的。不允许有较大的团体。如果有的话，请在你的报告中明确指出你和谁一起工作。

## 7.2. Submitting your assignment

We will be using gradescope to autograde all programming assignments. You should have all been invited to the class instance; if not, please let us know and we can help you set up. You may submit your code multiple times before the deadline; we will use the latest version as determined by gradescope. Place the write-up in a file called lab3-writeup.txt with your submission. You also need to explicitly add any other files you create, such as new *.java files.

我们将使用gradescope对所有编程作业进行自动评分。你们应该都被邀请到班级实例中；如果没有，请告诉我们，我们可以帮助你们设置。你可以在截止日期前多次提交你的代码；我们将使用由gradescope确定的最新版本。把写好的东西放在一个叫lab3-writeup.txt的文件里，和你的提交一起。你还需要明确地添加你创建的任何其他文件，如新的*.java文件。

The easiest way to submit to gradescope is with .zip files containing your code. On Linux/MacOS, you can do so by running the following command:

向 gradescope 提交的最简单方法是使用包含你的代码的 .zip 文件。在Linux/MacOS上，你可以通过运行以下命令来实现。

    $ zip -r submission.zip src/ lab5-writeup.txt

## 7.3. Submitting a bug

SimpleDB is a relatively complex piece of code. It is very possible you are going to find bugs, inconsistencies, and bad, outdated, or incorrect documentation, etc.

SimpleDB是一个相对复杂的代码。你很可能会发现错误、不一致，以及糟糕的、过时的或不正确的文档等等。

We ask you, therefore, to do this lab with an adventurous mindset. Don't get mad if something is not clear, or even wrong; rather, try to figure it out yourself or send us a friendly email.

因此，我们要求你以一种冒险的心态来做这个实验。如果有不清楚的地方，甚至是错误的地方，不要生气；而是要自己尝试去弄清楚，或者给我们发一封友好的电子邮件。

Please submit (friendly!) bug reports to 6.830-staff@mit.edu. When you do, please try to include:

A description of the bug.
A .java file we can drop in the test/simpledb directory, compile, and run.
A .txt file with the data that reproduces the bug. We should be able to convert it to a .dat file using HeapFileEncoder.
You can also post on the class page on Piazza if you feel you have run into a bug.

请提交（友好的！）错误报告到6.830-staff@mit.edu。当你这样做时，请尽量包括。

对该错误的描述。
一个我们可以放在test/simpledb目录下的.java文件，并进行编译和运行。
一个包含再现该错误的数据的.txt文件。我们应该能够用HeapFileEncoder将其转换为.dat文件。
如果你觉得你遇到了一个bug，你也可以在Piazza的类页面上发帖。


## 7.4 Grading

75% of your grade will be based on whether or not your code passes the system test suite we will run over it. These tests will be a superset of the tests we have provided. Before handing in your code, you should make sure it produces no errors (passes all of the tests) from both ant test and ant systemtest.

Important: before testing, gradescope will replace your build.xml, HeapFileEncoder.java and the entire contents of the test directory with our version of these files. This means you cannot change the format of .dat files! You should also be careful changing our APIs. You should test that your code compiles the unmodified tests.

You should get immediate feedback and error outputs for failed tests (if any) from gradescope after submission. The score given will be your grade for the autograded portion of the assignment. An additional 25% of your grade will be based on the quality of your writeup and our subjective evaluation of your code. This part will also be published on gradescope after we finish grading your assignment.

We had a lot of fun designing this assignment, and we hope you enjoy hacking on it!

你的成绩的75%将基于你的代码是否通过我们将对其进行的系统测试套件。这些测试将是我们提供的测试的一个超集。在交出你的代码之前，你应该确保它在ant test和ant systemtest中没有产生错误（通过所有的测试）。

重要的是：在测试之前，gradescope 会用我们的版本替换你的 build.xml、HeapFileEncoder.java 以及测试目录中的全部内容。这意味着你不能改变.dat文件的格式! 你也应该小心改变我们的API。你应该测试你的代码是否编译了未修改的测试。

在提交后，你应该从 gradescope 得到即时反馈和失败测试的错误输出（如果有的话）。给出的分数将是你在作业的自动评分部分的成绩。另外25%的分数将基于你的写作质量和我们对你代码的主观评价。在我们给你的作业评分后，这部分也将在 gradescope 上公布。

我们在设计这项作业时非常有趣，我们希望你能享受到黑客的乐趣!