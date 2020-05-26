## *Gosling："语言是实现目标的工具，而不是目标本身。"*



## JAVA优于C++之处
 1. Java清除了C++中不常用到的东西，更为纯净。 Java单继承，而C++多重继承。
 2. Java更为健壮，与C++相比，其指针模型消除重写内存和损坏数据的可能性。Java编译器可以检测到其他语言在运行时才能检测到到的问题。
 3. Java数据类型的大小是固定的，如int型在任何编译器中都是32位，而C++中int型的大小取决于操作系统，有可能是16位，有可能是32位，约束在于不能超过longint型， 不能小于 short int型。

1996年第一个Java版本发布，当时只有211个类与接口，而到了2014年Java8的发布就已经有了4240个类与接口。
XML是一种描述数据的方式，任何语言都可以处理XML数据，而Java 中的API对XML文件提供了很好的支持。
早期的Java并不开源，当Oracle收购sun之后，Java逐渐开源。
Java区分大小写。
Java中Boolean 不能将 0 定义位false ，1 定义为真，而c++ 可以混用。
## JDK和JRE 的区别
**JDK： Java Development Kit**
**JRE： Java Running Environment**
JRE是Java运行时的开发环境，而JDK则是Java 的开发工具包，JDK包含JRE。
如果只是运行java程序，装JRE即可，如果编写Java程序，装JDK。
## 关键字
**public ：** 访问修饰符，控制程序其他部分对这段代码的访问。
**class ：**  Java程序的全部内容都包含在类中。类作为加载程序的容器，而程序逻辑则定义了应用程序的行为。
**main** 一个程序必须要有主函数，而且得是public。
**数据类型：** 

Java是强类型语言，拥有8种基本数据类型：

 1. 其中4中整型，分别是int，short，long，bit。
 2.  2种浮点型，分别是double，float。
 3. 一种表示Unicode编码的字符单元的字符类型char型。
 4.  一种表示真值的Boolean型。

**Unicode 和 char**
Unicode的出现时为了统一不同编码，设计Java时采用UTF-16，大概又六万多个位置。而很快六万多个位置都被中文，日文以及全世界语言的特殊符号填满了，此时位置不够用了。于是设计人员在此基础上又加了一个概念：码点。17个码点的出现，使得位置增为120万多个。而在Java中char 只是UTF-16 的一个代码单元。
**Boolean**
Java中Boolean 只有两个值true/false ，整型和布尔值之间不能互换。而C++中可以将0定义位false ，1定义位true。Java中不可以这样用。
**变量**
变量名可以由字母，数字，下划线，$组成。
变量被生命后必须初始化。
**Strictfp**
浮点型的计算位64位，而处理器寄存器为80位，不同的处理器计算出来的结果不同，无法保证可移植性。
而Java虚拟机为了保证可移植性，采用截断的方法，统一为64位。
但这种做法导致了速度的减慢与误差的产生。于是在可移植性和精度之间折中，进行改进，提出了strictfp关键字，进行严格的浮点计算。但一般这个关键字不怎么用。
```java
    public static strictfp void main(final String[] args)
```
## java注释：
  java注释分三种：

 1. //  注释内容（到本行末尾结束）
 2. /*  注释内容 */
 3. /**  注释内容*/ （可以生成文档）

## 定义/声明的区别
定义：int i = 10 ；
声明：extern int i ；
## 常量
final 等价于 const
nextline（） 以行为单位输出
next（）以空格为单位输出
## 输入

```java
Scanner in = new Scanner(System.in);
        String name = in.nextLine();
        String age = in.next();
        System.out.println(name);
        System.out.println(age);
```
## 短路：

 A&&B 与A&B 的区别 前者如果A为假继续判断B真假。
而后者判断到A为假时就不进行B的判断了，因为一假即假。
同理 || 与 | 两真才真。 
求布尔值时会涉及短路。但计算值时不采用短路，两者都要计算。

## 大数值
**BigInteger：** 实现了不同的整数运算。
**BigDecimal：**实现了不同的浮点运算。
**valueOf**
使用静态的valueOf方法将数值转换为大数值。

**add/subtract/multiply/divide/mod ：** 分别对应和/差/积/商/取余

```java
        BigDecimal bigDecimal = new BigDecimal(100);
        BigDecimal bigDecimal1 = bigDecimal.add(bigDecimal);
        BigDecimal bigDecimal2  = bigDecimal.divide(bigDecimal);
        BigDecimal bigDecimal3 = bigDecimal.multiply(bigDecimal);
        BigDecimal bigDecimal4 = bigDecimal.subtract(bigDecimal);
        System.out.println(bigDecimal1+" "+
                bigDecimal2+" "+bigDecimal3+" "+bigDecimal4+" ");
```

---


title: JAVA(类与对象)

date: 2019-04-07 10:50:14

tags: 
- JAVASE

top_img: https://image.135editor.com/files/users/531/5317107/201907/Ec98WQ4W_hAwF.jpg

categories: 
- JAVA
---


##  类与对象
1：一个类中可以有多个对象
2：一个类中的函数可以分为构造函数和自定义函数，顾名思义自定义函数名可以自取，而构造函数的名却需要和函数名一致，调用类的构造函数来实例化一个对象，需要一致。（这里的函数指的是方法）
3：对象zai
## 函数重载
1形参的个数
2形参的顺序
3形参的数据类型
这三个至少有一个是不同的
如果其他都相同，但函数的返回值不同，编译时会报错。
## 1：对象的创建和引用
```java
package hello;
public class Hero {
	String name;
	float hp;
	float armor;
	public static void main(String[] args) {
		new Hero();//创建对象
		Hero h = new Hero();//引用对象
		}
	}

```
```java
new Hero();
		Hero h = new Hero();
		Hero h1=h;
		Hero h2=h;
		Hero h3=h;
```
多个引用指向一个同一个对象。
```java
Hero garen =  new Hero();
           garen =  new Hero();
```
一个引用同一时间只能指向一个对象。
第一行 指向对象1，
第二行 指向对象2，
此时对象1没有任何引用指向了，也就是说没有任何手段访问控制该对象了，此对象也就变的毫无意义。
## 构造方法

```java
public class Hero {
 
    String name;
 
    float hp;
 
    float armor;
 
    int moveSpeed;
 
    // 方法名和类名一样（包括大小写）
    // 没有返回类型
    public Hero() {
        System.out.println("实例化一个对象的时候，必然调用构造方法");
    }
     
    public static void main(String[] args) {
        //实例化一个对象的时候，必然调用构造方法
        Hero h = new Hero();
    }
 
}
```
如果不写构造方法会默认提供一个。如果提供一个有参的构造方法，且没有一个显示的无参的构造方法，那么默认的构造方法会失效。

```java
public class Hero {
     
    String name; //姓名
     
    float hp; //血量
     
    float armor; //护甲
     
    int moveSpeed; //移动速度
     
    //这个无参的构造方法，如果不写，
    //就会默认提供一个无参的构造方法
    //  public Hero(){ 
    //      System.out.println("调用Hero的构造方法");
    //  }
 
    public static void main(String[] args) {
        Hero garen =  new Hero();
        garen.name = "盖伦";
        garen.hp = 616.28f;
        garen.armor = 27.536f;
        garen.moveSpeed = 350;
         
        Hero teemo =  new Hero();
        teemo.name = "提莫";
        teemo.hp = 383f;
        teemo.armor = 14f;
        teemo.moveSpeed = 330;
    }  
     
}
```
**构造方法可重载**

```java
public class Hero {
       
    String name; //姓名
       
    float hp; //血量
       
    float armor; //护甲
       
    int moveSpeed; //移动速度
       
    //带一个参数的构造方法
    public Hero(String heroname){ 
        name = heroname;
    }
     
    //带两个参数的构造方法
    public Hero(String heroname,float herohp){ 
        name = heroname;
        hp = herohp;
    }
       
    public static void main(String[] args) {
        Hero garen =  new Hero("盖伦"); 
        Hero teemo =  new Hero("提莫",383);
    }
     
}
```
## this

```java
public class Hero {
 
    String name;
 
    float hp;
 
    float armor;
 
    int moveSpeed;
    public void showAddressInMemory(){
    	System.out.println("打印this看到的虚拟地址："+this);
    }
    public static void main(String[] args) {
        Hero garen = new Hero(); 
        garen.name = "盖伦";
        System.out.println("打印对象看到的虚拟地址："+garen);
        garen.showAddressInMemory();
        
    }
 
}
```
this 代表当前对象。
将同一个类中的不同对象赋予相对应的值。
```java
public class Hero {
 
    String name;
 
    float hp;
 
    float armor;
 
    int moveSpeed;
    public Hero(String name){
    	System.out.println("一个参数的构造方法");
    	this.name = name;
    }
    public Hero(String name,float hp){
    	this(name);
    	System.out.println("两个参数的构造方法");
    	this.hp = hp;
    }
    public static void main(String[] args) {
        Hero garen = new Hero("盖伦",383); 
        System.out.println(garen.name);
        
    }
 
}
```
this 调用其它构造方法
**final**
final 修饰类时，不允许被继承。
final 修饰方法时，不能被覆盖，也就是重写。
final 修饰变量时，只能赋值一次，也就是常量。
final 修饰类的属性时不会隐式初始化，需要在类的属性上赋值，或者在构造方法中赋值，二者必须有一。
**super**
子类调用父类的构造方法用super
**方法重载与重写**
方法重载：参数个数和参数类型不同。允许访问修饰符不同，允许返回值类型不同。
方法重写：当子类中继承的父类方法不满意时，想添加一些别的需求时，可以在子类中重写此方法。
**多态**
什么是多态？简而言之，在子类中创建的对象引用于父类。即向上转型。
多态运行的三个必要条件是：继承，重写，向上转型。三者缺一不可。
**抽象类抽象方法**
抽象类就是当前不知道这个类以后会干什么，先占个坑。
**接口**
用于描述类所具有的功能，而功能的实现在类中。
**内部类**
把一个类的定义放在另一个类的内部接口就是内部类。
内部类可以访问外部类的所有数据，包括私有数据。
同一个包中的其他类不能访问内部类。
**静态内部类**
静态内部类不能直接访问外部类中的非静态成员。可以new 外部类名（） .成员。
如果成员名和类名相同，可以使用 类名.成员 访问。
**局部内部类**

**匿名内部类**







输入文章标题
0/100
发布文章
weixin_43924623

## 内部类
```java
class A{
    private int x=10;
    class B{
        void bb(){
            System.out.println(x);
        }
    }
    void cc(){
        B d=new B();
        d.bb();
    }

}
public class Main {

    public static void main(String[] args){
        A aa = new A();
        aa.cc();
        A.B ee = new A().new B();
        ee.bb();
    }
}

```
内部类作为外部类的成员时可以被private 修饰，外部类不可以。
如果内部类定义了静态的成员，此内部类必须是静态的。
## 匿名内部类的使用

```java
class A{
    public void show(){

    }
}
public class Main {

    public static void main(String[] args){
        A aa = new A(){
            public void show(){
                System.out.println("aaa");
            }
        };
        aa.show();

    }
}

```

内部类
```java
    class A{
        private int x=10;
        class B{
            void bb(){
                System.out.println(x);
            }
        }
        void cc(){
            B d=new B();
            d.bb();
        }
    
    }
    public class Main {
    
        public static void main(String[] args){
            A aa = new A();
            aa.cc();
            A.B ee = new A().new B();
            ee.bb();
        }
    }
```
内部类作为外部类的成员时可以被private 修饰，外部类不可以。
如果内部类定义了静态的成员，此内部类必须是静态的。

匿名内部类的使用
```java
    class A{
        public void show(){  }
    }
    
    
    public class Main {
    
        public static void main(String[] args){
            A aa = new A(){
                public void show(){
                    System.out.println("aaa");
                }
            };
            aa.show();
    
        }
    }
```
## 接口
接口定义的属性值在实现类中不能被更改。
可以认为接口是一种特殊的抽象类，但接口不是类。
用Interface 定义一个接口，用Implements 来继承一个接口。
类可以继承类，但类不能继承接口，类可以实现接口。
接口可以继承接口。且允许多继承。
如果一个类实现了接口的部分方法，该类必须定义为抽象类。
接口默认的属性为public static final。
Java 的局部变量必须被初始化，在c中可以不用初始化，但java中不行。
**接口和抽象类的区别**
两个区别：1.接口允许多继承，而抽象类稚只能单继承。
2.接口中可以定义方法，但不能有方法体。而抽象类可以。
## 匿名对象
一：调用一次可以使用匿名对象，多次的话需要起名字。
二：匿名对象可以做为实参进行调用。
## 封装
```java
class Persion{
    int age;
    void speak(){
        System.out.println("My age is:"+age);
    }
}
public class Main {

    public static void main(String[] args){
        Persion a = new Persion();
        a.speak();

    }
}

```
age可以直接访问
**设置为age私有**

```java
class Persion{
    private int age;
    public void setAge(int x){
        age=x;
    }
    public int getAge(int x){
        return age;
    }
    void speak(){
        System.out.println("My age is:"+age);
    }
}
public class Main {

    public static void main(String[] args){
        Persion a = new Persion();
        a.setAge(20);
        a.speak();

    }
}

```
对age进行封装，不能直接访问，并且进行判断，
## 静态代码块

```java
class Persion{
    static {
        System.out.println("aa");
    }
}
public class Main {

    public static void main(String[] args){
        Persion s = new Persion();
        System.out.println("bb");

    }
}

```
## 多态
简单而言同一段代码执行出不同的结果。

```java
class Animal{
    public void eat(){

    }
}
class cat extends Animal{
    public void eat(){
        System.out.println("猫吃鱼");
    }
}
class dog extends Animal{
    public void eat(){
        System.out.println("狗吃骨头");
    }
}
public class Main {

    public static void main(String[] args){
        Animal a = new cat();
        Animal b = new dog();
        a.eat();
        b.eat();

    }
}

```
**进化**

```java
class Animal{
    public void eat(){

    }
}
class cat extends Animal{
    public void eat(){
        System.out.println("猫吃鱼");
    }
}
class dog extends Animal{
    public void eat(){
        System.out.println("狗吃骨头");
    }
}
public class Main {
    public static void fun(Animal a){
        a.eat();
    }
    public static void main(String[] args){
        fun(new cat());
        fun(new dog());
    }
}

```
**向上转型：**
Animal a = new Cat();
**向下转型：**
Cat b = (cat)a;
 不能出现这类引用，不能将父类转换成子类。
 多态至始至终都是子类对象的变化，父类不会变化

 ---


title: JAVA(基础语法)

date: 2019-04-05 19:45:49

tags: 
- JAVASE

top_img: https://image.135editor.com/files/users/531/5317107/201907/Ec98WQ4W_hAwF.jpg

categories: 
- JAVA
---

## DOS基本命令
1：由C盘直接进去E盘
2：cd（进入）
3：cd..进入上一个目录
4：cd \进入根目录
## 运行时的问题
1编译时写文件名，运行时写文件中的类名。
## 标识符
标识符：类名，变量名，常量名，方法名。
由“字母”，“—”，“美元符”开头组成。
## 什么是JDK/JRE?
JDK：开发工具
JRE：运行环境
简单而言就是用JDK进行开发，交给JRE去运行。
## 数据类型
%d 输出整型
%x %#x %X
java不支持数据自动扩充，如果数据过大会报错。
Unicode码占两个字节
## 算术运算符
+可以表示数值相加
+可以表示字符串联结
如“123”+“abc”的结果是123abc
## 取余
C语言中取余都得是实数
Java则不需要，可以是非实数
## 位运算符
“&&”逻辑运算符
“&”按位与 将左右两边数值的二进制位相与
“|”相或
“~”取反
"^"异或
右移>>:
若有符号数，右移时符号也随之移动。
当为正数时，最高位是0，最高位补0，最高位为1，最高位补1。
右移>>>：无论最高位是0还是1，移动后空位补零
左移同理。
## 堆栈
```java
A aa = new A（）；
```
aa 栈中内存， A 堆，堆栈结合。
堆中自动释放，栈中手动释放。

##  数组
**一维数组实现**

```java
  public static void main(String[] args) {
        int[] a={3,4,5,6,7,8};
        for(int x:a){
            System.out.println(x);
```
**二维数组实现**

```java
    public static void main(String[] args) {
        int[][] a={{3,4,5},{6,7,8}};
        for(int[] x:a){
            for(int y:x)
            System.out.println(y);
        }
```
不如for循环能遍历到每一个数字。
##  两数交换
**一般交换**

```java
   public static void main(String[] args) {
        int x=100,y=200,z;
        System.out.println(x + "\t"+y);
        z=x;
        x=y;
        y=z;
        System.out.println(x+"\t"+y);
```
**两数相减**

```java
    public static void main(String[] args) {
        int x=100,y=200;
        System.out.println(x + "\t"+y);
        x=x+y;
        y=x-y;
        x=x-y;
        System.out.println(x+"\t"+y);
```
数值过大会损失精度
**位运算（最优解）**

```java
    public static void main(String[] args) {
        int x=100,y=200;
        System.out.println(x + "\t"+y);
        x=x^y;
        y=x^y;
        x=x^y;
        System.out.println(x+"\t"+y);
```
一个数异或同一个数两次，结果还是那个数，而且不会超出int范围（注意x与y不能相同）
## Static
1：可供多个对象共用一个static属性。
2：static的属性i属于类本身。
3：一个事物能够被访问需要具备非私有+静态。
4：static只是具备了可以被类名访问的特征，但如果真正访问还需要非私有。
5：static就是类本身一个属性。
6：非静态方法可以访问静态方法，反之不行。（静态方法不一定存在非静态方法，非静态方法可能存在静态方法）
**静态成员**
Java 中被 static 修饰的成员称为静态成员或类成员。它属于整个类所有，而不是某个对象所有，即被类的所有对象所共享。静态成员可以使用类名直接访问，也可以使用对象名进行访问。


    public class StaticTest{
        public static String string="shiyanlou";
        public static void main(String[] args){
            //静态成员不需要实例化 直接就可以访问
            System.out.println(StaticTest.string);
            //如果不加static关键字 需要这样访问
            StaticTest staticTest=new StaticTest();
            System.out.println(staticTest.string);
            //如果加上static关键字，上面的两种方法都可以使用
        }
    }

**静态方法**
被 static 修饰的方法是静态方法，静态方法不依赖于对象，不需要将类实例化便可以调用，由于不实例化也可以调用，所以不能有 this，也不能访问非静态成员变量和非静态方法。但是非静态成员变量和非静态方法可以访问静态方法。
## 输入
整型输入：
```
package hello;

import java.util.Scanner;

public class HelloWorld {
	public static void main(String[] args) {
	Scanner s= new Scanner(System.in);
		int a = s.nextInt();
		System.out.println("第一个整数："+a);
		int b = s.nextInt();
		System.out.println("第二个整数："+b);
	}
}

```
**字符输入：**

```java
package hello;

import java.util.Scanner;

public class HelloWorld {
	public static void main(String[] args) {
	Scanner s= new Scanner(System.in);
		int a = s.nextInt();
		System.out.println("第一个整数："+a);
		String b = s.nextLine();//代替空格；如果不写，无法输入字符。
		String c=s.nextLine();
		System.out.println("读取的字符是："+c);
	}
}

```
## 逻辑运算符
**长路与（&），短路与（&&）；**
同：
两真才真，一假即假；
异：
长路与（&）两边都运算；
短路与（&&）如果发现第一个是假，第二个不运算；
**长路或（|），短路或（||）**
同：
两假才假，一真即真；
异：
长路或（|），两侧都运算；
短路或（||），发现第一个是真，第二个就不运算；
**取反（！）**
**异或（^）**
不同为真，相同为假。
**<<>>** 
意义：移动几位代表2的几次方,左移是乘右移是除。
补位：>>最高位是0，用0补，最高位是1，用1补。
			>>>无论最高位是什么，都用0来补。
## 二进制表示

```
int i=5;
		String b=(Integer.toBinaryString(i));
		System.out.println(b);
```
## 变量
一个字节八位
**整型**
byte 1个字节
short 2个字节
int 4个字节
long 8个字节
**浮点型**
float 4个字节
double 8个字节
**字符型**
char java中采用unicode编码占用两个字节
**布尔型**
Boolean 0/1
**类变量与实例变量**
类变量随着类的消失而消失。
实例变量随着对象的消失而消失。
## 转义字符
\n 换行
\b 退格
\r Enter linux 中是\r windows是\n\r  
\t table
## 常用类
**switch语句**
```java
package hello;

import java.util.Scanner;

public class HelloWorld {
	public static void main(String[] args) {
		Scanner a= new Scanner(System.in);
		int day=a.nextInt();
		switch(day) {
		case 1:
		System.out.println("星期一");break;
		case 2:
		System.out.println("星期二");break;
		case 3: 
		System.out.println("星期三");break;
		case 4:
		System.out.println("星期四");break;
		case 5:
			System.out.println("星期五");break;
		case 6:
			System.out.println("星期六");break;
		case 7:
			System.out.println("星期天");break;
		}
	
		}
		
	}

```

**数学函数的使用**

```java
package hello;

import java.util.Scanner;
import java.math.*;
public class HelloWorld {
	public static void main(String[] args) {
		double a=2,sum=0,t;
		for(int i=0;i<10;i++) 
		{
			t=  Math.pow(a,i);
			sum+=t;
		}
	System.out.println(sum);
		}
		
	}

```

**随机数**

```java
(int) (Math.random() * 100)
```

**数组初始化，不能定义维数**

```java
int[] a= new int[] {0,1,2,3,4};
```

**选择排序**
```java
int [] a= new int []{1,0,2,3,4,5,6,7,8,9};
		for(int j=0;j<a.length-1;j++) 
		{
			for(int i=j+1;i<a.length;i++) 
			{
				if(a[i]<a[j]) {
					int t;
				t=a[i];
				a[i]=a[j];
				a[j]=t;}
			}
		}
```

**冒泡排序**
```java
	int [] a= new int []{1,0,2,3,4,5,6,7,8,9};
		for(int j=a.length;j>0;j--) 
		{
			for(int i=0;i<j-1;i++) 
			{
				if(a[i]>a[i+1]) {
					int t;
				t=a[i];
				a[i]=a[i+1];
				a[i+1]=t;}
			}
		}
```

**数组复制**

```java
int [] a= new int []{1,0,2,3,4,5,6,7,8,9};
int [] b= Arrays.copyOfRange(a, 0, 4);
// copyOfRange(int[] original, int from, int to)
        // 第一个参数表示源数组
        // 第二个参数表示开始位置(取得到)
        // 第三个参数表示结束位置(取不到)
```
**转化为字符**

```java
int [] a= new int []{1,0,2,3,4,5,6,7,8,9};
		String b= Arrays.toString(a);
			System.out.println(b);
```
如果要打印一个数组的内容，就需要通过for循环来挨个遍历，逐一打印。
但是Arrays提供了一个toString()方法，直接把一个数组，转换为字符串，这样方便观察数组的内容

**排序**

```java
int [] a= new int []{1,0,2,3,4,5,6,7,8,9};
		Arrays.sort(a);
		System.out.println(Arrays.toString(a));
```

**搜索**

```java
int [] a= new int []{1,0,2,3,4,5,6,7,8,9};
		Arrays.sort(a);
		System.out.println(Arrays.toString(a));
		System.out.println(Arrays.binarySearch(a, 1));
```
从0开始，排过序之后的顺序
**判断是否相同**

```java
int [] a= new int []{1,0,2,3,4,5,6,7,8,9};
		int [] b= new int [] {1,1,2,3,4,5,6,7,8,9};
		System.out.println(Arrays.equals(a,b));
```
判断是否相同，相同为true，不同为false
**填充**

```java
int [] a= new int []{1,0,2,3,4,5,6,7,8,9};
		Arrays.fill(a, 5);
		System.out.println(Arrays.toString(a));
```
## 二维数组随机数排序

```java
package hello;

import java.util.Arrays;
public class HelloWorld {
	public static void main(String[] args) {
		int [][] a=new int[5][8];
		for(int i=0;i<a.length;i++) {
			for(int j=0;j<a[i].length;j++) {
				a[i][j]=(int)(Math.random()*100);
			}
		}
		System.out.print("排序前：");
		for(int[] k: a) {
			System.out.print(Arrays.toString(k));
		}
		 System.out.println(" ");
		System.out.print("排序后");
		for(int[] b :a) {
			Arrays.sort(b);//注意是b，这个错误找了好久
		System.out.print(Arrays.toString(b));
		}
	}
}
```
**抽象类：**
有抽象类不一定有抽象方法，但有抽象方法一定有抽象类。
抽象类可以定义一个抽象类的引用但不能定义抽象类的对象。
Final 修饰一个类，此类不能背继承。Final 修饰的方法不能被子类继承但是可以被重写。
## 进制转换
```java

public class Main {

     public static void  toBin(int num){
         StringBuffer sb = new StringBuffer();
         while(num!=0){
             sb.append(num%2);
             num=num/2;

         }System.out.println(sb.reverse());
     }
    public static void main(String[] args){
         toBin(2);
    }
}

```
## 第三章 java的基本程序设计结构
**java注释：**  java注释分三种：

 1. //  注释内容（到本行末尾结束）
 2. /*  注释内容 */
 3. /**  注释内容*/ （可以生成文档）

**定义和声明的区别**
定义：int i = 10 ；
声明：extern int i ；
**常量**
final 等价于 const
nextline（） 以行为单位输出
next（）以空格为单位输出
**输入**
```java
Scanner in = new Scanner(System.in);
        String name = in.nextLine();
        String age = in.next();
        System.out.println(name);
        System.out.println(age);
```


## 大数运算
**BigInteger：** 实现了不同的整数运算。
**BigDecimal：**实现了不同的浮点运算。

---


title: JAVA(基础语法)

date: 2019-04-29 10:59:25

tags: 
- JAVASE

top_img: https://image.135editor.com/files/users/531/5317107/201907/Ec98WQ4W_hAwF.jpg

categories: 
- JAVA
---

## 粘贴

```c++
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;

public class Test {

    public static void main(String[] args) {
        try {
      
           File a =new File("D:/file1.txt");
           File b= new File("D:/file3.txt");
           FileInputStream c = new FileInputStream(a);
           FileOutputStream d = new FileOutputStream(b);
           int e;
           while((e= c.read())!= -1 ){
               d.write(e);
           }
           c.close();
           d.close();
        }catch(FileNotFoundException e) {
            System.out.println("FileStreamsTest:" + e);
        }catch(IOException e){
            System.err.println("FileStreamTest:" + e);
        }
    }
}

```
**以字节流的形式写入文件数据**
```java
      try{
          File f = new File("C:\\Users\\Administrator\\Desktop\\1.txt");
          FileOutputStream f1 = new FileOutputStream(f);
          byte [] a ={};
          f1.write(a);
          f1.close();
      }
      catch(IOException e){
          e.printStackTrace();
      }
```
首先创建的一个文件对象，提供目的地。再创建一个文件流出的对象，两者相联系，然后讲

**创建并删除文件**
```java
        File f1 = new File("D:\\1.txt");
        File f2 = new File("D:\\","2.txt");
        File f3 = new File("D:\\",File.separator+"1.txt");
        f2.createNewFile();
        f3.delete();
```
**复制粘贴**
```java
        try{
                File f1 = new File("D:\\3.txt");//此文件必须存在，否则抛出异常
                File f2 = new File("5.txt");//此文件可以没有，若无则自动创建在包目录下
                FileInputStream in = new FileInputStream(f1);//创建一个输入流，实现从磁盘写入内存中
                FileOutputStream out = new FileOutputStream(f2);//创建一个输出流，实现从内存写入磁盘中
                int c;
                while((c = in.read())!=-1){
                    out.write(c);
                }
                in.close();
                out.close();
        }catch(IOException e){
            e.printStackTrace(); 
        }
```
**读取字符信息**

```java
       try{
            FileReader file = new FileReader("D:\\3.txt");
            int data = 0;
            while((data= file.read())!=-1){
                System.out.print((char)data);
            }
            file.close();
        }catch(IOException e){
            e.printStackTrace(); 
        }
```
**删除文件**
```java
		Files.delete(Paths.get("D:\\4.txt"));
```
**查看文件信息**
```java
        File a=new File("D:\\4.txt");
        System.out.println(a.getName());
        System.out.println(a.getParentFile());
        System.out.println(a.getPath());
```

---
title: 《Core Java》笔记（1）
date: 2019-7-28 16:37:41
tags: 
- Java
- JavaSE
- 知识点
top_img: https://image.135editor.com/files/users/531/5317107/201907/mmBKT6B8_gvYZ.jpeg
categories: 
- Java
---

## *Gosling："语言是实现目标的工具，而不是目标本身。"*



## JAVA优于C++之处
 1. Java清除了C++中不常用到的东西，更为纯净。 Java单继承，而C++多重继承。
 2. Java更为健壮，与C++相比，其指针模型消除重写内存和损坏数据的可能性。Java编译器可以检测到其他语言在运行时才能检测到到的问题。
 3. Java数据类型的大小是固定的，如int型在任何编译器中都是32位，而C++中int型的大小取决于操作系统，有可能是16位，有可能是32位，约束在于不能超过longint型， 不能小于 short int型。

1996年第一个Java版本发布，当时只有211个类与接口，而到了2014年Java8的发布就已经有了4240个类与接口。
XML是一种描述数据的方式，任何语言都可以处理XML数据，而Java 中的API对XML文件提供了很好的支持。
早期的Java并不开源，当Oracle收购sun之后，Java逐渐开源。
Java区分大小写。
Java中Boolean 不能将 0 定义位false ，1 定义为真，而c++ 可以混用。
## JDK和JRE 的区别
**JDK： Java Development Kit**
**JRE： Java Running Environment**
JRE是Java运行时的开发环境，而JDK则是Java 的开发工具包，JDK包含JRE。
如果只是运行java程序，装JRE即可，如果编写Java程序，装JDK。
## 关键字
**public ：** 访问修饰符，控制程序其他部分对这段代码的访问。
**class ：**  Java程序的全部内容都包含在类中。类作为加载程序的容器，而程序逻辑则定义了应用程序的行为。
**main** 一个程序必须要有主函数，而且得是public。
**数据类型：** 

Java是强类型语言，拥有8种基本数据类型：

 1. 其中4中整型，分别是int，short，long，bit。
 2.  2种浮点型，分别是double，float。
 3. 一种表示Unicode编码的字符单元的字符类型char型。
 4.  一种表示真值的Boolean型。

**Unicode 和 char**
Unicode的出现时为了统一不同编码，设计Java时采用UTF-16，大概又六万多个位置。而很快六万多个位置都被中文，日文以及全世界语言的特殊符号填满了，此时位置不够用了。于是设计人员在此基础上又加了一个概念：码点。17个码点的出现，使得位置增为120万多个。而在Java中char 只是UTF-16 的一个代码单元。
**Boolean**
Java中Boolean 只有两个值true/false ，整型和布尔值之间不能互换。而C++中可以将0定义位false ，1定义位true。Java中不可以这样用。
**变量**
变量名可以由字母，数字，下划线，$组成。
变量被生命后必须初始化。
**Strictfp**
浮点型的计算位64位，而处理器寄存器为80位，不同的处理器计算出来的结果不同，无法保证可移植性。
而Java虚拟机为了保证可移植性，采用截断的方法，统一为64位。
但这种做法导致了速度的减慢与误差的产生。于是在可移植性和精度之间折中，进行改进，提出了strictfp关键字，进行严格的浮点计算。但一般这个关键字不怎么用。
```java
    public static strictfp void main(final String[] args)
```
## java注释：
  java注释分三种：

 1. //  注释内容（到本行末尾结束）
 2. /*  注释内容 */
 3. /**  注释内容*/ （可以生成文档）

## 定义/声明的区别
定义：int i = 10 ；
声明：extern int i ；
## 常量
final 等价于 const
nextline（） 以行为单位输出
next（）以空格为单位输出
## 输入

```java
Scanner in = new Scanner(System.in);
        String name = in.nextLine();
        String age = in.next();
        System.out.println(name);
        System.out.println(age);
```
## 短路：

 A&&B 与A&B 的区别 前者如果A为假继续判断B真假。
而后者判断到A为假时就不进行B的判断了，因为一假即假。
同理 || 与 | 两真才真。 
求布尔值时会涉及短路。但计算值时不采用短路，两者都要计算。

## 大数值
**BigInteger：** 实现了不同的整数运算。
**BigDecimal：**实现了不同的浮点运算。
**valueOf**
使用静态的valueOf方法将数值转换为大数值。

**add/subtract/multiply/divide/mod ：** 分别对应和/差/积/商/取余

```java
        BigDecimal bigDecimal = new BigDecimal(100);
        BigDecimal bigDecimal1 = bigDecimal.add(bigDecimal);
        BigDecimal bigDecimal2  = bigDecimal.divide(bigDecimal);
        BigDecimal bigDecimal3 = bigDecimal.multiply(bigDecimal);
        BigDecimal bigDecimal4 = bigDecimal.subtract(bigDecimal);
        System.out.println(bigDecimal1+" "+
                bigDecimal2+" "+bigDecimal3+" "+bigDecimal4+" ");
```
