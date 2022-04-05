18-01
0-0.06

alright hello everyone 

大家好

0.06-0.08

let's get started

我们开始上课吧




0.08-0.13

I want to talk about a system called certificate transparency today

今天我想谈论一个叫做证书透明化（certificate transparency）的系统

0.13-0.21

and this is a bit of a departure from most of the topics we talked about

这和我们所讨论的大多数话题有所偏离

0.21-0.24

 so far we've talked about distributed systems that are really closed systems

目前为止，我们所讨论的分布式系统都是些很封闭的系统

0.24-0.26

where all the participants are trustworthy

所有的参与者都是值得信赖的

0.26-0.33

they're all maybe be run being run by the same sort of mutually trusting organization like raft that way

它们可能都是运行在同一个相互信赖的组织下，就像raft那样



0.33-0.37

you know you just assume at the raft peers do what they're supposed to do

你知道的，就像raft peer所做的那样

0.37-0.44

but there's also plenty of systems out there particularly systems sort of built an internet scale

但也有很多的系统是建立在网络环境下的

0.44-0.46

where the systems are open 

这些系统都是对外开放的

0.46-0.51

and anyone can participate being active participant I mean in some big systems out there

任何人都可以去使用这些系统，我的意思是这些大型系统

0.51-0.57

and if you build systems that are completely open in that way

如果你所构建的系统是对外完全开放的

0.57-1.07

there's often no single universally trusted Authority that everybody is willing to trust to run the system or to protect it

通常不存在那种所有人都普遍信任的机构来运行这种系统或者保护这种系统

1.07-1.13

that is everybody you sort of potentially mutually suspicious of everyone else 

所有人都可能会去怀疑使用该系统的其他人

1.13-1.16

and if that's the situation

如果是这种情况

1.16-1.21

you have to be able to build useful systems out of mutually distrusting pieces

你必须能够从这种互不信任的部分中构建出系统

1.21-1.32 QQQQQQ

and this makes in any sort of internet wide open systems to make trust and security sort of top level systems issues，when you're thinking about designing a distributed system

当你去思考设计一种分布式系统的时候，

1.32-1.36

so the most basic question when you're building an open system is

So，当你去构建一个开放系统的时候，最基本的一个问题是

1.36-1.40

when I'm talking to another computer or another person 

当我正在和另一台机器或者另一个人进行通信的时候

1.40-1.45

you need to know are you talking to the right other computer or are you talking to the right website

你需要知道你所通信的是否是正确的机器或者是正确的网站

1.45-1.50

and this problem is actually close to unsolvable 

这个问题实际上是无法解决的

1.50-1.55

it turns out there's really there's lots of solutions and none really work that well

事实证明，虽然有很多解决方案，但没有任何一个解决方案能很好地解决这个问题

1.55-2.02

but it is the problem that certificate transparency today's topic is trying to help with

但这是今天我们所要讲的Certificate Transparency所要试着解决的问题

2.02-2.08

the material today is ties sort of backwards in the course to consistency

今天的所要讲的内容和我们课上所讲的一致性是背道而驰的

2.08-2.16

it turns out that a lot of what certificate transparency do doing is ensuring that all parties see the same information about certificates

事实证明，Certificate Transparency所做的很多事情就是为了确保所有团体能看到有关证书的相同信息

2.16-2.17

that's a real consistency issue

这是一个真正的一致性问题

2.17-2.22

and this material also ties forward to blockchain systems

这份材料也和区块链系统相关

2.22-2.25

like blockchain which is what we talk talking about next week

就比如我们下周要讨论的区块链

2.25-2.35

a certificate transparency is among the relatively few non cryptocurrency uses of a blockchain like design

certificate transparency在像区块链这种设计下的非加密货币场景中用的比较少

2.35-2.36

all right



2.36-2.50

so by way of introduction I want to start with the situation on the web with web security at any rate as it existed before 1995 before certificates

So，我想先从1995年（即证书方案推出前）的web安全开始讲起




2.50-2.55

so this is before 1995

So，我们先从1995年之前的情况开始讲起

2.55-3.02

and in particular there was a there was a kind of attack in those days that people were worried about called a man-in-the-middle attacks 

在那个时候，人们担心的一种攻击行为叫做中间者攻击




3.02-3.08

this is man in middle

中间者攻击

3.08-3.12

 and this is a name for a class of attacks style of attack 

我们将这一类的攻击叫做中间者攻击

3.12-3.16

so you know the set up in those days is 

So，当时的环境是这样的

3.16-3.20

you have the internet

我们有网络

3.20-3.22

 and you have people running browsers

人们运行着浏览器






3.22-3.27

um sitting with our computer attached to the Internet

他们坐在连着网的电脑前

3.27-3.31

anyone sitting in front of my computer I want to talk to a specific server

假设，有人坐在我的电脑前，他想去和某个特定的服务器进行通信

3.31-3.36

supposing what I want to do is talk to gmail.com right 

假设我想做的是和gmail.com进行通信

3.36-3.42

and ordinarily I would you know maybe contact the DNS system

你知道的，通常我可能会和DNS系统进行通信

3.42-3.45

I would as a user I maybe type gmail.com

我作为一个用户，我可能会往地址栏中输入gmail.com

3.45-3.49

 I would sort of know what it was I wanted to talk to name Li gmail.com

我知道我想要进行访问的网址是什么，即gmail.com

3.49-3.51

 my browser would talk to DNS servers

我的浏览器就会和DNS服务器进行通信

3.51-3.53

 say what's gmail.com

并说，gmail.com的服务器地址是什么

3.53-3.55

 it would reply with a IP address

DNS服务器就会给我返回一个IP地址

3.55-3.56

 I connected that IP address 

我就会连接到这个IP地址

3.56-3.59

and you know I need to authenticate myself

你知道，我需要认证登录我的账号

3.59-4.01

so I'd probably type my password to Gmail to Gmail's website 

So，我会在gmail网站上填写我的账号密码

4.01-4.05

and then Gmail would show me my email

然后，Gmail就会向我展示我的邮件

4.05-4.09

without some kind of story for security

在没有做任何安全措施的情况下

4.09-4.12

this system is actually quite easy to attack

实际上，这个系统被攻击起来很容易

4.12-4.14

and turn out to be easy to attack

事实证明，攻击起来很容易

4.14-4.20

 and the one style of attack is that what's called a man-in-the-middle attack 

其中一种攻击方式叫做中间人攻击

4.20-4.25

where some evil person sets up a another web server

有些坏人会设置另一个web服务器

4.25-4.29

that serves pages that look just like Gmail web servers

它所提供的网页看起来就像是Gamil服务器所提供的网页

4.29-4.32

 like the last for your login and password right

比如，上面还留有你的登录账户和密码（密码自动填充）

4.32-4.37

 and then the attacker would maybe intercept my DNS packets

然后，攻击者会拦截我的DNS数据包




4.37-4.42

 or just guess when I would have sent a DNS packet

或者，当我发送了一个DNS数据包后

4.42-4.44

 and come up with a fake reply

攻击者给我返回了一个伪造的回复信息

4.44-4.50

 that instead of providing the real IP address of the real gmail.com server

而不是将真正的gmail.com服务器的IP地址返回给我

4.50-4.53

would provide the email address of ma of the attackers fake computer 

它返回的是攻击者所伪造的服务器IP地址

4.53-5.02

and then the user's browser instead of talking to Gmail would actually unknown to them be talking to the attackers computer 

那么，用户浏览器就不会和Gmail进行通信，而是和攻击者的机器进行通信

5.02-5.06

the attackers computer would provide a web page looks just like a login page

攻击者的机器会提供一个看起来很像Gmail登录页面的网页

5.06-5.07

 user just types login and a password 

用户会在该网页上输入他的用户名和密码




5.07-5.14

and now the attackers computer can forward that to the real Gmail login for you

现在，攻击者的机器就会将你的登录信息转发给真正的Gmail服务器

5.14-5.15

 of course you don't know

Of course，你并不知道这里所发生的事情

5.15-5.22

 that you know get your current inbox back to the attackers computer which presumably records it along with your password

然后，你的当前收件箱内容就会返回给攻击者的机器，它还会记录下你的密码

5.22-5.25

 and then sends your inbox or whatever to the browser

接着，再将你的收件箱内容或者其他数据发送给你的浏览器

5.25-5.29

and this allows a you know if you can execute this kind of man-in-the-middle attack

如果你可以执行正在中间者攻击

5.29-5.34

 the attackers computer can record your password record your email

攻击者的机器可以记录下你的邮箱和密码

5.34-5.36

and you'll never be the wiser

你永远不会注意到这点

5.36-5.40

and before certificates on SSL and HTTPS

在SSL和HTTPS证书出现之前

5.40-5.42

there was really no defense against this

实际上，没有任何办法能够防范这种行为

5.42-5.47

okay so this is the man in the middle attack

Ok，这就是中间者攻击




5.47-5.49

 and this attacker here is the man in the middle 

此处的攻击者充当的就是中间人的角色

5.49-5.52

looks just like Gmail to the browser

它给浏览器返回了一个看起来和Gmail差不多的网页

5.52-5.54

 pretends to be the user when talking to Gmail 

当它和Gmail进行通信时，它会伪装成用户

5.54-6.00

so that it can actually get the information from Gmail required to trick the user into thinking it's really Gmail 

So，这样的话，它就可以从Gmail处获取所需的信息，以诱使用户相信自己是和真正的Gmail服务器进行通信

6.00-6.01

all right 



6.01-6.02

so this is the attack

So，这就是中间者攻击

6.02-6.06

 in the mid-90s

在90年代中期

6.06-6.13

people came up with certificates with SSL or it's also called TLS

人们提出了SSL证书，也叫做TLS

6.13-6.20

 it's what the protocol the security protocol that you're using when you use HTTPS links 

这是当你在访问Https链接时候所使用的安全协议

6.20-6.30

um and here the game was that Gmail comm was gonna have a public/private key pair

gmail.com所使用的办法是使用一个public/private key pair

6.30-6.37

so we'd have a private key that only Gmail knows sitting in its server 

So，我们有一个private key，这个key只有Gmail自己知道，并保存在它的服务器中

6.37-6.42

and then when you connect Well you‘re the user

Well，你作为用户

6.42-6.45

you connect somewhere you ask to connect to Gmail 

当你和Gmail进行连接的时候




6.45-6.50

you know and in order to verify that you're really talking to Gmail

为了验证你是在和Gmail进行通信

6.50-6.55

the users going to demand Gmail prove that it really owns Gmail is private key

用户会去要求Gmail证明，它自己拥有该用户所对应的private key

6.55-6.56

Well of course

Of course

6.56-7.01

where does your browser find out Gmail is private key from your Gmail public key 

你的浏览器会去使用Gmail中的public key来询问Gmail你的private key是什么

7.01-7.05

which is what you need to check that it really has the private key 

你需要去检查它是否真的有你的private key

7.05-7.09

there's also this notion of certificate authorities and certificates 

这里有个证书颁发机构和证书的概念




7.09-7.11

so there'd be a certificate authority

So，这里有一个证书颁发机构

7.11-7.12

when Gmail set up its server

当Gmail设置它的服务器时

7.12-7.17

it would contact the certificate authority may be on the phone or by email or something

它就会去通过电话或者邮件之类的方式来联系证书颁发机构

7.17-7.22

 and say look you know I want a certificate for the DNS name gmail.com

并说：我想让你给我颁发一张关于DNS name为gmail.com的证书

7.22-7.27

 and the certificate authority would sort of try to verify that 

证书颁发机构会试着对此进行验证

7.27-7.30

oh yes whoever's asking for certificate really owns that name

并说：Yes，找我办证的这个人确实拥有该域名的所有权



7.30-7.33

it really is Google or whoever owns gmail.com

Google或者某个人确实是拥有gmail.com的所有权

7.33-7.34

 and if so

如果这样的话

7.34-7.41

 the certificate authority would provide a certificate back to gmail.com

证书颁发机构就会为gmail.com提供一张证书




7.41-7.49

which basically what a certificate contains is the name of the web server

简单来讲，一张证书中包含了该web服务器的名字，即gmail.com

7.49-7.53

the web servers public key 

接着就是web服务器的public key




7.53-8.04

and a signature over this certificate made with the certificate authorities private key 

以及基于该证书颁发机构的private key所制作的该证书的签名

8.04-8.12 ******

so this is sort of a self-contained assertion checkable by checking the signature 

So，这是一种可检查的独立声明，我们可以通过检查签名来对其进行检查

8.12-8.20

an assertion by the certificate authority that the public key of gmail.com is really this public key

证书机构会断言gmail.com的public key确实就是这个public key

8.20-8.22

 gmail.com server would I just keep a copy of the certificate

gmail.com服务器上会保存一份该证书的副本




8.22-8.26

if you connect to gmail.com server with HTTPS

如果你通过Https连接到gmail.com的服务器




8.26-8.29

 the first thing it does is sends you back this certificate

它首先要做的就是将这个证书返回给你



8.29-8.33

 at this point is just a certificate 

此时，它返回的就只是一个证书

8.33-8.36

right now of course since gmail.com is willing to give it to anybody

Of course，因为gmail.com会将该证书发送给访问它的任何人

8.36-8.39

the certificate itself is not at all private， it's quite public

该证书自身并不完全是私有的，它是公开的

8.39-8.46

and then the browser would send some information like a random number for example to the server

接着，浏览器就会发送一个随机数字之类的信息给服务器

8.46-8.50

 and ask it to sign it with its private key 

并要求服务器通过它上面保存的private key对该数字进行签名

8.50-9.01

and then the browser can check using the public key in the certificate that the random number is that random number was really signed by the private key

那么该浏览器就可以使用该证书中的public key来检查这串随机数字是否是基于private key进行签名的



9.01-9.04

 that's associated with the public key in the certificate

这和证书中的public key有关

9.04-9.05

 and therefore

因此

9.05-9.12

that whoever it's talking to is really the entity that the certificate authority believes is gmail.com 

实际上，证书机构会认为你现在进行通信的服务器就是gmail.com服务器

9.12-9.13

all right



9.13-9.16

 and now the reason why this makes man-in-the-middle attacks much harder is that 

这种做法使得中间者攻击变得很艰难的原因在于

9.16-9.23

yeah you know you can set up a rogue server that looks just like Gmail.com

你知道的，你这里可以设置一台看起来和gmail.com很像的流氓服务器

9.23-9.25

 and maybe you can even hack the DNS system

甚至你可以去黑入DNS系统

9.25-9.27

indeed you still can

但你依然可以做到这点




9.27-9.33

if you're sufficiently clever powerful hack the DNS system to tell people's browsers that 

如果你足够聪明能够黑入DNS服务器，并告诉人们所使用的浏览器

9.33-9.36

oh they should go to your server instead of gmail.com

它们（这些浏览器）应该去访问你的服务器，而不是gmail.com的服务器

9.36-9.39

but once somebody's browser contacts your server

但一旦某人的浏览器和你的服务器进行通信

9.39-9.44

you're not presumably going to be able to produce a certificate 

你大概是没办法生成证书的

9.44-9.48

that says but you you can produce Gmail certificate

但你可以生成gmail的相关证书

9.48-9.51

but then Gmail certificate as Gmail's public key

但除了gmail的证书以及gmail的public key以外

9.51-9.52

 your server doesn't have their private key 

你的服务器上并没有它们的private key

9.52-9.57

so you can sign the challenge the browser sent you

So，你可以去签署浏览器所发送给你的challenge（Challenge/Response认证）

9.57-10.00

and presumably since you're not the real Google and not the real Gmail 

想必因为你不是真正的google服务器，也不是真正的gmail服务器

10.00-10.08

you're not going to be able to persuade a certificate authority to give you a certificate associating gmail com with your public key that you know

你没办法去说服一个证书颁发机构去给你发一个与gmail.com相关并且带有你的public key的证书

10.08-10.13

 and so this certificate scheme made man-in-the-middle attacks quite a bit harder 

So，这种证书方案使得中间者攻击变得艰难了起来

10.13-10.17

and you know indeed they are quite a bit harder now because of certificates

你知道的，因为证书的缘故，这样做确实变得难以攻击了点

10.17-10.20

okay 



10.20-10.21

so it turns out though

So，事实证明

10.21-10.27

that the certificate scheme as people now have a lot of experience with it

对于这种证书方案，人们对此有大量的经验

10.27-10.30

almost 25 years experience within 

差不多有25年左右的经验

10.30-10.33

so we now know there's some kind of things that go wrong

So，假设这里有些地方出现了问题




10.33-10.38

it was originally imagined that there would just be a couple of trustworthy certificate authorities

假设，这里一开始有两个值得信任的证书颁发机构

10.38-10.43

 who would do a good job of checking that request really came from  who they claimed to come from that

它们会去检查这些请求是不是真的来自于它们所声称的某个地方



10.43-10.45

 if somebody asked for a certificate for gmail.com

如果有人要求查看gmail.com的证书



10.45-10.51

that this certificate authorities would indeed actually verified that the request came from the owner gmail.com

该证书颁发机构就会去验证该请求是否来自gmail.com的所有者

10.51-10.55

and not hand out certificates to random people for gmail.com

而不是将证书随便发给gmail.com中的人

10.55-11.00

but it that turns out to be very challenging

但事实证明，这非常具有挑战性

11.00-11.05

 for google maybe you can convince this certificate authority can convince itself that a request comes from Google

该证书机构得能够说服自己这个请求是来自于Google的

11.05-11.08

 but you know for just X.COM

但你知道，对于x.com这种来说

11.08-11.17

that's very hard to have a certificate authority reliably able to say oh yeah gosh this request really came from the person who really does own the DNS name XCOM

让一个证书颁发机构能够可靠地说出这种话是真的很难，即该请求是真的来自于DNS name为x.com的所有者

11.17-11.19

 all right 



11.19-11.22

a worse problem is that

一个更糟糕的问题是

11.22-11.26

 while originally they were envisioned there'd be only a few certificate authority 

最初他们设想的时候，世界上只会有少数几个证书机构

11.26-11.29

there are now literally hundreds of certificate authorities out there

但现在世界上存在着数百个证书机构




11.29-11.35

and any certificate authority can generate a certificate for any name

任意证书颁发机构都可以为任意域名生成一个证书

11.35-11.42

 and indeed may want to you're allowed to change certificate authorities if you're a website owner 

如果你是网站所有者，那么你可以去更换证书颁发机构

11.42-11.44

you can change certificate authority to whoever you like 

你可以将证书颁发机构换成你喜欢的那个

11.44-11.49

so there's no sense in which certificate authorities have limits on their powers

So，没有哪个证书机构会对网站所有者更换证书机构的权利进行限制

11.49-11.53

they can any certificate authority can produce any certificate

任何证书机构都能生成任意证书

11.53-11.59

 and now browsers have you know there's a couple hundred certificate authorities 

你知道的，世界上有好几百个证书机构

11.59-11.59

and that means

这意味着

11.59-12.08

that each browser has built into it like Chrome or Firefox or something has built into it a list of the public keys of all the certificate all couple hundred sort good authorities 

像Chrome、Firefox之类的浏览器内部会放一个保存着几百个证书机构证书的public key列表

12.08-12.12

and if any of them sign has signed a certificate produced by web server

如果其中任意一个证书机构给该web服务器签发了一个证书

12.12-12.15

 certificates acceptable

该证书就是可接受的

12.15-12.18

 the result of this is that 

这样做的结果是

12.18-12.23

there have been multiple incidents of certificate authorities producing bogus certificates

历史上有多次出现证书机构伪造证书的情况发生

12.23-12.30

that is producing certificates that said they were certificate for Google or Gmail or some other real company 

它们所生成的证书表示，这些证书是Google的、Gmail的或者其他公司的

12.30-12.40

but were actually issued to someone totally else absolutely not issued certificate for one of Google's names

但实际上，这些证书是签发给其他人的，根本不是给Google旗下的任意一个域名的

12.40-12.41

 but not issued to Google

这并不是颁发给Google的

12.41-12.44

 issued to someone else like

而是发给其他人的

12.44-12.48

and you know sometimes this happens just by mistake

你知道的，有时候这是因为失误所导致的

12.48-12.53

 because certificate Authority doesn't realize that they're doing the wrong thing 

因为证书机构不会意识到他们做的事情是错的

12.53-12.54

and sometimes it's actually quite malicious

有时候，这实际上是相当恶意的

12.54-13.04

I mean there have certainly been certificates issued to people who just wanted to snoop on people's traffic and mount man-in-the-middle attacks and did Man the middle attacks 

我的意思是，之前肯定有人将证书颁发给了那些想窥探人们的网络流量以及想发动中间者攻击，并且确实发动了中间者攻击的人

13.04-13.08

today's readings are mentioned a couple of these incidents 

今天的阅读材料中提到了一些这种事故

13.08-13.10

and they're particularly troubling

它们特别麻烦

13.10-13.12

because they're hard to prevent 

因为它们很难去防止

13.12-13.15

because there's so many certificate authorities 

因为实际上有那么多的证书机构

13.15-

and not all of them



13.18-13.20

although sorry the last question

抱歉，最后一个问题是




13.20-13.21

whats the last line insert box 

这个方框中最后一行是什么呢？

13.21-13.29

it's a signature over the certificate by the certificate authorities using the certificate authorities private key

这是证书机构使用证书机构的private key对该证书所做的签名

13.29-13.31

okay 



13.31-13.34

so there have been incidents of bogus certificates

So，过去发生过伪造证书的情况

13.34-13.39

certificates for real websites like Google issued to totally the wrong people

原本应该发给像Google这样的公司的证书却被完全发错给了别人

13.39-13.41

 and those certificates have been abused 

并且这些证书被滥用了

13.41-13.47

and it's not clear how to fix the certificate authority system itself to prevent them

我们并不清楚该如何修复证书机构系统来阻止这些问题

13.47-13.49

 because there's so many certificate authorities

因为世界上有如此多的证书机构

13.49-13.55

and they really you just can't expect that they're going to be completely reliable

你不能去指望它们都是完全可靠的

13.55-13.57

so what can we do about this

So，对此我们能做些什么呢？

13.57-14.06

 one possibility would be to have a single online database of all valid certificates

其中一种可能的做法就是，使用一个保存着所有有效证书的在线数据库

1406-14.07

 so that

这样的话

14.07-14.09

 when a browser you know browser contacts websites

当浏览器访问这些网站的时候

14.09-14.12

 website hands a certificate you know might or might not be valid 

网站会将一个可能有效，也可能无效的证书给你

14.12-14.19

then maybe you could imagine the browser would contact the global valid certificate database

接着，你可以想象下，浏览器会和全球有效证书数据库进行联系

14.19-14.25

and saies this really is certificate or a bogus certificate issued by a row certificate authority

并询问数据库，这个是真的证书，还是由证书机构签发的伪造证书

14.25-14.29

 um the problem is

这里的问题是

14.29-14.33

as many problems with that approach

这种方案下其实有很多问题

14.33-14.33

 one is 

其中一个问题是

14.33-14.41

it's still not clear how you can how anybody can distinguish valid correctly issued certificates from bogus certificates 

我们依然不清楚该如何区分真正的证书和伪造的证书

14.41-14.45

because typically you just don't know who the proper owner of DNS names it is

因为通常情况下，我们不清楚谁才是该DNS name的真正拥有者

14.45-14.46

 furthermore

此外

14.46-14.52

 you need to allow certificate owners to change certificate authorities or renew their certificates

你需要允许证书拥有者去更改他所使用的证书机构，或者更新他们的证书

14.52-14.57

 or they may lose their private key and need a new certificate to replace their old certificate

或者，他们有可能会弄丢他们的private key，他们需要一张新的证书来替换原先的证书

14.57-14.59

because using a new public/private key pair

因为他们所使用的是一对新的public/private keypair

14.59-15.02

so people's certificates change all the time 

So，人们的证书一直都在改变

15.02-15.09

and finally even if technically or were possible to distinguish correct certificates from bogus ones

最后，即使从技术上来说，我们有可能去区分正确的证书和伪造的证书

15.09-15.13

there's no entity that everybody would trust to do it 

但也没有那种所有人都信任的机构去做到这点

15.13-15.22

you know everybody in the world those you know the Chinese Iranians the Americans you know there's not any one outfit that they all trust

你知道的，就拿世界上的每个人来说，比如，中国人，伊朗人，美国人，他们都不信任任何人

15.22-15.25

and that's the root reason why there's so many certificate authorities

这就是世界上为什么会有那么多证书机构的根本原因所在了

15.25-15.35

 so we really can't you really can't expect there to be a single Clearing House that accurately distinguishes between valid and invalid certificates 

So，你真的不能去期望有一个机构能够准确地区分有效证书和无效证书

15.35-15.36

however、

但是

15.36-15.41

 what certificate authority certificate transparency doing is

certificate transparency所做的事情是

15.41-15.56

essentially try not do the best that it's possible to do you know the longest step it can towards a database of the valid trustworthy certificates

简单来讲，它会为我们提供一个可信任的有效证书数据库，以避免证书欺诈

15.56-16.06

so now I'm gonna give an overview of the general strategy of certificate transparency

So，现在我要带你们看下certificate transparency的基本方案是什么

16.06-16.14

 the style of certificate transparency is that  it's an audit system

certificate transparency其实是一个审计系统

16.14-16.22

because it's so hard hard to impossible to just decide does this person own a name

因为我们很难做到、并且也不可能做到去判断这个人是不是该域名的所有者

16.22-16.27

 a certificate transparency isn't a building a system that prevents bad things from happening

certificate transparency所做的并不是去构建一个防止糟糕事情发生的系统

16.27-16.35

which would require you to be able to detect right away that as certificate was bogus

这需要你能够检测出该证书是被人伪造的

16.35-16.35

 instead

相反

16.35-16.40

certificate transparency is going to enable audit 

certificate transparency会启用审核功能

16.40-16.45

that is it'll it's a system to cause all the information to be public

它是一个使所有信息都公开的系统

16.45-16.48

 so that it can be inspected by people who care

So，这样的话，那些关心这些的人就可以对它们进行检查

16.48-16.53

 that is it's gonna if you know maybe people it'll still allow people to issue bogus certificates

你知道的，可能依然会有人去签发这种伪造的证书

16.53-16.58

 but it's gonna insure those certificates are public and that everybody can see them



16.58-17.02

including whoever it is that owns the name 

其中包括拥有该域名所有者的名字

17.02-17.07

that the name that's in the bogus certificate

即该伪造证书所有者的名字

17.07-17.11

 and so this fixes the problem with the pre certificate transparency system 

So，这就修复了之前certificate transparency系统所带来的问题

17.11-17.14

where certificate authorities could issue bogus certificates 

即证书机构会签发伪造的证书

17.14-17.16

and no one would ever know

并且没人会注意到这一点

17.16-17.22

and they could even give them to victim a few victim browsers who would be tricked by them 

他们甚至可以将这些伪造的证书提供给一些受害者的浏览器，这些浏览器依然会被他们所欺骗

17.22-17.24

and still because certificates aren't generally public

这是因为证书通常情况下是非公开的

17.24-17.33

they could somebody could a certificate authority could issue a bogus certificate for anybody for Google or Microsoft 

证书机构可以给任何人（比如：Google和微软）签发这种伪造的证书

17.33-17.35

and Google Microsoft might never realize it

但Google和Microsoft可能从未意识到这一点

17.35-17.40

 and the incidents that have come to light have generally been discovered only by accident

被发现的这些案例通常都是不经意间被发现的



17.40-17.44

 not because they were sort of foredoomed to be discovered

而不是因为这些证书因为过时而被发现



17.44-17.49

 so instead of relying on accidental discovery of bogus certificates 

So，因此不要依靠偶然性去发现这些伪造的证书

17.49-17.55

certificate transparency it's going to sort of force them into the light where they is much easier to notice them

certificate transparency会迫使它们更容易注意到这些伪造的证书

17.55-18.00

 again so it has a sort of audit flavor or not a prevention flavor

So，它具有审计风格，而不是预防风格

18.00-18.01

 okay



18.01-18.04

 so the basic structure again

So，这里的基本结构是




18.04-18.10

we have gmail.com or some other servers that wants a certificate

假设这里我们有gmail.com或者其他想要一张证书的服务器

18.10-18.11

 as usual

通常情况下




18.11-18.14

they're gonna ask someone of the hundreds of CAS for a certificate

他们会去问这数百个证书机构中的某个来办理证书

18.14-18.18

when the web servers first set up 

当一开始设置web服务器的时候

18.18-18.21

so we're gonna ask a certificate

So，我们会去要一张证书

18.21-18.27

and the certificate authority is gonna send this certificate back to the web server

证书机构会将该证书发回给web服务器

18.27-18.30

because of course is the web server that gives a certificate to the browser

Of course，web服务器会将该证书提供给浏览器

18.30-18.33

and at the same time 

与此同时




18.33-18.45

though the certificate authority is going to send a copy of the certificate or equivalent information to a sort of certificate transparency log server

证书机构会将该证书的副本或者与之等同的信息发送给certificate transparency日志服务器

18.45-18.51

there's gonna the real system there's multiple independent certificate transparently log servers

这里会有一个系统，这里还有多个独立的certificate transparency日志服务器

18.51-18.53

 i can assume there's just one 

我可以假设这里只有一个certificate transparency日志服务器

18.53-18.59

so this is some service that you know we don't have turns out we're not gonna have to trust 

So，假设这里有一个服务，你知道的，我们不必去信任它

18.59-19.04

the certificate authorities gonna send it certificate to this certificate log service

证书机构会将该它的证书发送给这个certificate log service

19.04-19.12

which has been maintaining a log of all issued certificates or all ones that certificate authorities have told it about

这个certificate log service维护了一份log日志文件，它上面保存了所有签发的证书，或者说那些证书机构告诉它的所有证书

19.12-19.13

 when it gets a new certificate

当它得到一个新证书后




19.13-19.15

it's gonna append it to its log

它就会将该证书追加到它的日志中

19.15-19.20

 so this you know might have millions of certificates in it after a while 

可能过了一会，日志中就会有数百万个证书了

19.20-19.27

now when the browser and some human wants to talk to a website 

现在，当有人想和某个网站进行通信时



19.29-19.33

they you know they talk did set up an HTTPS connection to Gmail 

你知道的，他们通过Https连接和Gmail进行通信




19.33-19.34

Gmail sends them a certificate back

Gmail会返回给他们一个证书




19.34-19.41

and the browser's gonna send that certificate to the certificate log server

浏览器会将该证书发送给证书日志服务器

19.41-19.45

 see is this certificate in the log

并检查该证书是否存在于该日志中

19.45-19.49

 there's certificate log servers gonna say yes or no is their certificate in the log

证书日志服务器会告诉我们Yes或者No来表示它们的证书是否存在于日志中

19.49-19.50

 now and if it is 

如果该证书存在于日志中

19.50-19.53

then the browser will go ahead and use it

那么浏览器就会使用该证书



19.53-19.57

now the fact that it's in the log ，you know doesn't mean it's not bogus right

事实上，该证书虽然存在于该日志中，但这并不意味着它不是假的

19.57-20.03

because any certificate authority including the ones that are out there that are malicious or badly run

因为任意证书机构包括我这里所画的这个都有可能是恶意或者不良的证书机构

20.03-20.09

any certificate authority can insert a certificate into the log system 

任何证书机构都可以往这个日志系统中插入证书

20.09-20.13

and therefore perhaps trick users into using it 

因此，这可能会诱使用户去使用这些伪造的证书

20.13-20.16

so for so far we haven't built a system that prevents abuse

So，目前为止，我们还未构建出那种防止证书滥用的系统

20.16-20.18

 however 

但是

20.18-20.24

it is the case that no browser will use a certificate unless it's in the log

除非该证书存在于该日志中，不然没有浏览器会去使用该证书

20.24-20.26

 so at the same time

So，与此同时




20.26-20.33

gmail is going to run up with the CT system calls a monitor

gmail会运行一个CT（certificate transparency）系统用于监视

20.33-20.38

 and for now well just assume that there's a monitor associated with every website 

假设现在每个网站都有一个对应的监视器

20.33-20.46

so this monitor periodically also talks to the certificate log servers

So，该监视器会定期和证书日志服务器进行通信

20.46-20.49

and said please give me a copy of your log 

并说：请给我一份你的日志副本

20.49-20.53

or really you know please give me a copy of whatever new has been added to your long since I last asked 

或者将自我上次访问你后所产生的新日志记录的副本发给我

20.53-20.54

and that means that

这意味着







五十三  阅举报
18-02
20.54-20.57

the monitor is going to build up 

这里会启动一个监视器

20.57-21.00

it's going to be aware of every single certificate that's in the log

它会注意到存在于日志中的每个证书

21.00-21.04

and but also because the monitor is associated with Gmail

但因为这个监视器是和Gmail所关联的

21.04-21.09

 the monitor knows what Gmail's correct certificate is 

该监视器知道Gmail的正确证书是什么

21.09-21.13

so if some rogue certificate authority issues a certificate for Gmail

So，如果某些恶意证书机构给Gmail颁发了证书

21.13-21.16

 it's not the one that Gmail itself asked for

这并不是Gmail自己所要的那个证书

21.16-21.22

 then Gmail's monitor will stumble across it in the certificate log

那么Gmail的监视器会在偶然间从证书日志中发现这个伪造证书

21.22-21.27

 because Gmail's monitor knows Gmail's correct certificate

因为Gmail的监视器知道Gmail的正确证书是什么

21.27-21.33

 now of course the rogue certificate authority doesn't have to send its certificate to the certificate log system 

Of course，这个恶意证书机构没有将它伪造的证书发送给这个证书日志系统

21.33-21.34

but in that case

但在这个情况下

21.34-21.40

 when browsers you know maybe accidentally connect to the attackers web server

你知道的，浏览器可能会意外连接到攻击者的web服务器

21.40-21.43

 and the attacker would swipe server gives them the bogus certificate

攻击者就会将伪造的证书交给这些浏览器




21.43-21.44

 if they haven't put it in the log 

如果他们并未将该证书放入日志

21.44-21.48

then the browser won't believe it and will abort the connection

那么，浏览器就不会相信该证书，并中止与攻击者服务器的连接

21.48-21.49

 it's not because it's not in the log

因为该证书并不在日志中

21.49-21.56

so the log sort of forces because browsers require certificates being a log 

因为浏览器要求这些证书得出现在该日志中

21.56-21.58

the log forces all certificates to be public 

该日志强制所有的证书都是公开的

21.58-22.05

where they can be audited and checked by monitors who know what the proper certificates are 

这样那些知道正确证书的监视器就可以对这些证书进行审计和检查

22.05-22.07

and so some monitors are run by big companies 

So，有些监视器是由大公司所运营的

22.07-22.10

and companies know their own certificates

这些公司都知道他们自己的证书是什么

22.10-22.14

some monitors are run by certificate authorities on behalf of their customers

一些监视器则是由证书颁发机构代表其客户进行运营

22.14-22.18

and again those certificate authorities know what certificates they've issued to their customers

这些证书机构知道他们颁发给他们客户的证书是什么

22.18-22.24

 and they can at least alert their customers if they see a certificate they didn't issue for one of their customers names

如果他们看到了一个不是由他们签发给他们客户的证书，那么至少他们可以对他们的客户警告下这个问题

22.24-22.26

in addition

此外

22.26-22.29

there's some totally third-party monitor systems

这里有些第三方监视系统

22.29-22.35

where you give the third-party monitor your names and your valid certificates 

你需要将你的域名以及相关的有效证书提供给第三方监视系统

22.35-22.40

and it checks for expected certificates for your names

它会检查关于你域名的这个预期证书

22.40-22.42

all right

==================================================

22.42-22.44

 this is the overall scheme

这就是整体方案

22.44-22.55

but it depends very much on browsers seeing the very same log contents that monitors see

但这在很大程度上取决于浏览器所看到的日志内容是否与监视器所看到的完全相同

22.55-23.02

and but remember we were up against this problem that we're not sure that we can trust any component in this system

但要记住我们所面临的这个问题是，我们不确定我们是否可以信任该系统中的任何组件

23.02-23.06

so indeed we found this certificate authorities some of them are malicious

So，我们发现该证书颁发机构中有些人是恶意的

23.06-23.08

or have employees who can't be trusted

他们中的有些员工是无法信任的

23.08-23.10

or are sloppy 

或者很马虎

23.10-23.11

and don't follow the rules

并且也不按照规矩办事

23.11-23.15

so we're going to assume we have to assume that the same will be true

So，同样的道理

23.15-23.17

the certificate log servers that some of them will be malicious

有些证书日志服务器是恶意的

23.17-23.22

 some of them may conspire with rogue certificate authorities 

其中一些人可能与流氓证书机构合谋

23.22-23.26

and intentionally try to help them issue bogus certificates 

并有意尝试帮助他们颁发伪造证书

23.26-23.28

some of them may be sloppy 

其中有些人可能有点马虎

23.28-23.30

some of them may be legitimate 

其中一些有可能是合法员工

23.30-23.36

but maybe some of their employees or are corruptible you pay them being a bribe

但可能有些员工比较腐败，你可以通过钱来贿赂他们

23.36-23.39

 so I'll do something funny to the log delete something or add something to it

So，我会往日志中删除点东西，或者添加点东西

23.39-23.43

 so what we need to build is

So，我们所需要构建的是这样的东西

23.43-23.48

 a log that even though the log operator may be not cooperating not trustworthy

即使日志操作员既不配合，也不值得信任

23.48-23.55

we can still be sure or at least know if it's not the case that browsers are seeing the same log contents as monitors 

我们依然可以确信或者知道浏览器所看到的日志内容是否和监视器是相同的

23.55-23.59

so if our browser uses a certificate that was in the log

So，如果我们浏览器使用的是该日志中的证书

23.59-24.02

the monitor who owns that name will eventually see it 

那么，与该域名相关联的监视器最终就会看到这个证书

24.02-24.06

so what we need to do is

So，我们需要做的事情是

24.06-24.10

 we need to build a log system

我们需要去构建一个日志系统

24.10-24.14

 that is append-only

它支持append-only

24.14-24.21

 so that it can't show a certificate to a browser then delete it before monitors see it 

So，它不能向浏览器显示证书，然后在监视器看到该证书之前将其删除

So，它不能以这种方式向浏览器展示证书，即在监视器看到该证书之前，它就把证书删了




24.21-24.25

so append-only

So，append-only

24.258-24.30

no Forks

No Forks

24.30-24.30

in the sense

某种意义上来讲

24.30-24.36

 that we don't want the log system to basically keep two logs 

我们不希望让日志系统保存两份日志

24.36-24.38

one of which it shows two browsers

如果它将其中一份日志展示给两个浏览器

24.38-24.40

 and one of which shows two monitors 

并将另一份日志展示给两个监视器




24.40-24.45

so we need no Forks 

So，我们需要No Forks

24.45-24.52

and we need untrusted

我们需要有怀疑的眼光

24.52-24.57

 we can't be sure that the certificate servers are correct 

我们无法确信证书服务器是正确的

24.57-25.00

so just to back up a bit

So，我们往前回顾下

25.00-25.06

 the critical properties we need for the log system 

我们在日志系统中所需要的关键属性是。。。

25.06-25.08

so larger than just a log servers

So，除了日志服务器以外

25.08-25.13

but the entire system of the log servers plus the various checks is

我们还需要对日志服务器所运行的整个系统进行各种检查

25.13-25.15

we have to prevent deletion

我们得防止（系统通过其他方式）删除日志

25.15-25.18

 that is we need the logs to be append only 

我们需要让日志只支持追加

25.18-25.24

because if a log server could delete items out of its log

如果日志服务器可以从它的日志中删除数据

25.24-25.30

then they could effectively show a bogus certificate to a browser claimants in the log

那么，它们就可以有效地向浏览器展示日志中伪造的证书

25.30-25.31

 and maybe in the log at that time 

可能在那个时候，该证书是在日志中的

25.31-25.33

the browser uses it 

浏览器使用了这个证书

25.33-25.37

but then maybe this certificate server could delete that certificate from its log

但接着，该证书服务器能够从它的日志中删除该证书

25.37-25.39

 so that by the time

So，到了那个时候

25.37-25.41

 the monitor's came to look at the log 

当监视器查看日志的时候（知秋注：即目标服务器没有发现异常，但浏览器那头相信的伪造证书，并和伪造站点进行通信）

25.41-25.42

the bogus certificate wouldn't be there 

日志中就不会有这个伪造证书了

25.41-25.47

so we need to have a system that either prevents deletion

So，我们需要一种能够防止删除操作的系统

25.47-25.49

 or at least detects if deletion occurred 

或者，至少能够检测出有人执行了删除操作

25.49-25.53

so that's the sense in which the system needs to be append-only

So，这就是该系统需要支持append-only的意义了

25.53-25.58

and we also have to prevent what's called equivocation 

我们也得去防止那种模棱两可的情况




25.58-26.05

we have to prevent Forks or equivalently equivocation

我们得避免出现forks的情况或者模棱两可的情况

26.05-26.17

so you know it's maybe the certificate log servers could be implementing append-only logs

证书日志服务器可能实现了只支持追加的日志

26.17-26.22

but if it uh implemented two different append-only logs

如果它实现了两个不同的append-only log日志

26.22-26.27

and showed one to browsers and show the other append-only log to monitors 

它向浏览器展示了其中一份日志，接着又向监视器展示了另一份日志

26.27-26.29

then we could be in a position 

那么我们就可能陷入这种情况

26.29-26.34

where yeah you know that the browser that we showed the log we showed the browser's contains the bogus certificate

我们向浏览器所展示的日志中包含了伪造的证书

26.34-26.41

 but the log we showed a monitors doesn't contain the bogus certificate 

但我们向监视器所展示的日志中并不包含这些伪造的证书

26.41-26.46

so we have to rule out equivocation to all without trusting the servers 

So，在不信任服务器的情况下，我们得排除所有模棱两可的情况

26.46-26.47

so how can we do this 

So，我们该如何做到这点呢？

26.47-26.57

now we're getting into the kind of details that the last of the assignments was talking about 

现在，我们来深入下最后一个assignment中所讨论的细节



26.58-26.59 ！！！！

the first step is 

第一步是




26.59-27.04

this thing called a Merkle tree

这里有个东西叫做Merkle tree

27.04-27.11

and this is something that's sort of that the log servers are expected to build on top of the log 

这是日志服务器希望基于日志所构建的东西

27.04-27.11

so the idea is 

So，这里的思路是

27.11-27.16

that there's the actual log itself which is a sequence of certificates

这里的日志实际上是由一堆证书所组成




27.16-27.21

 you know certificate one certificate to presumably in the order

证书1、证书2......以此类推

27.21-27.28

that a certificate certificates to be added to the system and the prime millions

数百万的证书会被添加到该系统的日志中



27.28-27.30

I'm just going to assume there's a couple 

这里我假设日志中只有两张证书

27.30-27.34

now it's gonna turn out 

事实证明

27.34-27.37

you know we don't want to have the browser's have to download the whole log

你知道的，我们不想让浏览器将整个日志文件都下载下来

27.37-27.52

 and so we need tools to so that we can allow the logging system to basically send trustworthy summaries or unambiguous summaries of what's in the log to the the browsers 

So，我们允许日志系统将该日志的可信摘要或者明确摘要部分发送给浏览器

27.52-27.55

and I'll talk in a bit about it exactly what those summaries are used for

我会具体讲下这些摘要是如何使用的

27.55-27.58

but the basic scheme is that

但基本方案是

27.58-28.13

 the log servers are gonna use cryptographic hashes to sort of hash up the complete set of records that are in the log to produce a single cryptographic hash

日志服务器会使用加密hash来对日志中这一组记录进行hash处理，以此来生成一个加密的hash值

28.13-28.16

which is typically these days about 256 bits long

通常这串字符的长度是256位

28.16-28.20

so the cryptographic hash summarizes the contents of the log

So，这个加密hash值总结了该日志的内容

28.20-28.25

and the way that's done is 

我们的做法是

28.25-28.33！！！！

that the is as a basically a tree structure of pairs over hash always hashing together pairs of numbers at the zeroeth level 

简单来讲，我们会从第0层起以两个记录为一组进行hash处理，以此来形成一个树状结构










28.34-28.40

so I'm gonna write each for a hash each one of the log entries has a hash 

So，我们要对每个日志条目进行hash处理




28.40-28.47

so we're gonna have sort of at the base level we have the hash of each log entry each certificate 

So，我们要对底层的每个日志条目（即每个证书）进行hash处理

28.47-28.52

and then we're going to hash a pair

接着我们要对一个pair中的数据进行hash

接着，我们以两个hash值为一组进行hash处理

28.52-28.56

so that the next level 

So，在下一层




28.56-29.01

we're gonna have a hash of this and concatenated with this 

我们要将H(C1)和H(C2)放在一起，再进行一次hash

29.01-29.07

and a hash of this concatenated with this

然后再对H(C3)和H(C4)再进一步hash




29.07-29.12

these two hashes and then at the top level 

接着，在最上层

29.12-29.16

sort of we're we're overdoing is hashing these two the concatenation of these two hashes

我们将第二层的两个hash结果放在一起再进行一次hash处理

29.16-29.27

and this single hash here is a unambiguous sort of stand-in for the complete log

这个hash值就是该完整日志的明确摘要信息了

29.27-29.32

 one of the properties of these cryptographic hashes like sha-256 is that

对于诸如SHA-256这种加密hash方式的其中一个特性就是

29.32-29.36

 it's not feasible to find two inputs to the hash function that produce the same output 

在hash函数中要找到两个具备相同输出结果的输入元素是不可行的

29.36-29.38

and that means

这意味着

29.38-29.39

if you tell somebody the output of the hash function

如果你告诉某人该hash函数的输出结果

29.39-29.47

there's only one input you're ever going to be able to find that produce that output

对于该输出结果而言，你只能找到与之对应的唯一一个输入元素



29.47-29.53

 so if the log server does hash up in this way  the contents of its logs

So，如果日志服务器以这种方式对它的日志内容进行hash

29.53-29.57

 only this sequence of these log records will ever be able to produce that hash

那么只有这一系列日志记录才能够生成该hash值



29.57-30.09

or guaranteed effectively that the log server is not going to be able to find some other log that produces the same final tree hash as this sequence of log entries

这也有效保证了日志服务器无法通过其他日志来生成和由这一连串日志条目所得到的一样的hash值

30.09-30.12

all right 



30.12-30.14

so this is the Merkle tree

So，这就是Merkle tree

30.14-30.20

 this is the sort of tree hash that summarizes the entire log at the top of the Merkle tree

我们通过这种树形hash的方式在Merkle tree的顶部对整个日志进行了总结

我们在Merkle tree的顶部对整个日志内容进行了总结




30.20-30.28

there's will actually call it a signed tree head

实际上，我们将它叫做Signed Tree Head（STH）

30.28-30.28

because in fact

因为事实上

30.28-30.33

the log servers take this hash this at the top of the tree and sign it with their private key 

日志服务器会拿到这棵树顶部的hash值，然后用它们的private key对其进行签名

30.33-30.37

and give that to clients to browsers and monitors 

并将该结果提供给浏览器和监视器

30.37-30.41

and the fact that they've signed it means 

对该值进行签名的意味着

30.41-30.45

that they they can't disavow it later that was really them produced it

日志服务器（证书机构）以后不能去否认该值，因为这是他们生成的



30.45-30.51

 so that's you know just to be able to catch lying log servers

So，这样你就能够抓到那些说谎的日志服务器了（知秋注：也就不会出现前脚写入日志服务器，在给浏览器后，后脚就删除这条日志，监视器看不到，也就感知不到这种异常的情况了，因为前后的hash值不一样）

30.51-30.54

and so the point here is 

So，这里的重点是

30.54-31.02

that once a log server has revealed a particular signed tree head to a browser or monitor

一旦日志服务器向浏览器或者监视器展示了一个特定的signed tree head

31.02-31.05

 its committed to some specific log contents 

它会提交一些特定的日志内容

31.05-31.09

because it won't be able to ever produce a different log contents to produce the same hash

因为它没法使用一段不同的日志内容来生成相同的hash值

31.09-31.13

 so you hashes are really function as kind of commitments 

So，你所生成的hash值实际上是一种承诺

31.13-31.14

okay




31.14-31.20

so this is the with the log but the Merkle tree looks like for a particular log

So，这就是某个特定日志所对应的Merkle tree的样子

============================================================

31.20-31.31

now the third reading today sort of outlined how to extend the log and how to add records to the log for arbitrary numbers of Records 

今天我们读的第三份阅读材料概述了如何对日志内容进行增加，以及往它里面添加任意数量的记录

31.31-31.37

I'm just going to assume that the log always grows by factors of 2 

这里我假设日志内容总是以2的倍数增长

31.37-31.38

which is impractical

虽然这有点不切实际

31.38-31.40

 but makes it easier to explain 

但这样解释起来会更简单

31.40-31.41

so that means that

So，这意味着

31.41-31.44

as certificate authorities send in new certificates to add to the log

当证书颁发机构将新的证书发送给日志服务器，并将它添加到日志中

31.44-31.51

the log server will wait until it has as many new records as it has old records

等到日志中新记录的数量和老记录的数量一样多的时候

31.51-31.54

 and then produce another tree head

那么，日志服务器就会生成另一个tree head

31.54-31.55

 and the way it does

它的做法是

31.55-31.58

 that is it's gonna in order to extend the log

为了扩展日志的内容




31.58-32.02

 the log servers going to wait off as another four records 

这个日志服务器会等待另外4个记录落地

32.02-32.06

and then it's gonna hash them pairwise just as before 

然后对这部分日志内容使用和之前一样的方式进行hash处理




32.06-32.12

and then it'll produce a new tree head

接着，它就会生成一个新的tree head

32.12-32.17

 that is the hash of the concatenation of these two hashes 

这个hash值是通过对下面两个hash值进行hash而得到的

32.17-32.27

and this is the new tree head for the new expanded log

这就是这个扩展后的新日志的tree head

32.27-32.28

 and so that means

So，这意味着

32.28-32.29

as time goes on

随着时间的推移

32.29-32.34

 and a log server this log grows longer and longer

日志服务器上的这份日志就会变得越来越长

32.34-32.40

it produces sort of higher and higher a sequence of higher and higher tree heads as the log grows

随着日志长度的增加，它所生成的tree head的高度会越来越高

32.40-32.45

okay 



32.45-32.53

so this is the structure that we're expecting log servers to maintain 

So，这就是我们希望日志服务器去维护的结构

32.53-32.57

of course who knows what they're actually doing especially if they're malicious

of course，没有人知道日志服务器实际在做什么，特别是如果它们是恶意的话

32.57-33.05

but the certificate transparency protocol sort of is written you know as if the log server was actually doing this

但通过certificate transparency协议，即通过日志服务器做的这个事，你就可以知道日志服务器实际上做了什么事情（知秋注：因为日志服务器也不一定可靠，要保持怀疑态度）

你就可以通过日志服务器，知道证书颁发机构实际在做什么事情



33.05-33.05

 all right 



33.05-33.06

so what do we need to do 

So，我们需要做什么呢？



33.06-33.20

but do the point of this Merkle trees is to use them to force log servers to prove certain things  about the log that they're maintaining 

Merkle tree的作用在于，我们通过它们可以强制让日志服务器证明这些内容是属于它们所正在维护的日志

33.20-33.25

we're going to want to know what those proofs look like

我们想知道这些证据是长什么样的

33.25-33.28

 the first kind of proof is 

第一种证明是




33.28-33.35

what I'll call a proof of inclusion

我将它称为包含证明（Proof of inclusion）

33.35-33.41

and this is what a browser needs

这是浏览器所需要的东西

33.41-33.48

when it wants to find out if a certificate that has just been given by a web server if that certificate is really in the log

当它想去弄清楚该web服务器所给出的证书是否存在于日志服务器的日志中时

33.48-33.57

it's gonna ask the certificate it's gonna ask the log server look here's a certificate

它会去询问日志服务器，并说：看，这里有张证书

33.57-33.59

you know is it an is it in your log

它是否存在于你的日志中

33.59-34.10

and the certificate server is gonna send back a proof of actually not just that the certificate is in the log but actually where it is what its position is in the log

证书服务器就会返回相关证据，该证据除了表示该证书存在于该日志之上，并且还包含了该证书在日志上所处的位置

34.10-34.13

and of course



34.13-34.15

 the browser wants this proof

浏览器想要拿到这个证据

34.15-34.18

because it doesn't want to use the certificate if it's not in the log 

因为如果该证书不在这个日志中的话，那么它就不会想去使用这个证书

34.18-*34.19

because if it's not in the log

因为如果日志中并没有这个证书的话

34.19-34.21

then monitors won't see it

那么监视器就不会看到这个证书

34.21-34.25

and there's no protection against their certificate being bogus

也就没有防止他们的证书被伪造所做的保护措施了

并且也没有那种针对伪造证书的保护手段

34.25-34.28

 and it needs to be a proof 

这需要证据



34.28-34.37

because we can't afford to a malicious log server change its mind 

因为我们无法忍受恶意日志服务器所带来的问题

34.37-34.39

we don't want to take the log servers word for it 

我们不想去使用这种恶意的日志服务器

34.39-34.42

because then they might a malicious log server might say yes

因为某个恶意日志服务器可能会说Yes

34.42-

 and this proof is gonna help us catch it 

这种证据会帮我们逮到这些恶意的日志服务器

-34.48

you know if a log server does lie

如果一个日志服务器说了谎

34.48-34.52

 these proofs are gonna help us catch the fact that the log servers lied

这些证据就会帮助我们抓到日志服务器说谎的这个事实

34.52-34.56

 and produce evidence that the log server is malicious

并且生成一些证明，以此表示该日志服务器是恶意的

34.56-34.58

 and should be ignored from now on 

并且我们从现在开始就应该将这个日志服务器给忽略掉



35.00-35.02

is that sort of the ultimate sanction against the log servers is that

这就是对于这种恶意服务器所做的最终制裁

35.02-35.05

 the browser's actually have a list of acceptable log servers

实际上，浏览器中有一份关于可接受的日志服务器列表



35.06-35.16

and these proofs would be part of the evidence to cause one of the log servers to be taken out of the log if it was malicious 

这些证明会成为证据的一部分来让那些恶意的日志服务器从日志中移除

35.16-35.17

okay 



35.17-35.18

so we need a proof 

So，我们需要证据

35.18-35.23

we want the log server to produce a proof that a given certificate is in its log

我们想让日志服务器给出证据来证明该证书是否在它的日志中

35.23-35.26

so actually the first step is that the

So，实际上，第一步要做的事情是

35.26-35.34

browser asks the log server for the current signed tree head

浏览器会要求日志服务器提供当前的signed tree head

35.34-35.37

 so what the browser's really asking is 

So，浏览器真正想问的是

35.37-35.45

is this certificate in the log that summarized by this current by this signed tree head

该证书是否在这个当前signed tree head所总结的日志中

35.45-35.48

and the log server may lie about the signed tree head right 

关于signed tree head中的内容，日志服务器可能会撒谎

日志服务器可能会对signed tree head中的内容有所撒谎

35.48-35.51

the browser asks it for the current signed tree head 

浏览器会找日志服务器拿当前的signed tree head

35.51-35.55

and then ask for a proof that the certificate is in the log

接着会问日志服务器该证书是否在日志中

35.55-35.58

 the log server could lie about the signed tree head

日志服务器可能会对signed tree head中的内容有所撒谎

35.58-36.00

we wont deal about that，we'll consider that later 

我们不会对它进行处理，我们稍后会思考下这个东西

36.00-36.01

but for now

但现在

36.01-36.09 ！！！！！

 let's assume that the the browser has the correct signed tree head 

我们假设浏览器拥有正确的signed tree head

36.09-36.10

and is demanding a proof 

并要求日志服务器给它提供相关证据

36.10-36.13

okay so for simplicity

So，出于方便起见

36.13-36.16

I'm just gonna explain how to do this for a log with two records

我会解释下如何在一个拥有两个记录的日志中做到这点

36.16-36.17

 and it turns out that

事实证明

36.17-36.24

 extending that to a log with other more higher power of two records is relatively easy

日志中记录以2的幂次方个为一组是相对容易操作的

36.24-36.29

um so the browser actually has a particular signed tree head

So，该浏览器有一个特定的signed tree head




36.29-36.39

 let's suppose the correct log that sits under that signed tree head is the two elements in log a B

假设这个正确日志所对应的signed tree head中有两个元素，即a和b

36.39*-36.41

 for particular certificates a and B 

它们分别对应着证书a和b

36.41-36.43

and that means that

这意味着




36.43-36.52

the correct Merkle tree for that it securely is at the bottom as the hashes of a and b 

对此，该日志的正确Merkle tree是这样的，我们在底部要对a和b分别进行hash




36.52-37.04

and then the signed tree head is actually the hash of a hash of a concatenated with a hash of B

那么，signed tree head的值实际上就是对H(a)和H(b)的值再进一步hash

37.04-37.13

 so let's suppose this is the signed tree head  that the certificate that the log server actually gave to the client

So，假设这就是日志服务器将证书提供给client所对应的那个signed tree head

So，假设这就是日志服务器实际提供给client的那个signed tree head

37.13-37.15

 of course






37.15-37.19

client only knows this value

client只知道这个值

37.19-37.21

 this is final hash value 

这个值是最终的hash值

37.21-37.22

doesn't actually know what is in the log 

它实际上不清楚日志中有哪些东西

37.22-37.29

the proof if the if the browser asked for a proof that a is in the log

如果浏览器问日志服务器拿关于a是否存在于日志中的相关证据

37.29-37.53

then the proof that the log server can return is simply the proof for a is a in the log is simply eizan in the log and the hash of the other element in the log

简单来讲，日志服务器所返回的证据就是a在该日志中的位置以及该日志中另一个元素的hash值




37.53-37.57

 so zero and the hash of b

So，这里我们返回的就是0和H(b)

37.57-38.07

and that is enough information for the client to convince itself that a really is at position zero

对于client来说，这些信息足以说服它自自己，因为a确实就在日志中位置0的地方

38.07-38.10

because it can take it knows the certificate is interested in

因为它知道它所感兴趣的这个证书就在日志里这个位置

38.10-38.11

 it can hash it  

它可以对该证书进行hash处理

38.11-38.17

part of the proof was the hash of the other element in this lowest level hash 

另一部分证据就是最底层另一个元素的hash值



38.18-38.23

so the browser can that now knows H a and H B

So，浏览器就可以知道H(a)和H(b)的值

38.23-38.26

 you can hash them together can execute this hash

接着，你就可以执行H(H(a), H(b))




38.26-38.29

 and see if the result is the same as the signed tree head that it has

并检查该结果是否和它所拥有的signed tree head的值一致

38.29-38.30

and if it is

如果一致

38.30-38.33

then that means that

那么，这就意味着

38.33-38.36

 the certificate log is actually produce a valid proof

该证书所在的日志实际上就会生成一个有效的证明

38.36-38.45

that certificate a is at position B that's a sorry it's a position zero in the log summarized by this signed tree head 

证书a位于由该signed tree head所总结的日志中位置0的地方



38.45-38.47

and it turns out that 

事实证明

38.47-38.52

in larger larger logs 

在内容更多的日志中




38.52-38.58

you know if you're looking for if you need a proof that a is really here 

如果你需要拿到a在日志中的证据

38.58-39.08

all you need is the sequence of hashes of the other branch of each hash up to the signed tree head that you have

那么你所需要的就是你所拥有的signed tree head的其他分支上的hash值

39.08-39.12

so in a 4 element in a log

So，假设该日志中有4个元素

39.12-39.13

if you need a proof that a is position zero 

如果你需要关于a在日志位置0处的证据




39.13-39.16

you need this hash units then you need this hash

那你就需要这两个hash值

39.16-39.17

 and if the log is bigger

如果日志内容再大点的话

39.17-39.19

 you know eight elements

比如说，它里面有8个元素




39.19-39.20

then you also need this hash 

那么你也就需要这个hash值

39.20-39.22

assuming that you have the signed tree head

假设，你拥有这个signed tree head

39.22-39.27

 so you can take the element you know  and hash it together with each of these other hashes 

So，你可以去拿那个你知道的元素，对它hash，并将该hash值和其他的hash值放在一起进行hash处理

39.27-39.29

see if it's equal to the signed tree head 

并检查最终的值是否等于signed tree head的值

39.29-39.32

okay 




39.32-39.38

so if the browser asks is supposing the browser asks whether X is in the log at position zero

So，假设浏览器询问x是否在日志中位置0的地方

39.38-39.40

 well X isn't in the log right

Well，x其实不在该日志中

39.40-39.47

 so hopefully there's no easy way for the log server to produce the proof that X is in the log in position zero

So，所幸，对于日志服务器来说，要生成关于x位于日志中位置0的相关证据并不容易

39.47-39.50

 but suppose the log servers wants to lie and

但假设日志服务器想要说谎

39.50-39.57

it's in the position where it already exposed a signed tree head for log that contain a and then B 

目前的情况是，它已经将包含a和b这两个证书的日志的相关signed tree head对外暴露了

39.57-40.01

browser doesn't know was a and B doesn't know what's in the log

浏览器不知道a和b是什么，也不知道这个日志中有哪些东西



四十九  阅举报
18-03



40.01-40.10

 and the log server wants to trick the client into the browser into thinking that it's really X at position zero

日志服务器想诱使浏览器认为日志位置0的地方就是x

40.10-40.12

 well it turns out that

Well，事实证明

40.12-40.13

in order to do that

为了做到这一点

40.13-40.18

the for this small log

对于这个内容较小的日志来说

40.18-40.25

 the certificate server has to produce

证书服务器得去生成。。。




40.25-40.33

 for some y it needs to find a y

这里我们需要去找y

40.33-40.43

that if it takes it's hash one concatenated with X you know so this is that's that it's equal to the signed tree head right 

假设H(H(x), H(y))的值等于signed tree head的值



40.43-40.46

because the client we're assuming the client already has to signed tree head

假设client已经拿到这个signed tree head

40.46-40.55

 we need to find a some number here that when hashed together with the hash of X that the clients asking about produces that same signed tree head

我们需要找到某个数字，当我们用它和H(x)一起进行hash处理的时候，它们的结果和client所要的signed tree head是相同的



40.55-41.00

well we know the signed tree head or the assumption is the signed tree head was actually for some other log right

Well，假设，这个signed tree head实际上对应的是其他某个日志

41.00-41.01

because we're trying to rule out the possibility 

因为我们正试着排除像这样一种情况，

41.01-41.10

that the log server can give you a signed tree head for one log but that convince you that something else is in that log that's not there

即该日志服务器给了你某个日志的一个signed tree head，并说服你该日志中存在着某个证书，但实际并不存在




41.10-41.18

 so the signed tree head really was produced by from the hashes of the records that really were in the log 

So，我们是通过那些存在于该日志中的记录的hash值来生成这个signed tree head

41.22-41.25

and now we need and since you know X is definitely different from a

因为你知道的，x肯定和a是不同的东西

41.25-41.25

that means

这意味着

41.25-41.27

 the hash of X is different from the hash of a

H(x)的结果和H(a)也是不同的

41.27-41.28

 and that means that

这意味着




41.28-41.37

the log server needs to find two different inputs to the hash function that produced the same output 

日志服务器需要找到两个不同的输入元素，并传给hash函数，以此来生成相同的输出结果

41.37-41.46

and the Assumption widely believed to be true for practical purposes is that  that's not possible for cryptographic hashes

人们认为，从实际出发，对于加密hash来说，是不可能生成相同输出结果的

41.46-41.53

therefore the signed tree head was produced by hashing up one log

因此，我们通过对一个日志进行hash处理来得到signed tree head

41.53-42.03

that it will not be possible to find these sort of other hash values that would be required to produce a proof 

我们不可能找到产生该相同证明所需的其他hash值

42.03-42.07

that some other element was in the log that wasn't really there

该证明表示其他元素存在于该日志中，但实际这些元素并不存在于这些日志中

42.07-42.11

any questions about this about anything

你们有任何问题吗？

42.12-42.20

interesting

有趣的是

42.20-42.21

 a nice thing about this is

对此，一件很nice的事情是




42.21-42.28

the proofs consist of just the sort of other hashes on the way up to the root

这些证据中包含了从底部到根节点处的其他hash值

42.28-42.30

 if there's n certificates

如果这里面有n个证书

42.30-42.33

there's only log(n) other hashes 

那么其他hash值的数量就是log(n)

42.33-42.36

and so the proofs are reasonably concise

So，这些证据真的很整洁

42.36-42.38

 in particular that are much much smaller than the full log 

特别是，比起完整的日志来说，这要小得多

42.38-42.41

and since you know every browser that needs to connect to a website 

因为对于每个需要连接到一个网站的浏览器来说

42.41-42.43

it's going to need one of these proofs

它就会需要其中一项证据

42.43-42.46

 it's good if they're small

如果它们的体积很小的话，那么就很棒

42.46-42.49

okay 



42.49-43.04

well this was whole discussion was assuming that the sign tree head the the browser had was the correct signed tree head

Well，在这场讨论中，我们假设浏览器所拿着的这个signed tree head是正确的signed tree head

43.04-43.10

if the but no there's no immediate reason to believe that the log server would have given

我们没有直接的理由去相信该日志服务器所给出的是正确的signed tree head

43.10-43.11

 if the log server is malicious

如果该日志服务器是恶意的

43.11-43.12

and it wants to trick a client

它想去欺骗client

43.12-43.16

 you know why would it give the client the correct signed tree head

你知道的，为什么它要给client提供正确的signed tree head呢？

43.16-43.22

 why doesn't it give it just me giving the signed tree head for the bogus log that it wants to trick the client into using 

为什么它不提供给client，它想诱使client去使用伪造日志中的signed tree head呢？

43.22-43.25

so we have to be prepared for the possibility

So，我们得对这种可能性做好准备

43.25-43.31

that the log server has cooked up I just completely different log for the browser that's not like anybody else's log 

即日志服务器将一份和其他人完全不同的日志提供给了浏览器

43.31-43.33

and it just contains the bogus certificates

该日志中包含了伪造的证书

43.33-43.39

that a malicious log server wants to trick this client into believing

这个恶意的日志服务器想诱使client去相信并使用该证书

43.39-43.44

so what do we do about that

So，我们该如何解决呢？

43.44-43.48

 well it turns out that

Well，事实证明

43.48-43.51

 this is at least in the first instance

至少在第一个例子中

43.51-43.52

 this is totally possible

这种情况是完全可能的

43.52-43.56

you know usually what's gonna happen

通常会发生什么呢

43.56-43.58

usually the way this will play out is

通常情况是

43.58-43.59

that we'd have some browser 

我们使用着某个浏览器

43.59-44.03

that was you know seeing the correct logs 

它所看到的是正确的日志

44.03-44.04

until some point in time

直到某个时间点

44.04-44.06

when somebody wanted to attack it 

当有人想去攻击它的时候

44.06-44.24

and you know you want the browser student be able to use all the websites that it's ordinarily seeing plus a sort of different log with bogus certificates  that the log server wants to trick just that client just that victim browser into using

你希望浏览器能够使用它平常所访问的那些网站，再加上使用日志服务器想欺骗该浏览器的一份包含伪造证书的不同日志

你想要浏览器中访问那些它平常使用的那些网站时，看到的一份别样的伪造的日志，即日志服务器想用它来欺骗该浏览器




44.24-44.27

 so now this is a fork attack

So，这就是fork攻击




44.27-44.34

 or more broadly equivocation

或者，更为宽泛的讲，就是equivocation（歧义攻击）

44.34-44.39

 and the reason why people call this kind of attack

人们之所以将这种攻击叫做fork攻击或者equivocation（歧义攻击）的原因是

44.39-44.41

a fork attack is that

fork攻击指的是

44.41-44.42

 if we just never mind the Merkle tree for a moment

如果我们就一会儿没看这个Merkle tree

44.43-44.48

 if we just consider the log usually the log already has you know millions of certificates in it 

通常该日志中就会包含上百万个证书




44.48-44.52

and everybody's seen the beginning part of the log

所有人都看到了该日志的起始部分

44.52-44.53

 then at some point in time

那么在某一时刻

44.53-45.03

 we want to attack we want to persuade our victim to use some bogus certificate B 

我们想去进行攻击，我们想说服我们的受害者（浏览器）去使用这个伪造的证书B

45.03-45.06

but we don't want to show B to anybody else certainly not to the monitor

但我们不想将证书B向其他人展示，特别是监视器

45.06-45.12

so we're gonna sort of cook up this other log the sort of continues as usual and contains new submissions

So，我们会制作另一份日志，它长得和平常的日志一样，其中包含了一些新的提交



45.12-45.15

but definitely doesn't contain the bogus certificate B

但这里面并不包含伪造的证书B




45.15-45.19

 and you know what this looks like is a fork 

你知道的，这看起来就像是一个叉子

45.19-45.26

because both the sort of main log that monitors are shown is kind of off on one fork 

因为这看起来就像是从一把叉子（主日志）上分出的分支

45.26-45.31

and then this log we're cooking up especially to trick a victim is a different fork

然后，我们构建了一个用来欺骗受害者的不同日志分支

45.31-45.39

this is the construction that the malicious log server would have to produce if it wants to trick a browser into using a bogus certificate

如果那些恶意的日志服务器想诱使浏览器使用一个伪造的证书，那么这就是它得去生成的一种结构

45.39-45.43

 and again these are possible

再说一遍，这些是可能发生的

45.43-45.49

 it's possible to do this at least briefly in with certificate authority

至少对于证书颁发机构来说，他们是有可能做到这点的

45.49-45.55

 the certificate transparency luckily though is not the end of the story

幸运的是，certificate transparency并不是该问题的最终解决方案

45.55-46.02

 and certificate authority contains some tools that allow it to make Forks much more difficult

证书颁发机构通过一些工具来让fork攻击实施起来更得更为艰难

46.02-46.08

 so the basic scheme is that 

So，基本方案是

46.08-46.20

this isn't this is the way the certificate authority sort of intended to work all certificate transparency is intended to work but doesn't quite

这就是certificate transparency的工作方式，但也不完全是这样

46.20-46.22

what's going on here is that

这里所发生的事情是

46.22-46.32

the monitors and people are not being attacked or gonna see a a sign tree particular signed tree head 

那些没遭受攻击的监视器和用户看到了某个特定的signed tree head




46.32-46.33

let's say  signed tree head  1

我们将它叫做STH1

46.33-46.36

of course is gonna change as the log extends

Of course，随着日志内容的增加，它也会发生改变

46.36-46.40

 and the victim we know must see some other signed tree head 

我们知道，受害者必然也会看到一些其他的signed tree head




46.40-46.42

because this is a signed tree head

这是STH2

46.42-46.45

that is hashed over this bogus certificates

这是基于证书B进行hash处理所得到的

46.45-46.51

 guaranteed to be different from the signed tree heads this is the malicious server showing to monitors

这保证了该恶意服务器所生成的STH2和展示给监视器的STH1并不相同

46.51-46.55

if only the browsers and monitors could compare notes

只有当浏览器和监视器能够比较它们所拿到的内容时

46.55-46.59

 they would maybe instantly realize that they were seeing different trees 

那么，它们就可能意识到它们所看到的是不同的Merkle tree

46.59-47.02

and all it takes is comparing you know if we play our cards right

它所做的就是进行比较，你知道的，以我们打牌为例

47.02-47.07

 all it takes is comparing the sign tree head its they've gotten from the log server

它所做就是对我们从日志服务器处拿到的STH进行比较

47.07-47.08

 to realize wait a minute

它会意识到，稍等一下

47.08-47.09

 we're seeing different logs 

我们看到了不同的日志

47.09-47.11

now something's terribly wrong 

现在，这里面出现了大问题

47.11-47.16

so the critical thing we need to do is

So，我们所要做的关键事情就是

47.16-47.23

have the different participants in the system be able to compare signed tree heads

让系统中这些不同的参与者能够比较他们所拿到的signed tree head

47.23-47.28

and the certificate transparency has a provision for this called gossip 

对此，certificate transparency中有一个叫做gossip的规定




47.28-47.31

and the way it's intended to works

它的工作方式是

47.31-47.35

 that browsers well the details don't really matter 

Well，具体细节是什么并不重要

47.35-47.37

but what it really amounts to is that 

但它的意义在于

47.37-47.43

all the participants sort of drop off the recent signed tree heads they've seen into a big pool

所有的参与者会将它们最近看到的signed tree head丢进这个pool中

47.43-47.51

 that they all inspect to try to figure out if there's inconsistent sign tree heads

它们会试着去弄清楚这里面是否存在不一致的signed tree head

47.51-47.55

 that clearly indicate divergent logs that have forked

这就能很清楚地指出日志中存在着分支



47.55-47.57

so we're going to gossip which really means

So，这里的gossip意味着




47.57-48.05

exchange signed tree heads  and compare

我们要交换signed tree head，并对它们进行比较

48.05-48.07

 it turns out that

事实证明

48.07-48.12

 current certificate transparency implementations don't do this

当下的certificate transparency实现并没有做这一点

48.12-48.14

 but they ought to 

但它们应该去做这种事情

48.14-48.17

and they'll figure it out at some point

它们以后会在某个时刻解决这个问题

48.17-48.18

all right

=================================================================

48.18-48.20

okay 



48.20-48.21

so the question is

So，这里的问题是

48.21-48.22

given to signed tree heads

对于这里给出的2个signed tree head来说




48.22-48.28

 how do we decide if they're evidence that the log has been forked

如果有证据表明，该日志出现了分支，那我们该如何选择使用哪个分支呢？

48.28-48.33

 the thing that makes this hard is that 

让我们产生选择困难的地方在于

48.33-48.35

even if a log hasn't been forked 

即使该日志并没有出现分支

48.35-48.42

as it's depended to new signed tree heads will become current

当某个新的signed tree head变成当前分支的时候

48.42-48.45

so you know maybe signed tree head one was the legitimate

So，你知道的，这个STH1可能是合法的

48.45-48.49

signed tree head has a log at this point， then some more certificates are added 

此时该日志的STH是STH1，接着又有更多的证书被添加到该日志中

48.49-48.54

and signed tree head 3 becomes the correct head of the log

那么，STH3就成为了该日志的正确STH




48.54-48.58

 and then signed tree head 4 etc

接着，STH4，以此类推

48.58-49.04

so really what this gossip comparison needs to do is 

So，这种gossip comparison所需要做的事情是

49.04-49.05

distinguish situations 

区分这些情况

49.05-49.12

where one signed tree head is really describes a prefix a log that's a prefix of the log described by another signed tree head 

即某个signed tree head描述的是另一个signed tree head所描述日志的前缀



在描述一个日志的时候，STH1作为另一个STH的前缀（比如STH3的前缀就是STH1）

49.12-49.14

because this is the legitimate situation

因为这是一种合法的情况

49.14-49.17

 where you have these two signed tree heads are different 

即你拥有的这两个signed tree head是不同的

49.18-49.21

but the second one really does subsume the first one 

但第二个STH确实包含了STH1

49.21-49.30

we want to distinguish that from two signed tree as that are different where neither describes a log that's a prefix of the other one's log 

我们想将这两个signed tree head区分开来，因为这两个signed tree head是不同的，它们两个没有一个是描述对方日志前缀的（即没有包含关系）

49.30-49.45

tell these two cases apart， this telling that situation apart is the purpose of the consistency proof

接下来要说的部分就是一致性证明



49.45-49.49

the log or Merkle consistency proof that the reading is talked about 

之前讨论过的日志或Merkle一致性证明




49.49-49.55

so this is the log consistency proof

So，这就是log consistency proof（日志一致性证明）




50.07-  50.09

so the game here is that we're given 2 signed tree heads

So，这里的情况是，这里我们有2个signed tree head

50.09-50.11

 H 1 and H 2 

即H1和H2




50.11-50.15

and we're asking 

我们要问的是

50.15-50.35 ！！！！！

is H1‘s log prefix really it's not these are - these are hashes so it's really asking about the log that the hashes represent 

H1的日志是否是H2所代表日志的前缀（知秋注：即H2由H1发育而来）

50.35-50.39

and you know we're hoping the answer is yes 

你知道，我们所希望的答案是Yes

50.39-50.41

and if the answer's no 

如果答案是No

50.41-50.41

that means that

这意味着

50.41-50.45

the log servers forked us is hiding something from one party or the other 

日志服务器对我们使用了分支攻击，并对一方或者另一方隐瞒了信息

50.46-50.50

okay 



50.50-50.51

well it turns out that

Well，事实证明

50.51-50.54

 um as we as I mentioned before

正如我之前提到的

50.54-50.58

 the as the Merkel tree as the log grows

随着日志内容的增加

50.58-50.59

the Merkel tree also grows 

Merkle tree也会变大

50.59-51.04

and what we see is a sequence of signs of tree heads 

我们所看到的是一连串signed tree head

51.04-51.12

each one as a log doubles in size

因为日志的内容是成倍增长的

51.12-51.16

 each one has its as its left thing

每个signed tree head都有左边一部分东西




51.16-51.18

let me draw in the actual hash functions

让我来画个hash函数

51.18-51.21

this hash function is hashing up two things

这个hash函数要接收两个元素来进行hash处理

51.21-51.28

 the result of this hash function is one of the inputs to the next signed tree head

该hash函数的结果就是计算下一个signed tree head所需的其中一个输入元素








51.28-51.32

the result of this hash function is one of the inputs to the next signed tree head 

该hash函数的结果就是计算下一个signed tree head所需的其中一个输入元素

51.32-51.42

I know we get this kind of tree of signed tree heads all

我们就得到了这种带有signed tree head的树

51.42-51.43

right 



51.43-51.46

and any to signed tree heads if they're legitimate 

对于那些合法的signed tree head来说

51.47-51.49

you know if H1's log is a prefix of H2

你知道的，如果H1的日志是H2的前缀




51.49-51.52

 that means that maybe this one's H 1 and this one's H 2 

那么这意味着，下面这个可能是H1，顶部这个可能是H2

51.52-51.53

and they're gonna have this relationship

它们就会拥有这种关系

51.53-51.56

 thing you know if H1 is a prefix of H 2

如果H1是H2的前缀

51.56-51.59

then they must have this relationship

那么，它们就必须得存在这种关系

51.59-52.01

 where H2 was produced by taking H1 hashing it with some other thing 

即我们通过让H1和其他元素一起进行hash处理，以此来生成H2

52.01-52.08

and maybe hashing that with some other thing until we get to the point where we find H 2 

它可能得和其他东西一起进行hash处理，直到我们得到H2为止

52.08-52.11

and what that means is that 

这意味着

52.11-52.24

if a browser or monitor challenges a log server to prove that H1's log is really a prefix of h2s log

如果浏览器或监视器向日志服务器发起挑战请求，要求它证明H1的日志是H2日志的前缀

52.24-52.28

 what the log server has to produce is 

日志服务器得生成的东西是

52.28-52.58

this sequence of the other side of each of the signed tree head hashes on the way from h1 to h2

从H1到H2这一路上另一侧的signed head tree的所有hash值




52.39-52.41

and this is the proof 

这就是证据

52.41-52.48

and then again you know this is reminiscent of the inclusion proofs

这让人想起了inclusion proof（包含证明）

52.48-52.49

then to check the proof 

接着，我们要来对该证明进行检测

52.49-52.55

you need to take H1 hash it with the first other thing 

我们需要先将H1和它同层的另一个元素一起进行hash处理

52.55-52.58

you know hash that along with the second other things 

然后，再将该结果和下一层的另一侧元素一起进行hash处理

52.58-53.00

that you get to the last one of these 

然后，我们就得到了最终结果

53.00-53.03

and that had better be equal to h2

我们希望它的值最好等于H2

53.02-53.03

 if it is

如果它等于H2的值

53.03-53.10

it's a proof that h2 is a suffix of H1

那么这就证明了H2是H1的后缀

53.10-53.15

 otherwise the log servers evidently tried to fork you

否则，该日志服务器显然是想让你去使用其他分支

53.15-53.20

 and again you know the basis of this is that 

你知道的，这样做的基础是

53.20-53.29

there's no other you know h2 really isn't as supposing h1 isn't a prefix of h2 

假设H1并不是H2的前缀

53.29-53.35

there's no way that uh since h2 was created from some actual log

因为我们是通过其他日志创建出H2的

53.35-53.36

 that's not the same as h1

该日志的内容和H1并不相同




53.36-53.48

there's no way that the log server could cook up these values that are required to cause the hashes this sort of repeated hash of h1 to equal H2

日志服务器没有办法去创建出那些满足H1是H2前缀这个条件的值



53.48-53.50

H2 really come from here

即以此来证明H2确实是来源于H1的

53.50-53.58

because we assuming that the cryptographic hash does prevent you from binding 2 different inputs that produce the same out

因为我们假设，如果你往加密hash函数中分别传入两个不同的输入元素时，该函数保证这两个输入元素所生成对应的结果不会相同

因为我们假设，该加密hash方案会阻止你让两个不同的输入元素产生相同的输出结果



53.58-54.03

all right



54.03-54.05

ok



54.05-54.07

so this is the log consistency proof 

So，这就是log consistency proof（日志一致性证明）

54.07-54.12

okay 



54.12-54.13

so the question is

So，这里的问题是

54.13-54.14

who usually challenges the log server

通常是谁向日志服务器发起挑战请求

54.15-54.16

so I'll actually talk about that in a minute

So，实际上我稍后会讲一下它

54.16-54.17

 but it turns out that 

但事实证明

54.17-54.30

um both browsers and monitors well both browsers and monitors challenge the log server

Well，浏览器和监视器都会向日志服务器发起挑战请求

54.30-54.33

actually usually the browser's challenging the log server

实际上，通常是浏览器向日志服务器发起挑战请求

54.33-54.34

that's the most important thing 

这是最重要的事情

54.34-54.38

but there's two points in time at which you need to challenge the log server to produce these proofs

但你需要在两个时间点向日志服务器发起挑战请求，以此来生成这些证据

54.38-54.41

 and I'll talk about both of them

这两个我都会讨论

54.41-54.47

 all right



54.57-54.59

okay actually

Ok，实际上

54.59-55.10

 so the first place at which one point at which these proofs are used as for gossip as part of gossip as I outlined 

正如我之前概述的那样，这些证据被当作是Gossip的一部分来使用



55.11-55.13

and the the scheme that's intended for gossip is that

Gossip中所用的方案是

55.13-55.20

 browsers will periodically talk to some central repository of some set of central repositories

浏览器会和某些中央仓库定期进行通信

55.20-55.25

and just contribute to a pool of signed tree heads

并将数据共享给signed tree head pool中

55.25-55.29

 the sign tree heads the recently seen from the log server

该pool中的signed tree head是它们最近在日志服务器中所见到的

55.29-55.36

 and the browsers were also periodically pull out random elements of signed tree heads that other browsers have seen 

浏览器也会从其他浏览器已经见过的signed tree head中随机拉取一些出来

55.36-55.38

just randomly they pulled them out of the pool 

它们会从pool中随机拉一些signed tree head出来



55.38-55.42

and it'll be multiple of these collects these pools run by different people

它们会从由不同人运营的这些pool中收集这些signed tree head

55.42-55.43

 so that

这样的话

55.43-55.44

if one of them is cheating 

如果其中一个pool中存在着欺骗行为

55.44-55.47！！！

that will be proof against that

那么，这就有证据可证明这一点

55.47-55.55

 and then the browser will for whatever just any random sign tree has it pulls out of the pool 

不管它从pool中随机拉取的signed tree head是什么

55.55-56.01

it will ask the log server to produce the logs consistency proof for that pair of signed tree heads 

它都会要求日志服务器去生成这对signed tree head的相关log consistency proof



56.02-56.05

and you know if nobody's cheating

你知道的，如果没人欺骗的话

56.05-56.13

it should always be easy for the log server to produce you know any consistency proof that's demanded of it 

那么对于日志服务器来说，生成你所需要的任意一致性证据还是很容易的

56.13-56.16

but if it's fork somebody

但如果它想让某人使用某个分支

56.16-56.19

 suppose it the log server is fork somebody and given them a signed tree head

假设日志服务器想让某人使用某个分支，并且给了他们一个signed tree head

56.19-56.21

this really describes a totally different log

该signed tree head描述的是一个完全不同的日志

56.21-56.26

 or even a log the difference in one element from the logs that everybody else is seeing 

或者描述的日志中只有一处地方和其他人所看到的日志不同



56.26-56.33

eventually that browser will contribute that signed tree head to the pool the gossip pool 

浏览器最终会将这个signed tree head提交给Gossip Pool





56.34-56.38

then eventually somebody else will pull that signed tree head out of the pool 

那么最终其他人会从这个pool中拉取这个signed tree head

56.38-56.44

and ask for a proof for you know some other signed tree head that presumably is on a different fork 

并要求日志服务器去提供一些signed tree head可能在一个不同分支上的证据

56.44-56.48

and then the log server will not be able to produce the proof

接着，日志服务器无法产生该证据

56.48-56.52

 and since they're signed  since the signed tree head signed by the log server 

因为signed tree head是由日志服务器所签名的

56.52-57.00

that's just absolute proof that the log server has forked two of its clients 

这就是日志服务器向它的client提供分支的铁证

57.00-57.07

presumably with intent reveal a bogus certificate to one of them 

估计是向其中一个人展示了伪造的证书

57.05-57.07

and hide it from the other 

并对其他client隐瞒这件事

57.07-57.09

okay 



57.09-57.15

but there's actually another place where it turns out you need the these consistency proofs

但事实证明，实际你在另一处地方也需要这些一致性证明

57.15-57.18

 not just during gossip

除了在gossip的时候

57.18-57.21

but actually also during the ordinary operation of the browsers 

实际上，在浏览器执行常规操作的时候，也需要这些证明





57.27-57.30

so the difficulty is that

So，这里的难点在于

57.30-57.37

 suppose you know suppose the browser is it's kind of seeing consistent version of the log is the same as everybody else 

假设浏览器所看到的日志版本与其他人所看到的相同






57.37-57.47

but then log server wants to trick it into using this bogus certificate

但之后日志服务器想诱使浏览器去使用这个伪造的证书

57.47-57.54

so the log server sends it a signed tree you know makes signed tree that's different from everybody else

So，该日志服务器发送了一个和其他人所看到的signed tree head所不同的signed tree head给浏览器

57.54-57.59

 that refers to a you know malicious log that contains this bad certificate preferred video

你知道的，这个恶意的日志中包含了这个恶意证书

57.59-58.01

 since it doesn't want other people to notice

因为它不想让其他人注意到这一点

58.01-58.04

certainly doesn't want you know the monitors to notice 

它不想让监视器注意到这点

58.04-58.08

you know cooks up this other log that is what everybody else is seeing 

它会制作另一份日志展示给其他人看



58.08-58.10

all right 



58.10-58.18

so now the you know the browser checks and sees you know I asked for inclusion proof 

So，你知道的，浏览器会去检查它所要的这个包含证明

58.18-58.21

and the inclusion that log server will be able to produce the inclusion proof

日志服务器能够生成这个包含证明




58.21-58.25

because this sign tree head that the browser has really does refer to this bad log

因为浏览器拿着的这个signed tree head引用了这个恶意日志中的内容

58.25-58.28

the browser will go ahead and use this bogus certificate 

浏览器会继续使用这个伪造的证书

58.28-58.31

and maybe get tricked and give away the user's password

它可能会被诱导，并泄露用户密码

58.31-58.34

you know who knows what

谁知道这具体会发生什么呢

58.34-58.38

 but depending on the details of other browsers work

取决于其他浏览器工作方式上的细节

58.38-58.44

 we're at risk of the next time the browser which it doesn't realize anything's gone wrong talks to the log server

我们会面临这样的风险，即当浏览器下次和日志服务器通信的时候，它不会意识到有哪些东西出现了问题

58.44-58.48

 the log server might then say you know there's a new log with a bunch of new stuff on it

日志服务器接着可能会说，这里有一份新的日志，上面有许多新的内容




58.48-58.51

and here is the sign tree head of the current log 

这是当前日志的signed tree head

58.51-58.51

why don't you switch my to use that as your sign tree head

为什么你不切换到这个signed tree head上呢？

58.51-58.59

and so now if that were allowed to happen

So，如果我们允许这种情况发生的话

58.59-59.03

 then the browser's now would completely lost the evidence that anything went wrong 

那么，浏览器现在就会丢失这个可以使事情出问题的证据

59.03-59.06

because now the browser is using the same trees everybody else 

因为现在浏览器所使用的tree和其他人一样

59.06-59.10

it's going to contribute this signed tree head to the gossip pool

它就会将这个signed tree head提交给这个gossip pool

59.10-59.11

 it's all gonna look good 

这一切看起来都没啥问题

59.11-59.19

and we had this sort of brief evil tree that was evil log that was revealed evil log Fork

我们所拿着的就是这种恶意的日志，向人展示的这种恶意的日志分支

59.19-59.22

 but if the browser's are willing to accept a new signed tree head

但如果浏览器此时能再接受一个新的signed tree head

59.22-59.32

then we can basically have the browser forget about 

简单来说，那么我们就可以让浏览器忘记这个恶意分支

59.28-59.32

so we want what we want is this what we want is 

So，我们想要的是

59.53-59.40

if the log server shows a particular log to the browser

如果该日志服务器向浏览器展示了一份特定的日志



五十六  阅举报
18-04
59.40-59.45

they can't trick the browser into switching away from that log 

它们无法欺骗这个浏览器切换到其他日志分支上

59.45-59.54

that we want to be able to enforce that the browser sees only strict extensions to the log that it's seen already

我们想能够强制让浏览器只看到它已经看到的这份日志的扩展内容




59.55-1.00.01

and doesn't simply get switched to a log that is not compatible with the log the browser seen before

而不是简单地让它切换到一个和浏览器之前看到的日志所不兼容的分支

1.00.01-1.00.05

 it's the property that we're looking for it's actually called fork consistency 

我们所看的这种特性实际上叫做fork consistency




1.00.09-1.00.13

and what means with that forks to is that

它的意思指的是

1.00.13-1.00.17

 if the browser's been forked onto a different fork from other people 

如果浏览器已经使用了一个和其他人不同的日志分支

1.00.17-1.00.20

then they must stay on that fork in it

那么，它们必须呆在该分支上

1.00.20-1.00.24

 it should never be able to switch to the main fork 

它应当永远不能切换到主分支上面

1.00.24-1.00.25

and the reason for that is

这样做的理由是

1.00.25-1.00.32

 we want to preserve you need to preserve this bad sign tree head and its successors

你需要去保留这个不好的signed tree head以及它的后续内容

1.00.32-1.00.32

 so that

这样的话

1.00.32-1.00.35

when the browser participates in the gossip protocol

当浏览器参与这个gossip协议时

1.00.35-1.00.42

 it's contributing sign tree heads that nobody else has

它就会将这个其他人所没有的signed tree head贡献出来

1.00.42-1.00.47？？？？

 and that cannot be proved to be compatible using the log consistency proof 

我们也就可以通过日志一致性证明来证明这个signed tree head是无法兼容的

1.00.47-1.00.47

okay 



1.00.47-1.00.49

so how do we achieve fork consistency

So，我们如何才能做到fork consistency呢？

1.00.49-1.00.53

 well um it's actually easy with the tools we have now 

Well，实际上，我们通过工具可以很容易做到这点

1.00.53-1.00.59

every time the log server tells a browser oh here's a new sign tree head for a longer log

每当日志服务器告诉浏览器，这里有一个新的signed tree head，它是关于某个长度更长的日志的

1.00.59-1.01.09

the browser will require the will not accept the new sign tree head until the log server has produced a log consistency proof

直到日志服务器已经生成了一份日志一致性证明，那么浏览器才会去接受这个新的signed tree head

1.01.09-1.01.16

 that the new sign tree head describes a suffix of the old sign tree head

这个新的signed tree head描述的是这个老的sign tree head中的一个后缀

1.01.16-1.01.20

 that is that the log of the old signed tree head has a prefix of the log of the new sign tree head

这个老的signed tree head所对应的日志中属于这个新的signed tree head所对应的日志前缀之一

1.01.20-1.01.21

and of course



1.01.21-1.01.24

if a log server is as forked the browser

如果日志服务器已经生成了分支

1.01.24-1.01.25

 and it's keeping the browser on that same Fork

并且它让该浏览器一直呆在同一个分支上

1.01.25-1.01.27

 it can produce the proofs

那么它就可以生成这些证据

1.01.27-1.01.28

 but of course

Of course

1.01.28-1.01.31

you know it's digging its grave even deeper

你知道的，它这样会把它的坟墓越挖越深

1.01.31-1.01.38

because I'm as producing more and more sign tree heads for a which will eventually be caught by the gossip protocol 

因为随着我生成的signed tree head的数量越来越多，最终这会被gossip协议所捕获



1.01.38-1.01.49

whereas if the log server tries to cause the browser to switch to a sign tree head that describes the same log everybody else has been seeing

如果该日志服务器试着让浏览器切换到一个signed tree head，它描述的日志和别人看到的是同一份日志

1.01.49-1.01.50

 the browser will demand a consistency proof

浏览器就会要求日志服务器提供一致性证明

1.01.50-1.01.53

and the log server will not be able to produce it

日志服务器没办法生成它

1.01.53-1.02.01

 because indeed the log described by the first sign tree head is not a prefix of the log described by the second sign tree head

因为第一个signed tree head所描述的日志并不是第二个signed tree head所描述日志的前缀

1.02.01-1.02.10

okay 



1.02.10-1.02.14

so the system these these log consistency proofs provide for consistency 

So，该系统为fork consistency提供了这些日志一致性证明

1.02.14-1.02.18

and fork consistency plus gossiping 

fork consistency加上gossip

1.02.18-1.02.24

and that requiring this log consistency proofs for the signed tree head found by gossiping

以及通过gossip来发现这个signed tree head所对应的日志一致性证明

1.02.24-1.02.32

 the two of them together make it likely that all the participants all seeing the same log

这两者放在一起能让所有的参与者都看到相同的日志

1.02.32-1.02.34

 and that if they're not seeing the same log 

如果它们没有看到相同的日志内容

1.02.34-1.02.40

they'll be able to detect that fact by the failure of a log consistency proof

只要日志一致性证明生成失败，那么它们就能检测出这个事实



1.02.40-1.02.46

any questions

有任何疑问吗？

1.02.46-1.02.54

okay 



1.02.54-1.02.58

so that how many log servers are there 

So，日志服务器的数量有多少呢？

1.02.58-1.02.59

that is a great question

这是一个很棒的问题

1.02.59-1.03.03

so I describe the system as if there was just one log server 

So，这里我所描述的系统中，这里面只有一个日志服务器

1.03.03-1.03.04

it turns out in the real system

事实证明，在真正的系统中

1.03.04-1.03.06

 there's lots of log servers

存在着很多日志服务器

1.03.06-1.03.06

at least dozens 

至少十几个

1.03.06-1.03.09

so this is a deployed system which you can programmed

So，你可以编写出这种可部署的系统

1.03.09-1.03.13

 in that is actually used by Chrome and I think Safari 

实际上，我觉得Chrome和Safari就有使用这种系统

1.03.13-1.03.17

there are at least dozens of these log servers 

它们至少有数十个日志服务器

1.03.17-1.03.27

and when certificate authorities are actually required by chrome to submit all their certificates  to the log servers to multiple log servers

 实际上，Chrome会要求这些证书机构将他们所有的证书添加到多个日志服务器中

1.03.27-1.03.31！！！！

 the different log servers don't actually keep identical logs 

实际上，不同的日志服务器不会去保存相同的日志

1.03.31-1.03.32

the convention is that 

按照惯例

1.03.32-1.03.39

a certificate authority will submit a new certificate to save you know a couple maybe five different log servers

一个证书机构可能会将一份新证书保存到五个不同的日志服务器上

1.03.39-1.03.46

 and actually in the certificate information that a website tells your browser

实际上在该网站所告诉你浏览器的证书信息中



1.03.46-1.03.55

it includes the identities of log servers of the certificate transparency log servers that have the certificate in their log

它里面包含了certificate transparency日志服务器的身份标识，它们的日志中保存着这个证书

1.03.55-1.03.58

 so your browser knows which log servers to talk to

So，你的浏览器也就知道它和哪些日志服务器进行通信了

1.03.58-1.04.03

 and the reason why there's more than one of them is

为什么有多个日志服务器的原因是

1.04.03-1.04.03

 of course 



1.04.03-1.04.04

some of them may go bad 

其中部分日志服务器可能会变坏

1.04.04-1.04.08

some of them may turn out to be malicious or go out of business  or who knows what

其中部分日志服务器可能会变成恶意日志服务器或者出现故障

1.04.08-1.04.09

 and in that case

在这种情况下

1.04.09-1.04.15

 you still want to have a couple more to fall back on

你想多来两个可以依靠的日志服务器

1.04.15-1.04.16

 they don't have to be identical 

它们不需要是相同的

1.04.16-1.04.18

because they don't

因为它们就不是相同的

1.04.18-1.04.25！！！

 as long as the certificate is in at least one log that's you know as far as anybody knows is trustworthy 

只要该证书至少在一个日志中，并且所有人都知道该日志是可信的

1.04.25-1.04.26

that's sufficient

这就足够了

1.04.26-1.04.37

because you know the issue here not really necessarily the fact that the log had the certificate in it 

你知道的，因为这里的问题并不在于该日志中是否一定包含该证书

1.04.37-1.04.41

because that's not proof that the certificate is good

因为这无法证明该证书是正确的

1.04.41-1.04.43

 all we're looking for is 

我们想要找的证据是

1.04.43-1.04.49

log servers that aren't forking the monitors and browsers that use them

日志服务器并没有提供日志分支给监视器和浏览器使用

1.04.49-1.04.57

 so it's enough for a certificate to be in even a single log server that's not forking people 

So，即使将一个证书放在没有给人们提供日志分支的单台日志服务器上，这也就足够了

1.04.57-1.05.00

because then the monitors are guaranteed to see it

因为这就保证了监视器之后会看到它

1.05.00-1.05.04

 because the monitors check all the log servers 

因为监视器会去检查所有的日志服务器

1.05.04-1.05.07

so if a bogus certificate shows up even even a single log server 

So，即使这个伪造的证书只在一台日志服务器上出现

1.05.07-1.05.09

the monitors will eventually notice

监视器最终也会注意到它



1.05.09-1.05.17

 because all the monitors look at all the log servers that the browsers are willing to accept

因为所有监视器都会去查看浏览器愿意接受的所有日志服务器

1.05.17-1.05.19

all right 



1.05.19-1.05.20

another question

另一个问题是

1.05.20-1.05.29

 what prevents a log server from going down and issuing bogus certificates before they get caught

如何防止在日志服务器崩溃期间，在被人抓住线索之前，有人颁发了伪造的证书

1.05.29-1.05.30

 you know nothing actually

你知道的，实际上没有任何办法

1.05.30-1.05.35

if you're willing to that's definitely a defect in the system

这绝对是该系统中的一个缺陷

1.05.35-1.05.37

 that at least for a while 

至少在有一段时间内

1.05.37-1.05.44

malicious log server can trick browsers into accepting bogus certificates 

那些恶意的证书服务器可以去欺骗浏览器接受那些伪造的证书

1.05.44-1.05.48

so if you have a certificate authority that's become malicious 

So，如果你使用的一个证书机构变成恶意证书机构

1.05.48-1.05.50

and this issuing bogus certificates 

它颁发了一些伪造的证书

1.05.50-1.05.51

they look correct

这些证书看起来是正确的

1.05.51-1.05.52

 but they're bogus

但它们是伪造的

1.05.52-1.06.00

 and a log server then that that's willing to serve these.

日志服务器会去处理这些证书

1.06.00-1.06.02

 it's willing to put these certificates in the log

它会将这些证书放入日志中

1.06.02-1.06.03

 and of course they all are

Of course，它们确实会这样做

1.06.03-1.06.05

 then at least for a while 

过了一会儿后

1.06.05-1.06.06

browsers will be willing to use them

浏览器就会去使用这些证书

1.06.06-1.06.09

 the thing is though that the you know they will be caught

你知道的，它们最终会查到这些伪造的证书

1.06.09-1.06.18

 the system is its intent is to improve the situation in the certificate transparency system

该系统的目的在于改善certificate transparency系统中的情况

1.06.18-1.06.19

 if somebody was issuing bogus certificates

如果有人颁发了伪造的证书

1.06.19-1.06.22

and browsers were being tricked into using them 

浏览器就会被欺骗，并去使用这些伪造的证书

1.06.22-1.06.24

you might never find out ever

你可能永远不会发现这点

1.06.24-1.06.27

in the certificate transparency world

在certificate transparency的世界中

1.06.27-1.06.28

you may not find out right away

你可能不会立即发现这些伪造的证书

1.06.28-1.06.30

 and so some some people may use them

So，有些人可能就会去使用这些伪造的证书

1.6.30-1.06.38

 but then relatively quickly you know a few days or something the monitors will start to notice that there's bad certificates in the logs 

但在较短的时间内，比如几天内，监视器就会开始注意到日志中存在着这些恶意证书

1.06.38-1.06.43

and somebody will go and track it down and figure out who is malicious or who is making mistakes

有人会去追踪这些伪造的证书，并找出谁是恶意的或谁犯了错误

1.06.43-1.07.00

yeah so I guess a certificate transparency log server could refuse to talk to the monitors

So，我猜测，certificate transparency日志服务器可以拒绝和监视器进行通信

1.07.00-1.07.02

 yeah I'm not sure

我并不确定

1.07.02-1.07.10

 I think ultimately the if you know we're now treading into a kind of non-technical region

我觉得我们现在所要讲的是非技术领域的东西

1.07.10-1.07.14

 you know what to do if there's evidence that something's gone wrong 

如果有证据表明这里面有东西出错了，那么我们该做什么呢？

1.07.14-1.07.16

this is actually quite hard

这实际上相当难

1.07.16-1.07.21

because much of the time is something seems to go wrong  even bogus certificates often

因为不少时候，即使是伪造的证书，似乎也经常出错

1.07.21-1.07.24

 often the reason it's just somebody made a mistake 

常见的原因就是有人失手犯了错

1.07.24-1.07.25

it was a legitimate mistake 

这是一个合理的错误

1.07.25-1.07.27

you know somebody blew it 

你知道，有人搞砸了它

1.07.27-1.07.29

and it's not evidence of malious

这并不能说明他们是恶意的

1.07.29-1.07.30

is just that somebody made a mistake

只是有人犯了错而已

1.07.30-1.07.35

I think what would happen if a monitor was misbehaving in almost any way

如果监视器以任意方式出现了异常，这会发生什么呢？

1.07.35-1.07.39

 like not answering requests if it was doing consistently

比如，如果监视器在发起请求进行一致性证明的时候，日志服务器并没有对该请求进行响应

 

1.07.39-1.07.45

people notice and either ask them to shape up or take them out of the list stop using them 

人们就会注意到，并将相关日志服务器屏蔽掉，或者将它们从列表中拿出来，并停止使用它们

1.07.45-.07.51

the browser vendors would take that log server out of a list of acceptable log servers after a while

过了一会儿，浏览器厂商会将这个日志服务器从可接受的日志服务器列表中移除

1.07.51-1.07.54

but yeah there's like a gray area of bad behavior

但这里有一个不良行为的灰色地带

1.07.54-1.07.58

 that's not bad enough to the warrant being taken out of the acceptable list

这不足以使它从这个可接受的列表中移除

1.07.58-1.08.02

 I think of a log server has been found to work 

我觉得日志服务器已经找到了解决之道

1.08.02-1.08.04

the question is what if the log server has been found before what happens

问题是，如果日志服务器在这个问题发生之前就已经发现了这些伪造的证书

1.08.04-1.08.08

 then I think what would happen is

我觉得这里会发生的事情是

1.08.08-1.08.15

 the people who were run you know the people who the browser vendors would talk to the log server

浏览器厂商那帮人和会日志服务器进行通信

1.08.15-1.08.18

 and ask them the people running the log server and ask them what happened 

他们会去询问这些运营日志服务器的人到底发生了什么

1.08.18-1.08.22

and if they came up with a convincing explanation

如果他们提供了一个令人信服的解释

1.08.22-1.08.23

 that they didn't made a mistake

即他们没有犯错

1.08.23-1.08.27

 you know which maybe they couldn't maybe I don't know they their machine crashes

你知道的，可能是他们的机器发生了崩溃的情况

1.08.27-1.08.29

 it loses part of their log 

他们丢失了部分日志

1.08.29-1.08.30

they restart 

他们重启机器

1.08.30-1.08.32

you know starting from a prefix of the log 

你知道的，从该日志的前缀开始

1.08.32-1.08.35

and start growing a different log

并开始往该日志中添加其他日志内容

1.08.35-1.08.38

 if it seems like a mistake honest mistake

如果这看起来像是一个无意的错误

1.08.38-1.08.42

 then well it was a mistake

Well，它就是一个错误

1.08.42-.08.47

 but if it if the log server operators can't provide a convincing explanation of what happened 

但如果日志服务器操作人员无法为发生了什么提供一个令人信服的解释

1.08.47-1.08.54

then I think the browser vendors would just delete them from the list of acceptable log servers

那么我觉得浏览器厂商就会直接将这些日志服务器从可接受的日志服务器列表中删除

1.08.54-1.08.59

 okay 



1.08.59-1.09.06

but these are you know these are sort of problems with the system

但这些都是和系统相关的问题

1.09.06-1.09.15

 because you can you know the definitions of like who owns a name or what acceptable but you know whether it's okay for your server to be down or not 

但你知道的，像是该域名是谁所拥有的，或者哪些日志服务器是可接受的，或者你的服务器是否宕机之类的问题

1.09.15-1.09.20

these are very hard to pin down properties

这些都是很难确定的特性

1.09.20-1.09.29

 you know I think the system is not full you could definitely get away with bad behavior at least for a while

我觉得这种系统并不完备，你至少肯定能暂时摆脱这种不良行为

1.09.29-1.09.31

 but the hope is 

但我们希望的是

1.09.31-1.09.33

that there's strong enough auditing here

这里有足够强的审计能力

1.09.33-1.09.41

 that if some certificate authority or log server was persistently badly behaved

如果某些证书机构或者日志服务器持续表现不佳

1.09.41-1.09.46

 that people would notice the monitors would notice they may not do anything for a while 

人们和监视器可能会注意到这些日志服务器在一段时间内可能什么也没做

1.09.46-1.09.58

but eventually they would decide that you know you're either too much of a pain or to malicious to be part of the system and delete you from the browser lists 

但最终它们会将该系统中的这种日志服务器或者恶意的日志服务器从浏览器的可接受日志服务器列表中删除

1.09.58-1.10.01

of course the browser vendors in a position of quite strong power

Of course，浏览器厂商所处的地位拥有非常大的权力

1.10.01-1.10.05

 so Wow the system is in general pretty decentralized yeah 

So，总的来讲，这种系统是很分散的

1.10.05-*1.10.10

there can be lots of certificate authorities and lots of certificate transparency log servers

我们可能会有大量的证书机构以及大量的certificate transparency日志服务器

1.10.10-1.10.13

there's only a handful of browser vendors 

但浏览器厂商的数量只有那么几个

1.10.13-1.10.22

because they maintain the lists of acceptable certificate authorities and log servers

因为他们维护了可接受的证书机构和日志服务器列表

1.10.22-1.10.23

they do have a lot of power 

他们的权力很大

1.10.23-1.10.30

and you know it's the way it is unfortunately 

你知道的，这就是不幸的地方

1.10.30-1.10.31

okay



1.10.31-1.10.36

so things to take away from a certificate transparency design 

So，我们从certificate transparency设计中学到的东西是

1.10.36-1.10.38

so one thing is the

So，其中一点是

1.10.38-1.10.41

key property it has super important is

它里面其中超级重要的一个关键特性是

1.10.41-1.10.43

just that everyone sees the same log

所有人看到的都是相同的日志内容

1.10.43-1.10.47

even if some of the parties are malicious

即使是在有些团体是恶意的情况下

1.10.47-1.10.54

 either everyone sees the same log or they can accumulate evidence from failed proofs that something's funny is going on

所有人看到的日志内容也是相同的，或者他们能从失败的证据中收集证据，以此来证明发生了哪些有趣的事情

1.10.54-1.11.02

 and because both browsers who are using those certificates and the owners of the DNS names who are running monitors see the same log 

因为使用这些证书的浏览器以及运营着这些监视器的域名所有者都会看到相同的日志

1.11.02-1.11.06

because of these proofs

因为这些证据的因素

1.11.06-1.11.08

the monitors can detect problems and

监视器可以检测出这些问题

1.11.08-1.11.13

therefore the browser's even though the browsers can't actually detect bogus certificates

因此，即使这些浏览器实际上不能检测出这些伪造的证书

1.11.13-1.11.17

 they can at least be confident that there if there's bogus certificates out there that monitors will detect them

至少他们可以自信的说出，如果这里面存在着伪造的证书，那么监视器会检测出它们

1.11.17-1.11.20

 and possibly put them on revocation lists 

并可能会将这些伪造的证书放入吊销列表上面

1.11.20-1.11.22

actually that's something I didn't mention

实际上，这个东西我之前没有提

1.11.22-1.11.28

if there's evidence of a monitor spots what must be a bogus certificate

如果监视器发现某张证书肯定是伪造的

1.11.28-1.11.34

 like MIT sees somebody they don't know about being issued a certificate for MIT.edu

比如，MIT看到他们所不认识的人为mit.edu颁发了一张证书

1.11.34-1.11.38

 it turns out there's a pre-existing revocation service 

事实证明，这里有一种预先存在的吊销服务

1.11.38-1.11.42

that you can put bad certificates on that the browser's check

你可以在浏览器的检查列表中放入这些不良证书

1.11.42-1.11.44

so if a monitor sees a bogus certificate

So，如果监视器看到了一张伪造的证书

1.11.44-1.11.51

it can actually be effectively disabled by putting it on in the revocation certificate revocation system

实际上，通过将该证书放入证书吊销系统中就可以有效地禁用该证书

1.11.51-1.11.53

 that's not part of certificate transparency

这并不是certificate transparency中的一部分

1.11.53-1.11.54

 it's been around for a long time

它已经存在了很长一段时间了

1.11.54-1.11.56

 okay 



1.11.56-1.12.00

so the key property is everyone sees the same log of certificates

So，这里的关键属性就是，每个人看到的都是相同的证书日志

1.12.00-1.12.03

 another thing to take away from this is that

我们从中学到的另一件事情就是

1.12.03-1.12.07

 if you can't figure out a way to prevent bad behavior

如果你没办法找到一种防止不良行为的方式

1.12.07-1.12.15

maybe you can build something these usable that relies on auditing instead of preventing

兴许，你可以去构建出那些依赖于审计这些行为而不是防止这些行为的有用工具

1.12.15-1.12.18

 that is can detect bad things after the fact

当确实出现了伪造的问题，它们可以通过这种方式检测到这种不好的东西

1.12.18-1.12.19

 that might be good enough

这可能就足够了

1.12.19-1.12.22

 it's often much easier than preventing the bad things

这通常要比阻止不好的事情发生来说，要更为简单

1.12.22-1.12.27

 some technical ideas are here in this work

我们来讲下这里面的一些技术想法

1.12.27-1.12.27

 one is

其中一个是

1.12.27-1.12.29

this idea of equivocation

歧义攻击的思想

1.12.29-1.12.40

a big danger is the possibility that a malicious server will sort of provide split views one viewed one set of people，another view to another set of people

其中一种危险可能性就是，恶意服务器可能会提供两种东西，它将其中一个东西给一群人看，将另一个东西给另一群人看

1.12.40-1.12.42

it's usually called a fork or equivocation

这通常叫做fork攻击或者歧义攻击

1.12.42-1.12.44

 it's an important kind of attack

这是一类重要的攻击

1.12.44-1.12.49

 another property this fork consistency property it turns out it's often valuable too

事实证明，fork consistency中的另一项特性也很有价值

1.12.49-1.12.52

 when you're worried about Forks to build a system

当你因为担心分支攻击而构建出这样一个系统

1.12.52-1.12.58

  that forces the malicious server once it has forked somebody to keep them on that fork 

一旦恶意服务器对某人进行了分支攻击，该系统就会强制将这些用户呆在这个分支上





1.12.58-1.13.01

so it can't erase evidence by erasing a fork

So，它无法通过删除某个分支来删除证据

1.13.02-1.13.08

the final technical trick is the notion of gossiping in order to detect fork

最后一种技术手段就是gossip，我们通过它来检测分支是否存在

1.13.08-1.13.11

 because it's actually gen if the participants don't communicate with each other

因为如果参与者彼此间互不通信

1.13.11-1.13.16

 it's actually typically not possible to notice that there has been a fork

实际上，通常情况下，这是不可能注意到这里有分支存在

1.13.16-1.13.18

 so if you want to detect Forks

So，如果你想检测出是否存在分支

1.13.18-1.13.24

there has to be one way or another some kind of gossip some kind of communication between the parties 

我们得通过某种方法或者gossip之类方式来让这几方之间进行通信

1.13.24-1.13.26

so they can compare nodes and detect forks

So，它们可以对节点进行比较，并检测出分支

1.13.26-1.13.34

and we'll see most of these things again next week when we look at Bitcoin and

在下周讲比特币的时候，你会再次看到这些东西中的绝大多数

1.13.34-1.13.39

that's all I had to say

这就是我所要说的内容



四十六  阅举报
