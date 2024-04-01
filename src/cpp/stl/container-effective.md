# 如何高效的使用 STL 容器？

使用 STL 时直接存放对本身，如果应当避免直接存对象，而是存放指向对象的指针，否则前者会导致。
对象复制成本高

### 直接将对象、数据写入容器存在哪些问题？

在STL中，当将一个对象添加到容器中时（例如，通过insert或push_back等方法），容器并不直接存储提供的对象，而是存储该对象的一个副本。这意味着，容器中的对象与原始提供的对象在内存中是分开的，它们是两个完全独立的实例。

同样，当从容器中获取一个对象时（例如，通过front或back等方法），获取的也是该对象的一个副本，而不是容器中的原始对象。这意味着，即使修改了获取到的对象，也不会影响到容器中的原始对象。

这种“复制进，复制出”的方式是STL的基本工作原理，这样做的好处是可以保护容器中的数据不被意外修改，提高了数据的安全性。但是，这也意味着在使用STL容器时，需要注意对象复制可能带来的性能开销，特别是对于大型对象或复制操作代价较高的对象。

假设我们有一个`std::vector<int>`，我们想要在其中存储一些整数。

```cpp
std::vector<int> vec;
int a = 5;
vec.push_back(a);
```

在这个例子中，我们将整数`a`添加到了向量`vec`中。但是，实际上存储在`vec`中的并不是`a`本身，而是`a`的一个副本。这意味着，即使我们稍后修改了`a`的值，`vec`中的值也不会改变，因为它存储的是`a`的副本，而不是`a`本身。

```cpp
a = 10;
std::cout << vec[0];  // 输出仍然是5，而不是10
```

同样，当我们从`vec`中获取一个元素时，我们获取的也是该元素的一个副本。

```cpp
int b = vec[0];
b = 20;
std::cout << vec[0];  // 输出仍然是5，而不是20
```

在这个例子中，我们从`vec`中获取了第一个元素，并将其赋值给了`b`。然后我们修改了`b`的值，但这并不会影响`vec`中的元素，因为`b`是`vec[0]`的一个副本，而不是`vec[0]`本身。

这种“复制进，复制出”的方式是STL的基本工作原理，这样做的好处是可以保护容器中的数据不被意外修改，提高了数据的安全性。但是，这也意味着在使用STL容器时，需要注意对象复制可能带来的性能开销，特别是对于大型对象或复制操作代价较高的对象。

### 对象是如何复制的？

在C++中，对象的复制通常通过复制构造函数和复制赋值运算符来完成。这两个函数是类的成员函数，用于创建类的新对象（复制构造函数）或将一个对象的值赋给另一个对象（复制赋值运算符）。

复制构造函数的典型声明如下：

```cpp
class Widget {
public:
    Widget(const Widget&); // copy constructor
    ...
};
```

这个函数接受一个同类型的对象作为参数，然后创建一个新的对象，其内容是参数对象的副本。

复制赋值运算符的典型声明如下：

```cpp
class Widget {
public:
    Widget& operator=(const Widget&); // copy assignment operator
    ...
};
```

这个函数接受一个同类型的对象作为参数，然后将调用对象的内容替换为参数对象的内容。

当在容器中插入或删除元素，或者使用某些算法（如排序、移除、旋转等）时，这些函数会被调用，以确保对象的正确复制。

例如，如果有一个`std::vector<Widget>`，并且想在其中添加一个新的`Widget`对象，那么这个对象会被复制到向量中。这个复制过程就是通过调用`Widget`的复制构造函数来完成的。

```cpp
std::vector<Widget> widgets;
Widget w;
widgets.push_back(w); // w is copied into the vector
```

同样，如果有两个`Widget`对象，并且想将一个对象的值赋给另一个对象，那么这个赋值过程就是通过调用`Widget`的复制赋值运算符来完成的。

```cpp
Widget w1, w2;
w1 = w2; // w2 is copied into w1
```

如果不自己声明这些函数，编译器会为自动生成。对于内置类型（如int、指针等），复制过程更简单，只需要复制底层的位。

### 复制存在哪些问题？

在C++中，对象的复制可能会导致性能问题，特别是当对象的复制成本很高时。例如，如果一个对象包含大量的数据或者复杂的结构，那么复制这个对象可能会消耗大量的时间和内存。如果在容器中频繁地插入、删除或移动这种对象，那么这些操作可能会成为性能瓶颈。

例如，假设有一个`Widget`类，它包含一个大型的`std::vector`成员：

```cpp
class Widget {
public:
    Widget(const Widget& other) : data(other.data) {} // copy constructor
    Widget& operator=(const Widget& other) { data = other.data; return *this; } // copy assignment operator

private:
    std::vector<int> data;
};
```

如果在一个`std::vector<Widget>`中频繁地插入或删除`Widget`对象，那么每次操作都会涉及到复制`Widget`对象中的`data`向量，这可能会消耗大量的时间和内存。

此外，如果有一个对象，其中“复制”有一个非常规的含义，那么将这样的对象放入容器可能会导致问题。例如，如果的对象包含一个指向动态分配内存的指针，并且的复制构造函数和复制赋值运算符执行深复制，那么每次复制对象时都会分配新的内存，这可能会导致内存泄漏或其他问题。

在存在继承的情况下，复制可能会导致切片问题。切片是指当将一个派生类对象赋值给一个基类对象时，派生类特有的部分会被切掉。例如：

```cpp
class Base {
public:
    Base(const Base&) {} // copy constructor
    Base& operator=(const Base&) { return *this; } // copy assignment operator
};

class Derived : public Base {
public:
    Derived(const Derived& other) : Base(other), data(other.data) {} // copy constructor
    Derived& operator=(const Derived& other) { Base::operator=(other); data = other.data; return *this; } // copy assignment operator

private:
    int data;
};

std::vector<Base> bases;
Derived d;
bases.push_back(d); // d is sliced when copied into bases
```

在这个例子中，当`Derived`对象`d`被复制到`bases`向量中时，`data`成员将被切掉，因为`Base`类并不知道它的存在。这可能会导致意外的行为，因为`bases`向量中的对象并不完全等同于原始的`Derived`对象。

会导致哪些意外行为？

1. 数据丢失：派生类`Derived`特有的数据成员`data`在复制过程中被切掉，这意味着在`bases`向量中的对象并不包含`data`成员。如果你期望通过`bases`向量中的对象访问`data`成员，那么将无法得到正确的结果，因为`data`成员已经不存在了。

2. 行为改变：如果派生类`Derived`重写了基类`Base`的某个虚函数，那么在`bases`向量中的对象将无法调用派生类`Derived`的版本，而只能调用基类`Base`的版本。这可能会改变程序的行为，因为你可能期望调用的是派生类的函数，而实际上调用的却是基类的函数。

3. 类型信息丢失：在复制过程中，对象的动态类型信息也会丢失。也就是说，即使原始对象是派生类`Derived`的实例，但在`bases`向量中的对象的类型只能被识别为基类`Base`。这意味着你无法通过`dynamic_cast`或`typeid`等运算符获取到正确的类型信息。

### 如何避免复制？

如果的对象复制成本高，或者需要避免切片问题，那么使用指针的容器而不是对象的容器是一个解决方案。复制指针的成本低，且不会发生切片问题。但是，指针的容器也有其自身的问题，比如管理内存的复杂性。

例如，可以创建一个`std::vector`，它包含`Widget`对象的指针，而不是`Widget`对象本身：

```cpp
std::vector<Widget*> widgets;
Widget* w = new Widget();
widgets.push_back(w); // w is copied into the vector
```

在这个例子中，当将`Widget`对象添加到向量中时，实际上复制的是指针，而不是`Widget`对象本身。这样，无论`Widget`对象有多大，复制的成本都是固定的。

然而，使用指针的容器也有其自身的问题。需要确保正确地管理内存，包括在适当的时候删除对象。如果忘记删除对象，就会导致内存泄漏。为了避免这种问题，可以使用智能指针，如`std::shared_ptr`或`std::unique_ptr`，它们会在不再需要对象时自动删除它。

```cpp
std::vector<std::shared_ptr<Widget>> widgets;
std::shared_ptr<Widget> w = std::make_shared<Widget>();
widgets.push_back(w); // w is copied into the vector
```

在这个例子中，当`shared_ptr`被复制时，`Widget`对象不会被复制，而且当所有的`shared_ptr`都消失时，`Widget`对象会被自动删除。

尽管STL确实进行了很多复制操作，但它通常被设计为避免不必要的复制和对象创建。与C和C++的内置容器（如数组）相比，STL容器更加灵活和高效。它们只在需要时创建和复制对象，而且只有在明确要求时，它们才会使用默认构造函数。

### 总结

在使用C++标准模板库（STL）中的容器时，对象复制的常见情况和复制的实现方式是重要的考虑因素。对象的复制通常通过复制构造函数和复制赋值运算符来完成，这两个函数是类的成员函数，用于创建类的新对象或将一个对象的值赋给另一个对象。然而，对象的复制可能会导致性能问题，特别是当对象的复制成本很高时。此外，如果有一个对象，其中“复制”有一个非常规的含义，那么将这样的对象放入容器可能会导致问题。在存在继承的情况下，复制可能会导致切片问题。如果对象复制成本高，或者需要避免切片问题，那么使用指针的容器而不是对象的容器是一个解决方案。

### 参考

1. 《Effective STL》
2. 《STL 源码剖析》