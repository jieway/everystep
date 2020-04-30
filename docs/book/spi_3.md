# 


# 正则表达式

正则表达式是元字符通过一定的规则来实现对文本的匹配，就像字符串查询一样，KMP 也是在匹配，只不过的是自身，而正则更为强大，通过元字符的组合可以匹配任何你想要的结果。

> 正则表达式的特点是：
> 1. 灵活性、逻辑性和功能性非常强；
> 2. 可以迅速地用极简单的方式达到字符串的复杂控制。
> 3. 对于刚接触的人来说，比较晦涩难懂。

其应用场景如下：
* 例如网址，`https://www.google.com/` 网址都存在相同的格式，如何在一堆乱的字符串将网址提取出来？
* 例如邮箱 `jiewei199@qq.com` 也存在特定的格式，如何文本中提取出邮箱。

而正则表达式就是提取这些信息的有力武器！而正则表达式则是由元字符组成。例如 \ ^ $ * + ? {}  等等

# 元字符

## . 

点用来匹配除**换行符**以外的**任意单个**字符。注意是一个字符！

e.g. 

* a. => '<font color ="#1abc9c"><strong>ap</strong></font>le' '<font color ="#1abc9c"><strong>an</strong></font>other' ''<font color ="#1abc9c"><strong>ad</strong></font>dress' 
* w. => '<font color ="#1abc9c"><strong>wh</strong></font>ite' '<font color ="#1abc9c"><strong>wr</strong></font>ite' '<font color ="#1abc9c"><strong>wo</strong></font>uld'
* c. => '<font color ="#1abc9c"><strong>ca</strong></font>ttle' '<font color ="#1abc9c"><strong>co</strong></font>py' '<font color ="#1abc9c"><strong>co</strong></font>de'

## [] 
方括号用来匹配方括号中包含的任意字符。

例如：
* [0-9] => '<font color ="#1abc9c"><strong>2001</strong></font>xxx' 
  * 匹配含有数字的字符。
* [a-z] => '<font color ="#1abc9c"><strong>kkk</strong></font>200'<font color ="#1abc9c"><strong>coding</strong></font>1777' 
  * 匹配含有小写字母的字符。 
* [A-Z] => '<font color ="#1abc9c"><strong>A</strong></font>xxx<font color ="#1abc9c"><strong>CODE</strong></font>xxx' 
  * 匹配含有大写字母的字符。
* [a-zA-Z0-9] '<font color ="#1abc9c"><strong>2001JieWeiqq</strong></font>'
  * 匹配数字大小写字母
* '[pjc]ython' 可以匹配 'python' 'jython' 'cython' 。
* '[a-zA-Z0-9]' 可以匹配任意大小写字母或数字。

## *   
星号用来匹配前面的子表示**零次**或**多次**

e.t.
* app*le => '<font color ="#1abc9c"><strong>aple</strong></font>' '<font color ="#1abc9c"><strong>appppppppple</strong></font>'
  * 星号代表其前面的字符 p 可以出现零次或多次的都能匹配上。
* stu*dy => '<font color ="#1abc9c"><strong>stdy</strong></font>' '<font color ="#1abc9c"><strong>study</strong></font>' '<font color ="#1abc9c"><strong>stuuuuudy</strong></font>'

## +
加号代表前面的字符出现一次或多次。

e.t.
* app+le => '<font color ="#1abc9c"><strong>apple</strong></font>' '<font color ="#1abc9c"><strong>appppppppple</strong></font>'
  * 加号代表其前面的字符 p 可以出现一次或多次的都能匹配上。
* stu+dy => '<font color ="#1abc9c"><strong>study</strong></font>' '<font color ="#1abc9c"><strong>stuuuuudy</strong></font>'


## ？
问好表示可以匹配前面出现的字符零次或一次。或者指明非贪婪模式。

e.t.
* app?le => '<font color ="#1abc9c"><strong>aple</strong></font>' '<font color ="#1abc9c"><strong>aple</strong></font>'
  * 加号代表其前面的字符 p 可以出现一次或多次的都能匹配上。
* stu?dy => '<font color ="#1abc9c"><strong>study</strong></font>' '<font color ="#1abc9c"><strong>stdy</strong></font>'
* aa test1 bb test2 cc '.*?' => '<font color ="#1abc9c"><strong>aa</strong></font>'

## ^

否定字符。

* [^a-z]
  * 匹配出结果中将小写剔除出去。
* [^0-9]
  * 匹配出结果中将数字剔除出去。

## {n,m}
花括号，表示范围，n 则是前面字符至少 n 次，但是不超过 m 次。

* [a-z]{2,3} => ''

## (xyz)
指定顺序。

## |

## \

## $
>正整数: ^\d+$

负整数: ^-\d+$

电话号码: ^+?[\d\s]{3,}$

电话代码: ^+?[\d\s]+(?[\d\s]{10,}$

整数: ^-?\d+$

用户名: ^[\w\d_.]{4,16}$

字母数字字符: ^[a-zA-Z0-9]*$

带空格的字母数字字符: ^[a-zA-Z0-9 ]*$

密码: ^(?=^.{6,}$)((?=.*[A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z]))^.*$

电子邮件: ^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4})*$

IPv4 地址: ^((?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?))*$

小写字母: ^([a-z])*$

大写字母: ^([A-Z])*$

网址: ^(((http|https|ftp):\/\/)?([[a-zA-Z0-9]\-\.])+(\.)([[a-zA-Z0-9]]){2,4}([[a-zA-Z0-9]\/+=%&_\.~?\-]*))*$

VISA 信用卡号码: ^(4[0-9]{12}(?:[0-9]{3})?)*$

日期 (MM/DD/YYYY): ^(0?[1-9]|1[012])[- /.](0?[1-9]|[12][0-9]|3[01])[- /.](19|20)?[0-9]{2}$

日期 (YYYY/MM/DD): ^(19|20)?[0-9]{2}[- /.](0?[1-9]|1[012])[- /.](0?[1-9]|[12][0-9]|3[01])$

万事达信用卡号码: ^(5[1-5][0-9]{14})*$