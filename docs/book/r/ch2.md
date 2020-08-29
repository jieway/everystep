# 小提琴图

小提琴图允许可视化一个或多个数字变量的分布。

每一个小提琴图代表一个或一组变量。

形状代表变量的密度估计：特定范围内的点越多代表该范围内的音域大。

它和箱线图很像，但是更能深入的理解分布。

小提琴图依靠 ggplot2 中的 geom_violin() 函数实现。

## 第一个例子

```r
# 加载包
library(ggplot2)
# 创建数据表
data <- data.frame(
  name=c( rep("A",500), rep("B",500), rep("B",500), rep("C",20), rep('D', 100)  ),
  value=c( rnorm(500, 10, 5), rnorm(500, 13, 1), rnorm(500, 18, 1), rnorm(20, 25, 4), rnorm(100, 12, 1) )
)
# 绑定并显示数据 
p <- ggplot(data, aes(x=name, y=value, fill=name)) + geom_violin()
# 显示图片
p
```

大致思路是：首先加载 ggplot2 这个包。然后创建数据表格。最后采用 ggplot2 对数据表格进行绑定。

x 轴绑定的是字符 (A,B...), y 轴绑定的是生成的正太分布数字。

API: 

* rep() 函数全称是 reputation 也就是重复的意思 rep("A",500) 就是将字符 A 重复 500 次,后续同理。
* rnorm(n,mean,std) 函数表示生成正太分布, n 表示数据个数, mean 表示均值, std 则表示方差。
* c() 函数的全称是 connect 也就是来连接的意思. 例如下面的例子 :

```r
> c("patient","age","weight","bp", "rating","test")
[1] "patient" "age"     "weight"  "bp"      "rating" 
[6] "test"  
```

* data.frame() 是创建数据表格,在本例中,name 和 value 是自定义的,需要保证二者维度一致。
* ggplot(data,aes()) 函数中 data 表示绑定的数据源,而后面的 aes 则是指定了 x 轴和 y 轴, fill = name 则是表示自动填充颜色,如果不写默认黑白。
* geom_violin() 则表示以小提琴图展示。

## 第二个例子

# 箱线图

因为形状像箱子所以称之为**箱线图**，也称为**盒须图**。

箱线图可以显示一组数据的**最大值**，**最小值**，**中位数**以及**上下四分位数**。

![](https://gitee.com/weijiew/pic/raw/master/img/1435.png)

* 将方框分成两部分的线是中位数，中位数意味着左右两边的数据个数相等。
* 盒子的首尾分别代表上四分位数（Q3）和下四分位数（Q1），也就是整体数据的 75% 和 25% 。
* 上四分位数（Q3）和下四分位数（Q1）之间的距离代表四分位距。
* 除此之外其余部分的点代表极端的异常值。

