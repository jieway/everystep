# 主题二：Shell 脚本

> 在这节课中，我们将会展示bash作为脚本语言的一些基础操作，以及几种最常用的shell工具。

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

这个例子是使用 grep 搜索字符串 foobar，如果没有找到就将其最为注释追加到文件中。

```bash
#!/bin/bash

echo "Starting program at $(date)" # date会被替换成日期和时间

echo "Running program $0 with $# arguments with pid $$"

for file in $@; do
    grep foobar $file > /dev/null 2> /dev/null
    if [[ $? -ne 0 ]]; then
        echo "File $file does not have any foobar, adding one"
        echo "# foobar" >> "$file"
    fi
done
```

判断语句尽量使用双方括号 [[]]，为了降低犯错的几率。

$? 是上一个命令的返回值，用于判断命令的执行情况，if 中的内容则是判断返回值是否等 0 。

ne 代表 no equal ，也就是不相等。

执行脚本的时候需要提供相应的参数，脚本会匹配相应的参数，这叫做 shell 的通配。

花括号： {} 用于匹配文件的特殊部分。

```bash
convert image.{png,jpg}
# 会展开为
convert image.png image.jpg
```

通配符 * 和 ? 前者匹配任意个，后者匹配一个。

脚本不一定非得用 shell 写，也可以采用 python 写脚本。
但是需要在文件的头部写上 [shebang](https://en.wikipedia.org/wiki/Shebang_(Unix)) `#!/usr/local/bin/python`
用于告诉 shell 通过 python 来执行后续内容。

## 查找文件

类 Unix 系统一般都包含命令 find 用于文件查找。


```bash
# 查找所有名称为src的文件夹
find . -name src -type d
# 查找所有文件夹路径中包含test的python文件
find . -path '**/test/**/*.py' -type f
# 查找前一天修改的所有文件
find . -mtime -1
# 查找所有大小在500k至10M的tar.gz文件
find . -size +500k -size -10M -name '*.tar.gz'
```

对文件进行操作：

```bash
# Delete all files with .tmp extension
find . -name '*.tmp' -exec rm {} \;
# Find all PNG files and convert them to JPG
find . -name '*.png' -exec convert {} {.}.jpg \;
```

## 查找代码

grep 
  -C: 获取查找结果的上下文。(Context)
  -v：对结果进行反选，即输出不匹配的结果。 (Invert)
  -C 5 ： 输出匹配结果的前后 5 行 。
  -R： 递归进入子目录并搜索所有文本文件。

```bash
# 查找所有使用了 requests 库的文件
rg -t py 'import requests'
# 查找所有没有写 shebang 的文件（包含隐藏文件）
rg -u --files-without-match "^#!"
# 查找所有的foo字符串，并打印其之后的5行
rg foo -A 5
# 打印匹配的统计信息（匹配的行和文件的数量）
rg --stats PATTERN
```

## 查找 shell 命令

使用 history 查找输入命令的历史。

和 grep 结合，`。 history | grep find` 查找包含 find 子串的命令。

在命令的开头加上空格，该命令就不会被记录，使用 history 查不到。类似于浏览器不记录浏览记录的功能。


## 文件夹导航

Fasd 根据使用频率和时效对文件进行排序。

## 课后练习

1. 阅读 [`man ls`](http://man7.org/linux/man-pages/man1/ls.1.html) ，然后使用`ls` 命令进行如下操作：

    - 所有文件（包括隐藏文件）
    - 文件打印以人类可以理解的格式输出 (例如，使用454M 而不是 454279954)
    - 文件以最近访问顺序排序
    - 以彩色文本显示输出结果

    典型输出如下：

    ```
    -rw-r--r--   1 user group 1.1M Jan 14 09:53 baz
    drwxr-xr-x   5 user group  160 Jan 14 09:53 .
    -rw-r--r--   1 user group  514 Jan 14 06:42 bar
    -rw-r--r--   1 user group 106M Jan 13 12:12 foo
    drwx------+ 47 user group 1.5K Jan 12 18:08 ..
    ```

ls -lath --color=auto

1. 编写两个bash函数  `marco` 和 `polo` 执行下面的操作。
   每当你执行 `marco` 时，当前的工作目录应当以某种形式保存，当执行 `polo` 时，无论现在处在什么目录下，都应当 `cd` 回到当时执行 `marco` 的目录。
   为了方便debug，你可以把代码写在单独的文件 `marco.sh` 中，并通过 `source marco.sh`命令，（重新）加载函数。
    marco() {
        export MARCO=$(pwd)
    }
    polo() {
        cd "$MARCO"
    }

2. 假设您有一个命令，它很少出错。因此为了在出错时能够对其进行调试，需要花费大量的时间重现错误并捕获输出。
   编写一段bash脚本，运行如下的脚本直到它出错，将它的标准输出和标准错误流记录到文件，并在最后输出所有内容。
   加分项：报告脚本在失败前共运行了多少次。

    ```bash
    #!/usr/bin/env bash

    n=$(( RANDOM % 100 ))

    if [[ n -eq 42 ]]; then
       echo "Something went wrong"
       >&2 echo "The error was using magic numbers"
       exit 1
    fi

    echo "Everything went according to plan"
    ```

    #!/usr/bin/env bash

    count=0
    until [[ "$?" -ne 0 ]];
    do
    count=$((count+1))
    ./random.sh &> out.txt
    done

    echo "found error after $count runs"
    cat out.txt

3. 本节课我们讲解了 `find` 命令的 `-exec` 参数非常强大，它可以对我们查找对文件进行操作。但是，如果我们要对所有文件进行操作呢？例如创建一个zip压缩文件？我们已经知道，命令行可以从参数或标准输入接受输入。在用管道连接命令时，我们将标准输出和标准输入连接起来，但是有些命令，例如`tar` 则需要从参数接受输入。这里我们可以使用[`xargs`](http://man7.org/linux/man-pages/man1/xargs.1.html) 命令，它可以使用标准输入中的内容作为参数。
   例如 `ls | xargs rm` 会删除当前目录中的所有文件。

    您的任务是编写一个命令，它可以递归地查找文件夹中所有的HTML文件，并将它们压缩成zip文件。注意，即使文件名中包含空格，您的命令也应该能够正确执行（提示：查看 `xargs`的参数`-d`） 

    find . -type f -name "*.html" | xargs -d '\n'  tar -cvzf archive.tar.gz

4. (进阶) 编写一个命令或脚本递归的查找文件夹中最近使用的文件。更通用的做法，你可以按照最近的使用时间列出文件吗？