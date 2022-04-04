# LEC 1 (ab): Introduction and examples (handouts: xv6 book; 2020: notes, video)

[2021 视频知识点总结](https://pdos.csail.mit.edu/6.S081/2021/schedule.html)

对硬件的抽象。进程和文件系统都是为了方便。

操作系统的任务是对硬件进行复用，在其中可以运行多个任务，例如编辑器，编译器或者多个不同的数据库。

OS 同时运行所有事情并且事情之间相互不影响，这被称为**复用**。

任务之间相互不影响被称为**隔离**。

有时不同的任务之间想要交互，例如通过文本编辑器编辑代码后，编译器再读取其中内容。

在该共享的时候共享，不该共享的时候不共享。例如多个用户登陆一台机器，而用户与用户之间的信息不希望对方访问，那么此时就不能共享。这被称为访问控制系统。

如果程序需要获得硬件的完整性能，操作系统需要提供类似的功能。

在许多的操作系统中有很常见的标准。

comes with a bunch of hardware resources which i'll put at the bottom maybe

there's cpu and ram and a disk for storage

and maybe a network interface so this sort of hardware that's

the lowest layer um so if at the top we want to run various applications

maybe a text editor i happen to use vi as a text editor if you're going to

run a c compiler say cc you know if you run lots of other

things we're going to talk a lot today about the shell which is the

command line interface so we have all these different programs that are

running and this is the sort of world in which

applications run is usually called user space

and as distinct from that there's a single program

um a special program that's always running called the kernel and the kernel

is sort of the guardian of the resources of the

computer it's what first boots up you turn on the computer

there's just one of it it maintains data to help it manage each of these

processes and the kernel also maintains lots of data structures to help it

interface and all the different kinds of hardware that

uh these user programs need to use the kernel also has built in a bunch of

services um and so for example there's typically a

file system implementation inside the kernel that

implements things like file names and file contents

and directories and understands how to store

the files in the disk so your programs are going to talk to the files inside

the kernel and the file system implementation is going to

talk to the disk and in this course what we mostly focus on is all the

things that have to happen inside the kernel

and on the interfaces between user programs and the kernel

as well as the sort of structure of the software

inside the kernel so we care a lot about these

services inside the kernel [Music]

one of them is the file system i mentioned there's also uh

management of processes each of these running programs

is called a process and it has things like its own memory for example

as well as a share of the cpu time so kernel manages

processes as a kernel service [Music]

the kernel manages the allocation of memory the different processes need

different amounts of memory the kernel

multiplexes and divides up the memory allocates the memory

among all the different processes um the kernel as i mentioned

influenced the file system file system really comes in two or three

logical or a bunch of logical parts but for now we can think of it in terms of

managing file content that's what's inside files figuring out where on disk

each file's content ought to live the file system also somewhat separately

manages a name space each file has a name

and there's a hierarchy of directories every directory has a bunch of files in

it all that's managed by the file system there's typically

some sort of security arrangement maybe we'll call it access control

by which the colonel decides that you know when a given process wants to read

use some resource maybe read something from the disk or use some memory

the access control machinery inside the kernel is what gets to decide yes is

that allowed is that not allowed and that can get pretty complicated if

we're talking about time sharing systems like athena systems where there's

you know each of these processes may be run by a different user and

have different access control rules applied to what it's allowed

to get at and in a real full-blown operating system there's

turns out to be many many other services you know there's typically some way for

different processes to talk to each other

called inter-process communication there's typically a whole bunch of

software associated with the network things like the tcp ip protocols for

talking in the network

there's typically support for sound cards there may be drivers for hundreds

of different disks and hundreds of different network cards

so in a full blown operating system there's a huge amount of stuff here and

this may run to millions of lines of code

inside the kernel

so that's sort of a quick overview of what's inside the kernel

we're also interested in how applications interact with the kernel

and what that interface looks like

the

usual so this is the api for the kernel

how applications get at the kernel typically that's done with something

called system calls and these are things that

look like function calls that programs can make

but actually jump into the kernel and execute a

system called implementation in the kernel i'll talk a

bunch about that in the latter part of this lecture for now just to give you a

flavor here what a couple of different system calls

might look like in the source code of an application

one might be that if you want if an application wants to open a file

it make it calls the open system call and tells the open system called the

name of the file so maybe it wants to open a file for

writing called out and it would be an extra argument

here saying one in this case saying i want to write that file

and so this thing that looks like a function call

if opens the system calls actually special code that jumps into the kernel

and the kernel can retrieve these arguments

execute some kernel code that implements open maybe talks to the disk

and then returns a value and that's this file descriptor

as fd stands for file descriptor which is

the program can then use as sort of a handle to refer

to this open file if you want to write to a file the

system called to do that is called write you have to

pass it one of these file descriptors the same as was returned by open

um these are now arguments that are passed in the system call

from the program into the kernel you give it a pointer

to a buffer of characters so an easy way to do that in the c

programming language which these examples are written by is the double

quotes and then the string the bytes of the string this

backslash n is a new line and the third argument is the count of

characters that you want to write and so this

really gets point passed as an address in memory

so you're telling the kernel look please write six bytes from this address

to the file that this file descriptor refers to

a much more exciting uh system call that you encounter is the fork system call

fork is the system call that creates a new process

um and it returns actually creates a process that's identical to the caller

and fork returns the an identifier the process identifier or pid

of the new process it's actually a little more complicated than that and

we'll hear more about this so again these are

all look like function calls but the system calls are special because

they jump into the kernel that's just taste i'll see more later

well that is a sort of quick overview um i want to just mention why i find

operating the study of operating systems to be

both challenging and interesting

why you know why it's maybe worth

intellectually worth taking a course in this area so one reason why it's hard is

that the environment's unforgiving the

programming environment inside the kernel is unforgiving because

you're

you're when you're programming when you're modifying the kernel or extending

the kernel writing a new operating system kernel

you're providing the infrastructure that everybody else assumes is already

present to run their programs right and everybody else gets an

operating system under their program when they write ordinary application

programs but when we build operating systems what we

get is the hardware underneath our operating system which turns out to

be more difficult to deal with in this

course we we get to use a hardware simulator

called qmu that you know simulates a cpu and a

computer and that makes life a little bit better but

it's it's still a kind of a difficult environment to program it

another reason why it's hard and interesting is because if you're

designing an operating system you have to satisfy a bunch of

tensions that require real design thought

so one is that you'd like your operating system to be both efficient

which often means that it sort of operates at a low level close to the

hardware but for ease of use and because real

live people have to write programs that use your operating system we'd like

it also to be provide abstract high-level portable

interfaces and it's a neat trick to provide

abstract interfaces that are simple um affordable but that are also

efficient another tension is that we'd like to

provide a very powerful operating system services so that the

operating system can shoulder a lot of the burden

of running programs we'd like to powerful

operating system services but we also want to have simple

interfaces

that is we don't want tremendously complex hard to understand interfaces

for programmers to use because they're not going to understand them and

they may find it hard to use um so this is really simple api and so

this is possible to do to provide simple interfaces that have powerful machinery

inside them and so we'll always be searching for

sort of simple interfaces that provide powerful services hey robert we have a

question in the chat uh what is unique slash different about

saying system calls jump into the kernel i.e as opposed to a standard function

call that jumps to another function well the colonel has the kernels um

a piece of code that's always resident that has special privileges

that were that because it booted the machine booted the kernel

um the kernel has special inter privileges that can get directly at

all kinds of hardware like the disk device that ordinary user programs can't

get at so if you make a fun an ordinary

function call um the the function you're calling doesn't

get it just doesn't get any special privileges with respect to the hardware

whereas if you make a system call into the kernel um

we'll talk about how this works but that ends up um

as it when it jumps into when the system call jumps into the kernel

the system call implementation in the kernel then gets all these special

privileges so that it it can modify all kinds of

sensitive and protected uh hardware resources like for example getting

directly at the hard disk we'll see a lot more detail

for all this uh shortly okay so

a final tension that we wanna that all operating systems need to satisfy is you

wanna give programs as much flexibility as you can you don't want to constrain

them so you want to have very flexible

interfaces but you do need to constrain programs somewhat because you absolutely

have to have some notion of security you can't you we'd love for programs to

give programmers complete freedom but it can't be complete can't be really

complete because we don't want programs to get

directly at the hardware or to interfere with other programs

or to sort of be able to interfere with the operation of the

operating system itself so these are all you know it's possible to do a good job

and we'll talk a lot about it but it's always a bit of a puzzle to provide

sort of both of these the properties in both of these columns

another thing that makes os design hard and interesting is that

operating systems provide a lot of features and a lot of services but they

actually tend to interact and sometimes in odd ways they require a

lot of thought so even in the simple examples i gave

with open and fork those two interact actually if a program

allocates a file descriptor with the open system call

and then that same program forks and the semantics of fork

just turn out to be that you create a new process that's a copy of the current

process this file descriptor you opened

if that's truly to be a copy this file descriptor still has to

um be present and usable in the child and you know so that's to be thought

through that is the files the open and filed scripters interact with fork in

this interesting way and somebody has to figure out oh should

the child be able to get at the file descriptors created

before fork was called and the answer happens to be yes in the

operating systems we're going to look at

all right and so other things that are turned out to be interesting

i already mentioned that operating systems have to cater to a wide variety

of uses the same os used both for database

servers and and smartphones for example and operating systems as time goes on

the hardware that you run the hardware you get with typical computers changes

maybe you get super fast ssd storage instead of mechanical hard drives for

example about 15 years ago multi-core computers

went from being rare curiosities to being

pervasive and recently we've seen you know order of magnitude speedups in how

fast networks operate and so all these require rethinks um

periodically of how operating systems are designed

now um so so those are those are sort of intellectually why you might take the

course there's also some even more practical reasons why you might be glad

to have taken this course one is if you're interested in what happens inside

computers what goes on under and saw under the hood sort of in secret

when you turn on your computer this is a good course to take similarly

if you like infrastructure that is if if you enjoy

building uh sort of services that other programs can then use

this is of course essentially all about infrastructure because that's that's

what operating systems are if you ever need to spend a lot of time

tracking down bugs in application code or tracking down

security problems often that um involves understanding

what was going on inside the operating system

because it's ultimately the operating system that enforces a lot of security

and when things go wrong it's sort of the

operating system that has to pick up the pieces so

that's often involved in uh tracking down bugs

and finally yes two more questions from the chat so

the first is how important is it for application developers to truly deeply

understand the operating systems they're developing their applications for

do they necessarily need to be experts you don't have to be an expert but if

you spend um a lot of time developing and

maintaining and debugging applications you'll eventually end up knowing a lot

about the operating system whether you whether you meant to or not

it just it just comes up and you're often forced

to understand

and the second question is do high-level programming languages like

python use system calls directly are there built-ins

slash wrappers for convenience a lot of high-level languages are

sort of at one remove from system calls that's absolutely true so

partially because a lot of languages want to provide

portable a portable environment that works on many different operating

systems so they can't necessarily commit to the specific system calls of any one

operating system um so i'm the answer the question i

think is if you use python uh you're somewhat insulated from the

system call interface you know internally of course python makes

has to make system calls to get its work done and

certainly in python and many other languages there is usually a way to get

directly at the system calls of whatever your

operating system you're running on and folks for questions you can just

feel free to jump in yourself and ask questions you don't need to go through

the chat

okay um all right sorry um

i'm going to spend a couple of minutes now talking about

the class structure of 6 s081

before switching back to actual technical content

so the uh there's a website for the course which i don't want to write out

just now but it's um you can find it by looking for 6s 081

on google and the website um has

um the schedule uh it has the assignments on the schedule

it has the lab assignments um and it has the sort of information

about course structure like the grading policy on it the other big

resource you're gonna want to keep track of is piazza

i guess everybody who's here got here by the way piazza but

as well as so we use piazza really for two main things one is

as a way of people to be able to ask questions about the lab assignments and

uh course staff will try to answer these questions but

you should feel absolutely free to answer each other's questions as well

and the other big thing that happens on piazza if there's announcements if

there's any announcements about the course

we'll put the announcements on piazza so you should keep an eye on piazza for

announcements even if you're not using it for lab help

the one of the big parts of the course is that these lectures

the lectures will cover basic ideas in operating systems

some of the lectures will be devoted to detailed

study of the code in xv6 which is our small teaching operating system

and so talk about how it works we'll look at the code and sort of show the

code executing during lectures and in addition before many of the

lectures there'll be assignments reading assignments from a book that

sort of describes how xv6 operates and why it's designed that

way so you should do the readings before the

class so that you'll understand the discussion in the class some of the

lectures are devoted to background to help you do the labs sort

of explanations about c works of how the risc 5 which is the microprocessor that

we'll be using that you'll find helpful in in

understanding how to do the labs and towards the end of the course i will

spend some lectures discussing some operating system papers

um research papers and and some classic

papers in the field which uh you know we'll ask that you

read before the lectures and then we'll sort of talk about the

papers in during the lecture for all the lectures or almost all the lectures

we ask that you submit a question about the reading

for the lecture before the actual time of the lecture

which many or all of you did for this lecture for which thank you

and we will read those questions to help us

guide us about what to talk about and we'll try to answer

as many of the questions as we can although there's rarely time

unfortunately for us to answer all of them

the next big part the course of the labs there's a programming lab

do almost every week and the point of the labs is to help you

get hands-on experience with implementing and using operating systems

um the lab that's due next week is actually about using using about

writing applications that make the call the system calls we'll be

talking about um whereas most of those labs after that

are involve you either implementing basic operating

system features or adding uh kernel extensions to the xv6

uh operating system the very last slab and

one in which you actually add a network stack and a network driver so you'll be

able to connect in over the network to the operating system that you run um

you should if you have problems with the labs uh there'll be office hours

that the um tas will hold in addition you can

post questions to piazza and very often you'll be able to get useful answers

from piazza more quickly than from office hours

we welcome you discussing the labs talking about the labs talking about how

to design the lab solutions but we ask you

please do not look at other people's solutions

for the labs please all the code you write should be your own and

you shouldn't share code or look at other solutions

the grading for the course will be mostly determined

from the labs this year so 70 of the grade will be

um uh based on whether or not that your lab the lab you

submit passes the tests and we for grading we run the same tests

um that we supply you so if your lab passes the all the tests that we give

you then chances are you get full credit for the lab

um 20 of the grade um is going to be from lab check off

meetings uh we'll for each of you we'll pick a

couple of randomly selected labs and one of the teams will talk to you

and ask you questions about your implementation just to make sure that

you really understand what's going on so this

lab check-offs

there's um ten percent remaining there's a question be like a

yes or no one or zero type of thing or would they be

like could someone get like if they answered some of the questions right but

not all the questions right would they get

in between so they're great you know i haven't thought this through

um there's certainly room for partial credit but

it's not a it won't be binary it'll definitely be

you can receive partial credit okay all right um the last 10 is going to be

driven by the homework and participation during lecture and in

piazza

there'll be no exam or quizzes

this year um and so what that means is that most of the

you know ninety percent of the grade is being driven by the lab so

you know you should spend a lot of time in the labs

make sure that you start early and have enough time to

complete them and work out bugs in order to get full credit

and you know as a result of that this is going to be a very kind of hands-on

software oriented course or any questions about the

machinery of the course

uh we've got a couple questions in chat so the first is a logistical question

currently 6s081 isn't listed as usable for the systems concentration in the

are there plans added to the list of classes later i think for that

because it's not an aags it's an aus it can't be used to fulfill mn

requirements as it's not a graduate level

class but um and then we have is the only homework

to submit questions looking at the calendar that appears to be the case

unless i'm forgetting something i think that's the case

yes so have uh are there gonna be cutoffs for

grades like x percent gets an a y percent gets a b etc

no no um

you know we're going to try to

free student estimate um our impression of how well you've

understood the material and assign a grade based on that so

there's there's no predetermined cutoffs

all right anything else

all right just real quick for folks in the chat uh asking about the

concentration requirement i'm not a hundred percent certain

uh but six soa one is not it's like a temporary number

before the class gets this official one so it certainly won't be

uh listed anywhere if you needed to fulfill a concentration i think your

best bet is probably to fill out a petition

or to email somebody like katrina lakerts

to see what the status is we don't control

you know what what classes fill these kind of requirements

unfortunately and for what language we'll be using the class will be in c

all right um

all right for the rest of the lecture i want to uh talk about how

um house what system calls look like to applications

and you know since the system calls are the

interface to the services that the operating system provides it

it's actually pretty important what those system files look like what

applications expect from system calls and how they behave so it's sort of

worth understanding what the interface looks like

you'll be using the system calls we talk about in the first lab

and extending and improving the implementation

internal implementation of these system calls in subsequent labs

what i'm going to do is show some simple examples

of little programs

that call system calls and then i'll run them

and and next v6 for you um i'm going to run them the xv6 is a it's

a unix a simplified unix-like operating system

unix is a old operating system sort of at least

intellectual basis for many present day operating systems such as

linux and os x so it's in very common use

xv6 our teaching operating system is much simpler

it's sort of inspired by unix and has the same overall structure but is

dramatically simpler than any real unix operating system

and it's simple enough that hopefully um you know

it would be relatively straightforward for you to read all the source code

as well as read the book um in a couple of weeks certainly during the semester

in order to kind of understand all of what happens

inside xv6

x86 runs on the risc-5 processor risc-5 microprocessor and this is the

same microprocessor that's the focus of recent 6004

so many of you may actually know quite a bit about the risk 5 instruction set

in theory you could run xv6 on top of a risk 5 computer

and people have done that

but we're going to run it under the qmu machine emulator so just to write this

down we got our operating system is xv6

it runs on risk 5 microprocessor and not just risk 5 microprocessor but

we assume a certain amount of surrounding hardware like

memory and a disk and a console interface for us to talk to it um but we

actually run under the qmu

machine simulator so that which runs under linux so that all of you can

actually run xv6 without having to have hardware

okay so i'm gonna switch to uh showing you

code

all right so um first thing is i've uh set up xv6 on my laptop

um and i'm going to run it and type make qmu which you'll find yourself doing

quite a bit during the labs um which compiles xv6 it's written in c

so it's compiled with a c compiler maybe i'll make

clean for you so you can see the actual compilation

and i might type make qmu which has the effect of

compiling and building xv6 kernel and all the user

processes and then running them under the qmu emulator

it takes a moment to run the compiles

and now we're up and running xv6 and the dollar sign prompt you see is the shell

which is the command line interface to xv6

modeled after the shell on unix which is if you log into an athena workstation

it's the it's like the shell that athena shows

you

x36 is itself tiny and it comes with a small number of utility programs

and including for example the ls program which i'm about to run

run ls and it gives me a list of all the files in xv6 of which there are only

about two dozen including things like grep and kill and

make deer and rn which may be familiar to you as

uh as unix utilities okay the first program i'm going to show

you to illustrate system calls is um program called copy

um here's the source it's just a page

and so what you're seeing here is a program that starts on line eight and

main there's the sort of convention for c

programs it sits in a loop at line 12. and over and over again it reads some

data as input and on line 13 and then writes

the data just read to its output on line 16. if i run copy

uh in xv6 just waiting to read input if i

type some input and reads it and spits it back out to me

so it's very simple program just does i out

it's written in c as i mentioned um if you're you don't already know c it's

worthwhile getting the um standard c programming language book

by kernhan and ritchie and i think there's a more full

reference to it on the course website which explains to you in

a very straightforward way how to program

and see

as i mentioned before read and write this this program makes

two really three system calls read write and exit are

system calls if you look at the call to read on line 13

it takes three arguments the first argument is a file descriptor which is

really a reference to a previously open file

and the shell uh ensures that when a program starts by default its

file descriptor 0 is connected to the console input and its file

descriptive 1 is connected to the console output and that's why i was able

to type to this copy program and see the output

of course you know these file descriptors are expected the program

expects these file descriptors have been previously opened and set

up by the shell for it and this this zero

one file descriptors is a pervasive unix convention many many unix programs

expect to read and file descriptor one and read file

scripture zero and write to file description one

um the second argument to read is a pointer to some memory

um where the program is asking the operating system to read data

into that address and memory so that's the buff argument

and line 10 allocates 64 bytes of memory on the stack per read to read into

and the third argument to read is the maximum number of bytes that the program

wants to read and the size of buff says just 60

maximum 64 buckets so the recall reads up to 64

bytes from whatever is connected to file descriptor zero and

that was my terminal in this example the return value from read it either

repeat it which may return the number of bytes

read which would be six in the case of

me typing xyz y um lead might be reading from a file if it

gets to the end of the file there's no more bytes read will return zero

i know some other error occurred like the file descriptor doesn't exist

read may return minus one and so in many of these examples like on line

16 there i don't my example code doesn't check

system call returns for errors um but you should be more careful than

me um uh the you should figure out how system

calls reflect errors is usually a minus one return value

and check all system call returns for errors

and if if you want to know what the system call arguments and return values

are there's a table and i think chapter 2 in the book that

explains all of the xv6 system call arguments and

return values the question regarding the resist call what if we set the max read

bytes to size of buff to one plus size of buff or

bigger so what if we try to read more than the

size yeah then if there was 65 bytes to read then the operating

system would happily we'll just copy those 65 bytes

to the memory that you provide and of course

there's something else on the stack up there maybe the return program encounter

or an argument or something and so if you pass 65 then you're

inviting the colonel to write junk um to an unexpected place in

your stack and so that's a bug and it may cause you

for him to crash or do something else unexpected um

so as a programmer you're you have to be careful here there's nobody

writing in c with these kind of interfaces there's

it's very very easy to write code that the compiler is happy with and will run

but absolutely does the wrong thing

so that's too bad but um that's the way it is

okay uh one thing to note is that this copy program and indeed the read and

write system calls they don't care about the format of data

they're reading or writing they just read them write and read and

write and this copy program just deal with 8-bit bytes with streams

of 8-bit bytes how you interpret them is totally up to

the application so the application maybe parse these as data records or as c

source code or who knows what the operating system um

it only thinks in terms of a stream of 8-bit bytes

okay so copy assume this code my copy program assumed that the file

descriptors were already set up um but we need to we need to have a way

to create file descriptors and the most straightforward way to do

that is um with the open system call and so here's

the source for a program that called open that

uses the open system call a question from the chat

what do you mean by a stream of bytes

i i i just mean that if a file contains a bunch of bytes

then read and successive yes building a file contains a million bytes

if you make a sequence of recalls each for 100 bytes

it'll just read the first hundred bytes and then the second hundred bytes and

then the third hundred bytes um

that's all i mean

all right so this program um called open first i'll run it for you

what it does is uh opens creates a new file called output.txt and then writes

some bytes to it and then it finishes so we

don't see anything because it broke data to this file it opened but we

can look at this output.txt file that it created

and see the ooo that it wrote there so line 11 in the program is

makes the open system call gives it a file name output.text and

the o underscore stuff um in the second argument to open are

flags that tell the open system call implementation in the kernel that we'd

like to create a file with its name and that we're going to write it open

returns a newly allocated file descriptor

and the file the script is just a small number it's probably two or three or

four or something and then we pass that same file

descriptor to write along with a buffer and a number of bytes to write that

writes data to the file that the file descriptor refers

to what that file descriptor is actually

doing is indexing into a little table inside the kernel the kernel maintains

state for each process that's running each program that

you run and among other things the kernel remembers a table for every

running process of index by file descriptors

and the table sort of tells the kernel what each file descriptor

refers to

a critical point is that each process has its own

sort of space of file descriptors so uh before running two different

processes two different programs and different processes and they both open a

file they may actually get the same number back as a file descriptor

but because the kernel maintains a separate file descriptor for each

process the same file descriptor number may

refer to different files in different processes

any questions about open about this little program

yeah we got a question in the chat a question from someone not familiar with

c uh how are these files being described

different from normalc programs is it because we're only using

kernel calls i.e couldn't we also open or write a file in python

i don't think i understand that it's a c program that's opening and writing a

file

um okay i think i'm gonna move on um

all right so

you um ask what actually happens when uh maybe

the question is whether someone is doing it in c

any different than doing it in python minus the syntax

well it's it's not really um

there's certainly ways to um python provides nice function calls for

opening and doing all these things or opening

files for example in reading writing files um they're sort

of a layer of they're higher somewhat higher level

functions typically um not you know pointers to memory for example um

and python does more error checking for you

but when you open a file in python or write a file in python the

python calls you make boil down to system calls just like these

is that a good answer

i think so all right

all right um all right i've been over here talking to the uh

xv6s unix like shell and the shells what people often

call the command line interface as opposed to some more graphical user

interface the shell turns if you haven't used the

cell the shell turns out to be a pretty useful interface for things

like system management of unix systems it provides a lot of utilities for uh

messing around with files and for programming development and for

writing scripts to do all these things so you saw me

before run i just want to demonstrate a few shell

features ordinarily when you type things um you're telling the shell to run a

program so when i type ls what that means is

i'm asking the shell to run the program whose name is ls and what that really

means is there's a file in the file system called ls that

contains some instructions some machine instructions and i'm asking

the shell to run the instructions that are in the file

called ls run ls now ls what it actually does is

get a listing of the files in the current directory and you can see up

there on the fourth line that among the other files that

ls says exists in this list is a file called

ls which is in fact the file containing the instructions i just ran

the shell does a few other things for you other than running programs

it allows you to redirect io so for example if i say ls greater than out

what that means is i'm asking the shell to run the ls

command but with its output redirected to the file called

out and i run ls we don't see any output because the

output all went out um now i can out contains a bunch of

data um we could the cat command

reads a file and displays the contents of the file so

i say cat out i'm just going to see now the now this is the saved output

of ls you can also run a command like grep and i can give it an argument x and

what grep x is the grep command searches for

patterns again um if i run grep

x it's going to search for lines of input that contain

x i can redirect tell the shell to redirect its input from the file out

in order to look for instances of x in that saved ls output

and turns out there's three files um whose names

contain x's

um we're going to spend a bunch of time with the shell

um it the shell is sort of the most traditional

um and fundamental interface to uh to unix

because when units was first developed all there was was simple terminal

interfaces like the one we're using and the main use of unix originally was

time sharing a bunch of people logging into

the same machine much like athena and talking to shells

a question about system calls and the compiler

how does a compiler handle system calls does assembly generated make a procedure

call to some code segment uh defined by the operating system

uh there's a special risk five instruction that a program can call that

transfers control into the kernel so indeed when you write c code that

makes the system called like open or right

i mean technically what actually happens is open is a c

function in the c library but the instructions in that function

are really machine instructions it's not you know

open the open function that we're calling

isn't a c function it's implemented assembler

and the assembly code

consists of this special instruction it's actually called e-call

on the risk 5 the special instruction that transfers control

into the kernel and then the kernel looks at the

process's memory and registers to figure out what the

arguments were

all right um the next example i want to look at is

an example program that calls fork to create a new process um

so this is the very simple use of fork at line 12

we're calling fork and what fork does is creates a copy

of the memory of instructions and data of the

calling process now we have two processes with identical

memory fork the fork system called returns

in both processes in the original process

the fork system call returns the process id which is a

an integer greater than zero for in the original process

fork returns the process id of the newly created process

and in the newly created process fork returns

zero so we sort of break even though the processes of identical memory

can break the symmetry of old versus new process by the return value from fork

then in line 16 you can see code that checks and says if

process id is equal 0 must be the child we must now be running in the child

the course is two processes and in the other process

in the calling process which is usually called the parent the process id is

greater than zero so the child will print child and the

parent a good parent and then they'll both exit so when i run

for um here's what we get

so it may look like garbage but what's actually happening is that

after the fork both of these processes are running they're both running at the

same time um and qmu is actually emulating a multi

a multi-core microprocessor for me so they really are running

at the very same time and so when they produce output they're producing each

byte of their output at the same time as the other process

is producing the corresponding byte of its output so the outputs and the two

processes are interleaved um you can see that they're

both typing f um they're both going to type fork

returned um so you can see the f from both of

them and the o for both of them and they are for both them and so on

and one of them uh you can see the zero at the end of that first line is

in the child fourth return zero um and i'm guessing that the

in the parent four return 19 that is the child's

process id is nineteen under exit six that basically means the 19th process

that was created since boot um and then one

of them prints child and you can see the ch ild

and interleave with that is the other one pretty parent

so this is sort of a silly use of fork but we can see so vividly in

this output that it's created two processes that are and

both of them are running we're fork returning both processes and

they're both running but also note that one printed child and

the other parent so it's important that fork returns

differently in the two processes

the question is the child process as a result of fork always identical to the

parent process or could they be different

i um

in xv6 are identical except for the return value from fork

you know so the instructions are the same the data's the same the stack is

is the same um and also both processes you know the processes are

copies and they both have their own separate

address spaces that is you know they both have they both think

that their memory starts at zero and goes on up from there

um but but it's different it's different different memory um for the two of them

in a more sophisticated operating system there are some details which we

definitely don't care about um that may occasionally cause parent

and child to differ but in xv6 they're the same except the return value

so the memory is the same in addition the

file descriptor table is copied so if the parent had some files open

then the child sees the same set of file descriptors

although the child is seeing them in a copy

of the table of file descriptor information

and so we'll see in a moment that it's quite important that

fork copies the table of open file descriptors as well as the memory

okay so uh port creates a new process but

when we run stuff in the shell um the shell indeed creates a new process

to run each command that you type but it needs to actually run the command

in it so you know if i type ls we need to the shell forks to create a

process to run ls but there needs to be some way for this for

that new process actually run the

instructions from the ls program to load those instructions from the file

called lx um and the example program i mean i'll show

you in a minute uh uses echo echo is a very simple

command that just takes whatever arguments you pass

to it and writes them into its output and i prepared for you a program called

exec

um which uh run which makes the exact system

called which replaces the calling process with the

instructions read from a particular from the file you specify and

loads the instructions from that file over the current process sort of discard

it discarding its current memory and then starts executing those

instructions so the call to exec the system call exec on

line 12.

it's going to have the effect of the operating system loading the

instructions from the file called echo into the current process sort of

replacing the memory of the current process and

then starting to execute uh those instructions and in

addition you can pass arguments command line arguments echo

exec allows you to pass an array of command line arguments

with just an array of pointers and see line 10

set sets up an array of character pointers which are essentially strings

and initializes that array to be to contain the strings echo this is echo

and that's equivalent to calling running the act with command with

the three arguments this is echo and so when i want exec

indeed um i see this output this is echo but

even though i ran the exact command the exact program what the exact program

does is call it the exact system call to replace itself

with echo and so it was really the echo program

um producing this output

and uh something about the exact system call that's

important for us is that um it exec preserves

the current table of file descriptors so whatever files descriptor zero one two

etc were referred to before exec they refer to the same thing

in this new program whose instructions we've loaded

another point is ordinarily exec does not return

because exec replaces the current is memory entirely um there's nothing

for exec to return to so exact you know reads the instructions

from that file and executes them and then that's it

um the only time exec returns is if some error occurred

that prevented the operating system from running that program for you

so for example if the program doesn't exist at all

since the exec can't find a file called echo for example

then exec would return negative one to signal that you know something i'm wrong

it couldn't couldn't find a file so ordinarily exact

does not return it only returns if um the kernel couldn't actually run the

file for you questions about exec one question in the

chat is what is the last zero for in arc v

it marks the end of the array um c is so low level that

there's no the c array scheme doesn't have a way

for code to find out how long the array is

and so to tell the kernel that um you know we meant that the array

contains echo this is echo and nothing more

um we put a zero as the last strip as the last pointer each of those

strings in double quotes is actually a pointer to some memory that contains

those bytes that fifth element of the array is a

pointer whose value is zero the convention is that a pointer whose

value is zero or what's called a null pointer um

sort of signifies nothing um with it you know we're done and so the code in

the kernel has actually walks through this array until it finds

the element whose value is zero

okay um right so this is how a program can replace itself

um with another program from a file but actually when we run stuff in the shell

like echo abc or ls or anything else um

we don't want to replace the shell we don't want to have the shell just

call exact um because that would replace the shell with the echo command and then

when echo exited that would be it you know we don't want

echo to replace the shell so what the shell actually does is fork and

then the child calls it zac and that's an extremely common unix

idiom these programs that um want to run a

program but regain control what they do is call

fork and have the child call exact so here's a

simple example this fork exact program

so in this program um called fork on line 12

and the child started line 14 we call exec much like before

the child process um has to replace itself with the echo

command and echo does this thing and then exits

and then the parent process regains control

because um when the fork returns the greater than zero value in the

parent process so the parent process then continues to execute at 19

and unix provides a weight system called line

20 for a process to wait for one of the for a

child that it created with four because when i run a command

um here on the command line we want uh we want the shell to wait

for the command to finish before it prints the prop again

before it prints this dollar sign prompt asking me for more input

and so it's the wait system call that allows the process to wait for

any of its children to return and this status argument is a

way for an exiting child to communicate one integer

32-bit value from the exiting child um to the waiting parent so in line 17 that

argument to exit that one that's the argument to exit the

operating system passes that one from the exiting child

um to the call to wait at line 20. so weight that the ampersand and weight

is passing the address of the status variable

to the kernel the colonel fills in that address with the

child's argument to exit and the convention in unix is that

if a program completes successfully it exit with exits

with state of zero but if if it encountered an error

as it lines 17 um then the unix convention is that you pass

one to exit and so if you care the calling process can look at the status

from weight and decide whether the

child completed successfully enough professor morris quick question yes

about the exact call on 9 15. uh we mentioned

not a bit ago that exec will completely go

into the echo program and not return to fork exec so

would it ever reach lines 16 and 17 well not for this exact code because

there happens to be a program called echo but but you know

if i modified that code here let me let me just modify this code for you

okay so first let me just run fork exact right it actually does execute echo with

those arguments we see the output this is echo

and we see the child exited to show that uh

echo exited successfully and the parent waited for it

let me just modify the program for you um instead of echo i'm going to run some

command that doesn't exist

i actually have to exit out of uh qmu with control a x and then rebuild the

whole thing in order to recompile my modified four gigs and i run four

pixel yen after modifying and compiling it

and this time because the program we're asking to

actually

the program we're asking to execute doesn't exist

exec does return we see the exec failed output

and the exit one you see the one there is communicated back to the parent which

says the child exited the status one so exec returns back to the calling

function when something went wrong yes

okay all right um something that uh something

to note here that actually i think many of you have

already noted is that uh this is a common idiom here this fork

followed by an exec and a child um and it's potentially a bit wasteful the fork

copies the entire parent process but exec

throws away all that copied memory and replaces it with whatever is in the um

file that you're running so you know if you're worried about this kind of stuff

the copy implied by the fork

is in some sense mostly wasted because all that copied memory is just thrown

away and replaced by the exact um and this effects actually would

be significant for big programs if you have a multi-gigabyte program that calls

fork uh and it did indeed copy all the memory

would actually uh take a fair fraction of a second

perhaps to do the copy which could be a problem

um

but later in the course you'll actually implement some optimizations in

particular something called copy on right fork which will eliminate

almost all of the apparent inefficiency of fork

copying only to have exact throw away the copy

it turns out with a bunch of tricks involving a virtual memory system

you can build a fork that's lazy about the copy and that doesn't do in the

common case of fork immediately followed by exact um where you don't actually

have to do the copy because the child doesn't actually use most of the memory

um i think you'll find that's a fun and interesting lab

question from chat why does the parent process print parent waiting completely

before the child calls exec

it's just chance

the is it that you know the the observation is that um you know

uh it could be that the parent's output could be interleaved with the child's

output in the same area that we saw before with the simpler fork example

it just happens not to be there's no guarantee that this is the output we

would see in fact we shouldn't be surprised if we

saw the lines of the output in the other order

or interleaved i suspect what's going on is that it takes a bit of time and

effort now the exact system calls a little bit

expensive because it has to load all those instructions to access

the file system and access the disk and read the contents of a file called echo

off the disk into memory after allocating some memory and that even

after freeing some memory from the old process so

there's quite a bit of machinery involved in the exact system call

and apparently that takes long enough that the parent can complete

producing the output before the exec has finished and started running echo

does that make sense

i have another question is it convention that the child can't wait for the parent

there's not a way unix doesn't have a way for the child

there's no straightforward way for the child to wait for the parent

the weight system call is sort of the only mechanism available well the

weight system call waits for your children and that's it

and so what weight is what weight does is um

if you have any children and one of them has already exited

or does exit then weight will return but you know if you don't have any

children say because you are because in this simple case

um whether it was just a parent and a child

if the child called weight the child doesn't have any children

and in that case weight just returns immediately with a minus one

error return saying this process doesn't have any children

anyway the short answer is there's no way for a child

to wait for its parent to exit another question when we say the child

copies all the memory from the parent process what i what

exactly do we refer to by that i thought the child is going to divide

define the variables again

um well when you compile us you know um

after compilation your c program is just a bunch of instructions in

memory that live in ram um and so those can be copied

because they're just bytes living in ram those can be copied somewhere else

um and with appropriate tricks having to do with setting up

a sort of virtual memory mappings um and make the mappings look the same with

the child as an apparent you can just copy the parent's memory image to the

child and execute it in the child

i mean even though we're looking at c programs you should think of them as

just a bunch of us machine instructions um

which are just bytes in memory that can be copied

if a parent has multiple children would wait just return as soon as the first

child finishes meaning that there could be some more

interleaving with the parent and unfinished children

would there need to be multiple separate weights to ensure all children finish

yes if you call forth more than one if a sin if a given process

calls for twice um then and it wants to wait for both

children it has to call weight twice and each call to wait will return

as soon as one of the children exits so you don't

when weight returns you don't necessarily know which

child is exited the weight returns the child's process id as its return value

so you can tell after weight returns you know which one

it was that exited

as a final example um i'd like to show

how all of these facilities combine to implement i o redirection so

if you remember the shell provides us with this handy syntax

and i can say echo hello greater than out

and that runs the echo command that argument sending its

first that sends this output to the file out and we look it out

or better yet run the cap command with its input

connected from the out file we can see that saved output from the

echo command um the way the shell sets this up

is as follows um it uh the shell

first forks like on line 13 and then in the child the shell changes the way

the file descriptors are set up so that the child's

file descriptor one which by convention most programs use for their output

the shell changes the child's file descriptor to one to refer

to this output file and then runs whatever command

you wanted and that leaves the parent shells file descriptor one

unchanged so this idiom of forking and in the child

um changing around the file descriptors is the usual way in

to sort of redirect input and output for a command that you run but not affect

the input and output for the calling program because we don't

want to redirect the shell's output we only want to redirect the child

programs output anyway the way this works we call fork

in the usual way line 15 only executes in the child the

reason for the close one on line 15 is that in this program

we're redirecting just the output of the echo command so

when i run this redirect program produces no output itself but it ran

echo with this output directed to output.txt

so when i look at output.txt i see this expected output the reason

for the close one on line 15 is that we want one

sort of conventional output file descriptor to refer to something else it

happens so we don't from the child we don't want

to use the file descriptor one that the shell had that's connected to the

console um the call to open on line 16 is

guaranteed to return one because the semantics of open are that open

returns the lowest file descriptor number that's not

currently in use um in the calling process since we just

closed one and file descriptor 0 is

still connected to the console that mean um

open is guaranteed to return one so after the

line 16 file descriptor 1 is connected to this file

when we exec echo echo just writes its output to file scripter one

um and now it goes to this file and the cool thing about this is echo had no

idea what's going on echo doesn't need to know about io

redirection at all it just writes its output to file descriptor one

only the shell knows about io redirection

this example also illustrates the sort of

kind of neatness of the separation between

fork and exec the fact that fork and exact are separate system calls

separate uh functions means that there's a period of time but

in the child between the fork between fork returns and the child and

exact in which we're still running the calling

processes instructions so the calling process even though it's running

even though its instructions are running in the child

it's still the calling processes instructions that are executing

and so the calling process is still able to change

things um still in control up until line 19

and this sort of interval between fork and sec uh gives the shell a chance to

change what the file descriptors refer to for example

any questions about this redirect example

all right um got out of time i'll just wrap up we looked at unix's

a bunch of the interfaces to unix's i o and process abstractions a thing to take

away from this is that the interfaces are relatively simple

you just pass integers like file descriptors and process ids back and

forth across as arguments to these system calls um

but sort of all the functionality inside the

interfaces is relatively sophisticated like creating new

processes and copying the current process and

furthermore i showed some examples of ways in which

the abstractions though individually simple

combine in useful ways for example to produce iod direction

there's a lab due at the end of next week and that lab involves writing

more simple utilities like the ones i showed that use the system calls that we

discussed so have fun with that lab and i'll see

you in class next week

and that's it

since i'm the one recording um how do i end this

first time recording is in lecture i think we exit

okay and nothing special i can just exit and it'll be saved somewhere

yes awesome

and zoom will create some directory and stick the vowel in that directory

there's also office hours right after this right

yes perfect okay

cool all right all right thank you and

i'll see you next week thanks