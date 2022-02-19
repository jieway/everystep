# Lab: traps

This lab explores how system calls are implemented using traps. You will first do a warm-up exercises with stacks and then you will implement an example of user-level trap handling.

本实验探讨了如何使用陷阱实现系统调用。你将首先进行堆栈的热身练习，然后你将实现一个用户级陷阱处理的例子。

Before you start coding, read Chapter 4 of the xv6 book, and related source files:

在你开始编码之前，请阅读xv6书的第4章，以及相关的源文件。

kernel/trampoline.S: the assembly involved in changing from user space to kernel space and back
kernel/trap.c: code handling all interrupts

kernel/trampoline.S：涉及到从用户空间到内核空间的转换的程序集。
kernel/trap.c：处理所有中断的代码

To start the lab, switch to the trap branch:

  $ git fetch
  $ git checkout traps
  $ make clean
  
## RISC-V assembly (easy)

It will be important to understand a bit of RISC-V assembly, which you were exposed to in 6.004. There is a file user/call.c in your xv6 repo. make fs.img compiles it and also produces a readable assembly version of the program in user/call.asm.

了解一点RISC-V的汇编是很重要的，你在6.004中接触过它。在你的xv6 repo中，有一个文件user/call.c。make fs.img编译它，并在user/call.asm中产生一个可读的程序汇编版本。

Read the code in call.asm for the functions g, f, and main. The instruction manual for RISC-V is on the reference page. Here are some questions that you should answer (store the answers in a file answers-traps.txt):

阅读call.asm中函数g、f和main的代码。RISC-V的指导手册在参考页上。这里有一些你应该回答的问题（将答案存储在文件answer-traps.txt中）。

Which registers contain arguments to functions? For example, which register holds 13 in main's call to printf?

哪些寄存器包含函数的参数？例如，在main对printf的调用中，哪个寄存器包含13？

Where is the call to function f in the assembly code for main? Where is the call to g? (Hint: the compiler may inline functions.)

在main的汇编代码中，对函数f的调用在哪里？对g的调用在哪里？(提示：编译器可以内联函数。)

At what address is the function printf located?
What value is in the register ra just after the jalr to printf in main?
Run the following code.

函数printf的地址是什么？
在主程序中，jalr到printf之后的寄存器ra中是什么值？
运行以下代码。

	unsigned int i = 0x00646c72;
	printf("H%x Wo%s", 57616, &i);
      
What is the output? Here's an ASCII table that maps bytes to characters.
The output depends on that fact that the RISC-V is little-endian. If the RISC-V were instead big-endian what would you set i to in order to yield the same output? Would you need to change 57616 to a different value?

输出的结果是什么？这是一个ASCII表，将字节映射到字符。
这个输出取决于RISC-V是小-序数的事实。如果RISC-V是大面值的，你会把i设置成什么，以便产生相同的输出？你是否需要把57616改成一个不同的值？

Here's a description of little- and big-endian and a more whimsical description.

这里有一个关于小安和大安的描述，还有一个更异想天开的描述。

In the following code, what is going to be printed after 'y='? (note: the answer is not a specific value.) Why does this happen?

在下面的代码中，'y='后面要打印什么？(注意：答案不是一个具体的数值。)为什么会出现这种情况？

	printf("x=%d y=%d", 3);
      
## Backtrace (moderate)
For debugging it is often useful to have a backtrace: a list of the function calls on the stack above the point at which the error occurred.

对于调试来说，有一个回溯通常是很有用的：在发生错误的点之上的堆栈中的函数调用的列表。

Implement a backtrace() function in kernel/printf.c. Insert a call to this function in sys_sleep, and then run bttest, which calls sys_sleep. Your output should be as follows:

在kernel/printf.c中实现一个backtrace()函数，在sys_sleep中插入一个对该函数的调用，然后运行bttest，调用sys_sleep。你的输出应该是这样的。

backtrace:
0x0000000080002cda
0x0000000080002bb6
0x0000000080002898
  
After bttest exit qemu. In your terminal: the addresses may be slightly different but if you run addr2line -e kernel/kernel (or riscv64-unknown-elf-addr2line -e kernel/kernel) and cut-and-paste the above addresses as follows:

bttest之后退出qemu。在你的终端：地址可能略有不同，但如果你运行addr2line -e kernel/kernel（或riscv64-unknown-elf-addr2line -e kernel/kernel）并剪切和粘贴上述地址如下。

    $ addr2line -e kernel/kernel
    0x0000000080002de2
    0x0000000080002f4a
    0x0000000080002bfc
    Ctrl-D
  
You should see something like this:
    kernel/sysproc.c:74
    kernel/syscall.c:224
    kernel/trap.c:85
  
The compiler puts in each stack frame a frame pointer that holds the address of the caller's frame pointer. Your backtrace should use these frame pointers to walk up the stack and print the saved return address in each stack frame.

编译器在每个堆栈帧中放入一个帧指针，该指针持有调用者的帧指针地址。你的回溯应该使用这些帧指针在堆栈上行走，并在每个堆栈帧中打印出保存的返回地址。

Some hints:

Add the prototype for backtrace to kernel/defs.h so that you can invoke backtrace in sys_sleep.

在kernel/defs.h中加入backtrace的原型，这样你就可以在sys_sleep中调用backtrace。

The GCC compiler stores the frame pointer of the currently executing function in the register s0. Add the following function to kernel/riscv.h:

GCC编译器将当前执行的函数的帧指针存储在寄存器s0中。在kernel/riscv.h中添加以下函数。

    static inline uint64
    r_fp()
    {
    uint64 x;
    asm volatile("mv %0, s0" : "=r" (x) );
    return x;
    }
and call this function in backtrace to read the current frame pointer. This function uses in-line assembly to read s0.

并在回溯中调用这个函数来读取当前帧指针。这个函数使用在线装配来读取s0。

These lecture notes have a picture of the layout of stack frames. Note that the return address lives at a fixed offset (-8) from the frame pointer of a stackframe, and that the saved frame pointer lives at fixed offset (-16) from the frame pointer.

这些讲义上有一张堆栈帧的布局图。请注意，返回地址与堆栈帧的帧指针有一个固定的偏移量（-8），而保存的帧指针与帧指针有固定的偏移量（-16）。


Xv6 allocates one page for each stack in the xv6 kernel at PAGE-aligned address. You can compute the top and bottom address of the stack page by using PGROUNDDOWN(fp) and PGROUNDUP(fp) (see kernel/riscv.h. These number are helpful for backtrace to terminate its loop.

Xv6为xv6内核中的每个堆栈分配了一个页面，地址为PAGE对齐。你可以通过使用PGROUNDDOWN(fp)和PGROUNDUP(fp)来计算堆栈页的顶部和底部地址（见kernel/riscv.h.这些数字有助于backtrace终止其循环。

Once your backtrace is working, call it from panic in kernel/printf.c so that you see the kernel's backtrace when it panics.

一旦你的反向追踪成功，从kernel/printf.c的panic中调用它，这样你就能在内核恐慌时看到它的反向追踪。

## Alarm (hard)
In this exercise you'll add a feature to xv6 that periodically alerts a process as it uses CPU time. This might be useful for compute-bound processes that want to limit how much CPU time they chew up, or for processes that want to compute but also want to take some periodic action. More generally, you'll be implementing a primitive form of user-level interrupt/fault handlers; you could use something similar to handle page faults in the application, for example. Your solution is correct if it passes alarmtest and usertests.

在这个练习中，你将为xv6添加一个功能，在进程使用CPU时间时定期发出警告。这对于想要限制它们占用多少CPU时间的计算型进程，或者对于想要计算但又想采取一些定期行动的进程，可能是很有用的。更广泛地说，你将实现一个原始形式的用户级中断/故障处理程序；例如，你可以使用类似的东西来处理应用程序中的页面故障。如果你的解决方案通过了alarmtest和usertests，那么它就是正确的。

You should add a new sigalarm(interval, handler) system call. If an application calls sigalarm(n, fn), then after every n "ticks" of CPU time that the program consumes, the kernel should cause application function fn to be called. When fn returns, the application should resume where it left off. A tick is a fairly arbitrary unit of time in xv6, determined by how often a hardware timer generates interrupts. If an application calls sigalarm(0, 0), the kernel should stop generating periodic alarm calls.

你应该添加一个新的sigalarm(interval, handler)系统调用。如果一个应用程序调用sigalarm(n, fn)，那么在程序每消耗n个 "ticks "的CPU时间后，内核应该使应用程序的函数fn被调用。当fn返回时，应用程序应该恢复到它停止的地方。在xv6中，tick是一个相当随意的时间单位，由硬件定时器产生中断的频率决定。如果一个应用程序调用sigalarm(0, 0)，内核应该停止产生周期性的报警调用。

You'll find a file user/alarmtest.c in your xv6 repository. Add it to the Makefile. It won't compile correctly until you've added sigalarm and sigreturn system calls (see below).

你会在你的xv6资源库中发现一个文件user/alarmtest.c。把它添加到Makefile中。在你加入sigalarm和sigreturn系统调用之前，它不会正确编译（见下文）。

alarmtest calls sigalarm(2, periodic) in test0 to ask the kernel to force a call to periodic() every 2 ticks, and then spins for a while. You can see the assembly code for alarmtest in user/alarmtest.asm, which may be handy for debugging. Your solution is correct when alarmtest produces output like this and usertests also runs correctly:

alarmtest在test0中调用sigalarm(2, periodic)，要求内核每2个ticks强制调用periodic()，然后旋转一段时间。你可以在user/alarmtest.asm中看到alarmtest的汇编代码，这对于调试来说可能很方便。当alarmtest产生这样的输出时，你的解决方案是正确的，而且usertests也能正常运行。

    $ alarmtest
    test0 start
    ........alarm!
    test0 passed
    test1 start
    ...alarm!
    ..alarm!
    ...alarm!
    ..alarm!
    ...alarm!
    ..alarm!
    ...alarm!
    ..alarm!
    ...alarm!
    ..alarm!
    test1 passed
    test2 start
    ................alarm!
    test2 passed
    $ usertests
    ...
    ALL TESTS PASSED
    $
When you're done, your solution will be only a few lines of code, but it may be tricky to get it right. We'll test your code with the version of alarmtest.c in the original repository. You can modify alarmtest.c to help you debug, but make sure the original alarmtest says that all the tests pass.

当你完成后，你的解决方案将只有几行代码，但要做好它可能很棘手。我们将用原始存储库中的 alarmtest.c 版本来测试你的代码。你可以修改 alarmtest.c 来帮助你调试，但要确保原始 alarmtest 表示所有测试都通过。

## test0: invoke handler
Get started by modifying the kernel to jump to the alarm handler in user space, which will cause test0 to print "alarm!". Don't worry yet what happens after the "alarm!" output; it's OK for now if your program crashes after printing "alarm!". Here are some hints:

通过修改内核跳转到用户空间的报警处理程序来开始，这将导致test0打印 "alarm!"。先不要担心 "alarm!"输出后会发生什么；如果你的程序在打印 "alarm!"后崩溃了，现在也没有问题。这里有一些提示。

You'll need to modify the Makefile to cause alarmtest.c to be compiled as an xv6 user program.

你需要修改Makefile，使alarmtest.c被编译为xv6用户程序。

The right declarations to put in user/user.h are:
    int sigalarm(int ticks, void (*handler)());
    int sigreturn(void);

Update user/usys.pl (which generates user/usys.S), kernel/syscall.h, and kernel/syscall.c to allow alarmtest to invoke the sigalarm and sigreturn system calls.

更新user/usys.pl（生成user/usys.S）、kernel/syscall.h和kernel/syscall.c，允许alarmtest调用sigalarm和sigreturn系统调用。

For now, your sys_sigreturn should just return zero.
Your sys_sigalarm() should store the alarm interval and the pointer to the handler function in new fields in the proc structure (in kernel/proc.h).

现在，你的sys_sigreturn应该只返回0。
你的sys_sigalarm()应该在proc结构（在kernel/proc.h中）的新字段中存储报警间隔和指向处理函数的指针。

You'll need to keep track of how many ticks have passed since the last call (or are left until the next call) to a process's alarm handler; you'll need a new field in struct proc for this too. You can initialize proc fields in allocproc() in proc.c.
Every tick, the hardware clock forces an interrupt, which is handled in usertrap() in kernel/trap.c.

你需要跟踪从最后一次调用（或直到下一次调用）进程的警报处理程序以来，已经过了多少时间；你也需要在struct proc中设置一个新的字段来实现这一点。你可以在proc.c的allocproc()中初始化proc字段。
每一次嘀嗒声，硬件时钟都会强制中断，这在kernel/trap.c的usertrap()中处理。

You only want to manipulate a process's alarm ticks if there's a timer interrupt; you want something like

你只想在有定时器中断的情况下操纵一个进程的报警时间，你想要的是类似于

    if(which_dev == 2) ...

Only invoke the alarm function if the process has a timer outstanding. Note that the address of the user's alarm function might be 0 (e.g., in user/alarmtest.asm, periodic is at address 0).
You'll need to modify usertrap() so that when a process's alarm interval expires, the user process executes the handler function. When a trap on the RISC-V returns to user space, what determines the instruction address at which user-space code resumes execution?

只有当进程有一个未完成的定时器时才调用报警函数。注意，用户的报警函数的地址可能是0（例如，在user/alarmtest.asm中，周期性是在地址0）。
你需要修改usertrap()，以便当一个进程的报警间隔期过后，用户进程执行处理函数。当RISC-V上的一个陷阱返回到用户空间时，什么决定了用户空间代码恢复执行的指令地址？

It will be easier to look at traps with gdb if you tell qemu to use only one CPU, which you can do by running

如果你告诉qemu只使用一个CPU，那么用gdb查看陷阱会更容易，你可以通过运行

    make CPUS=1 qemu-gdb

You've succeeded if alarmtest prints "alarm!".

如果alarmtest打印出 "alarm!"，你就成功了。

## test1/test2(): resume interrupted code

Chances are that alarmtest crashes in test0 or test1 after it prints "alarm!", or that alarmtest (eventually) prints "test1 failed", or that alarmtest exits without printing "test1 passed". To fix this, you must ensure that, when the alarm handler is done, control returns to the instruction at which the user program was originally interrupted by the timer interrupt. You must ensure that the register contents are restored to the values they held at the time of the interrupt, so that the user program can continue undisturbed after the alarm. Finally, you should "re-arm" the alarm counter after each time it goes off, so that the handler is called periodically.

有可能是alarmtest在打印出 "alarm!"后在test0或test1中崩溃，或者alarmtest（最终）打印出 "test1 failed"，或者alarmtest退出时没有打印 "test1 passed"。为了解决这个问题，你必须确保当报警处理程序完成后，控制权返回到用户程序最初被定时器中断的指令中。你必须确保寄存器的内容恢复到中断时的值，这样用户程序在报警后可以不受干扰地继续运行。最后，你应该在每次报警后 "重新武装 "报警计数器，这样处理程序就会被定期调用。

As a starting point, we've made a design decision for you: user alarm handlers are required to call the sigreturn system call when they have finished. Have a look at periodic in alarmtest.c for an example. This means that you can add code to usertrap and sys_sigreturn that cooperate to cause the user process to resume properly after it has handled the alarm.

作为一个起点，我们已经为你做了一个设计决定：用户报警处理程序完成后需要调用sigreturn系统调用。看一下alarmtest.c中的周期性的例子吧。这意味着你可以向usertrap和sys_sigreturn添加代码，使用户进程在处理完报警后正常恢复。

Some hints:

Your solution will require you to save and restore registers---what registers do you need to save and restore to resume the interrupted code correctly? (Hint: it will be many).

你的解决方案将要求你保存和恢复寄存器---你需要保存和恢复哪些寄存器来正确恢复中断的代码？(提示：会有很多）。

Have usertrap save enough state in struct proc when the timer goes off that sigreturn can correctly return to the interrupted user code.

当定时器关闭时，让usertrap在struct proc中保存足够的状态，以便sigreturn能够正确返回到被中断的用户代码。

Prevent re-entrant calls to the handler----if a handler hasn't returned yet, the kernel shouldn't call it again. test2 tests this.
Once you pass test0, test1, and test2 run usertests to make sure you didn't break any other parts of the kernel.

防止对处理程序的重复调用----，如果一个处理程序还没有返回，内核就不应该再调用它。test2测试这个。
一旦你通过了test0、test1和test2，运行usertests以确保你没有破坏内核的任何其他部分。
