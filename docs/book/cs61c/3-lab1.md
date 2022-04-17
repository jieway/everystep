# Lab 1: C and GDB

`git remote add starter https://github.com/61c-teach/su21-lab-starter.git`

`git pull starter main` 

联系指针，字符，结构体

## Exercise 1

* 练习使用指针、字符串和结构体

遍历一遍即可，第二个函数调用了第一个函数！

![image](https://cdn.jsdelivr.net/gh/weijiew/pic@master/images/image.4kujg1srfda0.webp)

## Exercise 2

切记用 GDB 调试之前要加 -g 参数，目的是关闭优化，提供更多信息，便于调试。

* n next line, stepping over function calls 不进入函数
* s next line, stepping into function calls 进入函数
* finish run until selected stack frame returns 从当前函数中跳出来
* quit exit GDB; also q or EOF (eg C-d) 退出 gdb 
* b pwd_checker.c:check_number  设置断点
* run 运行至断点处

没什么难度，主要是练习 GDB 的使用。

![image](https://cdn.jsdelivr.net/gh/weijiew/pic@master/images/image.4330lbpwec80.webp)

## Exercise 3

使用 gdb 解决段错误

```sh
$ gcc -g linked_list.c linked_list.h test_linked_list.c -o link_list
$ ./link_list 
Running tests...

Segmentation fault (core dumped)
```

阅读就行。

```sh
$ ./link_list 
Running tests...

Congrats! You have passed the reverse_list test!

Segmentation fault (core dumped)
```

## Exercise 4

快慢指针。

```cpp
int ll_has_cycle(node *head) {
    /* TODO: Implement ll_has_cycle */
    if (head == NULL) return 0;
    node *slow = head;
    node *fast = slow->next;
    while (fast != NULL && fast->next != NULL)
    {
        if (slow == fast) return 1;
        slow = slow->next;
        fast = fast->next->next;
    }
    return 0;
}
```

$ ./test_ll_cycl
Running tests...

Checking first list for cycles. There should be none, ll_has_cycle says it has no cycle
Checking second list for cycles. There should be a cycle, ll_has_cycle says it has a cycle
Checking third list for cycles. There should be a cycle, ll_has_cycle says it has a cycle
Checking fourth list for cycles. There should be a cycle, ll_has_cycle says it has a cycle
Checking fifth list for cycles. There should be none, ll_has_cycle says it has no cycle
Checking length-zero list for cycles. There should be none, ll_has_cycle says it has no cycle

Congrats, you passed all the test cases!