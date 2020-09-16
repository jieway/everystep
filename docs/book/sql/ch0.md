# T-SQL 语法学习

SQL 没有流程控制分支结构等功能，T-SQL 基于 SQL 增加了这些功能。

SQL 语句大写的原因是在执行时会默认将小写转换为大写，如果代码量较大会导致耗时增加，所以大写可以降低查询执行时间。

全局变量有两个 @@ ，局部变量有一个 @ 。

例如：

```sql
DECLARE @@id int  # 全局变量
DECLARE @name char(10) # 局部变量
```

1.1 声明一个字符变量

```sql
DECLARE @id char(10)
SELECT @id = '10010001'
```

1.2 print

```sql
GO
DECLARE @x CHAR(10)
SET @x = 'LOVEING'
PRINT @x
PRINT '最喜欢的歌曲是：' + @x 
GO
```

1.3 if

```sql
GO
DECLARE @a1 int,@a2 int
SET @a1 = 3
SET @a2 = 4
IF @a1 < @a2
PRINT @a1
GO
```

1.4 用Transact-SQL编程：先为两个变量@x和@y赋值，然后求这两个变量的和、差、乘积和商。

```sql
GO
	DECLARE @x int,@y int
	SET @x = 15
	SET @y = 15
	PRINT @x + @y
	PRINT @x - @y
	PRINT @x * @y
	PRINT @x / @y
GO
```

1.5 编程计算1+2+3+4+5+...+100。

```sql

	DECLARE @a int,@sum int
	SET @a = 1
	SET @sum = 0
	while @a <=100
	BEGIN
	SET @sum = @sum + @a
	SET @a = @a + 1
	END
	PRINT @sum

```

1.6 编程计算S=1+(1+3)+(1+3+5)+...+(1+3+5+...+51)。

```sql
DECLARE @X int, @sum int, @temp int

SET @X = 1
SET @sum = 0
SET @temp = 0

while @X <= 51
	begin
		SET @temp = @temp + @X
		SET @sum = @sum + @temp
		SET @X = 2*@X + 2
	end
print @sum
```

1.7 输出100～200之间既能被3整除，又能被5整除的数。

```sql
DECLARE @x int 
SET @x = 100
WHILE @x <= 200
BEGIN
	if @x%3 = 0 and @x%5 = 0
	BEGIN
		print @x 
	END
	SET @x = @x + 1
END
```