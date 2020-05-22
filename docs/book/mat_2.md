# 实验概述
* 实验题目：数据可视化技术
* 实验目的：
* 熟练掌握MATLAB数据可视化的基本操作，熟练掌握MATLAB二维及三维绘图的基本操作，熟练掌握MATLAB特殊图形的绘制，熟练掌握MATLAB交互绘图。
* 实验内容：
1. 二维图形的绘制；
2. 三维图形的绘制；
3. 特殊图形的绘制。
 
## 1. 二维图形的绘制
* plot(x,y,':') 
  * x 表示横坐标向量
  * y 表示纵坐标向量
  * 第三个参数控制线性和颜色，有专门对应表格。

例子 8：在[0,4Π] 内使用点线绘制正弦曲线 $y = sin(x)$

```bash
>> x=0:pi/50:4*pi;
>> y=sin(x);
>> plot(x,y,':')

```
其中冒号(:) 表示图形线型为实线。 

<img src="https://gitee.com/weijiew/pic/raw/master/img/20200521182401.png"/>

例子 9：在 [0,2Π] 内，绘制正弦曲线 $y = sin(x)$ 和余弦曲线 $y = cos(x)$
```bash
>> x = 0: pi/50 :2*pi;
>> y1 = sin(x);
>> y2 = cos(x);
>> plot(x,y1,'k:',x,y2,'b-')
```
其中 k 表示黑色，冒号(:) 表示图形线型为点线，b 表示蓝色，减号(-) 表示图形线型为实线。

<img src="https://gitee.com/weijiew/pic/raw/master/img/20200521184855.png"/>

通过这种方式可以实现在原有图像的基础上新增图像，hold on 命令发出使得在原有图像上新添加图像。hold off 则表示结束这个过程。

```bash
>> x = 0:pi/50:2*pi;
>> y1 = sin(x);
>> plot(x ,y1 , 'k:');
>> plot(x ,y1 , 'k:');
>> hold on
>> y2 = cos(x);
>> plot(x,y2,'b-');
>> hold off
```
关于绘制图像的选项如下：

<img src="https://gitee.com/weijiew/pic/raw/master/img/20200521191358.png"/>

添加细节：

```bash
>> x = 0:pi/50:2*pi;
>> y1 = sin(x);
>> y2 = cos(x);
>> plot(x,y1,'k:',x,y2,'b-');
>> axis([0,2*pi,-1,1])
>> title('正弦与余弦曲线');
>> xlabel('x轴');
>> ylabel('y轴');
>> text(3.1,0.1,'sin(x)');
>> text(1.3,0.4,'cos(x)');
>> legend('sin(x)','cos(x)');
```

绘制子图：简而言之一张图上绘制多张图。subplot(m,n,p); 代表分割成 m 行 n 列的子图，p 代表位置。

例子：绘制 

(1) $y = x^2$; 

(2) $x = y^2$; 

(3) $\frac{x^2}{4} - \frac{y^2}{9} = 1$

(4) $\frac{x^2}{4} - \frac{y^2}{9} = -1 $

```bash
>> subplot(2,2,1);
>> x = -2:0.01:2;
>> y = x.*x;
>> plot(x , y , 'k');
>> title('y=x^2');
>> grid on

>> subplot(2,2,2);
>> x = -2:0.01:2;
>> x = 0:0.01:4;
>> z1 = sqrt(x);
>> z2 = -z1;
>> plot(x,z1,'k',x,z2,'k');
>> title('x = y^2')
>> axis on
>> grid on

>> subplot(2,2,3); 
>> x1 = -5:0.01:-2;
>> u1 = 3*sqrt(x1.*x1/4-1);
>> plot(x1,u1,'k',x1,-u1,'k');
>> hold on
>> x2 = 2:0.01:5;
>> u2 = 3*sqrt(x2.*x2/4-1);
>> plot(x2,u2,'k',x2,-u2,'k');
>> hold off 
>> grid on
>> title('x^2/4 - y^2/9 = 1')
>> axis tight

>> subplot(2,2,4);
>> x = -4:0.01:4;
>> w1 = 3*sqrt(x.*x/4+1);
>> plot(x,w1,'k',x,-w1,'k');
>> axis tight
>> title('x^2/4-y^2/9=-1')
>> grid on
```
<img src="https://gitee.com/weijiew/pic/raw/master/img/20200521202037.png"/>


采用符号函数画图

符号函数存在两种，ezplot 和 fplot

使用 ezplot 来绘制图形：

(1) $y = sinx, x \in [-4\pi，4\pi]$;

```bash
ezplot('sin(x)',[-4*pi,4*pi]); # 第一个参数是函数，第二个参数是定义域。
```
<img src="https://gitee.com/weijiew/pic/raw/master/img/20200521233137.png"/>

(2) $\frac{x^2}{4} - \frac{y^2}{4} = 1 , x \in [-5,5],y \in [-3,3]$;

```bash
>> ezplot('x^2/4 - y^2/9 = 1',[-5,5],[-3,3]);
也可以这样写范围
>> ezplot('x^2/4 - y^2/9 = 1',[-5,5,-3,3]);
```
<img src="https://gitee.com/weijiew/pic/raw/master/img/20200521233404.png"/>

(3) $x^2 + xe^{y^2} - ysinx + ye^{x^2} = 0 ,x \in [-3,3],y \in [-3,3]$;
```bash
ezplot('x^2+x*exp(y^2)-y*sin(x)+y*exp(x^2) = 0',[-3,3,-3,3]); # 注意底数 e 用 exp 表示
```
<img src="https://gitee.com/weijiew/pic/raw/master/img/20200521234056.png"/>

(4) $x = cos^3{t}, y = sin^3{t}, x\in [0,2\pi],y\in[-1,1]$
```bash
ezplot('cos(t)^3','sin(t)^3',[0,2*pi,-1,1]);
```
<img src="https://gitee.com/weijiew/pic/raw/master/img/20200521234225.png"/>

ezplot 
* ezplot(f,[xmin,xmax]) 其中 f 表示函数，第二个参数表示范围，当缺失式默认范围是$[-2\pi,2\pi]$ 。
* ezplot(f,[xmin,xmax,ymin,ymax]) 在上一行的基础上增加了 y 的范围 其中 f 是方程，第二个例子是实例。
* ezplot(x,y,[tmin,tmax]) 其中 $x=x(t) y=y(t)$ 在区间 $tmin<t<tmax$ 范围之内的图形。

使用 fplot 来绘制图形
注意最新版的 matlab `警告: 在以后的版本中，fplot 将不接受字符向量或字符串输入。请改用 fplot(@(x)[sin(x),cos(x)])。 `
(1) $y_1=sin(x),y_2=cos(x),x\in[-2\pi,2\pi]$

```bash
>> fplot(@(x)[sin(x),cos(x)],[-2*pi,2*pi]);
```

<img src="https://gitee.com/weijiew/pic/raw/master/img/20200521235141.png"/>

(2) $y=e^x+sinx,x\in[-1,1]$
```bash
>> fplot(@(x)exp(x)+sin(x),[-2*pi,2*pi]);
```
<img src="https://gitee.com/weijiew/pic/raw/master/img/20200521235234.png"/>

## 2. 三维图形的绘制


$x=2cost$ $y=2sint$ $z=3t$ $t\in[0,10\pi]$ 

```bash
>> t = 0:pi/30:10*pi;
>> x = 2*cos(t);
>> y = 2*sin(t);
>> z = 3*t;
>> plot3(x,y,z);
>> xlabel('x');
>> ylabel('y');
>> zlabel('z');
```
<img src="https://gitee.com/weijiew/pic/raw/master/img/20200521235913.png"/>

其中 plot(x,y,z) 分别对应三个相同维数的向量。同样存在匿名函数 ezplot3 前三个参数分别代表函数，最后一个则是范围。

```bash
>> ezplot3('2*cos(t)','2*sin(t)','3*t',[0,10*pi]);
```

<img src="https://gitee.com/weijiew/pic/raw/master/img/20200522000152.png"/>

绘制三维曲面：

(1) $z=\sqrt{x^2+y^2} x\in[-10,10],y\in[-10,10]$;

(2) $z=\frac{sin\sqrt{x^2+y^2}}{\sqrt{x^2+y^2}},x\in[-8,8],y\in[-8,8]$。


```bash
>> x1 = -10:1:10; # 将自变量离散化
>> y1 = -10:1:10; # 同上
>> [X1,Y1]=meshgrid(x1,y1); # X,Y 元素分别表示所绘制的曲面在 XOY 平面投影点的坐标值。如果 x 为 m 维向量， y 为 n 维向量 那么生成的矩阵维 m*n
>> Z1 = sqrt(X1.^2+Y1.^2); # 计算函数值。
>> mesh(X1,Y1,Z1); # 绘制曲线
```


<img src="https://gitee.com/weijiew/pic/raw/master/img/20200522001619.png"/>

```bash
>> x2=-8:0.5:8;
>> y2=-8:0.5:8;
>> [X2,Y2]=meshgrid(x2,y2);
>> V = sqrt(X2.^2+Y2.^2)+eps; % 防止出现0/0
>> Z2 = sin(V)./V;
>> mesh(X2,Y2,Z2);
```

<img src="https://gitee.com/weijiew/pic/raw/master/img/20200522003418.png"/>

填充颜色：

```bash
>> surf(X2,Y2,Z2);
```

<img src="https://gitee.com/weijiew/pic/raw/master/img/20200522003603.png"/>

从不同角度观察三维图形：

以 $z=sin(xy),x\in[-2,2],y\in[-2,2]$;为例。

(1) $az=37.5\degree$,$el=30\degree$;

(2) $az=0\degree$,$el=90\degree$;

(3) $az=-90\degree$,$el=0\degree$;

(4) 从$[3,-2,5]$ 处观察;

```bash
>> x = -2:0.1:2;
>> y = -2:0.1:2;
>> [X,Y] = meshgrid(x,y);
>> Z = sin(X.*Y);
>> subplot(2,2,1);
>> mesh(X,Y,Z);
>> subplot(2,2,1)
>> subplot(2,2,1);
>> mesh(X,Y,Z);
>> title('az=37.5,el=30');
>> subplot(2,2,2);
>> mesh(X,Y,Z);
>> view(0,90);
>> title('az=0,el=90');
>> subplot(2,2,3);
>> mesh(X,Y,Z);
>> view(-90,0);
>> title('az=-90,el=0');
>> subplot(2,2,4);
>> mesh(X,Y,Z);
>> view([3 -2 5]);
>> title('[x,y,z]=[3,-2,5]');
```

<img src="https://gitee.com/weijiew/pic/raw/master/img/20200522005325.png"/>

默认的缺省方位角为 $-37.5\degree$ 仰角为 $30\degree$ 

绘图函数： ezmesh ezsurf

例子：抛物面 $z=x^2+2y^2$ 与求面 $x^2+y^2+z^2=9$

```bash
>> ezsurf('sqrt(x^2+y^2)',[-2.2,2.2,-2.2,2.2]);
>> ezsurf('sqrt(x^2+y^2)',[-2.2,2.2,-2.2,2.2]);
>> hold on
>> ezsurf('sqrt(8-x^2-y^2)',[-2.2,2.2,-2.2,2.2]);
>> hold off
```

<img src="https://gitee.com/weijiew/pic/raw/master/img/20200522005755.png"/>

特殊图形绘制：

分别使用直角坐标系和对数坐标系绘制变量 x 与 y 曲线图：

```bash
>> subplot(2,2,1);
>> x=0:0.5:5;
>> y=2.^x;
>> plot(x,y,'-s');
>> title('y=2^x');
>> subplot(2,2,2);
>> semilogy(x,y,'-o');
>> title('y=2^x(semilogy)');
>> subplot(2,2,3);
>> x=0.5:0.5:5.5;
>> y=log(x);
>> plot(x,y,'-s');
>> title('y=ln(x)');
>> subplot(2,2,4);
>> semilogx(x,y,'-o');
>> title('y=ln(x)(semilogx)');
```
<img src="https://gitee.com/weijiew/pic/raw/master/img/20200522010820.png"/>


使用双纵坐标绘制曲线 $y=sinx$ 与 $y=3^x$ 。

```bash
>> x = 0:pi/20:2*pi;
>> y = sin(x);
>> z = 2.^x;
>> plotyy(x,y,x,z,'plot','semilogy');
```

<img src="https://gitee.com/weijiew/pic/raw/master/img/20200522231332.png"/>

极坐标图:

(1) $y=2(1-cos\theta)$  (2) $y=3cos4\theta$

```bash
>> subplot(1,2,1);
>> th = 0:pi/20:2*pi; 
>> rh = 2*(1-cos(th));
>> polar(th,rh,'k')
>> title('r=2*(1-cos\theta)')
>> subplot(1,2,2);
>> th = 0:pi/50:2*pi;
>> rh = 3*cos(4*th);
>> polar(th,rh,'k')
>> grid off
>> axis off
>> title('r = 3cos(4\theta)');
```

等高线图：

(1)peaks函数曲面图；
   
(2)peaks二维等高线图n=15；

(3)peaks三维等高线图n=15；

(4)对peaks二维等高线图n=15进行数值标注。

```bash
>> [X,Y,Z]=peaks(30);%peaks为MATLAB自定义函数
>> subplot(2,2,1);
>> surf(X,Y,Z);
>> title('peaks(30)');
>> subplot(2,2,2);
>> contour(Z,15);
>> title('contour of peaks');
>> subplot(2,2,3);
>> contour3(Z,15);
>> title('contour3 of peaks');
>> subplot(2,2,4);
>> C=contour(X,Y,Z,5);
>> clabel(C);
>> title('clabel of peaks');
```

散点图：

```bash
>> x = rand(1,30)*10;
>> b = rand(1,30);
>> y = x+b;
>> scatter(x,y,20,'*')
>> title('scatter');

>> t = 0:pi/10:10*pi;
>> x = 5*t.*cos(t);
>> y = 5*t.*sin(t);
>> z = 2*t;
>> scatter3(x,y,z,20,'o');
>> title('scatter3');
```

5.其他特殊函数图
   a.使用MATLAB生成二维与三维数据点，并绘制以下图形：
(1)条形图；     

(2)箭号图；       (3)统计直方图；
(4)饼图；         (5)火柴杆图；     (6)矢量图；
(7)多边形填充图； (8)区域填充图。

```bash
>> subplot(4,2,1)
>> x = 1:10;
>> y = round(10*rand(1,10));
>> bar(x,y);
>> title('bar');
>> axis tight
>> subplot(4,2,2);
>> x=0:pi/10:2*pi;y=x.*sin(x);
>> feather(x,y);title('feather');
>> subplot(4,2,3)
>> x=-2.9:0.1:2.9;y=randn(10000,1);
>> hist(y,x);title('hist');
>> subplot(4,2,4);
>> pie([2 4 3 5],[1 1 0 0],{'North','South','East','West'});title('pie');
>> subplot(4,2,5)
>> x=0:pi/20:2*pi;y=exp(-x/8).*sin(x);
>>  stem(x,y);title('stem');
>> subplot(4,2,6);
>> [x,y]=meshgrid(-2:.2:2,-1:.15:1);
>> z=x.*exp(-x.^2-y.^2);[px,py]=gradient(z,.2,.15);
>> contour(x,y,z),hold on
>>  quiver(x,y,px,py),hold off,title('quiver');
>> subplot(4,2,7);
>>  x=1:10;
>>  y=[0,1,-1,1,1,0,-1,-1,1,0];
>>  fill(x,y,'b');title('fill');
>>  subplot(4,2,8);
>>  t=linspace(0,2*pi,12);
>>  x=sin(2*t);y=cos(2*t);
>> area(x,y,'facecolor','b');title('area');
```

<img src="https://gitee.com/weijiew/pic/raw/master/img/20200522234055.png"/>