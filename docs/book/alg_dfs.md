# 深度优先搜索
## 1.0 ❤🧡💛💙
[Leetcode-695](https://leetcode-cn.com/problems/max-area-of-island)

```cpp
class Solution {
    int dfs(vector<vector<int>> &grid, int x, int y) {
        if (x < 0 || y < 0 || x >= grid.size() || y >= grid[0].size() || grid[x][y] != 1) {
            return 0;
        }
        grid[x][y] = 0;
        int c = 1;
        int xx[4] = {0, 0, 1, -1};
        int yy[4] = {1, -1, 0, 0};
        for (int i = 0; i < 4;i++) {
            int nex_x = x + xx[i];
            int nex_y = y + yy[i];
            c += dfs(grid, nex_x, nex_y);
        }
        return c;
    }
public:
    int maxAreaOfIsland(vector<vector<int>>& grid) {
        int ans = 0;
        for (int i = 0; i < grid.size();i++) {
            for (int j = 0; j < grid[0].size(); j++) {
                ans = max(ans,dfs(grid,i,j));
            }
        }
        return ans;
    }
};
```

## 2.0 ❤🧡💛💙
[Leetcode-200](https://leetcode-cn.com/problems/number-of-islands/)
上一题的变形！修改一下就可以了。

```cpp
class Solution {
    int dfs(vector<vector<char>> &grid, int x, int y) {
        if (x < 0 || y < 0 || x >= grid.size() || y >= grid[0].size() || grid[x][y] != '1') {
            return 0;
        }
        grid[x][y] = '0';
        int xx[4] = {0,0,1,-1};
        int yy[4] = {1,-1,0,0};
        int ans = 1;
        for (int i = 0; i < 4; i++) {
            int next_x = x + xx[i];
            int next_y = y + yy[i];
            dfs(grid, next_x, next_y);
        }
        return ans;
    }
public:
    int numIslands(vector<vector<char>>& grid) {
        int ans = 0;
        for (int i = 0; i < grid.size(); i++) {
            for (int j = 0; j < grid[0].size(); j++) {
                ans += dfs(grid, i, j);
            }
        }
        return ans;
    }
};
```

## 3.0 ❤🧡💛💙
[Leetcode-130](https://leetcode-cn.com/problems/surrounded-regions/)

## 4.0 ❤🧡💛💙💚
[Leetcode-417](https://leetcode-cn.com/problems/pacific-atlantic-water-flow)