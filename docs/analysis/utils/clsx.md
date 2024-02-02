# `clsx` 源码阅读

[clsx](https://github.com/lukeed/clsx) 轻量级工具库，用于有条件的拼接类名

##### 相似库

- [classnames](https://github.com/JedWatson/classnames)

## `clsx` 使用方式

`clsx` 函数可以接受任意数量的参数，每个参数可以是对象、数组、布尔值、字符串或数值，经过处理后会返回一个字符串

```js
import clsx from 'clsx'
// or
import { clsx } from 'clsx'

// Strings (variadic)
clsx('foo', true && 'bar', 'baz')
//=> 'foo bar baz'

// Objects
clsx({ foo: true, bar: false, baz: isTrue() })
//=> 'foo baz'

// Objects (variadic)
clsx({ foo: true }, { bar: false }, null, { '--foobar': 'hello' })
//=> 'foo --foobar'

// Arrays
clsx(['foo', 0, false, 'bar'])
//=> 'foo bar'

// Arrays (variadic)
clsx(['foo'], ['', 0, false, 'bar'], [['baz', [['hello'], 'there']]])
//=> 'foo bar baz hello there'

// Kitchen sink (with nesting)
clsx('foo', [1 && 'bar', { baz: false, bat: null }, ['hello', ['world']]], 'cya')
//=> 'foo bar hello world cya'

// 假值和单独的布尔值都会被过滤
clsx(true, false, '', null, undefined, 0, NaN)
//=> ''
```

## `clsx` 源码笔记

> **当前 clsx 源码版本为 v1.2.1**

```js
// 对参数进行类型判断并做相应处理
function toVal(mix) {
  var k,
    y,
    str = ''

  // 当参数 mix 为字符串和数值时直接拼接
  if (typeof mix === 'string' || typeof mix === 'number') {
    str += mix
  }
  // 当参数 mix 为对象时
  else if (typeof mix === 'object') {
    // 当参数 mix 为数组时对其进行遍历并递归调用 toVal
    if (Array.isArray(mix)) {
      for (k = 0; k < mix.length; k++) {
        if (mix[k]) {
          if ((y = toVal(mix[k]))) {
            str && (str += ' ')
            str += y
          }
        }
      }
    } else {
      // 遍历对象的属性，把属性值为真的属性名拼接成字符串
      for (k in mix) {
        if (mix[k]) {
          str && (str += ' ')
          str += k
        }
      }
    }
  }

  return str
}

// 接收多个参数并返回一个字符串
export function clsx() {
  var i = 0,
    tmp,
    x,
    str = ''

  // 遍历 arguments
  while (i < arguments.length) {
    // 对 tmp 赋值，并判断其是否为真值
    if ((tmp = arguments[i++])) {
      // 调用 toVal 方法对 tmp 进行处理，如果处理结果为真，则进行字符串拼接
      if ((x = toVal(tmp))) {
        str && (str += ' ')
        str += x
      }
    }
  }
  return str
}

export default clsx
```
