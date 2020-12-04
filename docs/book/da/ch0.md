# Pandas 学习

> 本文内容参考自 https://www.kaggle.com/residentmario/creating-reading-and-writing 学习

> Pandas 是开源数据处理库。基于 Numpy ，Pandas 纳入了大量库和一些标准的数据模型，提供了高效地操作大型数据集所需的函数和方法。

> Pandas 的数据类型主要有以下几种，它们分别是：Series（一维数组），DataFrame（二维数组），Panel（三维数组），Panel4D（四维数组），PanelND（更多维数组）。其中 Series 和 DataFrame 应用的最为广泛，几乎占据了使用频率 90% 以上。

## 1.0 DataFrame

可以将其简单的理解为一张二维表格。

基本结构:

```python
pandas.DataFrame(data=None, index=None, columns=None)
```

### 1.1 导入包

```python
import pandas as pd
```

### 1.2 创建 DataFrame

pandas 的 DataFrame 是一个二维数组。也就是一张表格。

可以将其看成字典的形式，键是列名。值是一个列表，可以看成是该列对应的值。

```python
import pandas as pd
c = pd.DataFrame({'a': [1, 2], 'b': [3, 4]})
print(c)

# 输出
   a  b
0  1  3
1  2  4
```

相同的例子：

```python
import pandas as pd

c = pd.DataFrame({'Bob': ['I liked it.', 'It was awful.'], 'Sue': ['Pretty good.', 'Bland.']})

print(c)
```

### 1.3 行名

一张表格不仅仅存在列名，每一行也存在名字，行名是索引(index)，根据行和列可以定位表格中的数据。

```python
import pandas as pd

c = pd.DataFrame({'Bob': ['I liked it.', 'It was awful.'],
                'Sue': ['Pretty good.', 'Bland.']},
                index=['a','b'])

print(c)

# 输出：
             Bob           Sue
a    I liked it.  Pretty good.
b  It was awful.        Bland.
```

实际上也就是第二个参数设定了索引。

pd.DataFrame(a,b) 中 a 设定了数据源及其行名，b 设定了索引！

## 2.0 Series

Series 的中文意思是连续，串联的意思。本质上 Series 就是一维数组。

基本结构：

```python
pandas.Series(data=None, index=None)
```

data 是字典或 numpy 中的 ndarray 对象。 index 是数据索引。

### 2.1 使用 Series

> 仅使用了 Series 的第一个参数！

```python
import pandas as pd

a = pd.Series([1, 2, 3, 4, 5])
print(a)

# 输出
0    1
1    2
2    3
3    4
4    5
dtype: int64
```

其中第一列是对应索引（索引从零开始），第二列是该索引对应的值。

### 2.2 设置索引

可以设置索引类型，不再是默认的 0,1 ...

```python
import pandas as pd

a = pd.Series([1, 2, 3, 4], index=["a1", "a2", "a3", "a4"])
print(a)

# 输出
a1    1
a2    2
a3    3
a4    4
dtype: int64
```

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





## 3.0 索引

### 3.1 iloc

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

### 3.2 loc

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

## 4.0 数据删减

```python
df.drop(labels=['Median Age', 'Total Males'], axis=1) # 删除对应列，axis = 0 表示删除对应的行
df.drop_duplicates() # 去重，根据 axis 参数来设定按列或按行去重。
df.dropna() # 删除缺失值。
```

## 5.0 数据填充

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

# 使用 Pandas 进行数据探索

```python
df.shape # 查看行列值
df.columns # 打印列名
df.info # 查看一些总体信息
df['Churn'] = df['Churn'].astype('int64') # 数据类型转换
df.describe(include=['object','bool']) # 查看非数值特征的统计数据
df.describe() # 查看均值，标准差等基本的统计学特征
df['Churn'].value_counts() # 查看 object 和 bool 特征的个数
df['Churn'].value_counts(normalize=True) # 同上，只不过是得到比例
```

按照某列升序排列。

先按 Churn 升序在按 Total day charge 降序。

```python
df.sort_values(by='Total day charge',ascending=True).head()
df.sort_values(by=['Churn','Total day charge'],ascending=[True,False]).head()
```

## 条件索引

```python
df['Churn'].mean() # 计算某列均值
df[df['Churn'] == 1].mean() # 计算符合某个条件的相关数据的均值
df[df['Churn'] == 1]['Total day minutes'].mean() # 条件索引，两个属性条件限定。
df[(df['Churn'] == 0) & (df['International plan'] == 'No')]['Total intl minutes'].max()
```

```python
df.loc[0:5,'State':'Area code'] # 可以使用标签来索引
df.iloc[0:5,0:3] # 只能使用数字
df[:1] # 可以得到首行
df[-1:] # 可以得到尾行
```

## 使用函数

```python
df.apply(np.max) # 计算每一列的最大值
df[df['State'].apply(lambda state: state[0] == 'W')].head() # 选中了所有以 W 开头的州
```

使用 map 函数来替换某个值。
```python
d = {'No': False, 'Yes': True}
df['International plan'] = df['International plan'].map(d)
df.head()
```

也可以使用 replace 来替换。
```python
df = df.replace({'Voice mail plan': d})
df.head()
```

# 参考

1. [Pandas 数据处理基础入门](https://www.lanqiao.cn/courses/906)
2. [机器学习开放基础课程](https://www.lanqiao.cn/courses/1283/learning/)