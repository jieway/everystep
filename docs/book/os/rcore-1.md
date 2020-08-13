# 输出

输入到终端，print 和 println 的区别在于是否换行。

print 在 rust 中不是函数而是一种宏定义。感叹号也与此相关，目前不用理会。

```rust
fn main() {
    let a = "Hello ";
    print!("{}",a);
    println!("{}",a);
}
```

同一个变量输出多次，不加数字的话需要写多次变量，加上数字一次就行。

本质上是将后面的可变参数当成了数组来访问，下标从 0 开始。

```rust
fn main() {
    let a = "Hello ";
    let b = "World";
    println!("{}{}",a,a); // Hello Hello
    println!("{0}{0}",a); // Hello Hello
    println!("{0}{1}{0}",a,b); // Hello WorldHello
}
```

Rust 中的转义字符是 {} ，例如

```rust
fn main() { 
    println!("{{}}"); // {}
} 
```

# 基本语法

在 Rust 中使用 `let a = 123;` 来声明一个变量，Rust 是强类型语言可以自动判断变量类型。

其实主动声明变量类型更好，可以按照下面的写法主动声明。其中 u64 代表无符号的 64 位整数。

```rust
let a: u64 = 123;
```

这和 js 很像，但是含义却大不相同。这样声明出来的变量是不可变变量。

也就是下面的写法是不对的。

```rust
let a = 123;
a = 456;
``` 

可以通过关键字 mut （可变 mutable）来设定可变变量。

> 例如 ：`let mut a = 123;`

不可变变量和常量还是有区别的，常量是无法修改，而不可变变量可以通过重新绑定来修改值。

```rust
let a = 123;
let b = 456;
```

这在 Rust 中有一个专有名词，为**重影**，也就是重新绑定的意思。

> 注意重影是指用同一个名字重新代表另一个变量实体，其类型、可变属性和值都可以变化，而**可变变量**是可以仅能发生值的变化。

如下修改常量就非法了。

```rust
const a: i32 = 123;
let a = 456;
```

Rust 不支持 ++ 和 -- 。

布尔型只能用 true 和 flase 表示。

Rust 的默认编码方式必须是 UTF-8 ，否则编译器会报错。

元组可以包含不同的数据类型，而数组只能包含同一种数据类型。前者用圆括号表示 () 后者则用方括号 [] 表示。

Rust 注释同 C 一样。

函数的命名风格是小写字母加下划线。

# 条件语句

```rust
fn main(){
    let number = 19;
    if number < 5 {
        println!("yes");
    }else if number > 12{
        println!("no");
    }
}
```

while 循环，rust 没有 do while，do 是保留字还有其他用法。

```rust
fn main(){
    let mut a = 1;
    let mut num = 0;
    while a <= 100 {
        num += a;
        a += 1;
    }
    println!("The result of adding from 1 to 100 is : {}",num);
}
```

在 Rust for 循环只有这一种表示。

```rust
fn main() {
    let a = [10, 20, 30, 40, 50];
    for i in a.iter() {
        println!("值为 : {}", i);
    }
}
```

原生的无限循环，通过 break 来打破循环。

```rust
fn main(){
    let mut a = 1;
    let mut num = 0;
    loop {
        num += a;
        if a == 100 { break;}
        a += 1;
    }
    println!("The result of adding from 1 to 100 is : {}",num);
}
```