# Go

## golang 中 make 和 new 的区别？ 
- make 用来初始化内置的数据结构（slice, map, Channel），new 则是根据传入类型为其分配一片内存空间并返回指向这片内存空间的指针。
- new 只分配内存，make用于slice，map，和channel的初始化。
- make 默认生成 0 。
- make 只能用来初始化 slice map channel 吗？
  - 也可以用于初始化结构体（struct）和指定长度和容量的动态数组（slice）。
  - 使用 make 初始化一个结构体时，返回一个指向新分配的结构体的指针。
  - 使用 make 初始化指定长度和容量的动态数组时，返回一个指向新分配的数组的指针。
 
## 数组（array）和切片（slice）的区别？ 
- 数组长度固定，切片长度可变。
- 数组中存值类型，切片中存引用。所以在函数中传递数组会产生副本，而传递切片不会产生副本，因为全是引用。
- slice 包含了三个属性，分别是指向数组的指针，当前长度，总长度。

## go defer，多个 defer 的顺序，defer 在什么时机会修改返回值？ 
- 顺序：先正着执行函数语句，再倒着回头执行 go defer 。类似 java 的 try catch 或 C++ 中的析构函数。
- 目的：`defer` 语句通常用于在函数结束前释放资源，例如关闭文件、释放锁、关闭数据库连接等。
- 思考：我认为这样设计是为了保证 defer 语句始终在最后执行，可以方便的添加操作。
- 其他：panic 会等待之前的defer执行完成后才会触发。

下面的程序的运行结果是：

```go
func main() {
if (true) {
	defer fmt.Printf("1")
} else {
	defer fmt.Printf("2")
}
fmt.Printf("3")
}
```

答案是：31 ，先输出 3 是因为 1 前面有 defer 。

## for range 的时候它的地址会发生变化么? 
- 以 `for _, v := range studs` 为例，会返回下标和 studs 指针两个变量。但是指针是不变的，变化的是存储的内容。如果直接对 $v 会导致存储的内容均为同一个地址。

## Channel 
- Channel 是用来在多个协程之间传递信息的机制。下面是一个简单的例子

```go
func main() {
    messages := make(chan string)

    go func() {
        messages <- "Hello"
    }()

    msg := <-messages
    fmt.Println(msg)
}
```

在这个示例中，首先使用 make() 函数创建了一个字符串通道 messages。然后启动一个新的协程，该协程将字符串 "Hello" 发送到 messages 通道中，即 messages <- "Hello"。最后，我们从 messages 通道中接收消息，并将其存储在变量 msg 中，即 `msg := <-messages`。最后将 msg 打印到标准输出中。

需要注意的是，当在协程之间发送和接收消息时，如果没有任何协程在等待接收消息，发送操作将被阻塞，直到有协程准备好接收。同样地，如果没有任何协程在发送消息，接收操作也将被阻塞，直到有协程发送消息为止。这种机制保证了 Channel 上的消息传递是同步的，避免了并发问题。

## select 用法，性质
- 在 Go 中，select 是一种控制流语句，用于等待多个通道上的操作，并在其中任意一个通道就绪时执行相应的操作。以下是一个使用 select 的简单示例：

```go
func main() {
    ch1 := make(chan string)
    ch2 := make(chan string)

    go func() {
        time.Sleep(1 * time.Second)
        ch1 <- "Hello"
    }()

    go func() {
        time.Sleep(2 * time.Second)
        ch2 <- "World"
    }()

    select {
    case msg1 := <-ch1:
        fmt.Println(msg1)
    case msg2 := <-ch2:
        fmt.Println(msg2)
    }
}
```

在这个示例中，创建了两个字符串通道 ch1 和 ch2，然后启动两个协程，分别向这两个通道发送字符串消息。在 main() 函数中，使用 select 语句等待 ch1 和 ch2 上的任意一个通道就绪。一旦其中任意一个通道就绪，就会执行相应的 case 语句，打印消息到标准输出。

在这个例子中，由于 ch1 上的消息先到达，所以 `msg1 := <-ch1` 的 case 语句被执行，输出 "Hello" 。如果 ch2 上的消息先到达，那么 `msg2 := <-ch2` 的 case 语句将被执行，输出 "World" 。由于 select 语句只会执行一个 case 分支，因此无论哪个通道先就绪，都只会输出一个消息。

- select 和 switch 相似，但应用场景不同。switch 用于分支判断。用于对固定数量的选项进行选择。select 用于等待多个通道上的操作，如果没有通道准备就绪就阻塞，如果有一个通道就绪则执行相应的代码块，如果有多个通道就绪则随机选择一个执行。

- 若没有指明选择哪个分支执行会存在随机性。以下三个原则：
	- 执行能返回的。
	- 若存在多个能返回的则随机选取一个。
	- 若均无法返回则执行 return 。


## Go 语言函数调用和 C 函数调用的区别？
- C 语言函数调用需要同时使用寄存器（ eax 寄存器传递返回值）和栈，而 Go 只需要栈即可。
- 因为访问寄存器的速度要快于访问栈的速度，所以 C 语言的效率更高，但实现复杂且需要考虑不同架构寄存器差异，而 Go 实现简单，不用考虑不同寄存器的差异，但是性能差。

## Go 函数参数传递是传值还是传址？
- Go 传递基本数据类型，结构体和指针均采用传值的方式。


## WaitGroup 作用并举例？
- 在 Go 中，WaitGroup 是一种同步机制，用于等待一组协程执行完毕。以下是一个简单的使用 WaitGroup 的示例：

```go
func main() {
    var wg sync.WaitGroup

    for i := 0; i < 5; i++ {
        wg.Add(1)
        go func(id int) {
            defer wg.Done()
            fmt.Println("Goroutine", id, "started")
        }(i)
    }

    wg.Wait()
    fmt.Println("All goroutines finished")
}
```

在这个示例中，首先创建一个 WaitGroup 变量 wg。然后，启动 5 个协程，每个协程都会打印出一个字符串。在每个协程中，我们使用 wg.Add(1) 方法将 WaitGroup 的计数器加 1，表示有一个协程正在执行。然后使用 defer wg.Done() 方法在协程结束时将 WaitGroup 的计数器减 1，表示一个协程已经完成。最后调用 wg.Wait() 方法等待所有协程执行完毕，直到 WaitGroup 的计数器降为 0。一旦计数器降为 0，我们就可以打印出一条消息，表示所有协程都已经执行完毕。

需要注意的是，当在协程之间进行并发操作时，我们需要使用 WaitGroup 等同步机制来确保所有协程都执行完毕。这可以避免出现竞态条件和其他并发问题。







## Go 中 context 的结构及其应用？
- 在不同协程之间传递信息。
```go
type Task struct {
    ID        int
    Name      string
    CancelCtx context.Context // 用于取消任务
    CancelFn  context.CancelFunc
}

func (t *Task) Run() {
	// 使用一个无限循环，每次循环中都会检查任务的取消状态
	for {
        select {
        case <-t.CancelCtx.Done():
            // 任务被取消，退出
            return
        default:
        }

        // 执行任务
        fmt.Printf("Running task %d (%s)\n", t.ID, t.Name)
        time.Sleep(time.Second)
    }
}

func main() {
    tasks := []*Task{
        {ID: 1, Name: "Task 1"},
        {ID: 2, Name: "Task 2"},
        {ID: 3, Name: "Task 3"},
    }

    // 启动所有任务
    for _, task := range tasks {
	    // 为每个任务创建一个可取消的 context
        task.CancelCtx, task.CancelFn = context.WithCancel(context.Background())
        go task.Run()
    }
	// 等待 5 秒后取消第二个任务
    time.Sleep(time.Second * 5)

    // 取消第二个任务
    tasks[1].CancelFn()
}
```

## 切片和数组的异同？
- 切片是对数组的封装，可以理解为动态数组，当数组内容不够时可通过 append 来扩容。
- 数组是一片长度连续的内存空间，而切片是一个结构体，由长度，容量，底层数组三个变量组成。长度表示当前数据个数，而容量表示总容量。
- 切片是如何扩容的？
	- 因为底层数组申请完后空间不可变所以当容量不够之时会重新申请一篇内存，并将原始数据复制过去。
	- 扩容数据量的差异？
		- 1.18 之前：当原 slice 容量小于 `1024` 的时候，新 slice 容量变成原来的 `2` 倍；原 slice 容量超过 `1024`，新 slice 容量变成原来的`1.25`倍。
		- 1.18 之后：当原slice容量(oldcap)小于256的时候，新slice(newcap)容量为原来的2倍；原slice容量超过256，新slice容量 $$newcap = oldcap+(oldcap+3*256)/4$$


## map 底层原理，扩容机制？
- Go 语言采用数组加链表的方式，当节点达到一定个数（8）之后会转为红黑树。
- Go 扩容是创建一个更大的 hash 表，将数据迁移过去。
- 在 Go 语言中，使用 `append` 函数往 slice 中添加元素时，如果 slice 的容量不足以容纳新的元素，`append` 函数会创建一个新的底层数组并返回一个新的 slice，原来的 slice 也会指向新的底层数组。
- 如果在调用 `append` 函数时不处理它的返回值，就会导致原来的 slice 不再指向新的底层数组，而是指向原来的底层数组。这会导致在后续的操作中使用原来的 slice 访问数据时出现问题，因为它指向的底层数组并不包含最新的数据。
- 因此，在使用 `append` 函数时，应该将其返回值赋值给原来的 slice，以确保它指向的是最新的底层数组。

例如：`s := []int{1, 2, 3} s = append(s, 4)`

这样就可以确保在后续的操作中使用的是最新的 slice，避免出现问题。


## 有时候会遇到一些空的结构体，这个目的是什么？
空结构体不占任何内存，使用空结构体，可以帮咱们节省内存空间，提升性能golang


3. goroutine 如何出让执行/被挂起? (提sleep, chan, Gosched都行) 

4. goroutine 很多会有什么问题？(应提到调度延迟、内存占用、协程池)

## 协程和线程的区别？
- 概念
	- 线程是 OS 的基本调度单位，轻量级的进程。
	- 协程是用户态的轻量级线程，由程序员显示控制。
- 地址空间
	- 线程之间共享同一地址空间
	- 协程之间不共享同一地址空间，只能在同一个进程中切换。因为协程是在用户态执行，需要依赖程序支持，上下文信息由程序维护，因此协程并不共享地址空间。而线程的信息是由 OS 来维护，共享同一地址空间。
- 切换开销：
	- 线程的切换开销大，协程的切换开销小。
	 - 协程有程序控制更有针对性，而线程由 OS 控制，所以协程开销小。
- 适用场景：
	- 线程需要大量并发执行的场景。
	- 协程需要细粒度控制的场景。

### 作业帮(一面)
1.  channel实现
2.  go调度原理
3.  select和epoll的区别
6.  时序数据库如何实现
10.  数据库中的乐观锁悲观锁
11.  程序中的乐观锁和悲观锁
12.  二叉搜索树,两个节点被交换了位置,怎么恢复

## context相关
-  Context 结构是 Go 的标准库中为了管理和传递上下文信息（如请求的超时时间和请求的唯一标识符）而设计的一个类型。Context 类型是一个接口，它可以通过调用 context.With* 方法来创建不同类型的子上下文。
1、context 结构是什么样的？
2、context 使用场景和用途

## channel相关

1、channel 是否线程安全？锁用在什么地方？

2、go channel 的底层实现原理 （数据结构）

3、nil、关闭的 channel、有数据的 channel，再进行读、写、关闭会怎么样？（各类变种题型）

4、向 channel 发送数据和从 channel 读数据的流程是什么样的？

## map 相关

1、map 使用注意的点，并发安全？

2、map 循环是有序的还是无序的？

3、 map 中删除一个 key，它的内存会释放么？

4、怎么处理对 map 进行并发访问？有没有其他方案？ 区别是什么？

5、 nil map 和空 map 有何不同？

6、map 的数据结构是什么？是怎么实现扩容？

## GMP相关

1、什么是 GMP？（必问）

2、进程、线程、协程有什么区别？

3、抢占式调度是如何抢占的？

4、M 和 P 的数量问题？

## 锁相关

1、除了 mutex 以外还有那些方式安全读写共享变量？

2、Go 如何实现原子操作？

3、Mutex 是悲观锁还是乐观锁？悲观锁、乐观锁是什么？

4、Mutex 有几种模式？

5、goroutine 的自旋占用资源如何解决

## 并发相关

1、怎么控制并发数？

2、多个 goroutine 对同一个 map 写会 panic，异常是否可以用 defer 捕获？

3、如何优雅的实现一个 goroutine 池（百度、手写代码）

## GC相关

1、go gc 是怎么实现的？（必问）

2、go 是 gc 算法是怎么实现的？ （得物，出现频率低）

3、GC 中 stw 时机，各个阶段是如何解决的？ （百度）

4、GC 的触发时机？  

## 内存相关

1、谈谈内存泄露，什么情况下内存会泄露？怎么定位排查内存泄漏问题？

2、知道 golang 的内存逃逸吗？什么情况下会发生内存逃逸？

3、请简述 Go 是如何分配内存的？

Channel 分配在栈上还是堆上？哪些对象分配在堆上，哪些对象分配在栈上？

4、介绍一下大对象小对象，为什么小对象多了会造成 gc 压力？


