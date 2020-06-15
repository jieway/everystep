# 准备

通过这个网站 [start.spring.io](https://start.spring.io/) 可以生成一个 spring 骨架。

网站中针对 spring 有很多选项，例如 maven 还是 gradle ， JDK 版本是 1.8 还是其他。总之根据实际需求，生成一个 spring 骨架。

用 idea 直接打开下载好的文件。

# Hello World!

打开后需要加载一段时间，最终的目录结构如图所示，其中 DemoApplication 则是整个启动类。

![](https://gitee.com/weijiew/pic/raw/master/img/20200615204410.png)

修改 DemoApplication 如下，如果报错就 alt + enter 将所需内容导入极客解决，然后运行程序。

```java
@SpringBootApplication
@RestController
public class DemoApplication {

	public static void main(String[] args) {

		SpringApplication.run(DemoApplication.class, args);
	}

	@RequestMapping("/hello")
	public String hello() {
		return "Hello Spring";
	}
}
```

访问 `http://localhost:8080/hello` 看到 "Hello Spring" ， 说明访问成功。





