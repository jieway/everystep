
[208. 实现 Trie (前缀树)](https://leetcode.cn/problems/implement-trie-prefix-tree/description/) 这道题挺简单的，把下面的内容看完这道题很快就能写出来。

Trie树（又称前缀树或字典树）是一种用于快速检索字符串数据集中的键的树形数据结构。这种结构非常适合处理字符串集合，特别是实现自动补全或拼写检查等功能。下面，我将通过一个具体的例子来解释Trie树的结构和工作原理。

假设我们有一个Trie树，我们要在其中存储单词“CAT”，“CAN”，和“BAT”。Trie树的结构将如下所示：

```
       Root
      /    \
     B      C
     |      |
     A      A
    / \    / \
   T   *  T   N
  /         /
 *         *  
```

在这个图形化表示中：
- 每个节点代表一个字符。
- 根节点（Root）不包含字符，它是所有单词的起始点。
- 每条从根节点到某个标记为“*”的节点的路径代表一个单词。例如，从根节点到第一个“*”的路径是“BAT”。
- 分支表示单词的不同字符。例如，“BAT”和“CAT”共享第一个字符，但第二个字符不同，因此在第二层分开。

现在，如果我们要添加另一个单词比如“CAR”，Trie树将会更新为：

```
       Root
      /    \
     B      C
     |      |
     A      A
    / \    / \
   T   *  T   R
  /       /   |
 *       *    *
              |
              *  
```

在这个新的结构中，“CAT”和“CAR”共享前两个字符“CA”，但第三个字符不同，在“CAR”中为“R”，因此在第三层分叉。

### 操作说明

1. **插入**：当插入一个新单词时，从根节点开始，为单词的每个字符创建一个新的子节点（除非该字符已经存在）。到达单词的最后一个字符时，标记这个节点表示一个单词的结束。
   
2. **搜索**：为了查找一个单词，从根节点开始，沿着单词的字符移动。如果能够在每一步都找到相应的字符，并且最后一个字符被标记为一个单词的结尾，那么该单词存在于Trie树中。

3. **前缀搜索**：前缀搜索与全词搜索类似，但不需要最后一个字符被标记为单词的结尾。如果能够顺着前缀的字符在树中移动到最后一个字符，那么这个前缀存在于树中。

Trie树在处理大量字符串，尤其是进行快速前缀查找和词汇自动补全时非常有效。由于它基于共享前缀来存储单词，因此相比于其他数据结构，它在空间效率上通常更优。

### TrieNode 设计

`TrieNode` 用于表示Trie树中的每个节点。接下来详细解释这个代码片段，包括`TrieNode`的设计以及每个成员的作用。

```cpp
class TrieNode {
public:
    bool isEndOfWord;
    unordered_map<char, TrieNode*> children;

    TrieNode() : isEndOfWord(false) {}
};
```

1. `bool isEndOfWord;`：这是一个布尔型成员变量，用于标记当前节点是否代表一个单词的结束。如果`isEndOfWord`为`true`，则表示从根节点到当前节点的路径构成一个完整的单词。

2. `unordered_map<char, TrieNode*> children;`：这是一个无序映射（`unordered_map`），用于存储当前节点的子节点。Trie树的一个关键特性是每个节点可以有多个子节点，每个子节点对应一个字符。这个`unordered_map`允许我们将字符映射到相应的子节点。

3. `TrieNode() : isEndOfWord(false) {}`：这是`TrieNode`类的构造函数。构造函数用于初始化新创建的`TrieNode`对象。在这里，构造函数将`isEndOfWord`初始化为`false`，表示节点默认不是单词的结束。

现在让我们通过一个示例来解释如何使用这个`TrieNode`类来构建Trie树：

假设我们要在Trie树中插入单词"CAT"，首先我们创建一个根节点。然后，我们从根节点开始，在每个字符位置上创建一个新的`TrieNode`对象，将`isEndOfWord`设置为`false`。在这个过程中，我们将字符映射到相应的子节点，如下所示：

1. 创建根节点，`isEndOfWord`为`false`。
2. 在根节点下创建字符'C'对应的子节点，`isEndOfWord`为`false`。
3. 在字符'C'对应的子节点下创建字符'A'对应的子节点，`isEndOfWord`为`false`。
4. 在字符'A'对应的子节点下创建字符'T'对应的子节点，`isEndOfWord`为`true`，因为"CAT"的最后一个字符表示单词的结束。

这就是如何使用`TrieNode`类来构建Trie树的一部分。这个类的设计允许我们轻松地在每个节点上附加字符和标记单词的结束。随着插入更多的单词，Trie树的结构会不断扩展。

### 完整代码
这段代码实现了一个称为“Trie”（也被称为前缀树或字典树）的数据结构。以下是对代码的逐行中文注释：

```c++
// Trie节点的定义。
class TrieNode {
public:
    bool isEndOfWord; // 标记这个节点是否是某个单词的结尾
    unordered_map<char, TrieNode*> children; // 存储当前节点的子节点

    // 构造函数，初始化时该节点不是任何单词的结尾
    TrieNode() : isEndOfWord(false) {}
};

// Trie树的定义。
class Trie {
private:
    TrieNode* root; // Trie树的根节点

public:
    // 构造函数，初始化Trie树时创建根节点
    Trie() {
        root = new TrieNode();
    }

    // 向Trie树中插入一个单词
    void insert(string word) {
        TrieNode* current = root; // 从根节点开始
        for (char ch : word) { // 遍历单词的每一个字符
            // 如果当前字符不在子节点中，则添加它
            if (current->children.find(ch) == current->children.end()) {
                current->children[ch] = new TrieNode();
            }
            // 移动到下一个节点
            current = current->children[ch];
        }
        // 标记单词的最后一个字符为单词的结尾
        current->isEndOfWord = true;
    }

    // 搜索Trie树中是否存在某个单词
    bool search(string word) {
        TrieNode* current = root; // 从根节点开始
        for (char ch : word) { // 遍历单词的每一个字符
            // 如果当前字符不在子节点中，返回false
            if (current->children.find(ch) == current->children.end()) {
                return false;
            }
            // 移动到下一个节点
            current = current->children[ch];
        }
        // 如果找到最后一个字符，并且这个字符是某个单词的结尾，则返回true
        return current != nullptr && current->isEndOfWord;
    }

    // 检查Trie树中是否有以某个前缀开始的单词
    bool startsWith(string prefix) {
        TrieNode* current = root; // 从根节点开始
        for (char ch : prefix) { // 遍历前缀的每一个字符
            // 如果当前字符不在子节点中，返回false
            if (current->children.find(ch) == current->children.end()) {
                return false;
            }
            // 移动到下一个节点
            current = current->children[ch];
        }
        // 如果前缀存在，则返回true
        return true;
    }

    // 析构函数，释放Trie树所占用的所有内存
    ~Trie() {
        clearMemory(root);
    }

private:
    // 递归清理内存的辅助函数
    void clearMemory(TrieNode* node) {
        // 递归清理所有子节点
        for (auto pair : node->children) {
            clearMemory(pair.second);
        }
        // 删除当前节点
        delete node;
    }
};
```

这个Trie树的实现提供了插入单词、搜索单词和搜索以某个前缀开始的单词的功能，同时在析构时清理所有占用的内存。Trie树是一种高效的字符串检索数据结构，常用于实现字典、自动补全等功能。