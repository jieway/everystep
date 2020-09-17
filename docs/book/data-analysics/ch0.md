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


# 参考

1. [Pandas 数据处理基础入门](https://www.lanqiao.cn/courses/906)