# Intro, Number Representation

https://www.youtube.com/watch?v=mGgOK9ShS6g&list=PLnvUoC1Ghb7zZQMvvYvPeIJH6x1cyVk7w&t=15s

https://inst.eecs.berkeley.edu/~cs61c/fa20/pdfs/lectures/lec02.pdf

通常数据来源于模拟领域，需要将其转换为数字。

因此，为了将模拟数据转换为数字数据，我们必须做两件事：第一，我们必须进行采样，这意味着我们必须在每个时间步长问它你的值是多少，这通常是一个定期的间隔，例如，对于音乐来说，CD是每秒44 100次，我们要问它的高度是多少，但问题是高度可能会

is that bits can represent anything they can represent characters well i've got

26 characters a through z so i'm going to use five

bits two to the five is 32 and so i'll have one of these bit

patterns for each of those characters well actually probably i want to have

uppercase and lowercase and some punctuate punctuation

so let's do seven bits and in fact we'll reserve eight bits for it but actually

we'll only use seven bits for all the characters we'll need

and that's called ascii american standard code for information

interchange then you're gonna say well dan that's a

little uh american centric and i'd say you're right that that's what the a was

for and ascii so it turns out that a group of folks

says well how about my language and my language and my language and so

a consortium came around called unicode with the idea that

you would have the ability to store all the world's symbols

used in all the world's languages it turns out there's a lot of those symbols

so they then had different versions they have an 8-bit a 16-bit and a 32-bit

version of unicode and so you can now by the way emojis are

also part of unicode it's pretty cool so you can have many many symbols all the

chinese characters all the you know all the other languages

characters uh beautiful beautiful language beautiful

patterns of how those characters represented

all represented in in the unit code probably you need more than eight bits

for that though you also represent logical values zero

is false one is true is a common way we do that

how about colors here's r g and b red green and blue

uh zero zero is red zero one is green and

one one is blue that's just to make it there you can you don't have to have it

in order by the way you could do that that way

locations addresses commands emotions happy is zero zero kind of grumpy is

zero one you can end up having a bit pattern for

everything anything you can itemize you can digitize it's pretty

exciting so here's the big idea of this lecture

memorize this remember i'm gonna have a couple of times during this lecture

i'm gonna say memorize this this is one of those times

n bits is two to the n things or said another way if i've got two to

the n i've got some number of things how many bits do i need

i take the log base two of that and take the ceiling of that and that's the

number of bits i need okay so 28 26 character 26 letters as example 26

letters okay log base 2 of that is 4 point something

the ceiling of that is 5 therefore i need 5 because 2 to the 5 is 32

so it's the biggest power of 2 bigger than the number of things i want to

store all right see the next video