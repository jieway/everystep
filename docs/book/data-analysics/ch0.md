# Pandas 学习

> Pandas 是开源数据处理库。基于 Numpy ，Pandas 纳入了大量库和一些标准的数据模型，提供了高效地操作大型数据集所需的函数和方法。

> Pandas 的数据类型主要有以下几种，它们分别是：Series（一维数组），DataFrame（二维数组），Panel（三维数组），Panel4D（四维数组），PanelND（更多维数组）。其中 Series 和 DataFrame 应用的最为广泛，几乎占据了使用频率 90% 以上。

Pandas 的数据类型主要有以下几种，它们分别是：Series（一维数组），DataFrame（二维数组），Panel（三维数组），Panel4D（四维数组），PanelND（更多维数组）。其中 Series 和 DataFrame 应用的最为广泛，几乎占据了使用频率 90% 以上。

## Series

基本结构：

```python
pandas.Series(data=None, index=None)
```

data 是字典或 numpy 中的 ndarray 对象。 index 是数据索引。

```python
import pandas as pd

s = pd.Series({'a': 10, 'b': 20, 'c': 30})
s
```

查看数据类型

```python
type(s)
```

> pandas.core.series.Series


```python
import numpy as np

s = pd.Series(np.random.randn(5))
s
```

## DataFrame 

DataFrame 就是一张表，二维数组。和 Series 的区别在于不但具备列索引还具备行索引。

基本结构:

```python
pandas.DataFrame(data=None, index=None, columns=None)
```

创建一张二维表。

```python
df = pd.DataFrame({'one': pd.Series([1,2,3]),'two':pd.Series([4,5,6])})
df
```

用带字典的列表生成 DataFrame

```python
df = pd.DataFrame([{'one': 1, 'two': 4},
                   {'one': 2, 'two': 5},
                   {'one': 3, 'two': 6}])
df
```

使用 numpy 生成二维数组。

```python
pd.DataFrame(np.random.randint(5, size=(2, 4)))
    0	1	2	3
0	0	1	3	3
1	3	2	3	3
```

从 csv 文件中读取数据，因为 csv 是一张二维表格，所以 pandas 会将其存为 DataFrame 。

```python
df = pd.read_csv("https://labfile.oss.aliyuncs.com/courses/906/los_census.csv")
df
```

可以采用 pd.read_ 读取其他格式的文件。

查看数据，head() 默认输入前五行，可以指定行数。 tail() 同理。

```python
df.head(1)
df.head()

df.tail(7)  # 指定显示后 7 条
df.tail()
```

对数据集进行概览，计算最大值，嘴角之均值等信息。

```python
df.describe()
```

```python
df.index # 查看索引
df.colums # 查看列名
df.shape # 查看行列数
```

## 索引

### iloc

可接受的参数：

1.  整数。例如：`5`
2.  整数构成的列表或数组。例如：`[1, 2, 3]`
3.  布尔数组。
4.  可返回索引值的函数或参数。

```python
df.iloc[:3]
```

多行索引

df.iloc[] 的 [[行]，[列]] 里面可以同时接受行和列的位置，

例如：

```python
df.iloc[[1,3,5],[1]] # 选中了 1 3 5 行的第 1 列数据。
```

### loc

可接受类型：
1.  单个标签。例如：`2` 或 `'a'`，这里的 `2` 指的是标签而不是索引位置。
2.  列表或数组包含的标签。例如：`['A', 'B', 'C']`。
3.  切片对象。例如：`'A':'E'`，注意这里和上面切片的不同之处，首尾都包含在内。
4.  布尔数组。
5.  可返回标签的函数或参数。

选择 Total Population 到 Total Males 之间的所有列。

```python
df.loc[:, 'Total Population':'Total Males']
```

## 数据删减

```python
df.drop(labels=['Median Age', 'Total Males'], axis=1) # 删除对应列，axis = 0 表示删除对应的行
df.drop_duplicates() # 去重，根据 axis 参数来设定按列或按行去重。
df.dropna() # 删除缺失值。
```

## 数据填充

```python
df = pd.DataFrame(np.random.rand(9, 5), columns=list('ABCDE'))
# 插入 T 列，并打上时间戳
df.insert(value=pd.Timestamp('2017-10-1'), loc=0, column='Time')
# 将 1, 3, 5 列的 1，3，5，7 行置为缺失值
df.iloc[[1, 3, 5, 7], [0, 2, 4]] = np.nan
# 将 2, 4, 6 列的 2，4，6，8 行置为缺失值
df.iloc[[2, 4, 6, 8], [1, 3, 5]] = np.nan
df
```

```python
df.isna() # 判断是否含有缺失值
df.fillna(0) # 缺失值填充为 0
df.fillna(method='pad') # 将缺失值前面值填充进去。（索引小）
df.fillna(method='bfill') # 将缺失值后面的值填充进去。（索引大）
```

普通填充不太能反映出趋势，采用插值填充可以很好的体现：

```python
df_interpolate = df.interpolate()
df_interpolate
```

插值填充的参数设定：

1.  如果你的数据增长速率越来越快，可以选择 `method='quadratic'`二次插值。
2.  如果数据集呈现出累计分布的样子，推荐选择 `method='pchip'`。
3.  如果需要填补缺省值，以平滑绘图为目标，推荐选择 `method='akima'`。


# 参考

1. [Pandas 数据处理基础入门](https://www.lanqiao.cn/courses/906)