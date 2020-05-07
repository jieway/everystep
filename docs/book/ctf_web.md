注：实验环境为谷歌浏览器

# 1.0 查看源码

按 F12 直接查看源码即可。

<img src="https://gitee.com/weijiew/pic/raw/master/img/20200506233751.png"/>

直接复制粘贴，源码中就有 flag

# 2.0 访问资源

<img src="https://gitee.com/weijiew/pic/raw/master/img/20200506233924.png"/>

* 在 url 后面加上`/robots.txt` 即可获得 `flag_ls_h3re.php` 

<img src="https://gitee.com/weijiew/pic/raw/master/img/20200506233947.png"/>

* 访问即可获得 flag  


# 3.0 备份文件
<img src="https://gitee.com/weijiew/pic/raw/master/img/20200506234226.png"/>

访问路径获得 bak 文件，用 vscode 打开

.bak 是备份文件，如果源文件损坏还可以通过备份文件修复。

<img src="https://gitee.com/weijiew/pic/raw/master/img/20200506234349.png"/>

第 18 行可以看到 flag

# 4.0 cookie
按 F12 在 cookie 里面后缀，访问这个资源。
<img src="https://gitee.com/weijiew/pic/raw/master/img/20200506233522.png"/>

根据提示 see the http response 发现 flag `cyberpeace{3763f3b28881e54caf2bb8ff1b9fb632}`
<img src="https://gitee.com/weijiew/pic/raw/master/img/20200506233613.png"/>

# 5.0 
<img src="https://gitee.com/weijiew/pic/raw/master/img/20200506234737.png"/>

修改成可以按的按钮即可。

<img src="https://gitee.com/weijiew/pic/raw/master/img/20200506234822.png"/>

<img src="https://gitee.com/weijiew/pic/raw/master/img/20200506234829.png"/>

# 6.0 

<img src="https://gitee.com/weijiew/pic/raw/master/img/20200506234938.png"/>

这个可以直接通过，弱口令。

# 7.0 
注意问好，构造一个符合条件的两个值即可拿到 flag 

* 其中 a 必须含有 0 并且是 true 可以为字符串。
* 其中 b 不能是数字且要大于 1234 那么加字符串即可。

<img src="https://gitee.com/weijiew/pic/raw/master/img/20200506235617.png"/>

## 8.0 