# Lab 6 翻译

Assigned: Monday, May 3, 2021
Due: Wednesday, May 19, 2021 11:59 PM EST

## 0. Introduction
In this lab you will implement log-based rollback for aborts and log-based crash recovery. We supply you with the code that defines the log format and appends records to a log file at appropriate times during transactions. You will implement rollback and recovery using the contents of the log file.

在这个实验中，你将实现基于日志的中止回滚和基于日志的崩溃恢复。我们为你提供了定义日志格式的代码，并在交易过程中的适当时候将记录附加到日志文件中。你将使用日志文件的内容实现回滚和恢复。

The logging code we provide generates records intended for physical whole-page undo and redo. When a page is first read in, our code remembers the original content of the page as a before-image. When a transaction updates a page, the corresponding log record contains that remembered before-image as well as the content of the page after modification as an after-image. You'll use the before-image to roll back during aborts and to undo loser transactions during recovery, and the after-image to redo winners during recovery.

我们提供的日志代码产生的记录旨在用于物理的整页撤销和重做。当一个页面第一次被读入时，我们的代码会记住该页面的原始内容，作为一个之前的图像。当一个事务更新一个页面时，相应的日志记录包含记忆中的before-image以及修改后的页面内容作为after-image。你将使用before-image在中止过程中回滚，并在恢复过程中撤销失败的事务，而after-image则在恢复过程中重做胜利者。

We are able to get away with doing whole-page physical UNDO (while ARIES must do logical UNDO) because we are doing page level locking and because we have no indices which may have a different structure at UNDO time than when the log was initially written. The reason page-level locking simplifies things is that if a transaction modified a page, it must have had an exclusive lock on it, which means no other transaction was concurrently modifying it, so we can UNDO changes to it by just overwriting the whole page.

我们能够摆脱做整个页面的物理UNDO（而ARIES必须做逻辑UNDO），因为我们做的是页级锁，而且我们没有索引，在UNDO时的结构可能与最初写日志时不同。页级锁简化了事情的原因是，如果一个事务修改了一个页面，它一定有一个独占锁，这意味着没有其他事务在同时修改它，所以我们可以通过覆盖整个页面来UNDO对它的修改。

Your BufferPool already implements abort by deleting dirty pages, and pretends to implement atomic commit by forcing dirty pages to disk only at commit time. Logging allows more flexible buffer management (STEAL and NO-FORCE), and our test code calls BufferPool.flushAllPages() at certain points in order to exercise that flexibility.

你的BufferPool已经通过删除脏页实现了中止，并通过在提交时强制脏页到磁盘来假装实现原子提交。日志允许更灵活的缓冲区管理（STEAL和NO-FORCE），我们的测试代码在某些地方调用BufferPool.flushAllPages()，以行使这种灵活性。

## 1. Getting started
You should begin with the code you submitted for Lab 5 (if you did not submit code for Lab 5, or your solution didn't work properly, contact us to discuss options.)

你应该从你为实验5提交的代码开始（如果你没有为实验5提交代码，或者你的解决方案没有正常工作，请与我们联系，讨论各种方案）。

You'll need to modify some of your existing source and add a few new files. Here's what to do:

你需要修改一些现有的源代码并添加一些新的文件。下面是要做的事情。

First change to your project directory (probably called simple-db-hw) and pull from the master GitHub repository:

首先切换到你的项目目录（可能叫simple-db-hw），并从GitHub主仓库拉取。

    $ cd simple-db-hw
    $ git pull upstream master

Now make the following changes to your existing code:

现在对你现有的代码做如下修改。

Insert the following lines into BufferPool.flushPage() before your call to writePage(p), where p is a reference to the page being written:

在调用writePage(p)之前，在BufferPool.flushPage()中插入以下几行，其中p是对被写入页面的引用。

    // append an update record to the log, with 
    // a before-image and after-image.
    TransactionId dirtier = p.isDirty();
    if (dirtier != null){
      Database.getLogFile().logWrite(dirtier, p.getBeforeImage(), p);
      Database.getLogFile().force();
    }

This causes the logging system to write an update to the log.
We force the log to ensure the log record is on disk before the page is written to disk.

这将导致日志系统向日志写入更新。
我们强迫日志在页面被写入磁盘之前确保日志记录在磁盘上。

Your BufferPool.transactionComplete() calls flushPage() for each page that a committed transaction dirtied. For each such page, add a call to p.setBeforeImage() after you have flushed the page:

你的BufferPool.transactionComplete()为每一个被提交的事务搅乱的页面调用flushPage()。对于每一个这样的页面，在你刷新页面之后，添加一个对p.setBeforeImage()的调用。

    // use current page contents as the before-image
    // for the next transaction that modifies this page.
    p.setBeforeImage();

After an update is committed, a page's before-image needs to be updated so that later transactions that abort rollback to this committed version of the page. (Note: We can't just call setBeforeImage() in flushPage(), since flushPage() might be called even if a transaction isn't committing. Our test case actually does that! If you implemented transactionComplete() by calling flushPages() instead, you may need to pass an additional argument to flushPages() to tell it whether the flush is being done for a committing transaction or not. However, we strongly suggest
in this case you simply rewrite transactionComplete() to use flushPage().)
After you have made these changes, do a clean build (ant clean; ant from the command line, or a "Clean" from the "Project" menu in Eclipse.)

在一个更新被提交后，一个页面的before-image需要被更新，以便后来的事务中止时回滚到该页面的这个提交版本。(注意：我们不能在flushPage()中直接调用setBeforeImage()，因为即使事务没有提交，flushPage()也可能被调用。我们的测试案例实际上就是这样做的! 如果你通过调用flushPages()来实现transactionComplete()，你可能需要给flushPages()传递一个额外的参数，告诉它是否为一个正在提交的事务进行刷新。然而，我们强烈建议在这种情况下，我们强烈建议你简单地重写 transactionComplete() 以使用 flushPage()。 在你做了这些修改之后，做一个干净的构建（ant clean; ant from the command line, or a "Clean" from the "Project" menu in Eclipse.）

At this point your code should pass the first three sub-tests of the LogTest systemtest, and fail the rest:

在这一点上，你的代码应该通过LogTest系统测试的前三个子测试，而其余的则失败。


    % ant runsystest -Dtest=LogTest
    ...
    [junit] Running simpledb.systemtest.LogTest
    [junit] Testsuite: simpledb.systemtest.LogTest
    [junit] Tests run: 10, Failures: 0, Errors: 7, Time elapsed: 0.42 sec
    [junit] Tests run: 10, Failures: 0, Errors: 7, Time elapsed: 0.42 sec
    [junit] 
    [junit] Testcase: PatchTest took 0.057 sec
    [junit] Testcase: TestFlushAll took 0.022 sec
    [junit] Testcase: TestCommitCrash took 0.018 sec
    [junit] Testcase: TestAbort took 0.03 sec
    [junit]     Caused an ERROR
    [junit] LogTest: tuple present but shouldn't be
    ...
If you don't see the above output from ant runsystest -Dtest=LogTest, something has gone wrong with pulling the new files, or the changes you made are somehow incompatible with your existing code. You should figure out and fix the problem before proceeding; ask us for help if necessary.

如果你在ant runsystest -Dtest=LogTest中没有看到上述输出，说明在拉取新文件时出了问题，或者你所做的修改与你现有的代码有某种不兼容。你应该在继续进行之前找出并解决这个问题；如果有必要，请向我们寻求帮助。


## 2. Rollback
Read the comments in LogFile.java for a description of the log file format. You should see in LogFile.java a set of functions, such as logCommit(), that generate each kind of log record and append it to the log.

阅读LogFile.java中的注释，以了解对日志文件格式的描述。你应该在LogFile.java中看到一组函数，比如logCommit()，它们生成每一种日志记录并将其追加到日志中。

Your first job is to implement the rollback() function in LogFile.java. This function is called when a transaction aborts, before the transaction releases its locks. Its job is to un-do any changes the transaction may have made to the database.

你的第一项工作是实现LogFile.java中的rollback()函数。当一个事务中止时，在该事务释放其锁之前，这个函数被调用。它的工作是解除事务可能对数据库做出的任何改变。

Your rollback() should read the log file, find all update records associated with the aborting transaction, extract the before-image from each, and write the before-image to the table file. Use raf.seek() to move around in the log file, and raf.readInt() etc. to examine it. Use readPageData() to read each of the before- and after-images. You can use the map tidToFirstLogRecord (which maps from a transaction id to an offset in the heap file) to determine where to start reading the log file for a particular transaction. You will need to make sure that you discard any page from the buffer pool whose before-image you write back to the table file.

你的回滚()应该读取日志文件，找到所有与中止事务相关的更新记录，从每个记录中提取之前的图像，并将之前的图像写到表文件中。使用raf.seek()在日志文件中移动，使用raf.readInt()等来检查它。使用readPageData()来读取每张前后的图像。你可以使用map tidToFirstLogRecord（它从交易ID映射到堆文件中的偏移量）来确定从哪里开始读取特定交易的日志文件。你需要确保从缓冲池中丢弃任何你写回表文件的前图像的页面。

As you develop your code, you may find the Logfile.print() method useful for displaying the current contents of the log.

当你开发你的代码时，你可能会发现Logfile.print()方法对于显示日志的当前内容很有用。

## Exercise 1: LogFile.rollback()

Implement LogFile.rollback().

After completing this exercise, you should be able to pass the TestAbort and TestAbortCommitInterleaved sub-tests of the LogTest system test.

完成这个练习后，你应该能够通过LogTest系统测试的TestAbort和TestAbortCommitInterleaved子测试。

## 3. Recovery
If the database crashes and then reboots, LogFile.recover() will be called before any new transactions start. Your implementation should:

如果数据库崩溃，然后重新启动，LogFile.recover()将在任何新事务开始之前被调用。你的实现应该。

Read the last checkpoint, if any.

读取最后一个检查点，如果有的话。

Scan forward from the checkpoint (or start of log file, if no checkpoint) to build the set of loser transactions. Re-do updates during this pass. You can safely start re-do at the checkpoint because LogFile.logCheckpoint() flushes all dirty buffers to disk.

从检查点（如果没有检查点，则从日志文件开始）向前扫描，以建立失败的事务集。在这个过程中进行重做更新。你可以安全地在检查点开始重做，因为LogFile.logCheckpoint()会将所有的脏缓冲区刷到磁盘上。

Un-do the updates of loser transactions.

取消对失败者交易的更新。

## Exercise 2: LogFile.recover()

Implement LogFile.recover().

After completing this exercise, you should be able to pass all of the LogTest system test.

完成这个练习后，你应该能够通过所有的LogTest系统测试。

## 4. Logistics
You must submit your code (see below) as well as a short (1 page, maximum) writeup describing your approach. This writeup should:

你必须提交你的代码（见下文），以及描述你的方法的简短（最多1页）的文章。这篇报告应该

Describe any design decisions you made, including anything that was difficult or unexpected.

描述你所做的任何设计决定，包括任何困难或意外。

Discuss and justify any changes you made outside of LogFile.java.

讨论并论证你在LogFile.java之外所做的任何改动。

## 4.1. Collaboration

This lab should be manageable for a single person, but if you prefer to work with a partner, this is also OK. Larger groups are not allowed. Please indicate clearly who you worked with, if anyone, on your writeup.

这个实验对一个人来说应该是可以应付的，但如果你喜欢和一个伙伴一起工作，这也是可以的。不允许有较大的团体。如果有的话，请在你的报告中明确指出你和谁一起工作。

## 4.2. Submitting your assignment

We will be using gradescope to autograde all programming assignments. You should have all been invited to the class instance; if not, please let us know and we can help you set up. You may submit your code multiple times before the deadline; we will use the latest version as determined by gradescope. Place the write-up in a file called lab3-writeup.txt with your submission. You also need to explicitly add any other files you create, such as new *.java files.

我们将使用gradescope对所有编程作业进行自动评分。你们应该都被邀请到班级实例中；如果没有，请告诉我们，我们可以帮助你们设置。你可以在截止日期前多次提交你的代码；我们将使用由gradescope确定的最新版本。把写好的东西放在一个叫lab3-writeup.txt的文件里，和你的提交一起。你还需要明确地添加你创建的任何其他文件，如新的*.java文件。

The easiest way to submit to gradescope is with .zip files containing your code. On Linux/MacOS, you can do so by running the following command:

向 gradescope 提交的最简单方法是使用包含你的代码的 .zip 文件。在Linux/MacOS上，你可以通过运行以下命令来实现。

    $ zip -r submission.zip src/ lab6-writeup.txt

## 4.3. Submitting a bug

SimpleDB is a relatively complex piece of code. It is very possible you are going to find bugs, inconsistencies, and bad, outdated, or incorrect documentation, etc.

SimpleDB是一个相对复杂的代码。你很可能会发现错误、不一致，以及糟糕的、过时的或不正确的文档等等。

We ask you, therefore, to do this lab with an adventurous mindset. Don't get mad if something is not clear, or even wrong; rather, try to figure it out yourself or send us a friendly email. Please submit (friendly!) bug reports to 6.830-staff@mit.edu. When you do, please try to include:

因此，我们要求你以一种冒险的心态来做这个实验。如果有不清楚的地方，甚至是错误的地方，不要生气；相反，可以自己试着去解决，或者给我们发一封友好的电子邮件。请提交（友好的！）错误报告到6.830-staff@mit.edu。当你这样做时，请尽量包括。

A description of the bug.

A .java file we can drop in the src/simpledb/test directory, compile, and run.

A .txt file with the data that reproduces the bug. We should be able to convert it to a .dat file using PageEncoder.

You can also post on the class page on Piazza if you feel you have run into a bug.

对该错误的描述。

一个.java文件，我们可以把它放到src/simpledb/test目录下，进行编译，然后运行。

一个包含再现该错误的数据的.txt文件。我们应该能够用PageEncoder将其转换为一个.dat文件。

如果你觉得你遇到了一个bug，你也可以在Piazza上的班级页面上发帖。


## 4.4 Grading
75% of your grade will be based on whether or not your code passes the system test suite we will run over it. These tests will be a superset of the tests we have provided. Before handing in your code, you should make sure it produces no errors (passes all of the tests) from both ant test and ant systemtest.

你的成绩的75%将基于你的代码是否通过我们将对其进行的系统测试套件。这些测试将是我们提供的测试的一个超集。在交出你的代码之前，你应该确保它在ant test和ant systemtest中没有产生错误（通过所有的测试）。

Important: before testing, gradescope will replace your build.xml, HeapFileEncoder.java and the entire contents of the test directory with our version of these files. This means you cannot change the format of .dat files! You should also be careful changing our APIs. You should test that your code compiles the unmodified tests.

重要的是：在测试之前，gradescope 会用我们的版本替换你的 build.xml、HeapFileEncoder.java 以及测试目录中的全部内容。这意味着你不能改变.dat文件的格式! 你也应该小心改变我们的API。你应该测试你的代码是否编译了未修改的测试。


You should get immediate feedback and error outputs for failed tests (if any) from gradescope after submission. The score given will be your grade for the autograded portion of the assignment. An additional 25% of your grade will be based on the quality of your writeup and our subjective evaluation of your code. This part will also be published on gradescope after we finish grading your assignment.

在提交后，你应该从 gradescope 得到即时反馈和失败测试的错误输出（如果有的话）。给出的分数将是你在作业的自动评分部分的成绩。另外25%的分数将基于你的写作质量和我们对你代码的主观评价。在我们给你的作业评分后，这部分也将在 gradescope 上公布。

We had a lot of fun designing this assignment, and we hope you enjoy hacking on it!

我们在设计这项作业时非常有趣，我们希望你能享受到黑客的乐趣!