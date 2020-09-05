# 轴

```r
# 导入
library(ggplot2)

# 绑定数据，设定采用 geom_point() 绘图。
basic <- ggplot(mtcars,aes(x=mpg,y=wt)) + geom_point()

# 显示图像
basic

# xlab 设定了 x 轴的标题， xlim 设定了 x 轴的范围
basic + xlab("mpg value") + xlim(0,50)
```

## 自定义轴

函数 theme() 可以**自定义** ggplot2 图标的所有部分。

`axis.title` 控制了轴标题外貌。因为是文本，所以将其采用 element_text 进行包装。

```r
basic + theme(axis.title = element_text(angle = 90,color = "red", size = 15, face = 3))
```

angle 表示标题旋转 90 度， color 即为颜色， size 表示尺寸，face 表示位置。

```r
basic + theme(axis.title.x = element_text( angle = 90, color="red", size=15, face=3))
```

`axis.title.x` 表示只修改 x 轴。

## axis.text

自定义坐标轴刻度。

```r
basic + theme(axis.text = element_text(angle = 90 , color = "blue", size = 15, face = 3))
```

## axis.ticks 和 axis.line

```r
basic + theme(axis.ticks = element_line(size = 2, color = "red"),axis.ticks.length = unit(.5,"cm"))
```

修如下部分：

![](https://gitee.com/weijiew/pic/raw/master/img/20200905163842.png)

注意如果是以 line 未单位进行修改，那么采用 element_line 以线为单位进行包装。

```r
basic + theme(axis.line = element_line(size = 3, colour =  "green",linetype = 2))
```

```r
ggplot(mtcars,aes(x=mpg,y=wt)) + 
    geom_point() + 
    theme(
        axis.title = element_text(
            color = "red",
            size = 15,
            face = 2),
        axis.line = element_line(
            size = 3,
            colour = "green",
            linetype = 2),
        axis.text = element_text(
            angle = 90,
            color = "blue",
            size=15,
            face=2)
        )
```

# 颜色

```r
ggplot(mtcars,aes(x=drat)) + 
    geom_density(
        color="purple",
        fill= "#69b3a2",
        size=2
    )
```

自动上色。

```r
ggplot(iris, aes(x=Sepal.Length, y=Sepal.Width, color=Species)) +
  geom_point(size=6)
```

# 主题

