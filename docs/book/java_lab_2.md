---
title: Hibernate
date: 2019-07-13 21:13:37
---

## 增

```sql
User user = new User();
        user.setId(1);
        user.setUsername("admin");
        user.setPassword("admin");
```

## 删

```sql
User user = new User();
user.setId(2);

// delete
session.delete(user);
```

## 查

```sql
User user = new User();
user.setId(2);
user.setUsername("user1");
user.setPassword("123-user");

// update
session.update(user);
```

## 工具类
将重复代码块包装成工具类，方便使用。
```java
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.boot.registry.StandardServiceRegistry;
import org.hibernate.boot.registry.StandardServiceRegistryBuilder;
import org.hibernate.cfg.Configuration;
import org.hibernate.Session;
import table.StudentEntity;

import java.util.Properties;

public class Main {
    public static void main(String[] args) {
       Session session =HibernateUtils.openSession();
       Transaction transaction = session.beginTransaction();


       transaction.commit();
       session.close();
    }
}

```
## Session

Session 与Connection类似。
起连接数据库的作用，是与数据库交互的桥梁。
完成增删改查的操作。
但Session不是线程安全，在方法中使用。
**常用API**

 1. 保存方法：Serializable  save（Object obj） （返回ID）
 2. 查询方法： T get(class c,Serializable id)
 3. 查询方法： T load(class c,Serializable id) 
get/load： 的区别：
 1：get 立即加载，发生SQL语句去查询，load 延迟加载。执行到代码时不会立即发生SQL语句去查询，当真正使用到对象时才会发生SQL语句。
 2：当查询不到时，get会返回null，load 则会返回 ObjectNotFoundException。
 3：get 返回真是对象，load 返回代理对象。

## 修改

```java
public class Main {
    public static void main(String[] args) {
       Session session =HibernateUtils.openSession();
       Transaction transaction = session.beginTransaction();

       StudentEntity studentEntity = session.load(StudentEntity.class,2);
       studentEntity.setName("wije2");
       session.update(studentEntity);


       transaction.commit();
       session.close();
    }
```
先查询再修改，也可以直接修改

**查询所有：**

```java
    public static void main(String[] args) {
       Session session =HibernateUtils.openSession();
       Transaction transaction = session.beginTransaction();

       StudentEntity studentEntity =new StudentEntity();
       Query query = (Query) session.createQuery("from StudentEntity ");
        List<StudentEntity> list = query.list();
        for (StudentEntity studentEntity1: list){
            System.out.println(studentEntity);
        }
       transaction.commit();
       session.close();
    }
```

## 删除

```java
public class Main {
    public static void main(String[] args) {
       Session session =HibernateUtils.openSession();
       Transaction transaction = session.beginTransaction();

       StudentEntity studentEntity = session.load(StudentEntity.class,9);
       session.delete(studentEntity);


       transaction.commit();
       session.close();
    }
}
```
先查询再删除（级联删除），也可以直接删除，但推荐前者。
## Transaction
事务对象，两个API。
如果不配置c3p0，可以不写。内置连接池可以提交，但最好加上。
 1. commit()
 2. rollback()


## 持久化类
持久化类： 将内存的的对象保存到数据库中，简而言之就是Java类+映射文件。
## 编写规则

 1. 对持久化类提供一个无参构造方法
 2. 属性私有，提供set和get方法
 3. 唯一标识OID
 4. 使用包装类类型（使用Interator 而非 int）
 5. 持久化类不能用final修饰
## 持久化类的三种状态
**瞬时态：** 没有被OID，没有被Session所管理。
**托管态：** 有OID，没有被Session所管理。
**持久态：** 有OID，且被Session所管理。
**总而言之：** 两者都占的是持久态，两者都不占的是瞬时态，只占前者的是托管态。

```java
    public static void main(String[] args) {
        Session session = HibernateUtils.openSession();
        Transaction transaction = session.beginTransaction();

        StudentEntity studentEntity = new StudentEntity();//瞬时态
        studentEntity.setName("sss");
        Serializable id = session.save(studentEntity);//持久态

        transaction.commit();
        session.close();
        System.out.println(studentEntity.getName());//托管态
    }
```
## 状态转换
**瞬时态：**
获得：建立对象  StudentEntity studentEntity = new StudentEntity();//瞬时态
瞬时态到持久态：save()  saveOrUpdate(Object obj) 加上OID和Session
瞬时态到托管态： .setId() 加上OID

**持久态：**
获得： get() ，load()，find()，Iterate()。
持久态到瞬时态： delete() 去掉OID和Session
持久态到托管态： close() clear()/清空所有 evict(Object obj)/清空某一个，去掉Session

**托管态：**
获得： setid
托管态到持久态： update()，saveOrUpdate()  加上Session即可
托管态到瞬时态： setid(null); 去掉OID 即可
 
## Hibernate缓存
**一级缓存：**
一级缓存也被称为Session缓存，发送SQL语句先去缓存里面查看有无，若有则不发送SQL语句到数据库。
**一级缓存结构：**
快照区：发送到缓存的请求先去快照区查看，比较差异，若相同就不找找数据库的事儿。  
clear 会清空缓存。


> 这一部分的东西太多，学会了在记录吧。