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

1. [机器学习开放基础课程](https://www.lanqiao.cn/courses/1283/learning/)