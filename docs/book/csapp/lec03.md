# 链接

## 程序如何与硬件，软件交互？

库间定位，通过链接实现。

![20220507080806](https://cdn.jsdelivr.net/gh/weijiew/pic/images/20220507080806.png)

假设程序由main.c和sum.c两个模块组成，sum.c 将数组长度 n作为参数。

main.c 调用 sun 函数传入一两个元素的 int 数组然后接受返回值。

![20220507080750](https://cdn.jsdelivr.net/gh/weijiew/pic/images/20220507080750.png)

首先调用 C 预处理器，然后调用编译器 cc1 生成程序集 .o 文件。sum.c 流程类似。

此时两个文件对应两个 .o 文件，接下来是将其放在一起链接成一个可执行的单个可执行文件然后运行。

main.c和sum.c被称为源文件，.o 文件是目标文件，也被称作可重定位目标文件。因为组合在一起形成完全链接的可执行目标文件。

这样做的原因是模块化，将代码分解成小部分，其次是效率，当改变其中一个模块之时不需要重新编译，只需要单独编译改变的部分再将其链接到一起即可。 如果函数没有调用，那么将不会被链接，这样可以节省空间。

链接器执行两个任务，首先是 Symbol resolution 。链接器称为符号，全局变量和函数，

例如定义一个 swap 函数，然后做对该函数的引用，定义了一个指向名为 xp 的 int 指针，将地址初始化为 x 的地址。

汇编器将以上符号存储再目标文件中，在符号表中这是一个结构体数组。链接器将每个符号的引用与符号定义相关联，可以声明相同名称的全局变量，但是链接器使用的时候需要搞清楚引用哪个。每个引用都有唯一的符号定义。

第二步的重定位，重定位是将所有模块合并在一起塞入单个可执行对象模块，然后在系统上加载和执行。所以合并的时候需要弄清楚每个符号，函数，变量的存储位置并和符号做绑定，更新对符号的引用指向正确的地址。

## ELF 文件

.o 文件的可重定位目标模块，也就是汇编程序的输出，但是不是二进制程序无法直接加载到内存中。

链接器生成的可执行目标文件称为 .out 文件，.so 文件的共享对象文件，用于创建共享库的现代技术。均采用 ELF 格式，也就是 ELF 格式的二进制文件。

![20220507090105](https://cdn.jsdelivr.net/gh/weijiew/pic/images/20220507090105.png)

ELF 定义了可执行文件的格式，指出了代码不同段在内存中的位置。堆栈，共享库，初始化和未初始化数据的位置都能在段头表中查到。然后是代码本身，.text 部分，这部分内容只读，接下来是 .data 包含了所有初始化全局变量的空间，.bss 包含了未初始化的全局变量。

将每个模块编译成一个 .o 文件，

好的，然后外部符号就是那种反面
External symbols are symbols that are referenced by some module
外部符号是某些模块引用的符号
But defined in some other module
但在其他一些模块中定义
Okay so in a little running example
好吧，在一个小小的运行示例中
When main.c code called the function some it was referencing an external symbol
当main.c代码调用函数时，它引用了一个外部符号
Okay and then there's local symbols and these are symbols that are defined and referenced within a module
好的，然后是局部符号，这些是在模块中定义和引用的符号
Okay and those you create that,this is not this is different from local variables
好的，那些你创造的，这不是局部变量
Okay the linker you know local C variables are managed by the compiler on the stack
好的，你知道本地C变量的链接器是由堆栈上的编译器管理的
Linker has no idea about local C variables
链接器不知道本地C变量
Okay in this context when we talk about a local symbol
好的，在这种情况下我们谈论一个本地符号
We're talking about is either, is a global variable or function declared with the static attribute
我们所讨论的是，是一个全局变量或用static属性声明的函数
Whose that can only be referenced from within that module
谁只能从该模块中引用它
So we say that the scope of the a function or global variable defined with the static
所以我们说用静态定义的函数或全局变量的范围
Attribute is limited to the module that it was defined in
属性仅限于其定义的模块
Okay so this is in C, this is how we do abstraction
好的，这是在C中，这就是我们如何进行抽象
And this is how we can create sort of private functions that
这就是我们如何创建一些私有函数
And private functions that can't be called from outside that module
并且无法从该模块外部调用的私有函数
Okay so for instance if we want to make a library in C of functions, we want to make a collection of functions that
好的，例如，如果我们想在函数C中创建一个库，我们想要创建一个函数集合
Other programs can then call it link into their program and call
其他程序可以将其称为链接到他们的程序和调用
The functions that we want to make visible to other programs are defined without the static attribute
我们希望对其他程序可见的函数是在没有静态属性的情况下定义的
And the functions that we want to have private and just be internal
我们希望私有的功能只是内部功能
We declare what the static attribute okay
我们声明静态属性没问题
And that way we get abstraction and we get hiding information hiding
这样我们就可以获得抽象，并隐藏信息隐藏
And we're only exposing data and functions that we want to expose
我们只展示我们想要公开的数据和功能
All right so let's look in detail how the symbol resolution step works
好的，让我们详细了解符号解析步骤的工作原理
We call a example program
我们称之为示例程序
So here we're referencing a global called array
所以这里我们引用一个全局调用数组
That's defined within main.c
这是在main.c中定义的
Here we're defining main
在这里，我们定义主要
A global called main
全球称为主要
Here we're referencing a global called sum
在这里，我们引用一个全局调用的总和
That's defined in sum.c
这是在sum.c中定义的
And val is a local C variable on the stack and linker knows nothing about that okay
val是堆栈上的本地C变量，链接器对此没有任何了解
Now loads i, s which are also local variables
现在加载i，s也是局部变量
Now let's make sure that we understand the difference between local static C variables versus local non static C variables so
现在让我们确保我们理解本地静态C变量与本地非静态C变量之间的区别
Here we're defining a local static variable called int
这里我们定义一个名为int的局部静态变量
Within this function f
在这个函数f
Now because it's local, its scope is limited to this function
现在因为它是本地的，它的范围仅限于此功能
So this variable x can only be referenced within function f
所以这个变量x只能在函数f中引用
And similarly for this definition of x in function g
类似于函数g中x的这个定义
Can only be referenced by function g
只能通过函数g引用
Now what's ,but because it's declared with the static attribute it's not stored on the stack
现在是什么，但因为它是用静态属性声明的，所以它不存储在堆栈中
It's actually stored in .data just like a global would be
它实际上存储在.data中，就像全局一样
So it's like a global in the sense that it's actually stored in .data rather than the stack
所以它就像一个全局的，它实际上存储在.data而不是堆栈中
But it's like a local C variable in the sense that its scope is limited just to the function that it's defined in
但它就像一个本地C变量，因为它的范围仅限于它所定义的函数
Okay so what the compiler will do it'll allocate space for each definition of x
好的，编译器会做什么，它将为x的每个定义分配空间
So this and it'll give it some name to disambiguate it
所以这个，它会给它一些名称来消除它的歧义
So maybe it will call this one x.1
所以也许它会称之为x.1
And maybe this one x.2
也许这一个x.2
So these symbols are allocated in .data because
所以这些符号在.data中分配，因为
Because they're initialized and they get symbol table entries just like any other symbol
因为它们已初始化并且它们像任何其他符号一样获得符号表条目
Okay so I said that during symbol resolution
好的，所以我在符号解析期间说过
The linker associates each reference,each symbol reference to exactly one unique symbol definition
链接器将每个引用，每个符号引用与一个唯一的符号定义相关联
Now how does it do that if there's multiple symbol definitions across all the modules
现在，如果所有模块中有多个符号定义，它是如何做到的
So to understand this will define symbols as being either strong or weak
因此，要理解这将把符号定义为强或弱
So strong symbols are either procedures or function names or initialize global variables
所以强符号是过程或函数名称或初始化全局变量
Weak symbols or uninitialized global variables
弱符号或未初始化的全局变量
Okay so int foo here is a strong symbol
好吧所以int foo这里是一个强有力的象征
Because it's initialized,we're initializing it. p1 is strong by definition
因为它已初始化，我们正在初始化它。根据定义，p1很强
foo is weak in p2.c, this definition of foo is weak
foo中的foo很弱，foo的这个定义很弱
Because it's uninitialized and the definition of p2 is strong
因为它没有初始化，p2的定义很强
Okay so that the rules, the linker uses are the following
好的，以便链接器使用的规则如下
Multiple strong symbols not allowed so that's an error
不允许多个强符号，这是一个错误
Okay so that means that if across multiple modules we declare a function with the same name
好的，这意味着如果跨多个模块，我们声明一个具有相同名称的函数
The linker will throw an error that's not allowed
链接器将抛出一个不允许的错误
Given a strong symbol and multiple weak symbols if the linker will always choose the the strong symbol
如果链接器总是选择强符号，则给出强符号和多个弱符号
Now remember if we initialize a global variable
现在记住我们是否初始化了一个全局变量
And we if we declare an initialized global variable across multiple modules that's an error
如果我们在多个模块中声明一个初始化的全局变量，那么我们就是一个错误
Because those are strong symbols okay by rule one
因为那些是第一条规则的强大符号
But if we have one strong symbol and multiple weak symbols all with the same name
但是如果我们有一个强符号和多个弱符号都具有相同的名称
Then the compiler will choose the strong symbol
然后编译器将选择强符号
Okay and it will associate all references to that symbol will go to that strong symbol
好的，它将所有对该符号的引用关联到该强符号
And if there's multiple weak symbols then it just picks an arbitrary one
如果有多个弱符号，那么它只会选择任意一个
And this is we'll see can be problematic now you can override with this GCC flag called no common
这是我们将看到可能有问题，现在你可以覆盖这个名为no common的GCC标志
And if you declare your function with this no common argument
如果你用这个没有共同点的论证声明你的函数
Then multiple weak symbols will throw an error in a linker
然后多个弱符号将在链接器中引发错误
All right so why do we care about all this stuff well it turns out
好吧，为什么我们关心所有这些东西呢
If you're not aware of this stuff you can run into some really serious problems
如果你不了解这些东西，你可能会遇到一些非常严重的问题
That are just perplexing and confounding right so
这只是令人困惑和混淆
Linker errors are like the worst kind
链接器错误就像最糟糕的那样
They're the hardest kind of debug because people aren't usually aware of what's going on inside their linkers
它们是最难调试的，因为人们通常不知道它们的链接器内部发生了什么
And usually it's only like the very best programmers that really understand
而且通常它只是真正理解的最好的程序员
You know how these linkers work and what kind of errors they can throw and how to debug them
你知道这些链接器是如何工作的，它们可以抛出什么样的错误以及如何调试它们
So let me show you some examples of these kind of errors
那么让我向你展示一些这类错误的例子
All right so we have a program
好的，所以我们有一个程序
We have two modules so each of these rectangles corresponds to a module
我们有两个模块，因此每个矩形对应一个模块
And we're defining p1 in each module so
我们在每个模块中定义p1
That's too strong symbols that's an error
这是太强大的符号，这是一个错误
Okay now here we've defining p1 and p2 so we're okay
好的，现在我们已经定义了p1和p2，所以我们没事
But now we've got two week symbols both are integers variables called x
但现在我们有两个星期的符号，都是整数变量，称为x
So and if these modules are referencing x the linker will just pick it will just pick one of these to serve as the definition
因此，如果这些模块引用x，链接器将只选择其中一个作为定义
But is this really what you want
但这真的是你想要的
Now in this case it doesn't really hurt anything because x is declared in both modules as an int
现在在这种情况下它并没有真正伤害任何东西，因为x在两个模块中都被声明为int
All right so it'll just be some integer sized variable
好吧所以它只是一个整数大小的变量
That and it'll be somewhere
那，它将在某个地方
And but it doesn't really matter which one the linker chooses
但是链接器选择哪一个并不重要
But we start to get into trouble if we declare these weak symbols with different types
但是如果我们用不同的类型声明这些弱符号，我们就开始遇到麻烦了
So here we've declared an int x in one module and a double x in another module
所以这里我们在一个模块中声明了一个int x，在另一个模块中声明了一个double x
So if we write to x, if the linker just arbitrarily chooses this,this symbol definition to use
因此，如果我们写入x，如果链接器只是随意选择这个，则使用此符号定义
Now this is a symbol that of length 8 of size 8
现在这是8号长度为8的符号
If we anywhere in this program,if the linker chooses that then, anywhere in the program
如果我们在这个程序中的任何地方，如果链接器选择那个程序中的任何地方
Those references to x will be to this double word,this double word
那些对x的引用将是这个双字，这个双字
Even in this module if we reference x it'll be an 8-byte right
即使在这个模块中，如果我们引用x，它也将是一个8字节的权利
So it will overwrite y with the
所以它会覆盖y
Hi order excuse me
嗨，请原谅我
[student speaking]
[学生说话]
 Oh no it's completely,it's just pick one arbitrarily
哦，不，它是完全的，它只是任意选择一个
And you don't know
你不知道
I mean it
我是认真的
Now this is here's a problem we've defined a strong symbol x because we've initializes
现在这是一个问题，我们已经定义了一个强符号x，因为我们已经初始化了
So the linker will always,will associate all references to x to this integer sized this integer sized symbol
因此链接器将始终将对x的所有引用与此整数大小的整数大小相关联
So if we write
所以，如果我们写
Oh yeah right,so rights to x here
哦是的，对x这样的权利
This will be a double in this module but it will overwrite y in this module
这将是此模块中的两倍，但它将覆盖此模块中的y
So that's really nasty
所以这真的很讨厌
And here we were defining a strong symbol x
在这里，我们定义了一个强大的符号x
So references to x in the second module will always get it will refer to this initialized variable which might not
因此，在第二个模块中对x的引用将总是得到它将引用这个初始化的变量，它可能不会
So it might not be what you want right
所以它可能不是你想要的
You may be assuming that it's uninitialized in your code
你可能认为它在你的代码中未初始化
Okay and then you get the, the ultimate nightmare scenario is suppose
好吧，然后你得到了，最终的梦魇场景就是假设
You know because we're following a standard ABI we can compile our code with multiple compilers
你知道，因为我们遵循标准的ABI，我们可以用多个编译器编译我们的代码
And this actually happens in some oh yes questions
这实际上发生在一些哦是的问题
[student speaking]
[学生说话]
Oh yeah actually you're right
噢，实际上你是对的
It will still take preference and and you'll be writing a for by quantity
它仍然会优先考虑并且你将按数量编写
Which is what you want so that slides not quite right
这是你想要的，所以幻灯片不太正确
So oh yeah what is the point of doing the static versus non static
所以哦，是的，做静态与非静态的重点是什么
If it's always being referenced just locally in constantly what is the point of declaring  it's time
如果它总是在本地被引用，那么什么是宣布它的时间
-is it it stores it in like -no no no it's
 - 它存储它就像 - 不，不是它
If you reference up if you reference a variable
如果引用变量，则引用
You mean so a variable is defined in your module
你的意思是在模块中定义一个变量
And then you...with the static...right
然后你......用静电......对
Oh they're both,they're both local
哦，他们都是，他们都是本地人
So you do this if you want to value two to retain
因此，如果你想要保留两个值，请执行此操作
From if you want if you want that variable to retain value from invocation to invocation
如果你希望该变量保留从调用到调用的值，则从中
So suppose you it's usually a bad idea as we'll see when we study threads
所以假设你通常是一个坏主意，因为我们会在研究线程时看到
Because it makes your code non thread safe
因为它使你的代码非线程安全
But like early like random number generators
但就像早期的随机数生成器一样
Would it would compute a pseudo-random number
它会计算一个伪随机数
And then it would store it in a static variable
然后它会将它存储在静态变量中
And then use that as the the starting value for the next time you call that function
然后将其用作下次调用该函数时的起始值
So whenever you want values to persist across function invocation to reduce static
因此，每当你希望值跨越函数调用以减少静态时
Yes something really crash
是的，真的崩溃了
Well wait a minute let me...
等一下让我...
Let me get this straight writes to x and p2 will actually correspond to the memory
让我直接写入x和p2实际上对应于内存
Look that it will actually go to the memory location I'm sorry I need to amend that
看它实际上会进入内存位置我很抱歉我需要修改它
So writes to x in p2 will be 8 bytes
因此，在p2中写入x将是8个字节
Because the compiler you know the compiler knows that it's a double
因为编译器你知道编译器知道它是双精度的
But it'll go to a memory location that's only 4 bytes
但它会进入一个只有4个字节的内存位置
Because x because the linker chose the strong symbol
因为x因为链接器选择了强符号
Okay so the rights to x and p2 will actually overwrite y
好吧，x和p2的权利实际上会覆盖y
I'm sorry yes question
对不起是的问题
[student speaking]
[学生说话]
That's just usually the way it happens
这通常就是它发生的方式
You know...[student speaking]
你知道...... [学生说话]
No no no global variables go in data they don't go on the stack
不，没有全局变量进入他们没有进入堆栈的数据
But usually if you define local variables in a function
但通常如果在函数中定义局部变量
It will put them,it will allocate them one after the other on the stack
它会放置它们，它会在堆栈上一个接一个地分配它们
Okay all right so all this discussion about
好的，所有这些讨论都是如此
These weird strong weak symbol rules that the linker have
链接器具有这些奇怪的强弱符号规则
It's another reason to avoid global variables if you can
如果可以的话，这是避免全局变量的另一个原因
Now if you need to declare a global see if you can declare it static
现在，如果你需要声明全局，请查看是否可以将其声明为静态
Because that'll limited scope to the the module that it's declared in
因为它限制了它声明的模块的范围
So that's a good idea if you can do it
如果你能做到这一点，这是一个好主意
And if you define a global variable initialize it
如果你定义一个全局变量初始化它
So that you'll find,you'll discover if you have multiple initialize global symbols with the same name in your code
所以你会发现，你会发现你的代码中是否有多个具有相同名称的初始化全局符号
And then if you want to it's always good practice
如果你想要它总是好的做法
If you're referencing an external variable to tell the compiler about it by using the x turn attribute
如果你正在引用外部变量，则通过使用x turn属性告诉编译器
All right
好吧
So now at this point the linker has associated every symbol reference  with some simple definition
所以现在在这一点上，链接器已经将每个符号引用与一些简单的定义相关联
Now it has to take all those object relocatable object files and smush them together
现在它必须获取所有这些对象可重定位目标文件并将它们组合在一起
And create like one big executable
并创建一个大的可执行文件
So suppose with our example a little running example
因此，假设我们的示例有一个小例子
Each main.o and sum.o contain a code and initialize data
每个main.o和sum.o都包含一个代码并初始化数据
sum.o doesn't have any initialize data it just has code
sum.o没有任何初始化数据，只有代码
And then there's their system code that actually runs before and after your program so
然后是他们的系统代码实际上在你的程序之前和之后运行
When your program run it actually starts executing a startup code from  from lib.c
程序运行时，它实际上从lib.c开始执行启动代码
That that sort of initializes things and then the last thing that it does is it calls main and passes it rc and rv
那种初始化的东西，然后它做的最后一件事是它调用main并传递它rc和rv
Okay and then when you're, when your program exits
好的，然后当你的程序退出时
Well that's a cyst call,but if your program if your main function routine does a return
那是一个囊肿调用，但如果你的程序，如果你的主函数例程返回
Then it returns back to that startup code which then doesn't exit okay
然后它返回到那个启动代码，然后没有退出
So this is just...so this this consists of of text and data as well
所以这只是...所以这包括文本和数据
And so when the linker relocates these object files
所以当链接器重定位这些目标文件时
It takes all of the code the text sections from each of the modules
它将所有代码都放在每个模块的文本部分中
And puts them together contiguously init in the .text section for the executable object file
并将它们连续地放在可执行对象文件的.text部分中
Ok so it just puts them together in some order that it determines
好的，它只是按照它确定的顺序将它们组合在一起
And it creates a combined .text section in the executable
它在可执行文件中创建了一个组合的.text部分
That contains all of the system code and the all of the all of the code defined in the modules
它包含所有系统代码和模块中定义的所有代码
And then it does the same thing with the data takes all the .data
然后它会对数据采用所有.data做同样的事情
Sections from the various object files and puts them together
来自各种目标文件的部分并将它们放在一起
In one combined .data section in the executable
在可执行文件中的一个组合.data部分
And it also emerges the symbol tables and in the debug information as well
它还会出现符号表和调试信息
Now when it just the act the act of sort of
现在它只是行为的行为
Relocating these object files requires the linker
重定位这些目标文件需要链接器
To figure out where it's going to actually store these
要弄清楚它们实际存储在哪里
These different these different symbols when the system gets, when this program gets loaded
当系统加载时，这些不同的符号在这个程序加载时不同
So it has to pick an address for main that
所以它必须选择一个主要的地址
That function will start at some absolute address
该函数将从某个绝对地址开始
It's going to have... it's going to do the same for swap,so for all the all the data arrays right
它会......它会对交换做同样的事情，所以对于所有数据阵列都是正确的
And but the problem is that when this code is compiled,the compiler doesn't know what addresses the linker is going to pick
但问题是，当编译此代码时，编译器不知道链接器将选择哪些地址
So the compiler creates these reminders to the linker called relocation entries
因此，编译器会向称为重定位条目的链接器创建这些提醒
Which are then stored in the relocation sections of the the object file
然后将其存储在目标文件的重定位部分中
And these relocation entries are instructions to the linker that's something
这些重定位条目是链接器的指令
That there's a reference to a symbol that's going to have to be patched up
有一个符号的引用必须要修补
When the the code is actually relocated and merged into the executable
当代码实际重定位并合并到可执行文件中时
So let's look at a couple of these a couple of examples so in
因此，让我们看看其中的几个例子
Our in our main.c module there was a reference to this global symbol called array
我们在main.c模块中引用了一个名为array的全局符号
Okay and then there was also a reference to this global symbol sum which is the function
好的，然后还有一个参考这个全局符号和，这是函数
So the compiler creates two relocation entries
因此编译器会创建两个重定位条目
The first one for the reference to the array a
第一个用于引用数组a
So here we're moving remember %edi is the first argument
所以这里我们正在移动记得％edi是第一个参数
So remember a sum function takes the address of the of array
所以请记住sum函数获取数组的地址
Of the input array as its argument
输入数组作为其参数
So this move we're moving the address of the array into %edi for the first argument
因此，我们将第一个参数的数组地址移动到％edi中
But the compiler doesn't know what that address is going to be
但编译器不知道该地址是什么
Right so it just it just it just
是的，就这样吧
It just moves in an immediate value of 0 into %edi temporarily right so you can see this is all zeros
它只是暂时向右移动0％到％edi，所以你可以看到这是全零
The bf is the move instruction and then there's all zeros for now
bf是移动指令，然后现在全部为零
And then it places this relocation entry in the relocation section of main.o
然后将此重定位条目放在main.o的重定位部分中
And it says to the linker at offset a
它在偏移量a处向链接器说
So these let me remind you these are main.o
所以这些让我提醒你这些是主要的
Module only contains one function
模块只包含一个功能
So that function starts that offsets zero in the code section of the module in the .text section of the module
因此，该函数在模块的.text部分的模块的代码部分中开始偏移为零
If there were other functions in this module they would follow immediately after
如果此模块中还有其他功能，则会立即跟进
Ok and it so you can see what the compiler it's just generating offsets of these instructions
好的，所以你可以看到编译器只是生成这些指令的偏移量
From the beginning of the .text section
从.text部分的开头
And it includes this relocation entry which says to the linker hey
它包括这个重定位条目，它告诉链接器嘿
When you're relocating main.o add offset a in this .text section
当你重新定位main.o时，在此.text部分中添加偏移量a
You've got a reference,a reference to an array in the form of a 32-bit address
你有一个引用，一个32位地址形式的数组引用
Ok so that,so eventually the linker is going to have to patch up these
好的，所以最终链接器将不得不修补它们
So this is address , this is address a
所以这是地址，这是地址a
It's going to have to patch up the four bytes starting at address a
它必须修补从地址a开始的四个字节
With the absolute address of the symbol array
使用符号数组的绝对地址
And then similarly the reference to,the reference to,this the reference to this function some
然后类似地引用，引用，这个引用这个函数的一些
The compiler has no idea where some actually will end up
编译器不知道某些实际上会在哪里结束
It doesn't even know what module it's in or even if it's, even if it is defined in a module
即使它是在模块中定义的，它甚至不知道它所在的模块，甚至它是什么模块
So in this case it just it does a call with all zeros
所以在这种情况下它只是用全零来调用
And then it adds this relocation entry that says to the linker
然后它添加了对链接器说的重定位条目
At offset f you've got a four byte pc-relative reference to a function,to assemble called sum
在偏移量f处，你有一个四字节的pc相对函数引用，用于汇总调用sum
And then it this is sort of a arcane detail that but and it includes
然后，这是一个神秘的细节，但它包括
There's an option to include a bias in the in the offset
可以选择在偏移中包含偏差
And since we're using since calls are always resolved using pc-relative addressing
因为我们正在使用，因为调用总是使用pc相对寻址来解决
The value that's going to be placed here at these four bytes that offset f
将在这四个字节处放置的值偏移f
Is going to be an offset from the current %rip value or program or counter value
将是当前％rip值或程序或计数器值的偏移量
And since the program counter always points to the nest get next instruction
并且由于程序计数器总是指向嵌套获取下一条指令
It includes this which is four bytes away it includes this
它包括四个字节，它包括这个
This offset of minus four
这个偏减四
So I talked about it in detail in the book if you really want to know how this works
所以如果你真的想知道它是如何工作的，我会在书中详细讨论它
But just the point here is that there's enough information for the linker to actually fill in the right address
但这里的重点是链接器有足够的信息来实际填写正确的地址
So now if we look at the relocated text section
现在，如果我们查看重定位的文本部分
So if we compile this code into an executable and then we use object on to disassemble it
因此，如果我们将此代码编译为可执行文件，然后我们使用object on来反汇编它
Then what you see is this reference here
那么你看到的就是这里的参考资料
Where we move the address of the address of a into %edi
我们将地址转移到％edi的地方
Those four bytes which were original zero have now been updated with the actual address of array in memory at runtime
这四个原始零的字节现在已经在运行时用内存中数组的实际地址更新
Okay so the linkers decided that the array is going to go at address 0x601018
好的，所以链接器决定数组将在地址0x601018处
And then it's actually patched that the four bytes in the cup in the in the move instruction with that absolute address
然后它实际上修补了移动指令中带有该绝对地址的杯子中的四个字节
And the call to sum is...it's also been updated
对sum的调用是......它也被更新了
But this one's interesting right that
但这个有趣的权利
So the address it's been updated with the pc relative address of five
所以用pc的相对地址为5来更新它的地址
Okay so when this program runs
好的，所以当这个程序运行时
This call instruction
这个电话指令
What it will do when it when it determines when it computes the absolute address of the function sum
当它确定何时计算函数和的绝对地址时它会做什么
It will take...
它需要......
It will take the current value of the program counter which is the next instruction so 0x4004e3
它将采用程序计数器的当前值，即下一条指令0x4004e3
And it will add to it whatever value is in this immediate field
它将增加它在这个直接领域的任何价值
Okay which is a two's comp... interpret it as a two's complement integer so it can go
好的，这是一个二的补偿...把它解释为一个二进制补码整数，所以它可以去
It can be relative you can go - or +
它可以是相对的，你可以去 - 或+
In this case it's saying that the function that you want to call is at 0x4004e3 + 5
在这种情况下，它表示你要调用的函数是0x4004e3 + 5
Which is 0x4004e8 which is the address of some
哪个是0x4004e8，这是某些地址
Okay and so the linker does that the compiler has all the smarts
好的，所以链接器确实编译器拥有所有的智能
The compiler computed the relocation entry
编译器计算了重定位条目
The linker is just blindly going through each of those relocation entries and just doing what it's told
链接器只是盲目地浏览每个重定位条目，只是按照它所说的去做
Okay but the net result is that now all of these these references have been patched up with valid absolute addresses
好的，但最终结果是，现在所有这些引用都已使用有效的绝对地址进行了修补
Now once the linkers created an object file
现在，一旦链接器创建了一个目标文件
That object file can be loaded the code and data
该对象文件可以加载代码和数据
And that object file can be loaded directly into memory with no further modification
并且该对象文件可以直接加载到内存中而无需进一步修改
Ok so the if you look at all of the read-only sections in the executable
好的，如果你查看可执行文件中的所有只读部分
So there's this init section which
所以有这个init部分
We're not to worry about that, all the code is in the .text and things like jump tables are in .rodata
我们不用担心，所有代码都在.text中，跳转表之类的东西都在.rodata中
All of this data can be loaded directly into memory as is
所有这些数据都可以直接加载到内存中
Okay so these bytes can just be copied directly into memory
好的，所以这些字节可以直接复制到内存中
And that forms the so called a read-only code segment
这形成了所谓的只读代码段
The data in the .data and .bss  sections can also be copied directly into memory
.data和.bss部分中的数据也可以直接复制到内存中
And in the case of the variables and .data they'll be initialized to a value that's stored in the symbol table
在变量和.data的情况下，它们将被初始化为存储在符号表中的值
So we're drawing a memory here
所以我们在这里画一个记忆
This is the (memory) address space that every Linux program sees
这是每个Linux程序看到的（内存）地址空间
And we're drawing addresses starting from 0 and going up increasing as we grow up
我们从0开始绘制地址，随着我们的成长而增加
And every program is loaded at this the same address  0x400000
并且每个程序都加载到相同的地址0x400000
And so the the code comes directly from the object file the data comes directly from the object file
因此代码直接来自目标文件，数据直接来自目标文件
And then that's followed by a runtime heap
然后是运行时堆
Which is created and managed by malloc
这是由malloc创建和管理的
So when you need dynamically need to allocate memory
所以当你需要动态需要分配内存时
Like using malloc that memory comes out of this heap
就像使用malloc一样，内存来自这个堆
Which starts immediately following the data segment and grows upwards
它紧随数据段之后开始并向上发展
The stack is at the very top of the visible memory that's available to application programs
堆栈位于可见内存的最顶层，可供应用程序使用
The memory above that is restricted to the kernel
上面的内存仅限于内核
Okay so if you try to access those memory locations you'll get a seg fault
好的，如果你尝试访问这些内存位置，你将收到seg错误
And then the stack as we know grows down so this is managed and created a run time
然后我们知道的堆栈会逐渐减少，这样就可以管理并创建一个运行时
And then there's this region somewhere in this huge gap between the stack and the heap
然后在堆栈和堆之间的这个巨大差距的某个地方存在这个区域
There's a region for shared libraries so the .so files all get loaded into this memory mapped region for shared libraries
共享库有一个区域，因此.so文件都被加载到共享库的内存映射区域
Now that the top of the heap is indicated by this global variable
现在堆的顶部由此全局变量指示
Maintained by the kernel called break brk
由内核维护，名为break brk
And the the top of the stack as we know is maintained by the general purpose register %rsp
我们所知道的堆栈顶部由通用寄存器％rsp维护
Now there's a little bit of a...this is a little bit of a simplification
现在有一点......这有点简化
If you actually look at the addresses returned by malloc
如果你实际查看malloc返回的地址
There's actually,a there's actually two heaps
实际上，实际上有两堆
There's a heap up here and in the high memory that grows down
这里有一堆堆积，并且在高速记忆中会逐渐减少
That's used for large objects,very large
那用于大型物体，非常大
You know if you mount like a whole bunch of space
你知道你是否像一大堆空间一样安装
And then the heap that grows up is  is reserved for smaller smaller objects
然后，长大的堆被保留用于较小的较小对象
So I'm not really sure why they do this
所以我不确定他们为什么这样做
I think it allows them to have separate allocation algorithms for large objects and small objects
我认为它允许他们为大对象和小对象分别使用分配算法
Okay so one of the real advantages of linking is that allows us to create libraries of things
好吧，链接的一个真正优势是允许我们创建事物库
So it's always something we want to do as programmers we always...
因此，作为程序员，我们总是希望做的事情......
We always want to create abstractions and then present those abstractions to users
我们总是希望创建抽象，然后将这些抽象呈现给用户
Right and we do that by creating libraries defining an api
是的，我们通过创建定义api的库来实现
Yes
是
[student speaking]
[学生说话]
I think it just is...no no it
我认为这只是......不，不
Actually that's a good question I... the things I've done it just grows until it runs out of memory right there
实际上，这是一个很好的问题我...我做过的事情只会增长，直到它在那里耗尽内存
So I don't think actually that's a really good question I mean I've...
所以我认为这不是一个非常好的问题我的意思是我...
I've done those experiments and it eventually reaches some limit
我做过那些实验，最终达到了一定的限度
Yeah I don't know it's a very large number
是的我不知道这是一个非常大的数字
But I so you know as programmers we always want to abstract define apis
但我知道作为程序员我们总是想抽象定义apis
Implement package up those api's and make them available to to other programmers
实现打包这些api并将其提供给其他程序员
So how can we actually do that how can we make commonly used functions available to other programmers
那么我们如何才能真正实现这一目标呢？我们如何将常用函数提供给其他程序员
Well one thing given what we've learned so far
鉴于我们迄今为止学到的东西，还有一件事
 You could just take all the functions and put them all in a single big C file right
你可以把所有的功能都放在一个大的C文件中
And then programmers would just link that C file into their programs if they want to use them right
然后程序员只要将C文件链接到他们的程序中，如果他们想要正确使用它们
Another option would be to take that might get kind of unwieldy if it's a big library right
另一种选择是如果它是一个很大的图书馆，可能会变得有点笨拙
Lipsi has hundreds and hundreds of functions
Lipsi有数百种功能
So another option would might be to just take each function put it in a separate file
所以另一种选择可能是将每个函数放在一个单独的文件中
And then compile them all together and compile and link them all together
然后将它们一起编译并编译并将它们链接在一起
So this is more space and time efficient than then the first option
因此，这比第一个选项更节省空间和时间
But it seems like it would be burdensome on the programmer because
但似乎这对程序员来说会很麻烦，因为
The program would have to know where all the all these functions were and put them in make files
该程序必须知道所有这些函数的位置，并将它们放在make文件中
It'd just be a lot of you know this you could end up with a ridiculously large command line to GCC
很多人都知道你最终可能会向GCC提供一个非常大的命令行
So that one solution to this problem is that
所以这个问题的一个解决方案是
The first solution that the developers of Unix came up with us
Unix开发人员提出的第一个解决方案
Something called a static library
有些东西叫做静态库
So the the idea where the static library is that you create this archive  called a .a file
因此，你创建此归档的静态库的想法称为.a文件
Which is it's just a collection of .o file where each .o file contains a function
这只是.o文件的集合，其中每个.o文件都包含一个函数
Ok so you take all the functions in your library you use option two to create a bunch of .o files
好的，所以你使用库中的所有函数，你使用选项二来创建一堆.o文件
And then you use a program called an archive or AR  to take those .o files
然后你使用一个名为archive或AR的程序来获取那些.o文件
Put them together in a all together in a big file called an archive
将它们放在一起，放在一个称为存档的大文件中
With a table of contents at the beginning that tells you the offset of each one of the .o files
使用一个开头的目录，告诉你每个.o文件的偏移量
Ok so an archive is just this concatenated collection of .o files
好的，所以存档就是这个连接的.o文件集合
And then and then you link you pass that archive to the linker
然后，你将链接传递给链接器
And it only takes the .o files that are actually referenced  and links them into the code
它只需要实际引用的.o文件并将它们链接到代码中
Right so it's a more efficient way you can have a huge archive
这是一个更有效的方式，你可以有一个巨大的档案
But like lib.c but if you only call printf
但是像lib.c一样但是如果你只调用printf
The only .o file you get is printf.o
你得到的唯一.o文件是printf.o
Okay so the way this works is
好的，这样做的方式是
As before we take
和以前一样
We take all the functions we want to put in our library
我们将我们想要的所有功能放在库中
We run them through our translators to get .o files
我们通过翻译器运行它们来获取.o文件
We pass those to the archiver to get a the archive
我们将这些文件传递给归档器以获取归档文件
So in this case libc.a
所以在这种情况下libc.a
And which has this code for printf that we might want to use
并且我们可能想要使用这个printf代码
Right and so we can recreate that archive anytime we want
是的，所以我们可以随时重新创建该档案
So if one of these functions changes like say printf changes
因此，如果其中一个函数发生变化，就像printf更改一样
You just re archive the dot recompile printf and then re archive all of the .o files
你只需重新存档点重新编译printf，然后重新存档所有.o文件
So in libc it's about 1500 object files
所以在libc中它大约有1500个目标文件
And it's archived things like printf,scanf,simple integer math and there's also a math library
它存档的东西，如printf，scanf，简单的整数数学，还有一个数学库
Which has you know several hundred common functions for things like
你知道几百种常见功能
Floating point math sin,cos,tan gent etc
浮点数学sin，cos，tan gent等
These libraries the convention is that a library always is prefixed with lib with lib and then
这些库的惯例是，库总是以lib为前缀，然后是lib
And then sort of new some indication of what it what it does
然后对它的作用进行了一些新的指示
So now let's see how linking with these static libraries would work
现在让我们看看如何与这些静态库链接起作用
So I've created a little example here
所以我在这里创建了一个小例子
I've created a library called libvector.a
我创建了一个名为libvector.a的库
And it consists of functions that manipulate vectors
它由操纵向量的函数组成
And this is a real simple library it just adds
这是一个真正简单的图书馆
There's a function to add two vectors x and y together and return the result in z
有一个函数可以将两个向量x和y相加并在z中返回结果
And then another similar function that will do pairwise multiplication of two vectors so
然后是另一个类似的函数，它将对两个向量进行成对乘法
x[i]*y[i] equals z[i]
x [i] * y [i]等于z [i]
Now I compile these two programs and pack I want to package them into an archive called libvector.a
现在我编译这两个程序并打包我想将它们打包成一个名为libvector.a的存档
And then in my main program I'm going to call one of those functions addvec
然后在我的主程序中，我将调用其中一个函数addvec
To add these two vectors x and y together
将这两个向量x和y加在一起
So now what happens when we compile this this program
那么现在当我们编译这个程序时会发生什么
We've already we've constructed the archive libc.a  from addvec.o and multvec.o
我们已经从addvec.o和multvec.o构建了存档libc.a
And we pass that archive to the linker along with a main 2.0 relocatable object file
我们将该存档与主2.0可重定位目标文件一起传递给链接器
And we also pass it libc.a
我们也将它传递给libc.a
Which has the definition of which contains printf.o
其定义包含printf.o
And anything else that printf.o my call
还有什么打印我的电话
So these three the linker detects the reference to addvec the function addvec
所以这三个链接器检测到addvec函数addvec的引用
And so it just pulls addvec.o out and ignores the rest,similarly for printf.o
所以它只是将addvec.o拉出来并忽略其余部分，类似于printf.o
And then it compiles all those
然后它编译所有这些
Main main.o addvec.o and printf.o all together into this fully linked executable
主要的main.o addvec.o和printf.o一起进入这个完全链接的可执行文件
Called prog2c for compiled time
称为prog2c编译时间
So we're doing this,we're doing this link,we're doing this this linking at compile time
所以我们这样做，我们正在做这个链接，我们在编译时这样做这个链接
When we call a GCC
当我们打电话给GCC时
Now what the linker does when it's using static libraries
现在链接器在使用静态库时会做什么
It scans all the .o files and .a files in order on the command line
它在命令行上按顺序扫描所有.o文件和.a文件
So you're just typing GCC and then a list of .o files and .a files in some order
因此，你只需键入GCC，然后按某种顺序键入.o文件和.a文件列表
So during the scan it keeps a list of the current unresolved references right
因此，在扫描期间，它会保留当前未解析的引用列表
If let's say let's say it looks at main.o first and there's a reference to printf
如果让我们说它首先看看main.o并且有一个对printf的引用
That's an unresolved reference because print is not defined in main.o
这是一个未解决的参考，因为print未在main.o中定义
So that goes in a list of undefined references
所以这是一个未定义的引用列表
And at some point or another as each new .o file or .a file is encountered
在某些时候，遇到每个新的.o文件或.a文件
The linker tries to without but list of references with the symbols that are defined in that .o file or .a file
链接器尝试使用该.o文件或.a文件中定义的符号但不包含引用列表
And then if there's any entries in the list at the end of the scan then there's error
然后，如果在扫描结束时列表中有任何条目，那么就会出错
Okay so that the key here is that the linker will try to resolve these references from left to right on the command line
好的，这里的关键是链接器将尝试在命令行上从左到右解析这些引用
And so this is another sort of important thing for you to know as programmers
因此，作为程序员，这是另一种重要的事情
Because the order that you put your files on the command line actually makes a difference
因为你将文件放在命令行上的顺序实际上有所不同
Okay so you can get sort of weird baffling linker errors if you use the wrong order
好的，如果你使用错误的订单，你可能会遇到一些奇怪的令人困惑的链接器错误
So for instance suppose we've got
所以比如假设我们有
A function an object module called libtest
一个函数，一个名为libtest的对象模块
That calls a function that's defined in lmine.a
它调用了一个在lmine.a中定义的函数
Okay so these -L, -L period that says to look for,to look for a library files in the current directory
好的，所以这些-L，-L期间要求查找，以查找当前目录中的库文件
That's what the dot look there first and then look in the normal places that you look
这就是点首先看到那里，然后看看你看起来正常的地方
And the the -l that's a it's like an abbreviation
而-l就像是一个缩写
We could replace this with just the fully spelled out lmind.a
我们可以用完全拼写的lmind.a替换它
Okay but you'll see this this  -l used a lot
好的，但是你会看到这个 - 我经常使用它
So libtest calls a function that's declared in lmind.a
因此libtest调用在lmind.a中声明的函数
So the linker looks at it looks at the unresolved symbols in libtest.o
因此，链接器会查看它在libtest.o中查看未解析的符号
And it detects that there's this unresolved function let's say it's called foo
并且它检测到这个未解决的函数让我们说它叫做foo
I know it's it's called libfun
我知道它叫做libfun
So and it puts it on the list and then it goes on to the next command line entry and that's lmine.a
所以它把它放在列表上然后继续下一个命令行条目，那就是lmine.a
And in there it finds it finds this symbol of libfun
在那里，它发现它找到了libfun的这个符号
And it resolves the reference to that libfun to the actual address the relocated address
并且它将对libfun的引用解析为重定位地址的实际地址
Now if we switch the order and we put lmine.a first followed by libtest.o
现在，如果我们切换订单，我们首先将lmine.a放在libtest.o之后
Well there's no unresolved references in this library
那么这个库中没有未解析的引用
Right it's just the collection of function definitions
对，它只是函数定义的集合
So it there's no unresolved references so the linker looks at that that's all good
因此它没有未解析的引用，因此链接器会查看这一切都很好
And then it looks at libtest.o and now there's an unresolved reference to two libfun
然后它查看libtest.o，现在有两个libfun未解析的引用
But we're out of we're at the end of the command line
但是我们已经离开了命令行的末尾
So that's a linker error
这是一个链接器错误
So you get this you get this really cryptic error message
所以你得到这个你得到这个真正神秘的错误信息
And if you didn't know about this ordering rule you wouldn't have any idea how to debug
如果你不了解此排序规则，你将不知道如何调试
It okay so the static libraries are kind of the old fashioned solution that
没关系，静态库是一种老式的解决方案
The modern solution is to use dynamic libraries or shared libraries
现代解决方案是使用动态库或共享库
So the reason the reason there's this sort of newer form of libraries
这就是为什么有这种新形式的图书馆的原因
That static libraries have some disadvantages
静态库有一些缺点
So every if you compile with static libraries
所以如果你用静态库编译的话
Then every every function that uses printf
然后每个使用printf的函数
Which or every program that uses printf has to have a copy of printf
使用printf的哪个或每个程序都必须有printf的副本
Okay but almost every every program uses printf right
好的，但几乎每个程序都使用printf
So there's a shared libraries allow provide a mechanism where there can just be one
所以有一个共享库允许提供一个只有一个的机制
Wherever there's just one instance of a shared library member like printf
只要有一个像printf这样的共享库成员的实例
And every program running on the system will share that one copy
并且系统上运行的每个程序都将共享该副本
So that's sort of the big disadvantage is this potential duplication
因此，这种潜在的重复是一个很大的缺点
So shared libraries are different in the sense that they contain
因此共享库在它们包含的意义上是不同的
Code and data that are linked and loaded into the program not when it's
链接并加载到程序中的代码和数据，而不是它的时间
Not when it's compiled and linked and into a executable object file
不是在编译和链接到可执行对象文件时
But actually when the program is loaded into the system
但实际上当程序加载到系统中时
So linking of references to shared library objects is deferred
因此，延迟了对共享库对象的引用的链接
Until the program is actually loaded into memory
直到程序实际加载到内存中
Until the executable object file is actually loaded into memory
直到可执行目标文件实际加载到内存中
And this can either and it can even happen
这可以，甚至可以发生
It can happen when the program is actually loaded into memory but it can also happen at runtime anytime at runtime
它可能在程序实际加载到内存时发生，但也可以在运行时随时在运行时发生
So you can be...you can be running a program
所以你可以...你可以运行一个程序
And that program can arbitrarily decide to load a function that's declared in a shared library
并且该程序可以任意决定加载在共享库中声明的函数
Okay and I'll show you that it's really cool
好的，我会告诉你它真的很酷
Now these things are often called they're called shared libraries
现在这些东西经常被称为共享库
They're called dynamic link libraries like in windows they're called dlls
它们被称为动态链接库，就像在windows中一样，它们被称为dll
.iso files they're all referenced the same thing
.iso文件他们都引用了相同的东西
Okay so that this like I said you can...
好吧这就像我说的那样......
The dynamic linking can occur when the program's loaded or after it's loaded and actually running
动态链接可以在程序加载时或加载并实际运行后发生
And there's this sort of big deal that shared library routines can be shared by multiple processes
并且存在这样一个大问题，共享库例程可以由多个进程共享
And we'll look at this this will make sense when we look at virtual memories
我们将会看到这一点，当我们看到虚拟记忆时，这将是有意义的
So don't worry about that now
所以现在不要担心
But but here's how the process works
但是这里的过程是如何运作的
So we've,first we have to create instead of creating an archive
所以我们首先要创建而不是创建存档
We create a shared library,so our libvector routines
我们创建一个共享库，所以我们的libvector例程
Instead of creating an archive a file we create a shared a .so file
我们创建一个共享的.so文件，而不是创建存档文件
Using the shared argument to GCC
使用GCC的共享参数
So we take our two input functions a addvec and multvec
因此我们将两个输入函数作为addvec和multvec
And share it says to create and we're telling GCC to create a shared library  and place it in libvector.so
并分享它说要创建，我们告诉GCC创建一个共享库并将其放在libvector.so中
Okay and so and there's also that the C developers have created a punctured library called libc.so
好的，还有C开发人员创建了一个名为libc.so的打孔库
That contains printf and on it and other standard library functions
它包含printf及其和其他标准库函数
So we take our program main2,this is the same program that calls addvec
所以我们采用我们的程序main2，这是调用addvec的相同程序
And we compile it into main2.o
我们将它编译成main2.o
And we pass main2.0 and  these .so files to the linker
我们将main2.0和这些.so文件传递给链接器
Now the linker doesn't at this point it doesn't actually copy let's say we're using addvec or printf
现在链接器在这一点上并没有真正复制让我们说我们正在使用addvec或printf
It doesn't actually copy those functions or do anything with them in the executable
它实际上并不复制这些函数或在可执行文件中对它们执行任何操作
It just makes a note in the symbol table that those functions will need to be the
它只是在符号表中记下那些函数需要的
References to those functions will need to be resolved when the program is loaded
加载程序时需要解析对这些函数的引用
Okay so it,it puts in a relocation entry that says fix this up when you load the program
好吧，它放入一个重定位条目，说明在加载程序时解决这个问题
So it's partially linked but it's not fully linked
所以它是部分联系的，但它并没有完全联系起来
You can't take that,you can't take a program,you can't take a executable file
你不能拿那个，你不能拿一个程序，你不能拿一个可执行文件
That was dynamically linked and loaded directly
这是动态链接和直接加载
What you do is the loader which is the execve system call
你所做的是作为execve系统调用的加载器
And we'll learn more about that, but just this is just a sys call that loads loads executables into memory and runs them
我们将更多地了解它，但这只是一个sys调用，它将可执行文件加载到内存中并运行它们
The loader takes the executable
加载器获取可执行文件
And then it takes the shared .so files
然后它需要共享的.so文件
That this program needs k it also made when the linker also made a note of which .so files it needs
当链接器还记录了它需要哪个.so文件时，这个程序还需要k
So the loader calls the dynamic linker which takes those .so files
所以加载器调用动态链接器，它接受那些.so文件
And then actually resolves all the references to any on any unresolved reference
然后实际解析任何未解析的引用上的所有引用
Okay so the the address of addvec,the addvec and printf functions isn't determined until the program is loaded
好的，所以addvec的地址，addvec 和 printf 函数在程序加载之前是不确定的
And by that and it isn't determined by the dynamic linker until the program is loaded
由此，在加载程序之前，动态链接器不会确定它
So that the dynamic linker does it goes through a similar process that the static linker did
因此，动态链接器会执行与静态链接器类似的过程
Sort of fixing up references to add back at references to printf
修复引用以排除对printf的引用
And then at that point the binary is in a form that can be executed directly
然后在那时，二进制文件的形式可以直接执行
So question-yes-what if you look the part where did like where is that like if you include violence and use anger and greed zero actually
所以问题 - 是 - 如果你看看哪个部分在哪里，如果你包含暴力并使用愤怒和贪婪零
Okay the question is what happens if you include a file
好的问题是如果你包含一个文件会发生什么
So includes are handled by the C preprocessor
因此包含由C预处理器处理
So they're gone, they're long gone, by the time the by the time the linker gets around to it
因此，当链接器到达它时，它们已经消失了，它们已经很久了
Okay so the C preprocessor just takes #define,#include
好的，所以C预处理器只需要#define，#include
And and interprets those and outputs another C program
并解释这些并输出另一个C程序
So if you include a file the C preprocessor just takes that file and just expands it
因此，如果你包含一个文件，C预处理器只需要获取该文件并将其展开
And the output C program contains an expanded version of all the files that you include it
输出C程序包含你包含它的所有文件的扩展版本
Okay now what's really cool is that you can also do this dynamic linking at runtime
好的，现在真正酷的是你也可以在运行时进行动态链接
So what I showed you before we're doing it at load time
所以我在加载时我们展示的是什么
But you can also arbitrarily decide to load link and call a function from a shared from a from any function defined in a .so file
但你也可以随意决定加载链接并从.so文件中定义的任何函数的共享中调用函数
And the way you do it is there's a there's an interface called the dlopen
你这样做的方法就是有一个名为dlopen的界面
That's in lib.c that allows you to do this
这是在lib.c中允许你这样做
So let's say we want to this is our main program and just like before we want to call addvec
所以，假设我们希望这是我们的主程序，就像我们想要调用addvec之前一样
Okay but addvec now is defined in a .so file
好的，但现在addvec是在.so文件中定义的
The exact same .so file that we generated before
我们之前生成的完全相同的.so文件
When we compile,so we'll call this dll.c,when we compile this program ddl.c
当我们编译时，所以当我们编译这个程序ddl.c时，我们将调用这个dll.c
We have no idea that it's going to call a function from lib.so
我们不知道它会从lib.so调用一个函数
We just compile it as though a standalone C program
我们只是编译它就像一个独立的C程序
Within this program though we declare a pointer a function pointer called addvec
虽然我们在这个程序中声明了一个名为addvec的函数指针
And we give the prototype for this function
我们给出了这个功能的原型
It's pointers city so it's a two input arrays the output array on the size
它是指针城市，因此它是一个两个输入数组的输出数组
And then first we dynamically load the shared library that contains the function we want
然后我们首先动态加载包含我们想要的函数的共享库
So we call dlopen and we say load up this .so file into memory
所以我们调用dlopen，然后我们说把这个.so文件加载到内存中
So that I can call a function
这样我就可以调用一个函数了
But don't resolve,you know don't worry about the resolving the references to it functions until I actually tell you too
但是不要解决，你知道在我实际告诉你之前不要担心解析对它的引用
That's the lazy part
那是懒惰的部分
And so what what this deal open returns a handle
那么这笔交易的回报是什么呢？
That then you use in subsequent calls okay
然后你在后续的电话中使用好吧
So if we don't if the handle is null there was some kind of error like maybe this data .so file does exist
因此，如果我们不这样做，如果句柄为空，就会出现某种错误，例如这个数据.so文件确实存在
So once we've opened that .so file then we use dlsym with the handle so this
所以一旦我们打开那个.so文件，那么我们使用带有句柄的dlsym这样
And then we give it as we pass as a string the name of the function that we want to invoke
然后我们给它，因为我们传递一个字符串作为我们想要调用的函数的名称
And what we get back from dlsym as a pointer to that function
我们从dlsym回来作为指向该函数的指针
And then we can use that function just like any other function so we can use that function pointer
然后我们可以像任何其他函数一样使用该函数，因此我们可以使用该函数指针
And we call it just as though it were a statically defined function
我们称之为静态定义函数
So you can see this is real very powerful technique
所以你可以看到这是一个非常强大的技术
Okay so looks let's finish the last little bits of the class
好吧看起来让我们完成课程的最后一点
I want to show you it to try to convince you that linking is is actually interesting which is kind of a hard sell sometime
我想告诉你它试图说服你，链接实际上是有趣的，有时候很难卖
Yes question...yes...no it's that's how you know
是的问题......是的......不，这就是你怎么知道的
No you just it's declared as a function pointer
不，你只是声明它是一个函数指针
And you then you just use the name of the function you don't have to dereference it
然后你就可以使用你没有的功能名称来取消引用它
Or you just you call it you call the function by just using that function pointer name okay
或者你只是在调用它，你只需使用该函数指针名称即可调用该函数
Just like I did
就像我一样
If you dereference it I just get back a pointer value
如果你取消引用它我只是得到一个指针值
You get back the address of that function
你找回那个功能的地址
All right so it's kind of a hard sell to that to convince you that linking is interesting
好吧，所以这很难说服你说链接很有意思
But I'm going to try
但是我要试试
Ok so there's this powerful technique called inner library inter positioning
好的，有这种强大的技术称为内部库间定位
And the goal is to intercept function calls from libraries
目标是拦截来自库的函数调用
And do something intercept them for some reason
并且出于某种原因做一些拦截它们的事情
Right so what we typically want to do is intercept a function call
这是我们通常想要做的就是拦截一个函数调用
Maybe record some to some statistics or do some error checking
也许记录一些统计数据或做一些错误检查
And then call the real function as intended
然后按预期调用实际函数
Right so the idea is we're going to create wrappers
对，所以我们的想法是创建包装器
And when the program when a program calls a function what we're going to do is we're going to execute its wrapper instead
当一个程序调用一个函数的程序时，我们要做的就是执行它的包装器
Okay and we're going to do it without changing any of the source
好的，我们将在不改变任何来源的情况下这样做
Now there's a lot of reasons there's a lot of applications for this
现在有很多原因，有很多应用程序
That the neatest one that I know is that these facebook engineers
我知道的最新的是这些facebook工程师
So we're trying to deal with this year-long bug in the facebook iPhone app
所以我们正试图在Facebook iPhone应用程序中处理这个长达一年的错误
And nobody could figure out what was going on
没有人能弄明白发生了什么
And they figured it out using library inter positioning
他们使用库间定位来解决这个问题
They figured out that there was something in the network stack writing to the wrong location
他们发现网络堆栈中有东西写错了位置
They figured it out by intercepting all the calls from their facebook app  that did rights
他们通过拦截来自他们的Facebook应用程序的所有权利来解决这个问题
So things like write to the ep right
所以像写入权利一样
So they just they intercepted all those calls and then they were able to
所以他们只是拦截了所有这些电话，然后他们就可以了
To when they looked at the arguments and how those functions were being called
当他们查看参数以及如何调用这些函数时
They determine the air
他们决定空气
You can also use it for monitoring and profiling like
你也可以使用它进行监视和分析
So if you want to know like how many times different functions get called you can you can interpose
因此，如果你想知道调用不同函数的次数，你可以设置
We use it for generating address traces
我们用它来生成地址跟踪
So you're malloc when you do your malloc lab later in the semester
所以当你在学期后期做malloc实验室时，你就是malloc
You're going to be evaluating your malloc using a traces
你将使用跟踪评估你的malloc
That we generated from real programs using this inter positioning technique
我们使用这种内部定位技术从真实程序生成的
Right so we enter post on all the malloc and free calls in like netscape
是的，所以我们在像netscape这样的所有malloc和免费电话上输入帖子
And then we just recorded what addresses and sizes
然后我们只记录了地址和大小
Malloc was returning and what what blocks free was freeing up
Malloc正在回归，什么阻止免费的东西正在释放
And we just created a trace of those, and then, so let me show you how you would do this
我们刚刚创建了一些这些，然后，让我告诉你如何做到这一点
So the idea let's say we have this main program
所以这个想法让我们说我们有这个主程序
And the idea is to trace all the malloc and free calls
并且想法是跟踪所有malloc和免费电话
So there's one malloc call and there's one free call
所以有一个malloc电话，有一个免费电话
And we want to know what these addresses are and we want to know what these sizes are
我们想知道这些地址是什么，我们想知道这些尺寸是什么
So we can do this at either compile time, link time or run time
所以我们可以在编译时，链接时或运行时执行此操作
To do it at compile time
在编译时执行此操作
We first write wrapper functions called mymalloc and myfree
我们首先编写名为mymalloc和myfree的包装函数
Where mymalloc call most the real malloc function
mymalloc最能调用真正的malloc函数
And then it prints out the the size that it was called and the address that malloc returned
然后它打印出它调用的大小和malloc返回的地址
Okay so this when we run our program it will print out these all these addresses
好的，所以当我们运行程序时，它会打印出这些所有这些地址
And it does the same thing for free
并且它免费做同样的事情
And then here's the trick in malloc.h
然后是malloc.h中的技巧
We define malloc to be mymalloc ,okay and free to be myfree
我们将malloc定义为mymalloc，好的并且可以自由地成为myfree
And then we give the prototype for it so the compiler doesn't get confused
然后我们给它原型，这样编译器就不会混淆了
And then we can compile mymalloc.c into a .o file
然后我们可以将mymalloc.c编译成.o文件
And then we call week then we complete we call our program
然后我们打电话给周，然后我们完成我们称之为程序
Which is our main program int.c for inner positioning
这是我们用于内部定位的主要程序int.c.
And we call that and here's the trick
我们称之为，这就是诀窍
We call it with the -I argument
我们用-I参数调用它
And we say look for any include files in the current directory
我们说在当前目录中查找任何包含文件
Okay so this was similar to that -L argument
好的，这与-L参数类似
But because we tell GCC to look in the current directory first
但是因为我们告诉GCC先查看当前目录
So this is sort of where the inner positioning happens
所以这就是内部定位发生的地方
This because when it does that it's going to it's going to find a
这是因为当它这样做时，它会找到一个
It's going to find a library called malloc.h
它将找到一个名为malloc.h的库
I mean .h file called malloc.h
我的意思是.h文件叫做malloc.h
And so all the calls to malloc will be translated by the C preprocessor to mymalloc
所以对malloc的所有调用都将由C预处理器转换为mymalloc
So when we run this it prints out the the trip malloc and free trace
因此，当我们运行它时，它打印出行程malloc和自由跟踪
Now we can also do this at link time
现在我们也可以在链接时执行此操作
So we can tell C,in order to do this we had to get access to the
所以我们可以告诉C，为了做到这一点，我们必须访问
We had to compile the program,we didn't have to change it but we had to compile it
我们必须编译程序，我们不必更改它，但我们必须编译它
We can use link time at our positioning if to avoid that compilation
如果要避免编译，我们可以在定位时使用链接时间
So the way this works we define our wrapper functions with this special name underscore underscore wrap malloc
因此，我们使用这个特殊名称下划线下划线包装malloc来定义我们的包装器函数
And this calls the real malloc function and then prints out the information
这会调用真正的malloc函数，然后打印出信息
And then at link time then we do the inter positioning by calling the linker with this special -Wl  argument
然后在链接时，我们通过使用这个特殊的-Wl参数调用链接器来进行内部定位
And so what this does the -Wl flag to GCC says hey
那么这对GCC的-Wl标志是什么呢？
Take what follows the argument that follows replace all the commas with spaces
接下来的参数后面用空格替换所有逗号
And then invoke the linker with this argument
然后使用此参数调用链接器
Okay so what we're doing is passing a linker arguments to the linker
好的，我们正在做的是将链接器参数传递给链接器
And this --wrap argument to the linker
这是链接器的--wrap参数
It tells the linker to resolve all references to malloc as underscore underscore wrap malloc
它告诉链接器将对malloc的所有引用解析为下划线下划线换行malloc
And all references to underscore real malloc - should be resolved as malloc
并且所有引用下划线真正的malloc  - 应该被解析为malloc
Okay so anywhere in the program what we call malloc it'll be resolved to underscore underscore wrap malloc
好的，在程序的任何地方，我们称之为malloc，它将被解析为强调下划线包裹malloc
And it will invoke our wrapper and then the wrapper calls real malloc
它将调用我们的包装器，然后包装器调用真正的malloc
Which by because of this flag resolves to the the actual malloc routine
因为这个标志解决了实际的malloc例程
Now here you can also in the really the really amazing thing
现在，你可以在真正非常神奇的事情中
You can also do this inter positioning it load timer and run time when the program is loaded
你也可以在加载程序时将其定位到加载计时器和运行时间
So you don't even need access to the .o files all you need is access to the executable
因此，你甚至不需要访问.o文件，只需访问可执行文件即可
Right and for every program we have access to the executable
对于我们有权访问可执行文件的每个程序
So think about that we can take any program
所以想想我们可以采取任何计划
And we can interpose on its library calls at runtime
我们可以在运行时插入其库调用
So the way we do this is we write the wrapper function now uses the dlsym call that we saw before
所以我们这样做的方式是我们编写包装器函数现在使用我们之前看到的dlsym调用
And we call it with this special function the special argument called next
我们用这个特殊的函数调用它，这个特殊的参数叫做next
And we silver and what this is saying is get the address of the real malloc
我们银和这说的是得到真正的malloc的地址
Okay so and we're going to trick the linker into looking first to implementation of malloc
好的，我们将欺骗链接器首先查看malloc的实现
But here we want the real one,so we're telling it to get to look in the next place,its next place that it would normally look
但是在这里我们想要真正的那个，所以我们告诉它要去下一个地方，它通常看起来的下一个地方
And fetch the the address of malloc
并获取malloc的地址
So the result is a pointer a function pointer called mallocp
所以结果是一个指针叫做mallocp的函数指针
And then we can just call that function to get to call the libc malloc
然后我们可以调用该函数来调用libc malloc
And then print out the the data
然后打印出数据
Okay we do the same thing for free, we use dlsym in exactly the same way for free
好的，我们免费做同样的事情，我们以完全相同的方式免费使用dlsym
And then the inter positioning now happens when the program is loaded
然后，当程序加载时，就会发生内部定位
So notice we built this our main program now in tar for run time inter positioning
所以请注意，我们现在在tar中构建了我们的主程序，用于运行时间间的定位
We built it I'm sorry we created our .so file mymalloc.so using the shared argument
我们建立了它很抱歉我们使用共享参数创建了我们的.so文件mymalloc.so
And then we compiled int.c into this executable called intr
然后我们将int.c编译成这个名为intr的可执行文件
But notice there's no mention of mymalloc.so anywhere
但请注意，在任何地方都没有提到mymalloc
And now the inner positioning happens when we actually run the program
现在，当我们实际运行程序时，内部定位就会发生
And we do it,we affect the the inner positioning by setting an environment variable called ld-preload to mymalloc.so
我们这样做，我们通过将一个名为ld-preload的环境变量设置为mymalloc.so来影响内部定位
And so what this is a environment variable that tells the dynamic linker
这是一个告诉动态链接器的环境变量
To look first in the value, it looked first in the the value of ld preload is a list of locations
要先查看值，首先看一下ld preload的值是一个位置列表
Look first in those locations when to resolve references
首先查看这些位置何时解析引用
And only later look in the normal system places
只有在以后查看正常系统的地方
So we're saying to look in mymalloc.so unresolved references first
所以我们首先要查看mymalloc.so未解决的引用
And then we're invoking,so this is in bash this is how you initialize an environment variable
然后我们正在调用，所以这是在bash中这是初始化环境变量的方式
So we're initializing it to mymalloc.so and then we're loading and running the program
所以我们将它初始化为mymalloc.so然后我们正在加载并运行该程序
And so the ld so all the references to malloc get turned into the references to the wrapper function
所以ld所以对malloc的所有引用都变成了对包装函数的引用
The malloc function that we defined in our program okay
我们在程序中定义的malloc函数没问题
Ok so that's it so that that inter positioning is a really cool technique
好的就是这样，这样的定位是一种非常酷的技术
And it's only possible because of linkers so
而且只有因为连接器才有可能
alright so good we'll see you on on Thursday and good luck with your cache labs
好的，我们星期四会见到你，祝你的缓存实验室好运