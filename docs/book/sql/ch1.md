

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

# 3.0 Nobel 表

## 3.1 查询
* 查询 1950 年诺贝尔将得者。
```sql
SELECT yr, subject, winner
FROM nobel
WHERE yr = 1950;
```

## 3.2 AND 

* 查询 1962 年的文学奖得者。

```sql
SELECT winner
FROM nobel
WHERE yr = 1962 AND subject = 'Literature'
```

## 3.3 Albert Einstein
* 查询爱因斯坦得奖的年份和科目。
```sql
SELECT yr,subject
FROM nobel
WHERE winner = 'Albert Einstein'
```

## 3.4 Peace
* 查询 2000 以后的诺贝尔和平奖得者。
```sql
SELECT winner
FROM nobel
WHERE subject = 'Peace' AND yr >= 2000
```

## 3.5 Literatur
* 查询 [1980,1989] 年之间的诺贝尔文学奖得者。 
```sql
SELECT yr,subject,winner
FROM nobel
WHERE subject  = 'Literature' AND yr >= 1980 AND yr <= 1989
```

## 3.6 President
* 查询几个总统获得诺贝尔文学奖的详细信息
```sql
SELECT * 
FROM nobel
WHERE winner IN ('Woodrow Wilson',
                  'Theodore Roosevelt',
                  'Jimmy Carter','Barack Obama')
```
## 3.7 LIKE
* LIKE 用于 WHERE 子句中，一般用于模糊查询。
* 搜索 John 开头的得奖者。

```sql
SELECT winner
FROM nobel
WHERE winner Like 'John%'
```

## 3.8 ＡＮＤ／ＯＲ
```sql
SELECT yr, subject,winner
FROM nobel
WHERE subject = 'Physics' AND yr = 1980 OR subject = 'Chemistry' AND yr = 1984;
```

## 3.9 NOT IN

```sql
SELECT yr, subject, winner
FROM nobel
WHERE subject NOT IN ('Chemistry', 'Medicine') AND yr = 1980;
```

## 3.10 AND OR

```sql
SELECT yr,subject, winner
FROM nobel
WHERE (subject = 'Medicine' AND yr < 1910) OR (subject = 'Literature' AND yr >= 2004); 
```

## 3.11 PETER GRÜNBERG

```sql
SELECT *
FROM nobel
WHERE winner = 'PETER GRÜNBERG'
```

## 3.12 转义字符
* \ 的处理使得 ' 不被当作结束符号处理。
```sql
SELECT *
FROM nobel
WHERE winner = 'EUGENE O\'NEILL'
```
## 3.13 Sir 开头

```sql
SELECT winner, yr, subject
FROM nobel
WHERE winner LIKE ('Sir%');
```

## 3.14 OREDER BY


* ORDER BY 对结果集进行排序。

```sql
SELECT winner, subject
FROM nobel
WHERE yr=1984
ORDER BY subject IN ('Physics','Chemistry'), subject, winner
```

# 4.0 子查询

## 4.1 嵌套
* 修改一下国家名称即可。
```sql
SELECT name 
FROM world
WHERE population >
     (SELECT population FROM world
      WHERE name='Russia')
```
## 4.2 嵌套 + 范围
* 首先看要查什么，查名字，其次看条件两个条件分别是人居GDP和欧洲。这样一步步分解就写出来了。
```sql
SELECT name
FROM world
WHERE gdp/population > (
  SELECT gdp/population
  FROM world
  WHERE name = 'United Kingdom'
  ) 
AND  continent = 'Europe';
```

## 4.3 ORDER BY

```sql
SELECT name, continent 
FROM world 
WHERE continent IN (
    SELECT continent 
    FROM world 
    WHERE name IN ('Argentina', 'Australia') 
    ) 
ORDER BY name;
```

## 4.4 嵌套
* 找出两个国家的人口，然后比对即可。
```sql
SELECT name,population
FROM world
WHERE 
population > (SELECT population FROM world WHERE name = 'Canada') 
AND
population < (SELECT population FROM world WHERE name = 'Poland');
```

## 4.5 百分比
* concat 维护一个字段，这里是百分比
```sql
SELECT name, CONCAT(ROUND(population/(SELECT population FROM world WHERE name = 'Germany')*100), '%') 
FROM world 
WHERE continent = 'Europe';
```

## 4.6 ALL

* ALL 是全部满足才成立， any 是满足一个即成立
```sql
SELECT name
FROM world
WHERE gdp > ALL(SELECT gdp FROM world WHERE gdp > 0 AND continent = 'Europe');
```

## 4.7

```sql
SELECT continent, name, area 
FROM world x
WHERE area >= ALL(SELECT area FROM world y WHERE x.continent = y.continent AND y.area>0);
```

## 4.8 

```sql
SELECT continent, name 
FROM world x 
WHERE name <= ALL(SELECT name FROM world y WHERE x.continent = y.continent);
```

## 4.9

```sql
SELECT name, continent, population 
FROM world 
WHERE continent IN (SELECT continent FROM world  x WHERE 25000000 >= (SELECT MAX(population) FROM world y WHERE x.continent = y.continent));
```

# 5.0 聚合函数
一些聚合函数的使用。
## 5.1 SUM

```sql
SELECT SUM(population)
FROM world;
```
## 5.2 DISTINCT

```sql
SELECT DISTINCT(continent)
FROM world;
```

## 5.3 SUM+1

```sql
SELECT SUM(gdp)
FROM world
WHERE continent = 'Africa';
```

## 5.4 COUNT

```sql
SELECT COUNT(name)
FROM world
WHERE area > 1000000;
```

## 5.5 IN

```sql
SELECT SUM(population)
FROM world
WHERE name IN ('Estonia', 'Latvia', 'Lithuania')
```
## 5.6 GROUP BY
* GROUP BY 针对 continent 进行分组，结合 COUNT 来使用。
```sql
SELECT continent,COUNT(name)
FROM world
GROUP BY continent;
```

## 5.7 GROUP BY ++

```sql
SELECT continent,COUNT(name)
FROM world
WHERE population  >= 10000000
GROUP BY continent;
```

## 5.8 HAVING

* HAVING 用于控制聚合函数的条件筛选，WHERE 功能不够用了。
```sql
SELECT continent
FROM world
GROUP BY continent
HAVING SUM(population) >= 100000000;
```

# 6.0 

## 6.1 连接查询
```sql
SELECT matchid,player
FROM goal 
WHERE teamid LIKE 'GER';
```

## 6.2 query

```sql
SELECT id,stadium,team1,team2
FROM game
WHERE id = 1012;
```

## 6.3 JOIN

```sql
SELECT  player, teamid, stadium, mdate
FROM game JOIN goal ON (game.id=goal.matchid)
WHERE teamid = 'GER';
```

## 6.4 JOIN

```sql
SELECT team1, team2, player
FROM goal JOIN game ON ( goal.matchid = game.id)
WHERE player LIKE 'Mario%';
```

## 6.5 JOIN

```sql
SELECT player, teamid, coach, gtime
FROM goal JOIN eteam on (goal.teamid = eteam.id)
WHERE gtime<=10;
```

## 6.6 

```sql
SELECT mdate, teamname
FROM game
JOIN eteam ON (game.team1 = eteam.id)
WHERE coach = 'Fernando Santos'
```

## 6.7

```sql
SELECT player
FROM goal
JOIN game ON (goal.matchid = game.id)
WHERE stadium = 'National Stadium, Warsaw'
```

## 6.8 

```sql
SELECT DISTINCT player
FROM game
JOIN goal ON goal.matchid = game.id
WHERE (team1 = 'GER' OR team2 = 'GER')
AND teamid <> 'GER'
```

## 6.9 

```sql
SELECT teamname, COUNT(player) goals_scored
FROM eteam JOIN goal ON eteam.id = goal.teamid
GROUP BY teamname
```

## 6.10

```sql
SELECT stadium, COUNT(player) goals_scored
FROM game
JOIN goal ON game.id = goal.matchid
GROUP BY stadium
```

## 6.11

```sql
SELECT matchid, mdate, COUNT(player) goals_scored
FROM game
JOIN goal ON goal.matchid = game.id
WHERE (team1 = 'POL' OR team2 = 'POL')
GROUP BY goal.matchid
```

## 6.12

```sql
SELECT matchid, mdate, COUNT(player)
FROM game
JOIN goal ON game.id = goal.matchid
WHERE teamid = 'GER'
GROUP BY game.id
```

## 6.13 

```sql
SELECT mdate,
  team1,
  SUM(CASE WHEN teamid=team1 THEN 1 ELSE 0 END) score1,
  team2,
  SUM(CASE WHEN teamid=team2 THEN 1 ELSE 0 END) score2
FROM game JOIN goal ON goal.matchid = game.id
GROUP BY game.id
ORDER BY mdate, matchid, team1, team2
```

## 1.14 
## 1.0 条件查询
[595. 大的国家](https://leetcode.com/problems/big-countries/)


### 思考
```sql
# Write your MySQL query statement below
SELECT 
name, population, area
FROM 
World
WHERE 
area > 3000000 or population > 25000000;
```

## 2.0 性别交换
[627. Swap Salary](https://leetcode.com/problems/swap-salary/)

### 思考
如果没有 ELSE sex 会将 sex 置空，但是这道题性别只有男女，所以不写也对。

```sql
# Write your MySQL query statement below
UPDATE salary
SET sex =
CASE sex
WHEN 'f' THEN 'm'
when 'm' THEN 'f'
ELSE sex
END
```

## 3.0 条件查询
[620. Not Boring Movies](https://leetcode.com/problems/not-boring-movies/)

### 思考
ASC 升序 ， DESC 降序。默认 ASC
```sql
# Write your MySQL query statement below
SELECT *
FROM 
    cinema
WHERE
    id % 2 = 1 
    AND description != "boring"
ORDER BY 
    rating DESC;
```

## 4.0 统计课程
[596. Classes More Than 5 Students](https://leetcode.com/problems/classes-more-than-5-students/)
### 思考
HAVING 针对组筛选，WHERE 针对行筛选
```sql
# Write your MySQL query statement below
SELECT 
    class
FROM
    courses
GROUP BY
    class
HAVING 
    COUNT(DISTINCT student) >= 5;
```

## 5.0 统计重复的 email
[182. Duplicate Emails](https://leetcode.com/problems/duplicate-emails/)
### 思考
```sql
# Write your MySQL query statement below
select
    Email
from
    Person
group by 
    Email
having 
    count(*) >= 2;
```

## 6.0 连接查询
[196. Delete Duplicate Emails](https://leetcode.com/problems/delete-duplicate-emails/)

### 思考
```sql
# Write your MySQL query statement below
delete
    p1
from
    Person p1 , Person p2
where 
    p1.Email = p2.Email and p1.Id > p2.Id
;
```

## 7.0 第二高的值

[176. 第二高的薪水](https://leetcode-cn.com/problems/second-highest-salary/)

### 思考

首先找到最大值，然后在从中找出比最大值小的最大值就是第二高的值。

```sql
# Write your MySQL query statement below
select max(Salary)  SecondHighestSalary
from Employee
where Salary < (select max(Salary) from Employee)
```

## 8.0 第 n 高的值

[177. 第N高的薪水](https://leetcode-cn.com/problems/nth-highest-salary/)

### 思考
limit n子句表示查询结果返回前n条数据

offset n表示跳过x条语句

limit y offset x 分句表示查询结果跳过 x 条数据，读取前 y 条数据

```sql
CREATE FUNCTION getNthHighestSalary(N INT) RETURNS INT
BEGIN
	SET N = N - 1;
	RETURN (
	 SELECT DISTINCT salary 
     FROM employee 
     ORDER BY salary DESC 
     LIMIT N, 1
	);
END
```


## 9.0 收入超过经理的员工

[181. 超过经理收入的员工](https://leetcode-cn.com/problems/employees-earning-more-than-their-managers/)

### 思考

```sql
# Write your MySQL query statement below
select Name Employee
from Employee AS a
where Salary > (
    select Salary
    from Employee
    where Id = a.Managerid
)
```

## 10.0 两个表查询
(183. 从不订购的客户)[https://leetcode-cn.com/problems/customers-who-never-order/]

### 思考

```sql
# Write your MySQL query statement below
select Name Customers
from Customers
WHERE Id NOT IN (
  SELECT CustomerId 
  FROM Orders 
  GROUP BY CustomerId
);
```

## 11.0 日期处理

[197. 上升的温度](https://leetcode-cn.com/problems/rising-temperature/)

### 思考

```sql
# Write your MySQL query statement below
select a.Id 
from  Weather as a join Weather as b on a.Temperature > b.Temperature and dateDiff(a.RecordDate,b.RecordDate) = 1 
```