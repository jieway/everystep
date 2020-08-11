# 实验一：Web服务器

文件名为 webServer.py 其内容如下：

```python
# 服务端代码
from socket import *

# AF_INET 表示为 socket 指定了地址族，
# AF 是 Address Family 的缩写，INET 表示 IPv4 协议 
# 例如： IPv6 则是 AF_INET6
serverSocket = socket(AF_INET, SOCK_STREAM)

# 绑定端口，一般 80 端口常用作网页访问
serverSocket.bind(('', 8080))

# 设置最大连接数量为 1
serverSocket.listen(1)

while True:
	print('Ready to serve...')
	#  建立 TCP 连接套接字
	connectionSocket, addr = serverSocket.accept()
	try:
		# 接受客户端发送的报文，信息最多为 1024 字节
		message = connectionSocket.recv(1024)
		# 获取文件名
		filename = message.split()[1]
		# 打开文件
		f = open(filename[1:])
		# 读取文件
		outputdata = f.read()
		# 告诉客户端页面长度
		header = ' HTTP/1.1 200 OK\nConnection: close\nContent-Type: text/html\nContent-Length: %d\n\n' % (len(outputdata))
		# 发送给客户端
		connectionSocket.send(header.encode())

		# 发送访问的对应页面数据
		for i in range(0, len(outputdata)):
			connectionSocket.send(outputdata[i].encode())
		connectionSocket.close()

	except IOError:
		header = ' HTTP/1.1 404 Not Found'
		connectionSocket.send(header.encode())
		connectionSocket.close() 

serverSocket.close()
```

文件名为 HelloWorld.html ，其内容如下：

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

运行 webServer.py 然后在同一局域网内访问 http://localhost:8080/HelloWorld.html 即可看到页面内容。

我觉得直接在在主机上访问即可，可以抽象的认为本机既是服务端也是客户端。如果有服务器可以放到服务器上来访问。

结果如下：

<div align="center"><img src="https://gitee.com/weijiew/pic/raw/master/img/20200811120959.png"/></div>


# 参考

* [what-is-af-inet-and-why-do-i-need-it](https://stackoverflow.com/questions/1593946/what-is-af-inet-and-why-do-i-need-it)
* [socket.listen](https://docs.python.org/3/library/socket.html#socket.socket.listen)