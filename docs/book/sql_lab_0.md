# 数据库

## 概念

数据库是保存存储数据的容器，数据库里面有很多张表，表是结构化的文件用来储存具体信息。

表中存在很多行，每一行代表一条数据，同时也有很多列，每一列代表一个字段，一个或多个列组成了表。

数据库和表的布局以及特征的信息称为模式。

一张表中需要存在一个可以唯一表示的列，这个列称为主键，任何一个字段都可以作为主键，但是必须满足主键不能为空且主键必须唯一的性质。

> 如果多条 sql 语句需要在结尾加上分号(;) 单条可以不加，有些数据库可能需要加，所以最好加上！
> sql 语句大小写都行，但是开发人员喜欢关键字大写而列名表名小写，这样便于调试阅读。


# 第一章：绪论

## 系统概述

### 四个概念
>  数据，数据库，数据库管理系统，数据库系统
- 数据：描述事物的符号记录，数据的含义称为数据的语义，数据和其语义不可分割。
- 数据库：通俗理解为存放数据的仓库。
- 数据库管理系统：再存储数据库的基础上增添了很多功能，建立，存储，维护，操纵。
- 数据库系统： 数据，数据库，数据库管理系统的合集。

### 发展历史
- 人工管理阶段
- 文件系统
- 数据库系统
三者的**特点**：
- 人工管理阶段： 数据无法长期保存，数据冗余大，不具备可移植性，独立性差（不具备泛型）。
- 文件系统： 数据可以长期保存，但是数据冗余大，数据独立性差的问题仍然存在。
- 数据库系统： 数据可以长期保存，冗余度低，可共享，独立性高。
- 从文件系统到数据库系统标志着数据管理技术的飞跃。

### 数据模型
- 概念模型：用于设计数据库。
特点：实体，属性，码，实体型，联系。
- 逻辑（物理）模型：用于管理数据库。
特点：数据结构，数据操作，数据完整性约束。
常用数据模型：
- 层次模型：有且只有一个节点没有双亲节点称为根节点。除根节点以外的其他节点有且只有一个双亲节点。
- 网状模型：一个节点可以有多个双亲，允许多个节点无双亲。
- 关系模型
- 对象关系模型
- 版结构化数据模型

### 数据库系统结构
- 模式是相对稳定的，而实例是相对变动的。
- 一个书库只能有一个内模式和模式，但可以有多个外模式。
- 数据库的三级模式：内模式，模式，外模式。

# 第二章：关系数据库
## 关系的定义
- 域：相同数据元素的集合。例如整数，偶数的概念。
- 笛卡儿积：关于域的运算，其中的一条数据称为元组，元组中的属性称为分量。
- 关系：域和域之间的关系，关系分为一元关系和多元关系，而关系是笛卡儿积的子集。
- 主码：可以唯一标识某个元组（一条数据）的属性。
- 关系的性质：
    a. 同列的数据类型相同且来自同一个域。
    b. 不同列可出自同一个域。
    c. 列序行序可变。
    d. 主码是独一无二的。
    e. 分量必须是原子值，即不允许表中套表。
> 2020/1/3
## 数据的操作：
### 操作方式：
- 查询：选择，投影，并，差，笛卡儿积
- 插入
- 删除
- 修改
- 特点： 针对集合，操作对象和结果都是集合。
- 分类： 关系代数，关系演算，结构化查询。
### 关系的完整性
- 实体完整性：必须要有主键，唯一且不为空。
- 参照完整性：实现了表于表之间的联系，取值可以为空或者为另一张表的值。
- 用户定义完整性：用户针对某些属性设定限制，例如性别为男女。
### 关系代数
- 三大要素：运算对象，运算符，运算结果。
- 传统的集合运算：并，差，交，笛卡儿积。
- 专门的关系运算：选择，投影，连接，除。
- 选择： 从行的角度针对某个属性进行的查询结果。
- 投影： 从列的角度进行查询。
# 数据库语言SQL
## 概述
### 产生与发展
- 创始：由Boyce和Chamberlin提出，IBM研制。
- 特点：集数据查询，数据操纵，数据定义，数据控制与一体。
- 非过程化语言，面向集合操纵，语法结构统一，语言简洁。
## 数据定义
- 一个数据库管理系统实例可以创建多个数据库，一个数据库可以创建多个模式，一个模式下通常包含多个表，视图和索引。
### 创建
模式的定义和删除
模型：
```sql
// 为指定用户创建模式。
CREATE SCHEMA "模式名" AUTHORIZATION 用户名;
// 如果没有指名，默认模式名为用户名。
CREATE SCHEMA AUTHORIZATION 用户名;
```
例子：
```sql
// 指定为用户 WANG 创建 S-T 模式
CREATE SCHEMA "S-T" AUTHORIZATION WANG;
// 如果没有指定模式名，则默认为用户名。
CREATE SCHEMA AUTHORIAZTION WANG;
CREATE SCHEMA "S-T" AUTHORIZATION WANG;
CREATE SCHEMA "PP" AUTHORIZATION WANG;
CREATE SCHEMA "QQ" AUTHORIZATION WANG;
CREATE SCHEMA "PP" AUTHORIZATION WANG;
CREATE SCHEMA "QQ" AUTHORIZATION WANG;
```
**删除：**
模型:
- CASCADE: 级联删除，删除下面全部关于这个模式的所有表。
- RESTRICT: 先查看当前模式下是否定义了数据对象，如果有则不执行删除，反之删除。
```sql
DROP SCHEMA 模式名 CASCADE/RESTRICT
DROP TABLE 表名 CASCADE/RESTRICT
```
例子：
```sql
DROP SCHEMA SS CASCADE;
DROP SCHEMA KK CASCADE;
DROP SCHEMA QQ CASCADE;
DROP SCHEMA CN CASCADE; 
DROP SCHEMA S-T CASCADE;
DROP SCHEMA PP RESTRICT;
DROP SCHEMA KK RESTRICT;
DROP SCHEMA QQ RESTRICT;
DROP SCHEMA CN RESTRICT;
DROP SCHEMA S-T RESTRICT; 
DROP TABLE STUDENT CASCADE;
DROP TABLE COURSE CASCADE;
DROP TABLE WORK RESTRICT; 
```
### 表的定义
模型：
```sql
CREATE TABLE 表名(
    字段名 字段类型 约束（可以不填），
    字段名 字段类型 约束 ,
    //主键约束，
    PRIMARY KEY (当前表中属性名);
    //外键约束
    FOREIGN KEY (当前表中属性名) REFERENCES 另外一张表名（表中属性名）
    //注意结尾没有逗号
);
```
例子：
```sql
CREATE TABLE STUDENTS(
    Sno CHAR(9) PRIMARY KEY,
    Sna CHAR(20) UNIQUE, 
    Ssex CHAR(2) ,
    PRIMARY KEY (Sno),
    FOREIGN KEY (Sno) REFERENCES WEIJIE(Wno),
    FOREIGN KEY (Sna) REFERENCES WEIJIE(Wname)
);
CREATE TABLE WEIJIE(
    Wno CHAR(12) PRIMARY KEY,
    Wname CHAR(20) NOT NULL,
    Whight FLOAT,
    Wweight FLOAT
);
CREATE TABLE COURSE(
    Cno CHAR(20) PRIMARY KEY,
    Cname CHAR(10) ,
    Cpno CHAR(20) ,
    Ccredit int 
);
CREATE TABLE TAB(
    COL1 CHAR(20) PRIMARY KEY,
    COL2 CHAR(20) ,
    COL3 INT
);
```
### 数据查询
模型
```sql
SELECT 属性名
FROM 表明
WHERE 限制条件
```
例子
```sql
// 3.16 查询全体学生的学号和姓名
SELECT Sno ,Sname
FROM Student;
// 3.17 查询全体学生的学号，姓名，系别
SELECT Sno,Sname,Sdept
FROM Student;
// 3.18 查询全体学生的所有记录
SELECT * 
FROM Student;
// 3.19 查询经过计算后的值
SELECT Sname,2020-Sage
FROM Student;
// 3.20 
SELECT Sname,"Birthday :" ,2014 - Sage,LOWER(Sdept)
FROM Student;
// 指定别名
SELECT Sname,"Birth :" Birthday , 2014 - Sage,LOWER(Sdept)
FROM Student;
// 3.21 查询选修课程的学生号
SELECT Sno 
FROM SC;
// 消除重复行
SELECT DISTINCT Sno
FROM SC;
// 3.22 限制条件
SELECT Sname
FROM SC;
WHERE Sdept = 'CS';
// 3.23 例子
SELECT Sname , Sage
FROM Student
WHERE Sage < 20;
// 3.24 例子
SELECT DISTINCT Sno
FROM SC
WHERE Grade < 60;
// 3.25 例子
SELECT Sname , Sdept , Sage
FROM Student
WHERE Sage  BETWEEN 20 AND 23;
// 3.26 例子
SELECT Sname , Sdept , Sage
FROM Student
WHERE Sage NOT BETWEEN 20 AND 23;
// 3.27 例子
SELECT Sname , Ssex
FROM Student
WHERE Sdept IN ('CS','MA','IS');
// 3.28 例子
SELECT Sname ,Ssex
FROM Student
WHERE Sdept NOT IN ('CS','MA','IS');
// 字符串匹配
% : 代表任意长度。
_ : 代表长度为一。
// 3.29
SELECT * 
FROM Student
WHERE Sno = "1234567898";
// 3.30
SELECT *
FROM Student
WHERE SNAME = "魏%";
// 3.31
SELECT *
FROM Student
WHERE SNAME = "欧阳_";
// 3.32
SELECT *
FROM Student
WHERE SNAME = "_阳%";
// 3.33
SELECT *
FROM Student
WHERE SNAME NOT LIKE "_阳%";
// 3.34 查询DB_design \ 为换码字符，表示后面一位不是通配符。
SELECT Cno,Credit 
FROM Course
WHERE Cname LIKE 'DB\_design';
// 3.39 ORDER BY 某列属性升序或降序排列 , DESC 降序。
SELECT Sno , Grade
FROM SC 
WHERE Cno = '3'
ORDER BY Grade DESC;
// 3.40 按照系号升序，年龄降序排列
SELECT *
FROM Student 
ORDER BY Sdept , Sage DESC;
// 3.41 聚集函数，统计个数
SELECT COUNT(*)
FROM Student;
// 3.42 剔除重复，计算个数
SELECT COUNT(DISTINCT Sno)
FROM SC;
// 3.43 AVERAGE
SELECT AVG(Grade)
FROM SC
WHERE Cno = '1';
```
### 数据更新
```sql
// 上下匹配
INSERT 
INTO Student (Sno,Sname,Ssex,Sdept,Sage)
VALUES()
```
例子
```sql
// 上下匹配
INSERT 
INTO Student (Sno,Sname,Ssex,Sdept,Sage)
VALUES('123456','王王','男','CS','25')
```
### 修改数据
模型
```sql
UPDATE 表名
SET 列名
WHERE 条件
```
例子
```sql
UPDATE Student
SET Sage = 20
WHERE Sno = '123456';
```
### 修改表
模型
```sql
ALTER TABLE 表名 具体修改
```
例子
```sql
// 增加一列数据，默认为空
ALTER TABLE Student ADD s_entrance DATE;
// 增加一个约束
ALTER TABLE Course ADD UNIQUE(Cname);
// 修改列的数据类型
ALTER TABLE Course ALTER COLUMN Sage INT;
ALTER TABLE Course ADD 
```
### 视图
我所理解的视图： 提前定义好的查询，可以直接用，简化了查询，针对视图还可以再次进行查询。
创建视图：
模型：
```sql
CREATE VIEW 视图名
AS
查询
```
例子：
```sql
CREATE VIEW ALL_STUDENT
AS 
SELECT *
FROM Student
WHERE Sdept = "CS";
```
删除视图：
```sql
//模型
DROP VIEW 视图名
// 例子
DROP VIEW ALL_STUDENT;
DROP VIEW SSS;
```
查询视图
```sql
SELECT Sno 
FROM ALL_STUDENT // 视图名
WHERE Sage < 20 ;
```
更新视图
```sql
UPDATE ALL_STUDENT 
SET Sname = '张三'
WHERE Sno = '123456';
```
```sql
// 作用：针对当前视图进行的插入，修改，删除时要保证满足视图定义中的谓词条件。
with check option
```
# 数据库安全
## 用户身份鉴别：
- 静态口令鉴别
- 动态口令鉴别
- 生物特征鉴别
- 智能卡鉴别
## 多层存取控制：
- 自主存取控制：
    自定义，不同用户不同权限，权限可以转给别人。
- 强制存取控制
    对数据对象设定等级，等级之下不能使用等级之上的权限，拥有当前等级的权限同时拥有当前等级之下的权限。
## 自主存取控制
```sql
//授予 with garnt option 可以把当前权限授予给别人
grant select on table student to u1 with grant option;
grant insert on table student to u2;
//取消 cascade取消了u1授予给别人的权限
revoke select on table student from public;
revoke select on table student from u1 cascade;
```
## 强制存取控制
- 仅当主体的许可证级别大于或等于客体的密级时，该主体才能读取相应的客体。
- 仅当主体的许可证级别小于或等于客体的密级时，该主体才能写相应的客体。
## 安全标准
TCSEC / CC
强度递增
TCSEC : D, C1, C2, B1, B2, B3, A1.
CC : ELA1, ELA2, ELA3, ELA4, ELA5, ELA6, ELA7.
C1 / C2 == ELA2 / ELA3 .
B1 / B2 / B3 == ELA4 / ELA5 / ELA6 .
## 视图
把数据查看权限以视图的方式提供给不同用户，相当于采用视图包装一下，把敏感数据隐藏起来。
## 审计
把用户对数据库的所有操作都记录下来放入审计日志中。
审计级别： 用户级审计，系统级审计。
## 数据加密
### 存储加密
- 透明存储加密：用户可以看见真实信息
- 非透明存储加密：用户看不到真实信息
### 传输加密
- 链路加密：报文报头均加密。
- 端到端加密：只加密报文，不加密报头。
# 数据库完整性
实体完整性，参照完整性，用户定义完整性。
# 关系数据库理论
# 数据库设计
# 数据库编程

## 创建数据库流程实例
### 创建数据库
```sql
CREATE DATABASE SPJ
```
### 创建表
```sql
CREATE TABLE S(
    SNO CHAR(9) PRIMARY KEY,
    SNMAE CHAR(20),
    STATUS CHAR(10),
    SCITY CHAR(20),
);
CREATE TABLE P(
    PNO CHAR(11) PRIMARY KEY,
    PNAME CHAR(20) ,    
    COLOR CHAR(10),
    WEIGHT CHAR(20)
);
CREATE TABLE J(
    JNO CHAR(20) PRIMARY KEY,
    JNAME CHAR(20) ,
    CITY CHAR(10)
);
CREATE TABLE SPJ(
    Sno CHAR(9),
    Pno CHAR(20),
    Jno char(20),
    QIY SMALLINT,
    //主键约束
    PRIMARY KEY(Sno,Pno,Jno),
    //外键约束
    FOREIGN KEY(Sno) REFERENCES S(Sno),
    FOREIGN KEY(Pno) REFERENCES P(Pno),
    FOREIGN KEY(Jno) REFERENCES J(Jno)
)
```
### 
### 
