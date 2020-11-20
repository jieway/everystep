# 1.0 开发笔记 IDEA 创建 Spring-Boot 项目

> 该内容为实验性质，后续做出来后会剥离，作为文档的一部分。

## 1.1 创建项目

打开 IDEA

![](https://gitee.com/weijiew/pic/raw/master/img/20201112230922.png)

![](https://gitee.com/weijiew/pic/raw/master/img/20201112231027.png)

设置好组织名和项目名称后，注意 JDK 版本。之后 next 。

![](https://gitee.com/weijiew/pic/raw/master/img/20201112231220.png)

注意要将 spring web 选上。

![](https://gitee.com/weijiew/pic/raw/master/img/20201112231325.png)

右下角会弹出窗口，点 enable-auto 即可，表示自动加载 Maven 依赖。

项目结构如下，重点部分以标注。

```
├── HELP.md 
├── lms.iml
├── mvnw
├── mvnw.cmd
├── pom.xml
└── src 源代码
    ├── main   
    │   ├── java
    │   │   └── com
    │   │       └── weijiew
    │   │           └── lms
    │   │               └── LmsApplication.java 项目主程序
    │   └── resources
    │       ├── application.properties 所有配置都在这个文件中设置
    │       ├── static  静态文件存放位置
    │       └── templates
    └── test
        └── java
            └── com
                └── weijiew
                    └── lms
                        └── LmsApplicationTests.java
```

新增四个包，分层的思想，模块化，包名如下，至于每一层是什么后面会解释。

![](https://gitee.com/weijiew/pic/raw/master/img/20201112232454.png)

## 1.1 运行程序

LmsApplication.java 是主类，直接运行。注意 spring boot 中内嵌了一个 tomcate 。

根据输出现实，访问 8080 端口。即 ： http://localhost:8080/

![](https://gitee.com/weijiew/pic/raw/master/img/20201112233045.png)

出现如下内容说明启动成功。

![](https://gitee.com/weijiew/pic/raw/master/img/20201112233151.png)

## 1.3 编写程序

在 Controller 下创建类 `HelloController.java` 。

```java
package com.weijiew.lms.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @Description
 * @ClassName HelloController
 * @Author jie wei
 * @date 2020.11.12 23:20
 */

@RestController
public class HelloController {

    @GetMapping("/hello")
    public String hello() {
        return "Hello";
    }
}
```

重新启动，然后访问 `http://localhost:8080/hello` 可以看到 hello 字样。

## 1.4 打包

编写好之后需要部署，那么首先需要将程序打包。采用 maven 进行打包。

![](https://gitee.com/weijiew/pic/raw/master/img/20201112234059.png)

最后会出现 BUILD SUCCESS 字样，说明打包成功。该 Jar 包位于 target 目录下。

在 idea 终端中使用命令 `java -jar target/lms-0.0.1-SNAPSHOT.jar` 即可启动 jar 包。

![](https://gitee.com/weijiew/pic/raw/master/img/20201112234334.png)

访问 `http://localhost:8080/hello` 也能看到 hello 字样，证明打包成功。

运行这个包会单独占一个进程，项目比较大的话会比较吃内存。
## 1.5 总结

完成了一次完整的流程，从创建项目到最后打包。