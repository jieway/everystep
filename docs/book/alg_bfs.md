## 1.0  ❤🧡💛💙
[Leetcode-1091](https://leetcode-cn.com/problems/shortest-path-in-binary-matrix/)
深搜超时，广搜模板。

```cpp
class Solution {
public:
    vector<vector<int>> dir = {{0,1},{1,0},{0,-1},{-1,0},{1,1},{1,-1},{-1,1},{-1,-1}};
    int shortestPathBinaryMatrix(vector<vector<int>>& grid) {
        if (grid[0][0] == 1) {
            return -1;
        }
        int length = 1;
        int n = grid.size();
        grid[0][0] = 2;
        queue<pair<int, int>> q;
        q.push(make_pair(0, 0));
        while (!q.empty()) {
            int l = q.size();
            for (int i = 0; i < l; i++) {
                int x = q.front().first;
                int y = q.front().second;
                q.pop();
                if (x == n-1 && y == n-1)
                    return length;
                for (int j = 0; j < 8; j++) {
                    int xx = x + dir[j][0];
                    int yy = y + dir[j][1];
                    if (xx <0 || xx >= n || yy <0 || yy >= n || grid[xx][yy]) {
                        continue;
                    }
                    grid[xx][yy] = 2;
                    q.push(make_pair(xx , yy));
                }
            }
            length++;
        }
        return -1;
    }
};
```
