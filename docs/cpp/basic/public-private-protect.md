在C++中，类的继承可以通过`public`、`protected`或`private`关键字来指定，这些关键字影响派生类对基类成员的访问权限。我将通过具体的例子来说明这些不同类型的继承对派生类访问基类成员的影响。

### 基类

首先，我们定义一个基类，其中包含`public`、`protected`和`private`成员：

```cpp
class Base {
public:
    int publicMember;

protected:
    int protectedMember;

private:
    int privateMember;
};
```

### Public 继承

`public`继承意味着基类的`public`和`protected`成员在派生类中保持其原有的访问级别。

#### 示例：

```cpp
class PublicDerived : public Base {
public:
    void function() {
        publicMember = 1;    // 可访问
        protectedMember = 2; // 可访问
        // privateMember = 3; // 不可访问，编译错误
    }
};

int main() {
    PublicDerived obj;
    obj.publicMember = 1;    // 可访问
    // obj.protectedMember = 2; // 不可访问，编译错误
    // obj.privateMember = 3;   // 不可访问，编译错误
}
```

### Protected 继承

`protected`继承将基类的`public`和`protected`成员都变成派生类的`protected`成员。

#### 示例：

```cpp
class ProtectedDerived : protected Base {
public:
    void function() {
        publicMember = 1;    // 可访问
        protectedMember = 2; // 可访问
        // privateMember = 3; // 不可访问，编译错误
    }
};

int main() {
    ProtectedDerived obj;
    // obj.publicMember = 1;    // 不可访问，编译错误
    // obj.protectedMember = 2; // 不可访问，编译错误
    // obj.privateMember = 3;   // 不可访问，编译错误
}
```

### Private 继承

`private`继承将基类的`public`和`protected`成员都变成派生类的`private`成员。

#### 示例：

```cpp
class PrivateDerived : private Base {
public:
    void function() {
        publicMember = 1;    // 可访问
        protectedMember = 2; // 可访问
        // privateMember = 3; // 不可访问，编译错误
    }
};

int main() {
    PrivateDerived obj;
    // obj.publicMember = 1;    // 不可访问，编译错误
    // obj.protectedMember = 2; // 不可访问，编译错误
    // obj.privateMember = 3;   // 不可访问，编译错误
}
```

### 总结

- 在`public`继承中，派生类保留了基类中`public`和`protected`成员的访问级别，但不能访问`private`成员。
- 在`protected`继承中，基类的`public`和`protected`成员在派生类中变为`protected`，派生类对象无法直接访问这些成员。
- 在`private`继承中，基类的`public`和`protected`成员在派生类中变为`private`，派生类对象无法直接访问这些成员。
- 无论继承类型如何，基类的`private`成员都不可被派生类直接访问。