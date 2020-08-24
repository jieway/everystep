# 主题二：编辑器 (Vim)

> 在这节课中，我们将会展示bash作为脚本语言的一些基础操作，以及几种最常用的shell工具。

## Shell 脚本

Terminal，shell，bash的区别？ 

Terminal 是终端，也就是命令窗口。

shell 是命令行解释器，用于解释命令，根据命令执行相应的程序。

bash 是 shell 的一种，还有 zsh 等等。

shell 也是一门语言，脚本语言，用于创建命令，执行流程文件保存等工作。

赋值 `foo=bar` 语法。

注意不能使用空格分割，bash 会以空格为单位进行解释。
如果以空格进行分割，例如： `foo = bar` bash 会将调用 foo 程序将 = 和 bar 作为参数。

访问变量 `$foo`

单引号和双引号不同，单引号内部的内容会原样输出。双引号则会进行相应的替换。

例如：

```bash
root@LAPTOP-PJ3DJQFQ:/home/weijiew# foo=bar
root@LAPTOP-PJ3DJQFQ:/home/weijiew# echo "$foo"
bar
root@LAPTOP-PJ3DJQFQ:/home/weijiew# echo '$foo'
$foo
```

> 和其他大多数的编程语言一样，bash也支持if, case, while 和 for 这些控制流关键字。

bash 支持函数。

```bash
mcd () {
 mkdir -p "$1"
 cd "$1"
}
```

* $0 - 脚本名
* $1 到 $9 - 脚本到参数。 $1 是第一个参数，依此类推。
* $@ - 所有参数
* $# - 参数个数
* $? - 前一个命令到返回值
* \$$ - 当前脚本到进程识别码
* !! - 完整到上一条命令，包括参数。常见应用：当你因为权限不足执行命令失败时，可以使用 sudo !!
* 再尝试一次。
* $_ - 上一条命令的最

STDOUT 返回输出值。
STDERR 返回错误及错误码。

返回值 0 表示正常执行，非零则不正常。根据返回值可以判断程序是否正常执行。

* 当您通过 $( CMD ) 这样的方式来执行CMD 这个命令时，然后它的输出结果会替换掉 $( CMD ) 。

```bash
root@LAPTOP-PJ3DJQFQ:/home/weijiew# echo "Starting program at $(date)"
Starting program at Mon Aug 24 21:01:58 CST 2020
```

