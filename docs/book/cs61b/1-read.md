# 1.1 Essentials 基本要素

Hello World

第一个Java程序。当运行时，下面的程序会在屏幕上打印出 "Hello world!"。

    public class HelloWorld {
        public static void main(String[] args) {
            System.out.println("Hello world!");
        }
    }

对于那些学过Python的人来说，可能看起来很冗长。然而，这一切都有很好的理由，我们将在接下来的几周内了解到。下面是一些要点：

* 程序由一些类的声明组成，使用 publick 关键字声明。在 Java 中，所有的代码都在类中。
* 代码在这样声明 `public static void main(String[] args)` 的 main 方内部执行。
* 使用 { 和 } 来包裹代码。

这不是 Java 的 textbook， 所以不会详细解释语法细节。如果想看参考书，可以考虑 Paul Hilfinger 的免费电子书 [A Java Reference](http://www-inst.eecs.berkeley.edu/~cs61b/fa14/book1/java.pdf) ，如果想看更传统的书，可以考虑 Kathy Sierra 和 Bert Bates's 的 [Head First Java](http://www.headfirstlabs.com/books/hfjava/) 。


For fun, see Hello world! in other languages.

https://www.rosettacode.org/wiki/Hello_world/Text

Running a Java Program

The most common way to execute a Java program is to run it through a sequence of two programs. The first is the Java compiler, or javac. The second is the Java interpreter, or java.

compilationflow

For example, to run HelloWorld.java, we'd type the command javac HelloWorld.java into the terminal, followed by the command java HelloWorld. The result would look something like this:

$ javac HelloWorld.java
$ java HelloWorld
Hello World! 
In the figure above, the $ represents our terminal's command prompt. Yours is probably something longer.

You may notice that we include the '.java' when compiling, but we don't include the '.class' when interpreting. This is just the way it is (TIJTWII).

Exercise 1.1.1. Create a file on your computer called HelloWorld.java and copy and paste the exact program from above. Try out the javac HelloWorld.java command. It'll look like nothing happened.

However, if you look in the directory, you'll see that a new file named HelloWorld.class was created. We'll discuss what this is later.

Now try entering the command java HelloWorld. You should see "Hello World!" printed in your terminal.

Just for fun. Try opening up HelloWorld.class using a text editor like Notepad, TextEdit, Sublime, vim, or whatever you like. You'll see lots of crazy garbage that only a Java interpreter could love. This is Java bytecode, which we won't discuss in our course.

Variables and Loops

The program below will print out the integers from 0 through 9.

public class HelloNumbers {
    public static void main(String[] args) {
        int x = 0;
        while (x < 10) {
            System.out.print(x + " ");
            x = x + 1;
        }
    }
}
When we run this program, we see:

$ javac HelloNumbers.java
$ java HelloNumbers
$ 0 1 2 3 4 5 6 7 8 9 
Some interesting features of this program that might jump out at you:

Our variable x must be declared before it is used, and it must be given a type!
Our loop definition is contained inside of curly braces, and the boolean expression that is tested is contained inside of parentheses.
Our print statement is just System.out.print instead of System.out.println. This means we should not include a newline (a return).
Our print statement adds a number to a space. This makes sure the numbers don't run into each other. Try removing the space to see what happens.
When we run it, our prompt ends up on the same line as the numbers (which you can fix in the following exercise if you'd like).
Of these features the most important one is the fact that variables have a declared type. We'll come back to this in a bit, but first, an exercise.

Exercise 1.1.2. Modify HelloNumbers so that it prints out the cumulative sum of the integers from 0 to 9. For example, your output should start with 0 1 3 6 10... and should end with 45.

Also, if you've got an aesthetic itch, modify the program so that it prints out a new line at the end.

Gradescope
The work in this course is graded using a website called gradescope. If you're taking the University of California class that accompanies this course, you'll be using this to submit your work for a grade. If you're just taking it for fun, you're welcome to use gradescope to check your work. To sign up, use the entry code 93PK75. For more on gradescope and how to submit your work, see the gradescope guide (link coming later).

Static Typing
One of the most important features of Java is that all variables and expressions have a so-called static type. Java variables can contain values of that type, and only that type. Furthermore, the type of a variable can never change.

One of the key features of the Java compiler is that it performs a static type check. For example, suppose we have the program below:

public class HelloNumbers {
    public static void main(String[] args) {
        int x = 0;
        while (x < 10) {
            System.out.print(x + " ");
            x = x + 1;
        }
        x = "horse";
    }
}
Compiling this program, we see:

$ javac HelloNumbers.java 
HelloNumbers.java:9: error: incompatible types: String cannot be converted to int
        x = "horse";
                ^
1 error
The compiler rejects this program out of hand before it even runs. This is a big deal, because it means that there's no chance that somebody running this program out in the world will ever run into a type error!

This is in contrast to dynamically typed languages like Python, where users can run into type errors during execution!

In addition to providing additional error checking, static types also let the programmer know exactly what sort of object he or she is working with. We'll see just how important this is in the coming weeks. This is one of my personal favorite Java features.

To summarize, static typing has the following advantages:

The compiler ensures that all types are compatible, making it easier for the programmer to debug their code.
Since the code is guaranteed to be free of type errors, users of your compiled programs will never run into type errors. For example, Android apps are written in Java, and are typically distributed only as .class files, i.e. in a compiled format. As a result, such applications should never crash due to a type error since they have already been checked by the compiler.
Every variable, parameter, and function has a declared type, making it easier for a programmer to understand and reason about code.
However, we'll see that static typing comes with disadvantages, to be discussed in a later chapter.

Extra Thought Exercise

In Java, we can say System.out.println(5 + " ");. But in Python, we can't say print(5 + "horse"), like we saw above. Why is that so?

Consider these two Java statements:

String h = 5 + "horse";
and

int h = 5 + "horse";
The first one of these will succeed; the second will give a compiler error. Since Java is strongly typed, if you tell it h is a string, it can concatenate the elements and give you a string. But when h is an int, it can't concatenate a number and a string and give you a number.

Python doesn't constrain the type, and it can't make an assumption for what type you want. Is x = 5 + "horse" supposed to be a number? A string? Python doesn't know. So it errors.

In this case, System.out.println(5 + "horse");, Java interprets the arguments as a string concatentation, and prints out "5horse" as your result. Or, more usefully, System.out.println(5 + " "); will print a space after your "5".

What does System.out.println(5 + "10"); print? 510, or 15? How about System.out.println(5 + 10);?

Defining Functions in Java

In languages like Python, functions can be declared anywhere, even outside of functions. For example, the code below declares a function that returns the larger of two arguments, and then uses this function to compute and print the larger of the numbers 8 and 10:

def larger(x, y):
    if x > y:
        return x
    return y

print(larger(8, 10))
Since all Java code is part of a class, we must define functions so that they belong to some class. Functions that are part of a class are commonly called "methods". We will use the terms interchangably throughout the course. The equivalent Java program to the code above is as follows:

public class LargerDemo {
    public static int larger(int x, int y) {
        if (x > y) {
            return x;
        }
        return y;
    }

    public static void main(String[] args) {
        System.out.println(larger(8, 10));
    }
}
The new piece of syntax here is that we declared our method using the keywords public static, which is a very rough analog of Python's def keyword. We will see alternate ways to declare methods in the next chapter.

The Java code given here certainly seems much more verbose! You might think that this sort of programming language will slow you down, and indeed it will, in the short term. Think of all of this stuff as safety equipment that we don't yet understand. When we're building small programs, it all seems superfluous. However, when we get to building large programs, we'll grow to appreciate all of the added complexity.

As an analogy, programming in Python can be a bit like Dan Osman free-soloing Lover's Leap. It can be very fast, but dangerous. Java, by contrast is more like using ropes, helmets, etc. as in this video.

Code Style, Comments, Javadoc
Code can be beautiful in many ways. It can be concise. It can be clever. It can be efficient. One of the least appreciated aspects of code by novices is code style. When you program as a novice, you are often single mindedly intent on getting it to work, without regard to ever looking at it again or having to maintain it over a long period of time.

In this course, we'll work hard to try to keep our code readable. Some of the most important features of good coding style are:

Consistent style (spacing, variable naming, brace style, etc)
Size (lines that are not too wide, source files that are not too long)
Descriptive naming (variables, functions, classes), e.g. variables or functions with names like year or getUserName instead of x or f.
Avoidance of repetitive code: You should almost never have two significant blocks of code that are nearly identical except for a few changes.
Comments where appropriate. Line comments in Java use the // delimiter. Block (a.k.a. multi-line comments) comments use /* and */.
The golden rule is this: Write your code so that it is easy for a stranger to understand.

Here is the course's official style guide. It's worth taking a look!

Often, we are willing to incur slight performance penalties, just so that our code is simpler to grok. We will highlight examples in later chapters.

Comments
We encourage you to write code that is self-documenting, i.e. by picking variable names and function names that make it easy to know exactly what's going on. However, this is not always enough. For example, if you are implementing a complex algorithm, you may need to add comments to describe your code. Your use of comments should be judicious. Through experience and exposure to others' code, you will get a feeling for when comments are most appropriate.

One special note is that all of your methods and almost all of your classes should be described in a comment using the so-called Javadoc format. In a Javadoc comment, the block comment starts with an extra asterisk, e.g. /**, and the comment often (but not always) contains descriptive tags. We won't discuss these tags in this textbook, but see the link above for a description of how they work.

As an example without tags:

public class LargerDemo {
    /** Returns the larger of x and y. */           
    public static int larger(int x, int y) {
        if (x > y) {
            return x;
        }
        return y;
    }

    public static void main(String[] args) {
        System.out.println(larger(8, 10));
    }
}
The widely used javadoc tool can be used to generate HTML descriptions of your code. We'll see examples in a later chapter.

What Next
At the end of each chapter, there will be links letting you know what exercises (if any) you can complete with the material covered so far, listed in the order that you should complete them.

Homework 0
Lab 1b
Lab 1
Discussion 1
