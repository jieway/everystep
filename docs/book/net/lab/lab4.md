# 套接字编程作业四：多线程Web代理服务器

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

主要思路就是，在本地和访问的网站之间加一个中间角色（代理）。
代理的存在主要是转发，本地想要访问的链接告诉代理，代理去访问，访问后转发给本地并缓存。当第二次访问的时候直接发送缓存的内容。

> 您将在下面找到客户端的代码框架，您需要完成代码框架。你需要在#Fill in start and和#Fill in end标记的地方填写代码。每个地方可能需要一行或多行代码。

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

## coding

```python
from socket import *

# 设定代理端口并建立套接字
tcpSerPort = 8080
tcpSerSock = socket(AF_INET, SOCK_STREAM)

# 绑定端口并设置监听数量
tcpSerSock.bind(('',tcpSerPort))
tcpSerSock.listen(5)

while True:
    print('服务端启动！')
    tcpCliSock, addr = tcpSerSock.accept()
    print('收到一个连接：', addr)
    # 接受浏览器首次发送过来的请求
    message = tcpCliSock.recv(4096).decode()
    # 从请求信息中解析出文件名并设置以及收到文件
    filename = message.split()[1].partition("//")[2].replace('/', '_')
    fileExist = "false"
    try:
        # 检查缓存中是否存在该文件
        f = open(filename, "r")
        # 如果存在该文件就读取
        outputdata = f.readlines()
        fileExist = "true"
        print("缓存中存在该文件！")
        # 发送给客户端
        for i in range(0, len(outputdata)):
            tcpCliSock.send(outputdata[i].encode())
        print("从缓存中读取。")

    # 缓存中不存在该文件，去服务端里面查找。、
    except IOError:
        print("文件是否存在：",fileExist)
        if fileExist == "false":
            print('在代理和服务器之间创建一个套接字。')
            c = socket(AF_INET, SOCK_STREAM)
            hostn = message.split()[1].partition("//")[2].partition("/")[0]
            try:
                c.connect((hostn, 80))
                print("已经和服务端的 80 端口建立连接！")
                # 将客户端的请求原封不动的转化给服务端
                c.sendall(message.encode())
                # 读取服务端的响应
                buff = c.recv(4096)
                tmpFile = open("./" + filename, "w")
                tmpFile.writelines(buff.decode().replace('\r\n', '\n'))
                tmpFile.close()
            except:
                print("无效的请求！")
        else:
            print("该文件不存在！")
    tcpCliSock.close()
tcpSerSock.close()
```

## 测试 

采用该网站 http://gaia.cs.umass.edu/wireshark-labs/INTRO-wireshark-file1.html 真正的访问地址。

修改浏览器的访问设置，也就是通过本地代理来访问网站。

![20200817180749](https://cdn.jsdelivr.net/gh/weijiew/pic@master/images/20200817180749.png)

运行代理文件 WebProxy.py 

最初我采用是 edge 浏览器测试，但出现了一些问题，随后改为 ie 问题消失。多试几次就好了！

第一次访问因为没有缓存会通过代理访问远程服务器，然后产生将得到的结果发送个访问者代理还会将文件缓存下来：

![20200817181053](https://cdn.jsdelivr.net/gh/weijiew/pic@master/images/20200817181053.png)

第二次访问就可以直接去缓存里面取了：

![20200817175820](https://cdn.jsdelivr.net/gh/weijiew/pic@master/images/20200817175820.png)

