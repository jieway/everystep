
# 0.0 基础查询
* 这是一张包含了世界上各个国家属性的图。

## 0.1 字段查询

* 查 Gerany 的 population
```sql
SELECT population FROM world
  WHERE name = 'Germany'
```

## 0.2 查询某个记录

* 查询 Sweden, Norway, Denmark 的 name, population
```sql
SELECT name, population FROM world
  WHERE name IN ('Sweden', 'Norway', 'Denmark');
```
## 0.3 数据范围查询

* 修改一下范围即可。
```sql
SELECT name, area FROM world
  WHERE area BETWEEN 200000 AND 250000
```




# 1.0 查询匹配

* LIKE 用在 WHERE 子句中搜索列中符合条件的内容。

## 1.1 字符开头匹配

* % 替代零个或多个字符，题目就是在 name 这一列中搜索以 Y 开头的名字。
```sql
SELECT name FROM world
  WHERE name LIKE 'Y%'
```
## 1.2 字符结尾匹配
* 查询以 y 结尾的 name
```sql
SELECT name FROM world
  WHERE name LIKE '%y'
```

## 1.3 字符中间匹配

* 查询中含有某个字符的 name。 

```sql
SELECT name FROM world
  WHERE name LIKE '%x%'
```

## 1.4 字符匹配

* 查询以 lan 结尾的 国家名。
```sql
SELECT name FROM world
  WHERE name LIKE '%land'
```
## 1.5 % 实践

```sql
SELECT name FROM world
  WHERE name LIKE 'C%ia'
```
## 1.6 % 实践
* 查询含有 oo 的 name
```sql
SELECT name FROM world
  WHERE name LIKE '%oo%'
```

## 1.7 % 实践

* 查询条件含有三个以上的 a 连续与否都可。

```sql
SELECT name FROM world
  WHERE name LIKE '%a%a%a%'
```

## 1.8 _ 实践

* _ 代表占一个字符

```sql
SELECT name FROM world
WHERE name LIKE '_t%'
ORDER BY name
```
## 1.9 _ 实践
* Lesotho 查找这个两个 o 之间的距离固定是 2
```sql
SELECT name FROM world
 WHERE name LIKE '%o__o%'
```
## 1.10 _ 实践

* 四个固定字符

```sql
SELECT name FROM world
 WHERE name LIKE '____'
```
## 1.11 查询（进阶）
* 查找国家名字和其首都名字相同的国家。
```sql
SELECT name 
FROM world
WHERE name = capital
```


## 1.12 字符拼接
* 查询首都名含有 City 的 name 字段。
* 也可以用 `WHERE capital = concat (name, ' City')` 来拼接字符串但是注意 City 前有个空格！

```sql
SELECT name
FROM world
WHERE capital LIKE '%City'
```

## 1.13 % concat 实践

* 查询首都名字中含有 name 的记录
* 使用 concat 拼接实现查询

```sql
SELECT capital,name
FROM world
WHERE capital LIKE concat('%', name, '%')
```

## 1.14 % 进阶
* 首都名词需要大于国家名词并且需要含有国家名称。
```sql
SELECT capital, name 
FROM world
WHERE capital LIKE concat(name, '%') AND capital <> name
```

## 1.15 REPLACE 应用

* 题意为将首都名称是国家名称的筛出来，从这个范围内想扩展名称显示出来
* REPLACE("整个内容","需要替换的部分","替换后对应的部分") 是替换的意思一共三个参数，第一个参数是需要替换的列，第二个参数是对应的名字，第三个参数则是对应名字替换成的内容。
```sql
SELECT name, REPLACE(capital, name, '')
FROM world
WHERE capital LIKE concat(name, '%') AND capital <> name
```

# 2.0 world 表

## 2.1 查看表格

```sql
SELECT name, continent, population
FROM world
```

## 2.2 where 过滤

* 使用 where 来限制查询范围

```sql
SELECT name FROM world
WHERE population > 200000000
```

## 2.3 人均 GDP
* 计算人均 GDP，即 GDP 总和除去人口即可。
```sql
SELECT name, gdp/population
FROM world
WHERE population > 200000000
```

## 2.4 查询人口
* 查询 South America 地区国家的名字以及国家百万人口的个数。
```sql
SELECT name, population/1000000
FROM world
WHERE continent = 'South America'
```

## 2.5 IN 范围查询

* 查询国家人口
```sql
SELECT name, population 
FROM world
WHERE name IN ('France','Germany' , 'Italy');
```

## 2.6 LIKE
* 查询名字中含有 United 的国家的名字
```sql
SELECT name
FROM world
WHERE name LIKE '%United%';
```

## 2.7 OR

* 两个条件，二者是或的关系。

```sql
SELECT name, population, area
FROM world
WHERE area > 3000000 OR population > 250000000;
```

## 2.8 AND OR
* 两个条件，满足之一就显示。
```sql
SELECT name, population, area
FROM world
WHERE (area > 3000000 AND population < 250000000) OR
(area < 3000000 AND population > 250000000);
```

## 2.9 Round 
* Round 控制精度
```sql
SELECT name, ROUND(population/1000000,2) , ROUND(gdp/1000000000,2)
FROM world
WHERE continent = 'South America';
```

## 2.10 Round ++
* 计算人均 GDP 
```sql
SELECT name, ROUND(gdp/population, -3) 
FROM world 
WHERE gdp > 1000000000000;
```

## 2.11 LENGTH
* 提取出国家名字和首都名字等长的国家名称和首都名称。
```sql
SELECT name, capital
FROM world
WHERE LENGTH(name) = LENGTH(capital);
```

## 2.12 LEFT
* LEFT 提取出记录的固定位数。
* XOR 二者只能有一个成立。
```sql
SELECT name, capital
FROM world
WHERE LEFT(name, 1) = LEFT(capital, 1) XOR name = capital
```

## 2.13 LIKE
* 提取出元音字母
```sql
SELECT name 
FROM world
WHERE name LIKE '%a%' AND name LIKE '%e%' AND name LIKE '%i%' AND name LIKE '%o%' AND name LIKE '%u%' AND name NOT LIKE '% %';
```