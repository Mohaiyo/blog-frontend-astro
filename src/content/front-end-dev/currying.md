---
title: 'Javascript之柯里化'
pubDate: 2024-01-16
description: '了解柯里化的概念以及应用场景。'
author: 'Wayne.Liang'
image:
  cover: '../assets/front-end-dev/astro-islands-arc-cover.png'
  alt: 'currying'
category: '前端开发'
tags: ['Javascript']
---

## Contents

## 柯里化

柯里化是一种与函数一起工作的高级技术。它不仅在JavaScript中使用，也在其他语言中使用。

柯里化是一种将函数从可调用形式 `f(a, b, c)` 转换为可调用形式 `f(a)(b)(c)` 的转换方法。

柯里化并不调用函数，他只是对函数进行转换。

为了更好的理解我们正在说什么，让我们先看下一个例子，然后再进行实际应用。

我们将创建一个辅助函数 `curry(f)`，用于对一个带有两个参数的 `f`进行柯里化。换句话说，对于两个参数的函数`f(a, b)`，`curry(f)`将其转化为一个以`f(a)(b)`形式运行的函数：

```javascript
function curry(f) {
  // 通过curry(f)实现柯里化的转换
  return function (a) {
    return function (b) {
      return f(a, b)
    }
  }
}

// 用法
function sum(a, b) {
  return a + b
}

let curriedSum = curry(sum)

alert(curriedSum(1)(2)) // 3
```

正如您所见，实现非常简单：只需两个包装器。

- `curry(func)` 的结果返回的是一个包装器`function(a)`。
- 当调用函数`curriedSum(1)`时，参数被保存在词法环境中，并返回一个新的包装器`function(b)`。
- 当此包装器以参数2被调用时，它将该调用传递给原始的 `sum` 函数。

柯里化的更高级实现，例如lodash的`_.curry`,返回的包装器允许一个函数既可以被正常地调用，也可以被部分调用。

```javascript
function sum(a, b) {
  return a + b
}

let curriedSum = _.curry(sum) // 使用lodash库的函数 _.curry

alert(curriedSum(1, 2)) // 3, 仍然可以正常被调用
alert(curriedSum(1)(2)) // 3, 以部分应用函数的方式调用
```

## 柯里化？目的是什么？

我们需要一个现实中的例子来了解它的好处，。

例如，我们有一个用于格式化和输出信息的日志函数 log(date, importance, message)。在实际项目中，此类函数具有很多有用的功能，例如通过网络发送日志，在这儿我们仅使用 `alert`作为示例：

```javascript
function log(date, importance, message) {
  alert(`[${date.getHours()}:${date.getMinutes()}] [${importance}] ${message}`)
}
```

让我们将它柯里化！

```javascript
const curriedLog = _.curry(log)
```

柯里化之后，`log`函数仍正常运行：

```javascript
curriedLog(new Date(), 'DEBUG', 'some debug') // log(a, b, c)
```

但是也可以以柯里化形式运行：

```javascript
curriedLog(new Date())('DEBUG')('some debug') // log(a)(b)(c)
```

现在，我们可以轻松地为当前日志创建便捷函数：

```javascript
// logNow 会是带有固定第一个参数的日志的部分应用函数
let logNow = curriedLog(new Date())

// 使用它
logNow('INFO', 'message') // [HH:mm] INFO message
```

现在，`logNow` 是具有固定第一个参数的 `log`，换句话说，就是更简短的“部分应用函数”或“部分函数”。

我们可以更进一步，为当前的调试日志提供便捷函数：

```javascript
let debugNow = logNow('DEBUG')

debugNow('message') // [HH:mm] DEBUG message
```

所以：

1. 柯里化之后，我们没有丢失任何东西：`log`函数依然可以被正常调用。
2. 我们可以轻松地生成部分应用函数，例如用于生成今天的日志的部分应用函数。

## 高级柯里化实现

如果你想了解更多细节，下面是用于多参数函数的“高级”柯里化实现，我们也可以把它用于上面的示例。

它非常简短：

```javascript
function curry(func) {
  return function curried(...args) {
    if (args.length >= func.length) {
      return func.apply(this, args)
    } else {
      return function (...args2) {
        return curried.apply(this, args.concat(args2))
      }
    }
  }
}
```

用例：

```javascript
function sum(a, b, c) {
  return a + b + c
}

let curriedSum = curry(sum)

alert(curriedSum(1, 2, 3)) // 6，仍然可以被正常调用
alert(curriedSum(1)(2, 3)) // 6，对第一个参数的柯里化
alert(curriedSum(1)(2)(3)) // 6，全柯里化
```

新的 `curry` 可能看上去有点复杂，但是它很容易理解。

`curry(func)` 调用的结果是如下所示的包装器 `curried`：

```javascript
// func 是要转换的函数
function curried(...args) {
  if (args.length >= func.length) {
    // (1)
    return func.apply(this, args)
  } else {
    return function (...args2) {
      // (2)
      return curried.apply(this, args.concat(args2))
    }
  }
}
```

当我们运行它时，这里有两个 `if` 执行分支：

1. 如果传入的 `args` 长度与原始函数所定义的`(func.length)`相同或者更长，那么只需要使用 `func.apply` 将调用传递给它即可。
2. 否则，获取一个部分应用函数：我们目前还没调用 `func`。取而代之的是，返回另一个包装器 `pass`，它将重新应用 `curried`，将之前传入的参数与新的参数一起传入。

然后，如果我们再次调用它，我们将得到一个新的部分应用函数（如果没有足够的参数），或者最终的结果。

## 常见的使用场合

- 闭包
- 防抖 debounce
- 节流 throttle
- 复杂运算缓存

## 注意事项

1. 只允许确定参数长度的函数柯里化-要求函数具有固定数量的参数。使用 rest 参数的函数，例如 f(...args)，不能以这种方式进行柯里化。
2. 比柯里化多一点-根据定义，柯里化应该将 sum(a, b, c) 转换为 sum(a)(b)(c)。但是，如前所述，JavaScript 中大多数的柯里化实现都是高级版的：它们使得函数可以被多参数变体调用。

## 总结

柯里化 是一种转换，将 `f(a,b,c)` 转换为可以被以 `f(a)(b)(c)` 的形式进行调用。JavaScript 实现通常都保持该函数可以被正常调用，并且如果参数数量不足，则返回部分应用函数。

柯里化让我们能够更容易地获取部分应用函数。就像我们在日志记录示例中看到的那样，普通函数 `log(date, importance, message)` 在被柯里化之后，当我们调用它的时候传入一个参数（如 `log(date)）`或两个参数`（log(date, importance)）`时，它会返回部分应用函数。
