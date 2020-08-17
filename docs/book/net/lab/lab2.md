# 套接字编程作业二：UDPping程序

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

