# lab2 Bomb Lab 

下载  Self-Study Handout 解压
阅读：bomblab.pdf

将 psol.txt 中的内容作为 `./bomb` 的输入。

    $ ./bomb psol.txt

反汇编，将二进制文件 bomb 的汇编代码存入 bomb.asm 文件中。

    $ objdump -d bomb > bomb.asm

## phase_1

分析 bomb.c 文件发现第一个待输入的字符存于 phase_1 函数中，下面分析根据 bomb.asm 分析 phase_1 的汇编代码。

在 bomb.asm 中全局搜索 phase_1 发现汇编代码如下：

![20220429194202](https://cdn.jsdelivr.net/gh/weijiew/pic/images/20220429194202.png)

分析 strings_not_equal 在此处打断点，分析存储形参寄存器中的值即可。

![20220429223839](https://cdn.jsdelivr.net/gh/weijiew/pic/images/20220429223839.png)

一共十行汇编代码，下面逐行分析，

1. `sub    $0x8,%rsp` 第一行 rsp 减去八个字节,为什么要减？为什么是八个字节？

规定寄存器 %rsp 始终指向栈顶，栈上向下生长。每当申请内存的时候，%rsp 向下移动，而上部分是高地址，下部分是低地址。

减去八个字节是在栈上开辟一块空间，方便局部变量存入。

栈中保存了函数调用时需要维护的信息，例如函数的返回值和参数，临时变量，上下文（函数调用前后不变的寄存器）等信息。这部分内容叫做 Stack Frame 。

rsp 始终指向栈顶，rbp 始终指向栈底。

2. `mov    $0x402400,%esi` 第二行，将 $0x402400 地址存入 esi 寄存器中。

3. `call   0x401338 <strings_not_equal>` 第三行，调用 strings_not_equal 函数，call 调用格式是什么？

4. `test   %eax,%eax` 第四行，test 指令含义？

按照位与操作 eax&eax ，规定 eax 存储了返回值，也就是用来判断是否为 strings_not_equal 的返回值零，若为零则爆炸，反之跳转。

5. `je     0x400ef7 <phase_1+23>` je 又是什么？

跳转到 0x400ef7 处

6. `call   0x40143a <explode_bomb>` 看起来像调用炸弹 explode_bomb 。

调用 0x40143a ，触发爆炸。

7. `add    $0x8,%rsp` rsp 寄存器加上八个字节，似乎整个函数已经执行完毕了，开头减去八个字节，此处加上八个字节用来收尾。

收尾工作

8. `ret` 是什么？

函数执行完毕，返回。

## phase_2

全局搜索 phase_2 ，下面是截取：

![20220430150414](https://cdn.jsdelivr.net/gh/weijiew/pic/images/20220430150414.png)

* 接下来逐行分析，下面是前五行：

 357   400efc:   55                      push   %rbp
 358   400efd:   53                      push   %rbx
 359   400efe:   48 83 ec 28             sub    $0x28,%rsp
 360   400f02:   48 89 e6                mov    %rsp,%rsi
 361   400f05:   e8 52 05 00 00          call   40145c <read_six_numbers>

1. 将寄存器 rbp 和 rbx 中的值保存。规定当发生函数调用的时候需要保存其中的内容。
2. rsp 是栈顶指针，减去 0x28 表示开辟一段空间。
3. 将 rsp 中的值保存到 rsi 中。 rsi 中保存的是函数调用中第二个参数。
4. 接下来是函数调用 read_six_numbers ，根据名字可知读取六个数字。

* 接下来继续分析

 362   400f0a:   83 3c 24 01             cmpl   $0x1,(%rsp)
 363   400f0e:   74 20                   je     400f30 <phase_2+0x34>
 364   400f10:   e8 25 05 00 00          call   40143a <explode_bomb>

5. cmpl 和 je 搭配使用，若两个值相等，则 je 进行跳转，否则顺序执行，下面是原理。

> cmpl 指令将两个操作数相减，但计算结果并不保存，只是根据计算结果改变 eflags 寄存器中的标志位。如果两个操作数相等，则计算结果为 0，eflags 中的 ZF 位置 1。je 是一个条件跳转指令，它检查eflags中的ZF位，ZF位为1则发生跳转，ZF位为0则不跳转，继续执行下一条指令。

6. 此处 cmpl 比较 rsp 中存储的值是否是 1 ，若是 1 则跳转到 400f30 处，反之触发爆炸 explode_bomb 。接下来分析 400f30 处的代码。

 375   400f30:   48 8d 5c 24 04          lea    0x4(%rsp),%rbx
 376   400f35:   48 8d 6c 24 18          lea    0x18(%rsp),%rbp
 377   400f3a:   eb db                   jmp    400f17 <phase_2+0x1b>

7. 能跳到此处的前提 rsp 中的值是 0x1 。那么 rbx 和 rbp 中的值分别是 0x5 和 0x19 。
8. 第三条指令跳转到 400f17 处。接下来从 400f17 处开始分析。

 366   400f17:   8b 43 fc                mov    -0x4(%rbx),%eax
 367   400f1a:   01 c0                   add    %eax,%eax
 368   400f1c:   39 03                   cmp    %eax,(%rbx)
 369   400f1e:   74 05                   je     400f25 <phase_2+0x29>
 370   400f20:   e8 15 05 00 00          call   40143a <explode_bomb>

9. rbx 中的值是 0x5 ，那么 0x5 - 0x4 = 0x1 ，其中 eax 存储的是 0x1 。
10. 接下来的 add 指令使得， eax 中的值变为 0x2 。
11. 然后比较 eax 和 (rbx) 中存储的值是否相等，若相同则跳转到 400f25 处，反之继续执行触碰到炸弹。也就是第二个数字是 0x2 。

 371   400f25:   48 83 c3 04             add    $0x4,%rbx
 372   400f29:   48 39 eb                cmp    %rbp,%rbx
 373   400f2c:   75 e9                   jne    400f17 <phase_2+0x1b>
 374   400f2e:   eb 0c                   jmp    400f3c <phase_2+0x40>

12. rbx += 0x4 ，然后比较 rbp 和 rbx ，若不相等则跳转到 400f17 反之跳转到 400f3c 。此时 rbx = 0x9，rbp 则是 0x19 。
13. 400f17 已经分析过了，400f3c 内容如下。

 378   400f3c:   48 83 c4 28             add    $0x28,%rsp
 379   400f40:   5b                      pop    %rbx
 380   400f41:   5d                      pop    %rbp
 381   400f42:   c3                      ret

14. 走到这一步表示该函数结束。 rsp 加上 0x28 回收空间，然后分别弹出 rbx，rbp 最后跳转。

其实就是一个 for 循环。 rbp 是上限，rbx 是当前的指向，存储着 6 个数字，每次迭代乘 2 ，分别是 1 2 4 8 16 32 。

![20220430150811](https://cdn.jsdelivr.net/gh/weijiew/pic/images/20220430150811.png)

第二阶段搞定。

## phase_3

接下来分析第三阶段。

![20220430152003](https://cdn.jsdelivr.net/gh/weijiew/pic/images/20220430152003.png)

下面逐行分析：

 384   400f43:   48 83 ec 18             sub    $0x18,%rsp
 385   400f47:   48 8d 4c 24 0c          lea    0xc(%rsp),%rcx
 386   400f4c:   48 8d 54 24 08          lea    0x8(%rsp),%rdx
 387   400f51:   be cf 25 40 00          mov    $0x4025cf,%esi
 388   400f56:   b8 00 00 00 00          mov    $0x0,%eax
 389   400f5b:   e8 90 fc ff ff          call   400bf0 <__isoc99_sscanf@plt>

1. 依旧 rsp 开辟空间，rcx = rsp + 0xc , rdx = rsp + 0x8 , rdx = 0x4025cf, eax = 0x0 。
2. rcx 保存了第四个参数，rdx 保存了第三个参数，esi 保存了第二个参数，eax 保存了返回值。

此处打印 0x4025cf 地址中存储的内容，输出如下，需要输入两个整数。

        >>> x/sb 0x4025cf
        0x4025cf:       "%d %d"

3. 最后调用 sscanf 函数，返回值表示输入参数的个数，此处输入两个值并且存储在寄存器 eax 中。

 390   400f60:   83 f8 01                cmp    $0x1,%eax
 391   400f63:   7f 05                   jg     400f6a <phase_3+0x27>
 392   400f65:   e8 d0 04 00 00          call   40143a <explode_bomb>
 393   400f6a:   83 7c 24 08 07          cmpl   $0x7,0x8(%rsp)
 394   400f6f:   77 3c                   ja     400fad <phase_3+0x6a>
 395   400f71:   8b 44 24 08             mov    0x8(%rsp),%eax
 ...
 411   400fad:   e8 88 04 00 00          call   40143a <explode_bomb>

4. 比较 eax 中的值是否大于 0x1，若是则表明输入成功并且跳转到 400f6a 处，反之则爆炸。
5. 接下来判断 (rsp + 0x8) - 0x7 的大小，若大于则跳转到 400fad ，而该地址会触发炸弹，若小于则继续执行。说明第一个数字应当小于 7 并将该值存入 eax 中。

 396   400f75:   ff 24 c5 70 24 40 00    jmp    *0x402470(,%rax,8)
 397   400f7c:   b8 cf 00 00 00          mov    $0xcf,%eax
 398   400f81:   eb 3b                   jmp    400fbe <phase_3+0x7b>

 399   400f83:   b8 c3 02 00 00          mov    $0x2c3,%eax
 400   400f88:   eb 34                   jmp    400fbe <phase_3+0x7b>

 401   400f8a:   b8 00 01 00 00          mov    $0x100,%eax
 402   400f8f:   eb 2d                   jmp    400fbe <phase_3+0x7b>

 403   400f91:   b8 85 01 00 00          mov    $0x185,%eax
 404   400f96:   eb 26                   jmp    400fbe <phase_3+0x7b>

 405   400f98:   b8 ce 00 00 00          mov    $0xce,%eax
 406   400f9d:   eb 1f                   jmp    400fbe <phase_3+0x7b>

 407   400f9f:   b8 aa 02 00 00          mov    $0x2aa,%eax
 408   400fa4:   eb 18                   jmp    400fbe <phase_3+0x7b>

 409   400fa6:   b8 47 01 00 00          mov    $0x147,%eax
 410   400fab:   eb 11                   jmp    400fbe <phase_3+0x7b>

 411   400fad:   e8 88 04 00 00          call   40143a <explode_bomb>
 412   400fb2:   b8 00 00 00 00          mov    $0x0,%eax
 413   400fb7:   eb 05                   jmp    400fbe <phase_3+0x7b>
 414   400fb9:   b8 37 01 00 00          mov    $0x137,%eax

 415   400fbe:   3b 44 24 0c             cmp    0xc(%rsp),%eax
 416   400fc2:   74 05                   je     400fc9 <phase_3+0x86>
 417   400fc4:   e8 71 04 00 00          call   40143a <explode_bomb>
 418   400fc9:   48 83 c4 18             add    $0x18,%rsp
 419   400fcd:   c3                      ret
 420

6. 因为从零开始，所有共有八种可能，打印从 0x402470 开始的八个内存地址并以 16 进制显示。

    >>> x/8a 0x402470
    0x402470:       0x400f7c <phase_3+57>   0x400fb9 <phase_3+118>
    0x402480:       0x400f83 <phase_3+64>   0x400f8a <phase_3+71>
    0x402490:       0x400f91 <phase_3+78>   0x400f98 <phase_3+85>
    0x4024a0:       0x400f9f <phase_3+92>   0x400fa6 <phase_3+99>

从零到七，分别对应：207,311,707,256,389,206,682,327 。

## phase_4

代码如下：

 445 000000000040100c <phase_4>:
 446   40100c:   48 83 ec 18             sub    $0x18,%rsp          # 栈分配空间
 447   401010:   48 8d 4c 24 0c          lea    0xc(%rsp),%rcx      # rcx = rsp + 0xc
 448   401015:   48 8d 54 24 08          lea    0x8(%rsp),%rdx      # rdx = rsp + 0x8
 449   40101a:   be cf 25 40 00          mov    $0x4025cf,%esi      # esi = 0x4025cf ("%d %d") 
 450   40101f:   b8 00 00 00 00          mov    $0x0,%eax           # eax = 0x0
 451   401024:   e8 c7 fb ff ff          call   400bf0 <__isoc99_sscanf@plt>
 452   401029:   83 f8 02                cmp    $0x2,%eax           # 返回值表示输入的个数此处输入两个数字
 453   40102c:   75 07                   jne    401035 <phase_4+0x29> # 若不是 2 则会导致爆炸。
 454   40102e:   83 7c 24 08 0e          cmpl   $0xe,0x8(%rsp)      # 比较 rsp + 0x8 和 0xe (14)
 455   401033:   76 05                   jbe    40103a <phase_4+0x2e> # 若小于等于则跳转到 40103a 处否则爆炸
 456   401035:   e8 00 04 00 00          call   40143a <explode_bomb> # 所以第一个输入应当小于等于 14
 457   40103a:   ba 0e 00 00 00          mov    $0xe,%edx           # edx = 0xe (14)
 458   40103f:   be 00 00 00 00          mov    $0x0,%esi           # esi = 0x0 (0)
 459   401044:   8b 7c 24 08             mov    0x8(%rsp),%edi      # edi = rsp + 0x8 其中 edi 保存了第一个输入
 460   401048:   e8 81 ff ff ff          call   400fce <func4>      # 调用 func4   
 461   40104d:   85 c0                   test   %eax,%eax           # 比较 eax 是否为 0 或 1
 462   40104f:   75 07                   jne    401058 <phase_4+0x4c> # 若非零则调用 401058 进而导致爆炸
 463   401051:   83 7c 24 0c 00          cmpl   $0x0,0xc(%rsp)      # 比较 rsp+0xc 和 0x0  
 464   401056:   74 05                   je     40105d <phase_4+0x51>   # 若相等则跳转到 40105d 函数执行结束
 465   401058:   e8 dd 03 00 00          call   40143a <explode_bomb>   # 反之爆炸
 466   40105d:   48 83 c4 18             add    $0x18,%rsp
 467   401061:   c3                      ret

目前可以确定的是第一个数字小于等于 14，第二个数字为 0 。

接下来分析 func4 ，其中第一个参数(edi)小于等于 14，第二个参数(esi)为 0，第三个参数(edx)为 14 。

根据此前分析，eax 返回 0 才能 phase_4 才能正常结束。下一步重点分析 func4 如何才能返回 0 。

 421 0000000000400fce <func4>:
 422   400fce:   48 83 ec 08             sub    $0x8,%rsp           # 分配空间
 423   400fd2:   89 d0                   mov    %edx,%eax           # eax = 14
 424   400fd4:   29 f0                   sub    %esi,%eax           # eax -= 0
 425   400fd6:   89 c1                   mov    %eax,%ecx           # ecx = 14
 426   400fd8:   c1 e9 1f                shr    $0x1f,%ecx          # ecx = 0 逻辑右移 0x1f (31) 位
 427   400fdb:   01 c8                   add    %ecx,%eax           # eax += 14
 428   400fdd:   d1 f8                   sar    %eax                # eax = 7 算术右移 
 429   400fdf:   8d 0c 30                lea    (%rax,%rsi,1),%ecx  # ecx = 7, ecx = rax + rsi * 1
 430   400fe2:   39 f9                   cmp    %edi,%ecx           # ecx - edi edi 是第一个输入的数字
 431   400fe4:   7e 0c                   jle    400ff2 <func4+0x24> # edi <= 7 跳转到 400ff2
 432   400fe6:   8d 51 ff                lea    -0x1(%rcx),%edx     # edx = rcx - 0x1
 433   400fe9:   e8 e0 ff ff ff          call   400fce <func4>      # 调用 400fce
 434   400fee:   01 c0                   add    %eax,%eax           # eax += eax
 435   400ff0:   eb 15                   jmp    401007 <func4+0x39> # 跳转到 401007
 436   400ff2:   b8 00 00 00 00          mov    $0x0,%eax           # eax = 0x0
 437   400ff7:   39 f9                   cmp    %edi,%ecx           # edi >= 7
 438   400ff9:   7d 0c                   jge    401007 <func4+0x39> # 跳转到 401007
 439   400ffb:   8d 71 01                lea    0x1(%rcx),%esi      # esi = rcx + 0x1
 440   400ffe:   e8 cb ff ff ff          call   400fce <func4>      # 调用 400fce
 441   401003:   8d 44 00 01             lea    0x1(%rax,%rax,1),%eax # eax = 0x1 + rax + rax * 1
 442   401007:   48 83 c4 08             add    $0x8,%rsp           # rsp += 0x8
 443   40100b:   c3                      ret

所以第一个数字小于等于 7 就可返回 0 ，所以两个数字分别是 7 0 

## phase_5 

 469 0000000000401062 <phase_5>:
 470   401062:   53                      push   %rbx            # 保存 rbx 
 471   401063:   48 83 ec 20             sub    $0x20,%rsp      # 开辟空间
 472   401067:   48 89 fb                mov    %rdi,%rbx       # rbx = rdi
 473   40106a:   64 48 8b 04 25 28 00    mov    %fs:0x28,%rax   # rax = 
 474   401071:   00 00
 475   401073:   48 89 44 24 18          mov    %rax,0x18(%rsp)
 476   401078:   31 c0                   xor    %eax,%eax
 477   40107a:   e8 9c 02 00 00          call   40131b <string_length>
 478   40107f:   83 f8 06                cmp    $0x6,%eax # eax 存放着输入字符长度，此处要求输入 6 个字符
 479   401082:   74 4e                   je     4010d2 <phase_5+0x70>   # 相同则跳转到 4010d2
 480   401084:   e8 b1 03 00 00          call   40143a <explode_bomb>   # 不同则爆炸
 481   401089:   eb 47                   jmp    4010d2 <phase_5+0x70>   # 

 482   40108b:   0f b6 0c 03             movzbl (%rbx,%rax,1),%ecx  # ecx = rbx + rax * 1 此时 rax = 0 rbx = 'a'
 483   40108f:   88 0c 24                mov    %cl,(%rsp)  # cl 是 ecx 的低位表示
 484   401092:   48 8b 14 24             mov    (%rsp),%rdx # rdx = (rsp)
 485   401096:   83 e2 0f                and    $0xf,%edx # 取低四位 edx = 0001
 486   401099:   0f b6 92 b0 24 40 00    movzbl 0x4024b0(%rdx),%edx # rdx 是 edx 的 64 位形式 edx = 0x4024b0 + 0001
 487   4010a0:   88 54 04 10             mov    %dl,0x10(%rsp,%rax,1)
 488   4010a4:   48 83 c0 01             add    $0x1,%rax
 489   4010a8:   48 83 f8 06             cmp    $0x6,%rax
 490   4010ac:   75 dd                   jne    40108b <phase_5+0x29>

 491   4010ae:   c6 44 24 16 00          movb   $0x0,0x16(%rsp)
 492   4010b3:   be 5e 24 40 00          mov    $0x40245e,%esi # 0x40245e = "flyers"
 493   4010b8:   48 8d 7c 24 10          lea    0x10(%rsp),%rdi
 494   4010bd:   e8 76 02 00 00          call   401338 <strings_not_equal>
 495   4010c2:   85 c0                   test   %eax,%eax
 496   4010c4:   74 13                   je     4010d9 <phase_5+0x77>
 497   4010c6:   e8 6f 03 00 00          call   40143a <explode_bomb>
 498   4010cb:   0f 1f 44 00 00          nopl   0x0(%rax,%rax,1)
 499   4010d0:   eb 07                   jmp    4010d9 <phase_5+0x77>
 500   4010d2:   b8 00 00 00 00          mov    $0x0,%eax   # eax = 0x0
 501   4010d7:   eb b2                   jmp    40108b <phase_5+0x29>   # 跳转到 40108b
 502   4010d9:   48 8b 44 24 18          mov    0x18(%rsp),%rax
 503   4010de:   64 48 33 04 25 28 00    xor    %fs:0x28,%rax
 504   4010e5:   00 00
 505   4010e7:   74 05                   je     4010ee <phase_5+0x8c>
 506   4010e9:   e8 42 fa ff ff          call   400b30 <__stack_chk_fail@plt>
 507   4010ee:   48 83 c4 20             add    $0x20,%rsp
 508   4010f2:   5b                      pop    %rbx
 509   4010f3:   c3                      ret

循环六次，每次将输入字符的后四位作为索引从给定字符串中取出，取出的结果要和 flyers 相同。

索引分别是 9 15 14 5 6 7 也就是保证输入字符的末位是这几个数字。73 79 78 69 70 71 也就是 IONEFG 。

## phase_6

 511 00000000004010f4 <phase_6>:
 512   4010f4:   41 56                   push   %r14
 513   4010f6:   41 55                   push   %r13
 514   4010f8:   41 54                   push   %r12
 515   4010fa:   55                      push   %rbp
 516   4010fb:   53                      push   %rbx
 517   4010fc:   48 83 ec 50             sub    $0x50,%rsp
 518   401100:   49 89 e5                mov    %rsp,%r13
 519   401103:   48 89 e6                mov    %rsp,%rsi
 520   401106:   e8 51 03 00 00          call   40145c <read_six_numbers>
 521   40110b:   49 89 e6                mov    %rsp,%r14
 522   40110e:   41 bc 00 00 00 00       mov    $0x0,%r12d
 523   401114:   4c 89 ed                mov    %r13,%rbp
 524   401117:   41 8b 45 00             mov    0x0(%r13),%eax
 525   40111b:   83 e8 01                sub    $0x1,%eax
 526   40111e:   83 f8 05                cmp    $0x5,%eax
 527   401121:   76 05                   jbe    401128 <phase_6+0x34>
 528   401123:   e8 12 03 00 00          call   40143a <explode_bomb>
 529   401128:   41 83 c4 01             add    $0x1,%r12d
 530   40112c:   41 83 fc 06             cmp    $0x6,%r12d
 531   401130:   74 21                   je     401153 <phase_6+0x5f>
 532   401132:   44 89 e3                mov    %r12d,%ebx
 533   401135:   48 63 c3                movslq %ebx,%rax
 534   401138:   8b 04 84                mov    (%rsp,%rax,4),%eax
 535   40113b:   39 45 00                cmp    %eax,0x0(%rbp)
 536   40113e:   75 05                   jne    401145 <phase_6+0x51>
 537   401140:   e8 f5 02 00 00          call   40143a <explode_bomb>
 538   401145:   83 c3 01                add    $0x1,%ebx
 539   401148:   83 fb 05                cmp    $0x5,%ebx
 540   40114b:   7e e8                   jle    401135 <phase_6+0x41>
 541   40114d:   49 83 c5 04             add    $0x4,%r13
 542   401151:   eb c1                   jmp    401114 <phase_6+0x20>
 543   401153:   48 8d 74 24 18          lea    0x18(%rsp),%rsi
 544   401158:   4c 89 f0                mov    %r14,%rax
 545   40115b:   b9 07 00 00 00          mov    $0x7,%ecx
 546   401160:   89 ca                   mov    %ecx,%edx
 547   401162:   2b 10                   sub    (%rax),%edx
 548   401164:   89 10                   mov    %edx,(%rax)
 549   401166:   48 83 c0 04             add    $0x4,%rax
 550   40116a:   48 39 f0                cmp    %rsi,%rax
 551   40116d:   75 f1                   jne    401160 <phase_6+0x6c>
 552   40116f:   be 00 00 00 00          mov    $0x0,%esi
 553   401174:   eb 21                   jmp    401197 <phase_6+0xa3>
 554   401176:   48 8b 52 08             mov    0x8(%rdx),%rdx
 555   40117a:   83 c0 01                add    $0x1,%eax
 556   40117d:   39 c8                   cmp    %ecx,%eax
 557   40117f:   75 f5                   jne    401176 <phase_6+0x82>
 558   401181:   eb 05                   jmp    401188 <phase_6+0x94>
 559   401183:   ba d0 32 60 00          mov    $0x6032d0,%edx
 560   401188:   48 89 54 74 20          mov    %rdx,0x20(%rsp,%rsi,2)
 561   40118d:   48 83 c6 04             add    $0x4,%rsi
 562   401191:   48 83 fe 18             cmp    $0x18,%rsi
 563   401195:   74 14                   je     4011ab <phase_6+0xb7>
 564   401197:   8b 0c 34                mov    (%rsp,%rsi,1),%ecx
 565   40119a:   83 f9 01                cmp    $0x1,%ecx
 566   40119d:   7e e4                   jle    401183 <phase_6+0x8f>
 567   40119f:   b8 01 00 00 00          mov    $0x1,%eax
 568   4011a4:   ba d0 32 60 00          mov    $0x6032d0,%edx
 569   4011a9:   eb cb                   jmp    401176 <phase_6+0x82>
 570   4011ab:   48 8b 5c 24 20          mov    0x20(%rsp),%rbx
 571   4011b0:   48 8d 44 24 28          lea    0x28(%rsp),%rax
 572   4011b5:   48 8d 74 24 50          lea    0x50(%rsp),%rsi
 573   4011ba:   48 89 d9                mov    %rbx,%rcx
 574   4011bd:   48 8b 10                mov    (%rax),%rdx
 575   4011c0:   48 89 51 08             mov    %rdx,0x8(%rcx)
 576   4011c4:   48 83 c0 08             add    $0x8,%rax
 577   4011c8:   48 39 f0                cmp    %rsi,%rax
 578   4011cb:   74 05                   je     4011d2 <phase_6+0xde>
 579   4011cd:   48 89 d1                mov    %rdx,%rcx
 580   4011d0:   eb eb                   jmp    4011bd <phase_6+0xc9>
 581   4011d2:   48 c7 42 08 00 00 00    movq   $0x0,0x8(%rdx)
 582   4011d9:   00
 583   4011da:   bd 05 00 00 00          mov    $0x5,%ebp
 584   4011df:   48 8b 43 08             mov    0x8(%rbx),%rax
 585   4011e3:   8b 00                   mov    (%rax),%eax
 586   4011e5:   39 03                   cmp    %eax,(%rbx)
 587   4011e7:   7d 05                   jge    4011ee <phase_6+0xfa>
 588   4011e9:   e8 4c 02 00 00          call   40143a <explode_bomb>
 589   4011ee:   48 8b 5b 08             mov    0x8(%rbx),%rbx
 590   4011f2:   83 ed 01                sub    $0x1,%ebp
 591   4011f5:   75 e8                   jne    4011df <phase_6+0xeb>
 592   4011f7:   48 83 c4 50             add    $0x50,%rsp
 593   4011fb:   5b                      pop    %rbx
 594   4011fc:   5d                      pop    %rbp
 595   4011fd:   41 5c                   pop    %r12
 596   4011ff:   41 5d                   pop    %r13
 597   401201:   41 5e                   pop    %r14
 598   401203:   c3                      ret