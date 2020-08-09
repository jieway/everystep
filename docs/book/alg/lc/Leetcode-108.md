
## 6. 从有序数组中构造二叉查找树

108\. Convert Sorted Array to Binary Search Tree (Easy)

[Leetcode](https://leetcode.com/problems/convert-sorted-array-to-binary-search-tree/description/) / [力扣](https://leetcode-cn.com/problems/convert-sorted-array-to-binary-search-tree/description/)


## 1.0 建一棵 BST

[leetcode](https://leetcode-cn.com/problems/convert-sorted-array-to-binary-search-tree/)
题意是给你一个有序数组，如何建立一颗二叉搜索树，
```java
class Solution {
    public TreeNode sortedArrayToBST(int[] nums) {
        return nums == null ? null : df(nums,0,nums.length-1);
    }
    public TreeNode df(int[] nums,int i , int j) {
        if (i > j) return null;
        int m = j + (i - j) / 2;
        TreeNode tree = new TreeNode(nums[m]);
        tree.left = df( nums, i, m-1);
        tree.right = df( nums, m+1, j);
        return tree;
    }
}
```
