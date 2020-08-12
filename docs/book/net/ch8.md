# 实验一：Web服务器

题目：

> 在这个编程作业中，你将用Python语言开发一个简单的Web服务器，它仅能处理一个请求。具体而言，你的Web服务器将：
> 1) 当一个客户（浏览器）联系时创建一个连接套接字；
> 2) 从这个连接套接字接收HTTP请求；
> 3) 解释该请求以确定所请求的特定文件；
> 4) 从服务器的文件系统获得请求的文件；
> 5) 创建一个由请求的文件组成的HTTP响应报文，报文前面有首部行；
> 6) 经TCP连接向请求浏览器发送响应。如果浏览器请求一个在该服务器种不存在的文件，服务器应当返回一个“404 Not Found”差错报文。  
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

运行 webServer.py 然后在同一局域网内访问 http://localhost:8080/HelloWorld.html 即可看到页面内容。

我觉得直接在在主机上访问即可，可以抽象的认为本机既是服务端也是客户端。如果有服务器可以放到服务器上来访问。

结果如下：

<div align="center"><img src="https://gitee.com/weijiew/pic/raw/master/img/20200811120959.png"/></div>

也可以采用服务器访问，但是前提是你需要有一台云服务器。通过公网 IP 来访问。

将本地编写好的文件传输到服务器上。说实话配置起来比较繁琐。

我采用是 ssh 来传输。`scp -r -i {建议绝对路径 pem 文件} {准备传输的文件，建议绝对路径} root@47.93.36.15:{传输到服务器的位置，绝对路径}`

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



# 实验二：UDPping程序

题目：

> 在这个编程作业中，你将用Python编写一个客户ping程序。该客户将发送一个简单的ping报文，接受一个从服务器返回的pong报文，并确定从该客户发送ping报文到接收到pong报文为止的时延。该时延称为往返时延（RTT）。由该客户和服务器提供的功能类似于在现代操作系统中可用的标准ping程序，然而，标准的ping使用互联网控制报文协议（ICMP）（我们将在第4章中学习ICMP）。此时我们将创建一个非标准（但简单）的基于UDP的ping程序。
> 你的ping程序经UDP向目标服务器发送10个ping报文，对于每个报文，当对应的pong报文返回时，你的客户要确定和打印RTT。因为UDP是一个不可靠协议，由客户发送的分组可能会丢失。为此，客户不能无限期地等待对ping报文的回答。客户等待服务器回答的时间至多为1秒；如果没有收到回答，客户假定该分组丢失并相应地打印一条报文。
> 在此作业中，我们给出服务器的完整代码（在配套网站中可以找到。你的任务是编写客户代码，该代码与服务器代码非常类似。建议你先仔细学习服务器的代码，然后编写你的客户代码，可以不受限制地从服务器代码中剪贴代码行。

## 实验

下面是官方提供的服务端代码，看懂后只需要修改端口即可，注意和自己编写的客户端端口一致。

下面是服务端代码，这个其实代码很简单，比实验一还要简单。30% 的请求不做回应采用随机数实现。借此来模拟丢包。

```python
# UDPPingerServer.py
# We will need the following module to generate randomized lost packets import random
from socket import *
import random

# Create a UDP socket
# Notice the use of SOCK_DGRAM for UDP packets
serverSocket = socket(AF_INET, SOCK_DGRAM)
# Assign IP address and port number to socket
serverSocket.bind(('', 8080))

while True:
	# Generate random number in the range of 0 to 10
	rand = random.randint(0, 10)
	# Receive the client packet along with the address it is coming from
	message, address = serverSocket.recvfrom(1024)
	# Capitalize the message from the client
	message = message.upper()
	# If rand is less is than 4, we consider the packet lost and do not respond
	if rand < 4:
		continue
	# Otherwise, the server responds
	serverSocket.sendto(message, address)
```

客户端代码 UDPPinger.py

```python
from socket import *
import time

# 设定服务器地址以及端口
IP = '127.0.0.1'
PORT = 8080

clientSocket = socket(AF_INET, SOCK_DGRAM)
clientSocket.settimeout(1)  # 设置超时时间

for i in range(0, 10):
    # 标记发送时间并将数据包设置成字节
    sendTime = time.time()
    message = ('Ping %d %s' % (i + 1, sendTime)).encode()

    try:
        clientSocket.sendto(message, (IP, PORT))  # 将信息发送到服务器
        modifiedMessage, serverAddress = clientSocket.recvfrom(1024)
        RTT = time.time() - sendTime  # 计算往返时间
        print('Sequence %d: Reply from %s    RTT = %.3fs' % (i + 1, IP, RTT))
    except Exception as e:
        print('Sequence %d: Request timed out' % (i + 1))

clientSocket.close()
```

先运行 UDPPingerServer.py 再运行 UDPPinger.py 本地测试的结果：

<div align="center"><img src="https://gitee.com/weijiew/pic/raw/master/img/20200811192450.png"/></div>

远程连接的话修改一下 IP 地址即可。

# 实验三：邮件客户端

## 题目：

> 这个编程作业的目的是创建一个向任何接收方发送电子邮件的简单邮件客户。
> 1）你的客户将必须与邮件服务器（如谷歌的电子邮件服务器）创建一个TCP连接，
> 2）使用SMTP协议与该邮件服务器进行交谈，
> 3）经该邮件服务器向某接收方（如你的朋友）发送一个电子邮件报文，
> 4）最后关闭与该邮件服务器的TCP连接。
> 对本作业，
> 配套Web站点为你的客户提供了框架代码。
> 你的任务是完善该代码并通过向不同的用户账户发送电子邮件来测试你的客户。
> 你也可以尝试通过不同的服务器（例如谷歌的邮件服务器和你所在大学的邮件服务器）进行发送。

注意：在某些情况下，接收邮件服务器可能会将您的电子邮件分类为垃圾邮件。当您查找从客户端发送的电子邮件时，请检查垃圾邮件文件夹。

提供的框架：需要填写代码的地方标有#Fill in start和#Fill in end。每个地方都可能需要不止一行代码。

完成标志：你需要提供完整的SMTP邮件客户端的代码以及一张能显示您确实收到电子邮件的屏幕截图。

练习：

1. 类似Google邮件的服务器（如地址：smtp.gmail.com，端口：587））要求您的客户端在发送MAIL FROM命令之前，需要为了身份验证和安全原因添加传输层安全（TLS）或安全套接字层（SSL）。将TLS / SSL命令添加到现有的命令中，并使用上述地址和端口为Google邮件服务器实现客户端。 

2. 您当前的SMTP邮件客户端只能在电子邮件正文中发送文本消息。修改您的客户端，使其可以发送包含文本和图像的电子邮件。

框架代码如下：

```python
from socket import *
msg = "\r\n I love computer networks!"
endmsg = "\r\n.\r\n"
# Choose a mail server (e.g. Google mail server) and call it mailserver 
mailserver = #Fill in start   #Fill in end
# Create socket called clientSocket and establish a TCP connection with mailserver
#Fill in start

#Fill in end
recv = clientSocket.recv(1024)
print recv
if recv[:3] != '220':
    print '220 reply not received from server.'

# Send HELO command and print server response.
heloCommand = 'HELO Alice\r\n'
clientSocket.send(heloCommand)
recv1 = clientSocket.recv(1024)
print recv1
if recv1[:3] != '250':
    print '250 reply not received from server.'

# Send MAIL FROM command and print server response.
# Fill in start

# Fill in end

# Send RCPT TO command and print server response.
# Fill in start

# Fill in end

# Send DATA command and print server response.
# Fill in start

# Fill in end

# Send message data.
# Fill in start

# Fill in end 

# Message ends with a single period.
# Fill in start

# Fill in end

# Send QUIT command and get server response.
# Fill in start

# Fill in end
 
```

## 实验

注意，账号密码需要设置成自己的。

```python
from socket import *
import base64

# 设置邮件内容组成
titles = "mail test"
contenttype = "text/plain"
msg = "\r\n I love computer networks!"
endmsg = "\r\n.\r\n"

# 设置邮件服务商
mailserver =  "smtp.163.com"

# 发送者和接收者
fromaddress = "******"
toaddress = "******"

# 账号密码
username = "******"
password = "******"

# 创建和邮件服务商的 TCP 链接
clientSocket = socket(AF_INET, SOCK_STREAM)
clientSocket.connect((mailserver, 25))

# 判断是否和服务器建立连接
recv = clientSocket.recv(1024).decode()
print(recv)
if recv[:3] != '220':
    print
    '220 reply not received from server.'

# 向服务器发送 HELO ALice 并判断服务器是否响应
heloCommand = 'HELO Alice\r\n'
clientSocket.send(heloCommand.encode())
recv1 = clientSocket.recv(1024).decode()
print(recv1)
if recv1[:3] != '250':
    print
    '250 reply not received from server.'

#  Auth
clientSocket.sendall('AUTH LOGIN\r\n'.encode())
recv = clientSocket.recv(1024).decode()
print(recv)
if (recv[:3] != '334'):
	print('334 reply not received from server')

clientSocket.sendall((username + '\r\n').encode())
recv = clientSocket.recv(1024).decode()
print(recv)
if (recv[:3] != '334'):
	print('334 reply not received from server')

clientSocket.sendall((password + '\r\n').encode())
recv = clientSocket.recv(1024).decode()
print(recv)
if (recv[:3] != '235'):
	print('235 reply not received from server')

# Send MAIL FROM command and print server response.
# Fill in start
clientSocket.sendall(('MAIL FROM: <' + fromaddress + '>\r\n').encode())
recv = clientSocket.recv(1024).decode()
print(recv)
if (recv[:3] != '250'):
	print('250 reply not received from server')

clientSocket.sendall(('RCPT TO: <' + toaddress + '>\r\n').encode())
recv = clientSocket.recv(1024).decode()
print(recv)
if (recv[:3] != '250'):
	print('250 reply not received from server')


clientSocket.send('DATA\r\n'.encode())
recv = clientSocket.recv(1024).decode()
print(recv)
if (recv[:3] != '354'):
	print('354 reply not received from server')

message = 'from:' + fromaddress + '\r\n'
message += 'to:' + toaddress + '\r\n'
message += 'subject:' + titles + '\r\n'
message += 'Content-Type:' + contenttype + '\t\n'
message += '\r\n' + msg
clientSocket.sendall(message.encode())

clientSocket.sendall(endmsg.encode())
recv = clientSocket.recv(1024).decode()
print(recv)
if (recv[:3] != '250'):
	print('250 reply not received from server')

clientSocket.sendall('QUIT\r\n'.encode())
clientSocket.close()
```

# 实验四：多线程Web代理服务器

> 在这个编程作业中，你将研发一个简单的Web代理服务器。
> 当你的代理服务器从一个浏览器收到某对象的HTTP请求，
> 它生成对相同对象的一个新HTTP请求并向初始服务器发送。
> 当该代理从初始服务器接收到具有该对象的HTTP响应时，
> 它生成一个包括该对象的新HTTP响应，
> 并发送给该客户。
> 这个代理将是多线程的，
> 使其在相同时间能够处理多个请求。
> 对本作业而言，配套Web网站对该代理服务器提供了框架代码。
> 你的任务是完善该代码，
> 然后测试你的代理，
> 方式是让不同的浏览器经过你的代理来请求Web对象。

这个作业让我想到了科学上网，可以买一台 VPS 作为代理。😂

## 框架代码

```python
from socket import *
import sys

if len(sys.argv) <= 1:
    print 'Usage : "python ProxyServer.py server_ip"\n[server_ip : It is the IP Address Of Proxy Server'
	sys.exit(2)
# Create a server socket, bind it to a port and start listening
tcpSerSock = socket(AF_INET, SOCK_STREAM)
# Fill in start.
# Fill in end.
while 1:
	# Strat receiving data from the client
	print 'Ready to serve...'
	tcpCliSock, addr = tcpSerSock.accept()
	print 'Received a connection from:', addr
	message = # Fill in start. # Fill in end.
	print message
	# Extract the filename from the given message
	print message.split()[1]
	filename = message.split()[1].partition("/")[2]
	print filename
	fileExist = "false"
	filetouse = "/" + filename
	print filetouse
	try:
		# Check wether the file exist in the cache
		f = open(filetouse[1:], "r")
		outputdata = f.readlines()
		fileExist = "true"
		# ProxyServer finds a cache hit and generates a response message
		tcpCliSock.send("HTTP/1.0 200 OK\r\n")
		tcpCliSock.send("Content-Type:text/html\r\n")
		# Fill in start.
		# Fill in end.
			print 'Read from cache'
	# Error handling for file not found in cache
	except IOError:
		if fileExist == "false":
			# Create a socket on the proxyserver
			c = # Fill in start. # Fill in end.
			hostn = filename.replace("www.","",1) 
			print hostn
			try:
				# Connect to the socket to port 80
				# Fill in start.
				# Fill in end.
				# Create a temporary file on this socket and ask port 80
				for the file requested by the client
				fileobj = c.makefile('r', 0)
				fileobj.write("GET "+"http://" + filename + " HTTP/1.0\n\n")
				# Read the response into buffer
				# Fill in start.
				# Fill in end.
				# Create a new file in the cache for the requested file.
				# Also send the response in the buffer to client socket and the corresponding file in the cache
				tmpFile = open("./" + filename,"wb")
				# Fill in start.
				# Fill in end.
			except:
				print "Illegal request"
		else:
			# HTTP response message for file not found
			# Fill in start.
			# Fill in end.
	# Close the client and the server sockets
	tcpCliSock.close()
# Fill in start.
# Fill in end.
```

## 