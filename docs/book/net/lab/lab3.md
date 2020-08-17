
# 套接字编程作业三：邮件客户端

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

