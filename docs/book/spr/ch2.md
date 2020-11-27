# 2.0 细节

## 2.1 配置 YAML

SpringBoot 的所有配置均位于此处。遵守的原则是**约定大于配置**，相关约定均在官方文档中。

![](https://gitee.com/weijiew/pic/raw/master/img/20201113170902.png)

通过官方文档可以了解到其中配置选项很多，理解为主，记忆为辅。

配置文件类型分为两种，除了 `application.properties` 之外，还可以写成 `application.yml`，只不过前者的优先级大于后者。而且后者是 yml 语法格式。

下面的一个配置属性二者不同的写法，后者的 yaml 语法格式。

```yaml
server.port=8081

server:
    port: 8081
```

properties 文件写中文会出现乱码问题，需要修改编码方式。

点击 File -> Setting -> File Encodings 修改如图。 

![](https://gitee.com/weijiew/pic/raw/master/img/20201113172754.png)

## 2.2 引入 Lombok

数据库后续会引入，暂时先用数组模拟数据库！

首先引入 Lombok ，在 pom 文件中添加如下依赖。

```
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
        </dependency>
```

lombok 是什么?

本身是一个工具，可以通过注解来消除模板代码。模板代码类似于 set/get 这些方法。

更具体的可以参考这个[回答](https://www.zhihu.com/question/42348457)。

在 pojo 和 dao 文件夹中分别创建 User 类和 UserDao 类。

## 2.3 热部署

热部署就是修改完代码后不必手动重启，重新编译新的代码。工具会根据对应的修改部分进行更新修改部分，自动加载。

### 2.3.1 开启 IDEA 项目自动编译

首先在 `pom.xml` 中添加依赖:

```java
      <dependency>
         <groupId>org.springframework.boot</groupId>
         <artifactId>spring-boot-devtools</artifactId>
         <optional>true</optional> 
         <scope>runtime</scope>
      </dependency>
```

设置三项内容：

![](https://gitee.com/weijiew/pic/raw/master/img/20201120202528.png)

![](https://gitee.com/weijiew/pic/raw/master/img/20201120202557.png)

> ctrl + shift + a (windows 系统),command+shift+alt+/ (mac 系统)

> registry => 勾选compiler.automake.allow.when.app.running

![](https://gitee.com/weijiew/pic/raw/master/img/20201120202941.png)

最后**重启 IDEA** ,此时热部署生效。


# 参考

1. [IDEA-SpringBoot项目设置热部署](https://www.cnblogs.com/shanheyongmu/p/12556924.html)

