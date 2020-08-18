# 套接字编程作业一：Web服务器

题目：

> 在这个编程作业中，你将用Python语言开发一个简单的Web服务器，它仅能处理一个请求。具体而言，你的Web服务器将：
> 1) 当一个客户（浏览器）联系时创建一个连接套接字；
> 2) 从这个连接套接字接收HTTP请求；
> 3) 解释该请求以确定所请求的特定文件；
> 4) 从服务器的文件系统获得请求的文件；
> 5) 创建一个由请求的文件组成的HTTP响应报文，报文前面有首部行；
> 6) 经TCP连接向请求浏览器发送响应。如果浏览器请求一个在该服务器中不存在的文件，服务器应当返回一个“404 Not Found”差错报文。  
>
> 在配套网站中，我们提供了用于该服务器的框架代码，我们提供了用于该服务器的框架代码。你的任务是完善该代码，运行服务器，通过在不同主机上运行的浏览器发送请求来测试该服务器。如果运行你服务器的主机上已经有一个Web服务器在运行，你应当为该服务器使用一个不同于80端口的其他端口。

## coding

文件名为 webServer.py 其内容如下：

```python
# 服务端代码
from socket import *

# AF_INET 表示为 socket 指定了地址族，
# AF 是 Address Family 的缩写，INET 表示 IPv4 协议 
# 例如： IPv6 则是 AF_INET6
serverSocket = socket(AF_INET, SOCK_STREAM)

# 绑定端口，一般 80 端口常用作网页访问
serverSocket.bind(('', 8081))

# 设置最大连接数量为 1
serverSocket.listen(1)

while True:
	print('Ready to serve...')
	#  建立 TCP 连接套接字
	connectionSocket, addr = serverSocket.accept()
	try:
		# 接受客户端发送的访问信息，大小最多为 1024 字节
		message = connectionSocket.recv(1024)
		# 获取文件名
		filename = message.split()[1]
		# 打开文件
		f = open(filename[1:])
		# 读取文件
		outputdata = f.read()
		# 告诉客户端页面长度
		header = ' HTTP/1.1 200 OK\nConnection: close\nContent-Type: text/html\nContent-Length: %d\n\n' % (len(outputdata))
		
		mes = (header + outputdata).encode() 

		# 发送给客户端
		connectionSocket.send(mes)
		connectionSocket.close()

	except IOError:
		header = ' HTTP/1.1 404 Not Found'
		connectionSocket.send(header.encode())
		connectionSocket.close() 

serverSocket.close()```
```

客户端访问后需要返回给对应的文件，在同一目录下编写。文件名为 HelloWorld.html ，其内容如下：

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <H1>Hello World!</H1>
</body>
</html>
```

运行 webServer.py 然后在同一局域网内访问 **http://localhost:8080/HelloWorld.html** 即可看到页面内容。

我觉得直接在在主机上访问即可，可以抽象的认为本机既是服务端也是客户端。如果有服务器可以放到服务器上来访问。

结果如下：

<div align="center"><img src="https://gitee.com/weijiew/pic/raw/master/img/20200811120959.png"/></div>

也可以采用服务器访问，但是前提是你需要有一台云服务器。通过公网 IP 来访问。

将本地编写好的文件传输到服务器上。说实话配置起来比较繁琐。

我采用是 ssh 来传输。格式如下：

`scp -r -i {建议绝对路径 pem 文件} {准备传输的文件，建议绝对路径} root@47.93.36.15:{传输到服务器的位置，绝对路径}`

<div align="center"><img src="https://gitee.com/weijiew/pic/raw/master/img/20200811170512.png"/></div>

注意要在服务器的管理后台设置好打开的端口，例如我买的是阿里云的服务器， 8080 端口就没有打开，需要去阿里云的管理页面设置，里面有详细文档。

通过公网访问：

<div align="center"><img src="https://gitee.com/weijiew/pic/raw/master/img/20200811171234.png"/></div>

## 总结

`from socket import *` 和 `import socket` 的区别：前者相当去将文件整体贴在此处而后者则需要依靠 socket 来调用。

简而言之前者是绝对路径，而后者则是相对路径。可以看下面的两个例子，只是调用方式不同而已。

```python
import a
a.func()

from a import *
func()
```

`socket(AF_INET, SOCK_STREAM)` 中的 AF 是 Address Family 的缩写，INET 表示 IPv4 协议 。 这条语句设定了套接字连接的协议。

例如： IPv6 则是 AF_INET6

`message = connectionSocket.recv(1024)` 表示客户端和服务端之间建立连接后，客户端告诉服务端自己想要访问什么资源，例如访问哪个页面的内容。

message 内容大致如下，从中可以看到客户端想要访问 HelloWorld.html 页面，那么后续将这个信息截取出来即可。

> ET /HelloWorld.html HTTP/1.1\r\nHost: ....

最后要构建首部行，将报文放入其中。

# 参考

* [what-is-af-inet-and-why-do-i-need-it](https://stackoverflow.com/questions/1593946/what-is-af-inet-and-why-do-i-need-it)
* [python socket doc](https://docs.python.org/3/library/socket.html)
