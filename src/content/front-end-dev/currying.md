---
title: 'Javascript之柯里化'
pubDate: 2024-01-16
description: '了解柯里化的概念以及应用场景。'
author: 'Wayne.Liang'
image:
  cover: '../assets/front-end-dev/curring.png'
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

## 常见的使用场景

### 参数复用

通过柯里化，可以将一个多参数的函数转化为一个接受部分参数的函数，从而实现参数的复用。这在需要多次调用同一个函数，但其中某些参数保持不变的场景，如日志打印，重复执行的正则校验等场景中非常有用。

```javascript
const sum = (x, y, z) => x + y + z
const curriedSum = curry(sum)

// 使用柯里化后的函数,固定第一个参数为5
const sum5 = curriedSum(5)

console.log(sum5(2)(3)) // 10
console.log(sum5(1)(4)) // 10
```

### 复杂运算缓存

当业务中我们遇到一个复杂的计算函数需要反复运行时，如果每次都从新计算一次，会浪费大量的性能，这时我们可以用记忆函数来缓存计算的过程，典型的例如斐波那契函数。

```javascript
const fibonacci = (x) => {
  if (x === 1 || x === 2) {
    return 1
  }

  return fibonacci(x - 1) + fibonacci(x - 2)
}
```

当我们计算第35个数是需要的时间为

```javascript
const startTime = new Date().getTime()
fibonacci(35)
const spentTime = new Date().getTime() - startTime

console.log(spentTime) // 103ms
```

因为`fibonacci`的计算过程都是一样的，所以每次计算时，其实多数字我们已经计算过了，进行重复计算是没有必要的。因此我们可以使用一个缓存函数对历史计算的结果进行缓存，等到下次再执行相同的数的时候直接取已经缓存过的计算结果即可。

```javascript
// 缓存函数
const memo = (func) => {
  const cacheObj = {}
  return (str) => {
    if (!cacheObj[str]) {
      const calculateVal = func(str)
      cacheObj[str] = calculateVal
    }

    return cacheObj[str]
  }
}

// 缓存斐波那契函数
const fibonacciMemo = memo(fibonacci)

const startTime = new Date().getTime()
fibonacciMemo(35)
const spentTime = new Date().getTime() - startTime
console.log(spentTime) // 103ms again

// 再调用一次
const startTime = new Date().getTime()
fibonacciMemo(35)
const spentTime = new Date().getTime() - startTime
console.log(spentTime) // 0ms
```

### 延迟执行

柯里化可以用于延迟函数的执行，即在需要时才执行函数。这在需要处理异步操作或需要等待特定条件满足时非常有用。

```javascript
// 柯里化前的函数
function fetchData(url, params) {
  // 发送网络请求并返回 Promise
  // ...
}

// 柯里化后的函数
const curriedFetchData = curry(fetchData)

// 使用柯里化后的函数
const fetchUser = curriedFetchData('/api/user')
const useData = await fetchUser({ id: 1 })
console.log('useData', useData)

const fetchProducts = curriedFetchData('/api/products')
const productData = await fetchProducts({ category: 'electronics' })
console.log('productData', productData)
```

### 函数组合

柯里化可以与函数组合相结合，实现更复杂的函数操作。通过将多个柯里化函数组合在一起，可以构建出更高阶的函数，实现更复杂的逻辑。

```javascript
function add(a, b) {
  return a + b
}

function multiply(a, b) {
  return a * b
}

// 柯里化后的函数
const curriedAdd = curry(add)
const curriedMultiply = curry(multiply)

// 函数组合
const addAndMultiply = (a) => curriedMultiply(3)(curriedAdd(2, a))

console.log(addAndMultiply(7)) // 输出: 27
```

在上面的示例中，我们通过柯里化将add和multiply函数转化为接受单个参数的函数链，然后通过函数组合将它们组合在一起，实现了一个先加2再乘以3的复合函数。

### 数据转换

柯里化可以应用于数据转换的场景，特别是在函数式管道（Pipeline）中。通过将多个柯里化函数组合在一起，可以构建一个数据转换的管道，将数据依次传递给每个函数进行处理，实现复杂的数据转换操作。

```javascript
// 柯里化前的函数
function square(n) {
  return n * n
}

function double(n) {
  return n * 2
}

// 柯里化后的函数
const curriedSquare = curry(square)
const curriedDouble = curry(double)

// 数据转换
const transform = (data) => data.map(curriedSquare).map(curriedDouble)

const numbers = [1, 2, 3, 4, 5]
const transformedData = transform(numbers)
console.log(transformedData) // 输出: [2, 8, 18, 32, 50]
```

## 注意事项

1. 只允许确定参数长度的函数柯里化-要求函数具有固定数量的参数。使用 rest 参数的函数，例如 f(...args)，不能以这种方式进行柯里化。
2. 比柯里化多一点-根据定义，柯里化应该将 sum(a, b, c) 转换为 sum(a)(b)(c)。但是，如前所述，JavaScript 中大多数的柯里化实现都是高级版的：它们使得函数可以被多参数变体调用。

## 总结

柯里化是一种转换，将 `f(a,b,c)` 转换为可以被以 `f(a)(b)(c)` 的形式进行调用。JavaScript 实现通常都保持该函数可以被正常调用，并且如果参数数量不足，则返回部分应用函数。

柯里化让我们能够更容易地获取部分应用函数。就像我们在日志记录示例中看到的那样，普通函数 `log(date, importance, message)` 在被柯里化之后，当我们调用它的时候传入一个参数（如 `log(date)）`或两个参数`（log(date, importance)）`时，它会返回部分应用函数。
