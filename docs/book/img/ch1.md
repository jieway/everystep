# 数字图像处理

* [【coursera】Image and Video Processing: From Mars to Hollywood with a Stop at the Hospital](https://www.coursera.org/learn/image-processing/home/welcome) / [【B站搬运】数字图像处理](https://www.bilibili.com/video/BV1j7411i78H)

这个搬运的只有 360P，coursera 有 720P 的。

图像和视频修复技术是如何实现的？
如何移除图片中的人物？
图像如果不经过压缩体积会非常大，需要进行压缩处理，压缩是如何实现的？
一共九周，每周内容相互独立。
• 第一周：了解图像为什么占用了如此庞大的信息。
• 第二周：学习如何进行压缩。
• 第五周：图像分割，背景变换。
什么是数字图像处理？

# 1 - What is image and video processing (part 1)

图像和视频修复技术是如何实现的？

如何移除图片中的人物？

图像如果不经过压缩体积会非常大，需要进行压缩处理，压缩是如何实现的？

一共九周，每周内容相互独立。

- 第一周：了解图像为什么占用了如此庞大的信息。
- 第二周：学习如何进行压缩。
- 第五周：图像分割，背景变换。

什么是数字图像处理？


人眼能够识别的图像所对应的频谱中只是很小的一片区域。而图像的频谱范围是非常大的。

![](https://gitee.com/weijiew/pic/raw/master/img/image.png)

眼睛主要构成：晶状体，角膜，视网膜。

![image.png](https://cdn.nlark.com/yuque/0/2020/png/842912/1604544175181-34cf3a96-7377-470a-9324-b46e4b6c787e.png#align=left&display=inline&height=326&margin=%5Bobject%20Object%5D&name=image.png&originHeight=651&originWidth=719&size=355748&status=done&style=none&width=359.5)

现实世界的图像被投影到视网膜上，而视网膜上又布满了传感器，图像经过传感器最终进入大脑。

传感器分为**锥形传感器**（实线）和**杆状传感器**（虚线）。下图是二者在视网膜之上的密度分布。

![image.png](https://cdn.nlark.com/yuque/0/2020/png/842912/1604544492396-eae23b2b-c58a-4ae2-b208-75e80e5e35bc.png#align=left&display=inline&height=215&margin=%5Bobject%20Object%5D&name=image.png&originHeight=429&originWidth=953&size=194000&status=done&style=none&width=476.5)

**锥形传感器**在中间（小窝fovca）的时候密度达到了顶峰！而在此处看的也是最清晰的位置。在亮光之下看的最清晰，当看不清楚物体时人们移动眼睛的目的也是将投影尽可能的投射在小窝（Fovca）之中。从而达到了看清物体的目的！


**杆状传感器**侧重于**全局轮廓**而非细节，分布较为均匀。同锥形传感器互补。


**盲点：**此处区域没有传感器，成为盲点。

![](https://gitee.com/weijiew/pic/raw/master/img/a1.png)****

不同光照强度下锥状细胞和杆状细胞二者的分布：

![](https://gitee.com/weijiew/pic/raw/master/img/a2.png)

由上图可知低光环境是杆状细胞在感应（圆圈部分），而在高光环境中是锥状细胞在感应。

