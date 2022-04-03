# Part 1 


already giving me some ideas and it doesn't seem to be as studious as i i'm

hoping some people tell me thursday is when the weekend begins

i also you know i in fact i remember as an undergrad i was an undergrad at a

different big ten university which i won't reveal

now but you can blue later and at that university one of my best semesters was

when i structured my schedule so i only had classes monday tuesday and wednesday

it was the best semester of my life i had a four day weekend i recommend it if

you can unfortunately i can tell from the fact that you're all here that you

have not achieved such a high level as i did as an undergrad so you can have

something to aspire to so anyway we'll talk about how class

works how lecture works how discussion works uh what the material is how

projects work how exams work all that stuff that we have to do to have a class

and then we'll end with kind of just like a you know final words

and in the final part of some classes we'll just have a little bit of wide

ranging discussions uh from all sorts of topics um

really just a short ending to class and today we'll talk a little bit about some

of the history of what i've gotten out of this class and

teaching it for many years okay

so why don't we just get into it and as you have questions uh we'll we'll get

going so first question this one

let me see how this works look at this is this gonna work copy

oh my god this is amazing okay you're not gonna be as amazed as i

am oh it almost worked yeah look at that

okay so you cannot be amazed how do computers work how do programs

run you should have learned some of this

what classes have you taken already where you should have kind of learned

how a computer works a little bit

you're like i don't remember that is one answer

354 yes maybe 252

maybe you had some programming too like cs what what have you had so far

300 400 you know etc right so you should have

some idea and when we think about a computer we think about a few pieces and

this is again just background but it's good for us to review

one piece cpu central processing unit that's where

all the interesting stuff happens instructions are executed

right and to some extent we can almost have a very simple model of a computer

system um i ran out of room there i wanted to

write memory it's like you know when you're a child you do that all the time

you're like writing out letters you get very excited when you hit the edge of

the paper because you didn't plan ahead that is what happened to me i will now

write this and then draw the box so we have a cpu and we have memory and

by and large we can focus on that of course there's other parts of the

computer system that we're going to talk about and we'll add those in a second

this is all again pretty obvious they're connected in some way

and when we think about how a computer works how would you explain it to

somebody let's say somebody asked you i mean this never happens because

basically people don't want to talk

i'm very unhappy about it this is by the way in contrast to people with

disabilities

for making the world work on computation so

if someone asks you though

they're saying hey i've heard about computers

how do they work what would you say who will boldly suggest something

there's a lot of people here some of you are old who will say um

sound way more is let's go down level and talk about like

354. yeah cpu does instructions on memory

cpu does instructions on memory i like that okay let's go with that

instructions

which are

done or execute

and there's actually two two interesting interactions with memory

systems right it's kind of obvious that there

inside the memory there are two things one is data

that we're going to operate upon and then two are the actual instructions

themselves

and some people we call this the von neumann

i think it's two ends architecture because basically when people were

figuring this out years and years ago john von neumann who was a famous

thinker mathematician kind of a he did lots of things he invented like

some of the basics of game theory he was you know had lots of mathematical

discoveries he worked in physics he was a divider

and he also at some point realized computation was going to be a big deal

and he talked to a lot of people and then he wrote a famous article taking

everything he learned because he's a really smart guy and summarizing it and

because of that he developed an unknown architecture the instructions himself

which now when i look at this my handwriting was a lot worse than i

thought i did i'll try to write more deeply the

instructions and cells live in memory and the computer the cpu takes the

instruction out of memory and it figures out what to do and then they operate on

data they

because a lot of people contributed to that thing but he just put his name on

the report so there's our first lesson when you write something down just put

your name on it that's how you get your

good story for him i guess um so instructions that operate on data

what are some examples of instructions

these are pretty boring sounding things ah subtract

multiply uh right sometimes some architectures

are so simple they don't even include multiply they say you can do that

loading and storing and of course critically branching right the ability

to look at something conditionally or non-conditionally

now isn't it amazing that everything that has been done in computer science

and the computing industry that's transformed the world

eventually comes down to load stores adds subtracts jumps

so basically anybody can understand that it's so basic

but that's what we have these simple executions simple instructions

they're just amazing because you can do billions of them every second

something that actually it's very hard for us to even appreciate

like i have a hard time appreciating that you know my engine and my car

represent you know 6 000 revolutions per minute that sounds like a big number

modern processors execute like billions of instructions in a second

and that's why we can do so much so anyway

that's our basic uh system there

okay so that should all be stuff that you

remember let's go one step deeper in terms of background

which is thinking more from a program perspective

from the perspective of a program we start to actually you know we simply

have cpu and memory but a program has a little bit of a structured view of

memory so let's think about what that is so when i talk about the memory of a

program let's talk about the memory that's

accessible of a program that a program can access

we think of it and i'll often draw by the way this is a sad truth of this

class almost every diagram i do is basically

just a rectangle so there's just a lot of rectangles in

this class and i apologize for it and you're going to now notice that's all i

draw is rectangles this is how sophisticated we are in computer science

but this rectangle in particular i'm going to call something i'm going to

call it the address space the program so when a program's running

it has data and memory that you can access

and we call that its address space and what is an address space well it's

very simple it's just a bunch of bytes

just a bunch of bytes

and we address it by number just like for example when you're referring to a

particular byte you just refer to it by its address

which is just a number

and modern address spaces are are pretty big

some can be incredibly huge we have 32 mid address spaces more

modern systems 64 bit address spaces which means we can refer to the 64 bytes

that's a huge number this again with computers sometimes we

get a little bit tricky we get in a situation where we can't imagine how big

that is so if you for example i saw this once

that if you if you imagine a 32-bit address space so

two to the 32 uh

bytes that we can address um if you imagine that is the size of

like a tennis court just imagine this and a 64-bit address

space is something like the size of europe right it's way bigger just very

hard to appreciate that but in any case we we have this very simple way of

interacting with memory which is we have our address space and we can refer to

any byte or set of bytes within it by just giving a number its address

now more interestingly i'm going to erase this byte here

is what what we can do here is we can divide up our

generally what we do is we structure like a running program like a c program

you'll be doing a lot of c in this class into a very structured way we don't just

say it's a bunch of bytes kind of relating to our discussion of

the von neumann architecture there's a few things in this address

space usually we have up here the code so you have the actual

instructions that you know you're going to write c code

through a compiler you should take a compiler how that works from a compiler

takes something like c it turns it into machine understandable

code and puts it and we're going to put that

in memory somewhere and when we're running we're going to access it

in fact you know a lot of the machinery of a cpu

is organized around getting those instructions you remember things like a

program sometimes called an instruction pointer same thing

or pc points to the next instruction to

execute and then kind of continues down into certain fashions again being

changed by things like branches or jumps so code is sitting in there

but there's more to a running program than just code there's data

and data is structured in a couple different ways what are some what are

some of the parts of the additive space that you might remember from it before

or just your general knowledge that are in designer spaces or data that's a

little more than just data structured

yeah there's there's these other two pieces that we tend to talk about right

we tend to talk about a heap and we tend to talk about a stack

now i will draw the for this class i will

always draw it in this way that means that byte zero like is down

here and whatever the kind of max of the address space is down here

some people draw it the other way i find that confusing so i don't do it that way

that's why it's great to be a professor you just decide stuff and then people

are stuck with it so the heap and the stack

are dynamically sized and they you know they change as we go

for example the heat in a c program when does it how does the heat grow when does

the heat grow

sorry dynamics

dynamic memory allocation yes i can't see where the voice is coming from

because i can't see you know the masks and all that we're

going to need so anyway dynamic memory allocation which is done by calling

uh mala right and because you're good programmers you

know malik has a friend it's called free

so malik and free allow us to have get some space in our heat

and sometimes the heat has to grow to accommodate that space

what types of things do we put in the heat it's all reviewed

by sincere qualities

what are your favorite data structures

sure

it's like a protest against the fact that we're going to be using c all

semester which

is going to fall upon deaf ears

and you have functions that is how we used to do it

and then people came along with all this other stuff so yes you could put some

kind of structures in there you can put you can make a linked list you can make

whatever your favorite should be you know all the data structures you've

learned already now the stack is a little more you can

notice here in our running program this is very much a sea based view of the

world but it's going to be the case that

and we are in charge of what's on the heap very directly in our code like you

can see it right there so i would say that this is some people

would say this is explicit right it's explicitly out but you're

doing these explicitly in your code stack allocation is a bit different and

i'm going to say it's implicit

it's implicit because things get allocated on the stack

well when when does when do things

a function might have for example let's say we have some function

uh you know returns an int or something like that some function here and maybe

it has on it like you're you're declaring some variables inside of it

dot dot when you call into the function f

a bunch of sound is going to happen and we'll talk more about this in the

discussion when we get a little bit more detail

but it's essentially implicit but it's implicit when we

we're going to be able to have those are going to be allocated on the stack when

you return from that function all those things are automatically

de-allocated and so that's why it's implicit

sometimes people call it automatic memory because it's automatically

allocated and be allocated as we go in and out of function context

all this should be reviewed if this is all like like sounds really complicated

it's it's either time to read up or you're gonna have a long semester so my

apologies for that sometimes i sound harsh sometimes i sound harsher than i

mean to i don't mean to i'm pretty nice guy so in any case automatic memory

implicit stack that should all kind of be kind of in your head

any questions i'll just review

okay good all right so

that's how a program runs it's it's it gets now there's a piece that we

kind of didn't talk about right we had our very simple model here

of cpu and memory a more realistic model which i'll just mention briefly we'll

have cpu we'll have memory

but we also have some kinds of other devices in the system one we'll talk a

lot about is what i'll just call a disk for historical reasons

let's make some boxes as i like to do

a disc often is represented by a cylinder when it's a hard drive modern

systems you have different types of discs which are just persistent

memory devices so down here we have

what we'll call a persistent memory device

or sometimes people call it non-volatile

and up here we have something that's not persistent or volatile which is memory

memory tends to be made of like some technology we call dram

disk can be many different things it'll be a hard drive if you're talking about

for example if you work at google and you're in charge of storing every

youtube video that exists in the world which apparently there are a lot of

that's what i hear so if you're in charge of that you're

going to store them on hard drives and why are you going to do that

actually guess why are we going to do that why would we have faster better

technologies than hard drives why does google engineers probably some smart

people why do they choose to store all your

youtube videos on hard drives not something

fancier and faster cheaper that's answered a lot of

questions in this class cheaper so yeah it's 100 cheaper hard drives are

the cheapest way to store bytes persistently but we also have other

things that we'll talk about in this class like a flash-based ssd or

solid-state storage device and even more modern technologies

all these things are happening as we speak actually kind of a cool time

so somehow these disks are connected to the system and when we talk about a

program running usually there's actually some other steps involved for example

the program like it's compiled executable usually lives on the disk

somewhere at first then when you run the program

you're going to load it into memory right you load it up here

and then we can start executing it and of course it may also store data or

access other data on the disk whatever the disk is etc etc and of course there

are other things to think about too for example there's displays there's other

sorts of dev you know other devices that we have to interact with we'll talk

about those at some point during the course

so the picture is a little bit more complicated for many for many parts of

the class we can focus on just a cpu and memory later on we'll add in other

devices and disks and so forth okay

so just a bit of an aside there about a slightly more complex model which again

should already be in your head review okay so where were we

we were asking a few questions you're like who is that guy yes it's still me

ramsay how do computers work now you know we have reviewed all of computers

you now know how they work congratulations now we have to go to

this next piece which is what is an os

and i will do this again and

bring it down here by the way we will also do this other thing in class which

people will remember as the best part of class which is after this we will take a

short break so years from now you'll be like i don't

remember much about this class but we took breaks and that was pretty cool

that's what people tell me i've had a lot of alums tell me that it's actually

makes me very sad so please don't do that

um okay let's talk about what is an os and to do this i'm just actually going

to look at some code and this is going to be harder because i

need to type and i generally type with my two hands

so i'm not sure what i'm gonna do at this point but we're gonna suffer

through it so let's see what happens okay i'm really frustrated by this

this should work let me try again

does this it doesn't work does it oh that is so irritating

what just oh it's in my mask this is thinking

i like this this is the world we're living in

does this work i look like an idiot

though who cares you can't see who i am even i mean my

face is hidden does this actually work yeah yeah

that is so stupid okay please do not take a picture i

don't know someone's gonna take a picture

okay so let's look at some code i really feel very silly doing this

okay fantastic this is a really stupid piece

of code can you read it

first things first we check if the right number of arguments have been given to

the program and if not we print out an error message fantastic good practice

then what do we do what does it look like you don't even

know what spin does i think the hair isn't big enough

in the back are you challenged by the way the problem with putting the

microphone on this is it's slowly pulling down the mask and my sweating

face and of course that could be awkward at

some point because then it'll be under my chin and i will seemingly be breaking

all covered protocols i'm going to need a camera

so what is something somebody guess what this program is doing and i'll tell you

what spin does because we'll just actually look at it

nothing better than looking at code people always say you should comment

your code blah blah blah you should just write really clear code first

then you should comment if needed clear code is the best comment

okay that's going to be in contrast to what everyone else tells you so my

apologies for that so spin

what does spin do somebody tell me you say spin for one

just sitting there spinning doing nothing right just asking hey has it

been long enough so if you say spin for one it basically waits for one second

and then you know sits there and uses the cpu for one second asking what time

it is and then returns okay makes sense okay so let's pop back here

so then what does this program do somebody else

nothing interesting yes

yeah perfect every second it prints out the string

let's see if that works pretty exciting

cpua we have run our first program in this

class let us remember this moment

and when a program runs a program is a compiled lifeless thing you compile your

c code into a binary executable that's a program there's nothing that interesting

about a program it's just sitting there as a bunch of bits

when we run the program we bring it to life we turn it into what we're going to

follow a process we'll get to this terminology

later the very earliest people of computing

understanding systems invented this tournament term because they realize

there's something different about a running program than a lifeless static

program so the process is running you can see it's pretty boring here

but there's this kind of amazing thing that we can do we can actually

run many programs at once in fact you do

this all the time on your computer what kind of programs are you running you're

running a browser you're running i don't know music you're watching a youtube

video you're doing something with a discord which i don't even know what

that is but we're going to be using it in class

you're looking on piazza to see if somebody actually figured out all the

bugs in the assignment so you can now finally start doing it you're doing lots

of things because you're clever

multitasking you know whatever generation you are now i don't keep

track of these things what generation are the people in the room

z now unimaginable we have x and then we talk okay let's do y and then we do z so

what's next we just wrap around

it's kind of like the x people didn't plan ahead they're like let's call this

group and we're going to run out soon but okay

anyway that wasn't a side that was not planned

by the way okay so we can run a bunch of programs at once

this is not too exciting because this program is super boring but we can do it

in fact we can run hundreds at once look i'm running four here at once

and even the earliest computer systems which only had one

cpu my mind of course my laptop has a pcb here's due to now but the earliest

systems have just one cpu i mean it's amazing the early systems

cost millions of dollars and ran much more slowly than any of the computers

you've ever used in your life but but that was the beginning of the computing

era and they could run many many programs at once

so how do you

can think multiple programs at once yeah

it's an illusion and the illusion is

you run one for a little bit then you run the next you stop this one then you

run the next one and you stop it you run the next one

and you keep going like that and then which which system does that

well that's the operating system so i'm going to stop these now

of using kill all by the way very useful if you want to kill a bunch of programs

with the same name kill all kill is how you stop things it

sounds a little grim not that bad but it's what what we're doing so like

if we're going back to our our our note taking here when we're saying um what an

os does well from

one big task is what we call virtualization

and what that is is essentially turning say one

physical thing

whatever thing is this is a very precise term

into many

virtual ones

virtualization okay in fact the whole first part of the

class will be studying techniques that people have developed for many decades

to virtualize computer systems what we just saw was what i would call a

virtualization of the cpu so it may seem like we have

one cpu

but the operating system somehow switches between all these programs back

and forth really quickly and allows this illusion this beautiful

illusion that we have as many cpus as we need

okay so this is absolutely it's an illusion

but it's a useful illusion

you might have talked about this summon 354 which is great then we're reviewing

fantastic so so far we talked about virtualization

of cpu let's look at another example

okay here's a pretty boring program

let's look at it for a second

scroll down a little bit you can see there's a value it's in

memory and what this

here we have an address of value inside of it then i print out what that address

is

we didn't talk about a third part of where data was just just like global

variables

for the lower addresses in my diagram and all we do here well what does this

loop do other than spin

just as one for the value of so when p is an average

i hated that you're going to have a very long time

so we're going to review that we're going to even maybe do like a little bit

of a sea boot camp working with the tas on that as we speak

we'll review it a little bit tonight but absolutely the one thing you're

going to have to do to have success in this class is have a good model of c and

pointers and how memory is used

if that sounds like bad well like i said it's going to be a long

semester so this just updates that value over and over again so let's do that not

too interesting you can see it running updating the

value and you can also see a couple things

so if you look at the address

way down this when we look at the address that's

stored in p which is address of value you can see it's a much different kind

of address it's much lower and that's where the global variables are stored

it's a much you know higher up in my picture lower address

makes sense okay now what's kind of interesting too

is we can run multiple versions of this program together too

at the same time right let's let's start two instances of mem two processes

same program but we're going to have two different processes running at the same

time and what they do is

well let's look at it

okay that's enough now interestingly

if you look at what they each printed out

um in fact the first thing on the line i printed out this thing called the id

it's a process identifier each running process has a name

and that name is actually just a number i mean it's a little bit of a boring

world that the operating system imagines it's like each of you have a name what's

my name it's 3 000 uh and whatever sorry 30 000.

so you know you're running process your name isn't

that interesting it's just a number and you can see that the two processes are

running they have different numbers so we can refer to them differently

but you can see they're referring to what looks like the same address

right they're each referring to the same stack

so that's a bit weird we have one memory each program thinks

they're accessing those addresses so what's going on well as you might

have guessed since this whole part of the class is about

virtualization that we're virtualizing

what are we going to talk about virtualizing

we're virtualizing the cpu and we're virtualizing memory

so you can think of that like this each process

which is again just a running program

has the illusion

of its

own cpu

and its own memory

there's only one memory in the system it's addressed from zero to whatever the

size of the physical memory is in a modern modern system

right 16 whatever 32 8 16 34 whatever some some number like that

i mean that that already that make that number makes me feel old too because

when i was in graduate school in a different century i was very excited

because they're like you have a new workstation it costs probably like 15

000 it's on your desktop it was a huge tv in

my face which made me slowly go blind and and inside the computer it was a

processor that was it was an exciting milestone for a computer it was a one

mips processor which means it executed one million instructions per second

and it had something like one megabyte of memory

so we're a bit off of that it's quite a bit um you know quite a bit has changed

in this time since but the basic techniques of the virtualization

actually haven't changed that much and what we have here is this beautiful

illusion that you have your own memory for your own program

and when we switch and we're running a different program it has an illusion of

having its own memory we're going to learn exactly how that works there's a

bunch of mechanisms policies all this cool stuff that happens underneath the

hood of an operating system to make that work

okay so virtualization in fact virtualization

i organized this course into three pieces and you may have noticed a

textbook it's called three easy pieces you'll agree with at least two of those

words there are three pieces it may be easy but it depends on you it may be

some other words that people have used to describe the pieces that's up to you

you can keep that in mind yourself the first piece is personalization

okay i'm gonna look at one more piece and then we'll take a break so we can

revive it's hot in here my face is sweating i'm doing this stupid thing

with the mic but let's just do that let's just look

at one more piece the second piece

okay this is kind of cool

okay how many of you have written a

multi-threaded program of some kind

okay why did you do it for fun or because the

class made you

fun

okay cool so someone did it for work someone did it for fun did they any

other reasons if some people wrote a multi-threaded program

passion okay i don't know people do things for lots of reasons so a

multi-threaded program it's kind of this interesting thing you will be writing

multi-credit in this course

you can think about this and not understand this fully today but it's

kind of like having one process that's running that has a bunch

of independent activities happening inside of it at the same time

and so we can think of for example like and where that's useful there's a lot of

reasons that's useful we'll talk about that a lot but one of the reasons it's

useful is you can write a parallel program that's one reason for example so

let's say you have some tasks that you want to do like

you know look take an image and transform it like apply filter to it you

can for example take parts of that image create what we call threads or these

little independent activities inside the program

you can create those have them each kind of do a transformation on the part of

the image at the same time and if you have multiple cpus on your system which

most do it'll run faster so parallelism is one

reason we have these multi-threaded programs and if you don't know what this

means that's totally cool no big deal okay so let's look at this

multi-threaded program now

what we're going to do at the beginning is we're going to create what are called

two threads okay and this is going to be the second

part of this course it's about what we call concurrency

we're going to create two threads and there that you can see the third

argument to that p thread create or die routine which is called the worker and

that says what function to start running these threads in which is this worker

function up here

and you can see what this worker function is doing

it's just updating a counter loose number of times okay does it make sense

so if you pass 10 to the worker 10 moves right

then each worker will update the counter 10 times so it goes from zero to ten

people so we have two workers which we can do

here and this is how we create two press

which is calling create and create our values failed

and then join just

history of multi-threading programs it's just waiting for the threads to complete

so we wait for the boat to complete so let's say we gave each

thread you know 10 moves to run through they're updating the same counter

and let's say we told them each update encountered 10 times what value should

we print out at the end of account using our friend multiplication two

threads they should update n what number should we print out who is the bold math

adventurer is going to multiply 2 times 10.

20. does that make sense any questions about that

okay quick question no

okay let's see if what happens

works so these threads each kind of update the

counter 10 times that make sense okay

so let's do it a little longer

hundred thousand times what should this print out

yeah that's exactly right

so somebody answered what should turn out

hey is this computer broken

let's run it again

huh one more time it'll probably get it

right on the third time that's what i've learned

oh no it didn't okay we have a problem

for us and these threads are creating some new problems for us and creating

programs that work correctly we are really used to one thing about computers

they're deterministic and they produce the same output when we

do the same thing over and over again but when we create multi-threaded

programs some very interesting interactions happen

and now we're not going to understand deeply why that happens today

but i'm going to give you a hint of why it happens

and this is the second part of the course which is focuses on threads and

what we call the topic of concurrency what happens when you have a lot of

stuff happening at once here we have these

so topic one virtualization topic two concurrency

and what's happening is we have thread one over here and thread two over here

and what they're each doing is they're trying to update

well let's look at that code for a second

they're trying to update that counter right they're doing this counter

plus plus repeatedly and they're updating the same counter

because they're because they're threads they're

operating on the same data they work in the same address space right so they're

not independent programs operating on different data which is what separate

processes do they're the same piece of code the same program same

operating on the same data in the same address space

and the problem that's happening i'm just previewing this and we're going to

understand this very deeply later in the course is to do something like a counter

plus plus well what kind of assembly instructions

might that look like what does that look like at an

assembly or instruction level

yeah so there's certainly an ad in here but there's often actually an

instruction sequence right like there might be a load of some kind and then an

add a load say of the value of the counter into some sort of register

then maybe an add of one to that register and then a store of that

register back into memory and that's what's happening over here

too in this other thread and what happens once in a while in this

multi-threaded program is that the two loads happen at the same

time so you both load saving value 10. you each update it independently to 11

and then you each store back the number 11

so instead of adding twice we've essentially added one

in parallel at the same time so we haven't accomplished what we've tried to

do now if we don't understand that that's

okay we're going to get into that in great detail and the coolest part about

the concurrency part of the class is absolutely you're going to stare

at like four lines of code and have a hard time understanding it because it's

very hard to imagine all the possibilities of threads running through

code sequences at the same time so we can actually readily address this

and those of you who have written multi-threaded code

understand there's this thing we call it's called a lock

and what a lock does is when there are multiple threads

trying to enter a piece of code at the same time what

the lock does is make sure that only one can get in there and do the right thing

which is an updated pattern so even though both threads are trying to do it

at the same time that's a that's a problem we're going to

encounter and we're going to solve it by putting locks around these pieces of

code and ensuring only one thing can happen at a time

and so when we run this version of the code sorry

version 1 it should just always give the right

value regardless of how many times we you know how long you run the program

for it so there's much to learn about threads

and concurrency it's absolutely intellectually the hardest thing we're

going to do i would say in this course and it requires us to think of it

differently there's a question so would laughing

slow the program yeah fantastic observation with locking

some of the program down general answer is generally yes it would

it's gonna it's going to make it in this case that only one thing can happen so

when we're structuring a program if we want to run quickly and in parallel we

have to think about how to divide things up so that they can run independently

and they aren't constantly blocking and unlocking and competing

and that's when you're writing a program like that you often think about these

synchronization issues that they're calling how do you get the threads to

work in harmony and have a lot of parallelism perhaps this happens inside

the operating system all the time when people are trying to design operating

systems that work well on many processors they have to think carefully

about the data structures they have to make sure that they're not constantly

being stuck on this one lock trying to access it all at the same time so we'll

get into that but absolutely good observation

other questions yeah

yeah fantastic question so the question is could i could have

just done this in a better way could i basically have two separate counters

have each thread updating it's kind of a silly program to begin with but you have

each thread updated each independent counter and then kind of after the

threads are done kind of just add those two together and therefore kind of get

the work to happen in parallel and absolutely you can do things like that

and when people think about writing parallel programs they think about

strategies like that how can i divide this work so that we don't have to

synchronize all the time absolutely and we'll talk about some examples of that

of course we can't get into too deeply because we're just going to touch on

some of the basics yeah

great another really good question and after

this we'll just take a brief break does locking

what time is class at 6 45 i've waited way too long for this break this shows

that i have not taught this class in a few years my extreme apologies

so the question is locking requires special

instructions from the instruction set and the answer is yes short answer is

yes and and we'll talk about those

instructions and what hardware support we need to build locks correctly this is

something that people realize very early on in computer systems the first systems

they were building they were trying to figure out how to build the correct

operating system they realized they needed more powerful instructions than

just loads of stores it's really hard there's some people that did some work

on how do you do it just with loads and stores it's very hard to do so modern

systems all use special instructions and we'll talk about those

so way too late in the class we're going to take just a brief break my apologies

we'll come back in like three minutes so just stretch

see your old friend from across the room wave say hi and we'll come back