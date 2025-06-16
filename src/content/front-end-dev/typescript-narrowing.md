---
title: 'TypeScript基础之--类型缩小'
pubDate: 2025-06-16
description: '学习如何在TypeScript中进行类型缩小'
author: 'Wayne.Liang'
image:
  cover: '../assets/front-end-dev/typescript-narrowing.png'
  alt: 'TypeScript narrowing'
category: '前端开发'
tags: ['TypeScript']
---

## Contents

## What is Narrowing

将类型细化为比声明更具体的类型的这个过程称为缩小。

## typeof type guards

```typescript
function padLeft(padding: number | string, input: string): string {
  if (typeof padding === 'number') {
    return ' '.repeat(padding) + input
  }
  return padding + input
}
```

在上述的 if 检查中，TypeScript 看到 typeof padding === "number" 并理解它是一种特殊的代码形式，称为类型守卫。

## truthiness narrowing

在 JavaScript 中，像 if 这样的结构首先将其条件“强制”转换为 boolean ，以便理解它们，然后根据结果是否为 true 或 false 来选择其分支。

- 0
- NaN
- ""
- 0n (the bigint version of zero)
- null
- undefined

这些都是假值。通过真值假值来让代码走不同的分支。

```typescript
function printAll(strs: string | string[] | null) {
  if (strs && typeof strs === 'object') {
    for (const s of strs) {
      console.log(s)
    }
  } else if (typeof strs === 'string') {
    console.log(strs)
  }
}
```

### Equality narrowing

使用switch 语句和 === 、 !== 、 == 或者 != 来缩小类型

```typescript
function example(x: string | number, y: string | boolean) {
  if (x === y) {
    // We can now call any 'string' method on 'x' or 'y'.
    x.toUpperCase();

(method) String.toUpperCase(): string
    y.toLowerCase();

(method) String.toLowerCase(): string
  } else {
    console.log(x);

(parameter) x: string | number
    console.log(y);

(parameter) y: string | boolean
  }
}
```

使用相等性检查，缩小类型。

### The `in` operator narrowing

利用js 属性检查运算符 `in` 来确定对象或其原型链上是否有一个具有名称的属性

```typescript
type Fish = { swim: () => void }
type Bird = { fly: () => void }

function move(animal: Fish | Bird) {
  if ('swim' in animal) {
    return animal.swim()
  }

  return animal.fly()
}
```

### `instanceof` narrowing

用于检查一个值是否是另一个值的“实例”

```typescript
function logValue(x: Date | string) {
  if (x instanceof Date) {
    console.log(x.toUTCString())
  } else {
    console.log(x.toUpperCase())
  }
}

function logError(payload: URIError | string) {
  if (payload instanceof URIError) {
    console.log(payload.message)
  } else {
    console.log(payload.toUpperCase())
  }
}
```

### Assignments 赋值

变量重新赋值时，TypeScript 会查看赋值语句的右侧，并适当地缩小左侧的类型

```typescript
let x = Math.random() < 0.5 ? 10 : 'hello world!'

x = 1

console.log(x)

x = 'goodbye!'

console.log(x)
```

### Control flow analysis

```typescript
function example() {
  let x: string | number | boolean

  x = Math.random() < 0.5

  console.log(x)

  // let x: boolean

  if (Math.random() < 0.5) {
    x = 'hello'
    console.log(x)

    // let x: string
  } else {
    x = 100
    console.log(x)

    // let x: number
  }

  return x

  // let x: string | number
}
```

基于可达性的代码分析称为控制流分析，TypeScript 使用这种流分析在遇到类型守卫和赋值时缩小类型。当分析一个变量时，控制流可以多次分叉并重新合并，并且该变量在不同点可能具有不同的类型。

### Using type predicates

通常我们利用现有的 JavaScript 结构来处理类型缩小，但是有时你希望对代码中类型的改变有更直接的控制。这时我们需要使用类型谓词来实现

```typescript
type Fish = {
  swim: () => void
}

type Bird = {
  fly: () => void
}

function isFish(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined
}
```

pet is Fish 是这个例子中的类型谓词。谓词的形式为 parameterName is Type ，其中 parameterName 必须是当前函数签名中的一个参数的名称。

```typescript
type Fish = {
  swim: () => void
}

type Bird = {
  fly: () => void
}

function isFish(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined
}

function getSmallPet(): Fish | Bird {
  let animal = Math.random() < 0.5 ? { swim: () => console.log('swim') } : { fly: () => console.log('fly') }
  return animal
}

let pet = getSmallPet()

if (isFish(pet)) {
  pet.swim()
} else {
  pet.fly()
}
```

```typescript
const zoo: (Fish | Bird)[] = [getSmallPet(), getSmallPet(), getSmallPet()]
const underWater1: Fish[] = zoo.filter(isFish)
// or, equivalently
const underWater2: Fish[] = zoo.filter(isFish) as Fish[]

// The predicate may need repeating for more complex examples
const underWater3: Fish[] = zoo.filter((pet): pet is Fish => {
  if (pet.name === 'sharkey') return false
  return isFish(pet)
})
```

### Assertion functions

Types can also be narrowed using [Assertion functions](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-7.html#assertion-functions).

## Discriminated unions

TypeScript 中的联合类型（discriminated unions），也称为带标签的联合类型或代数数据类型，是一种强大的特性，允许你创建可以表示多种不同可能性的类型。它们在处理可能具有不同形状或状态的数据时特别有用，并有助于确保类型安全和代码清晰

核心思想

- 联合类型是一种联合类型，其中每个成员都有一个`共同的属性`，称为`区分属性`，其类型是唯一的字面量类型（字符串、数字或符号）。
- TypeScript 在代码执行期间使用区分联合的值来缩小类型到联合的具体成员。

```typescript
interface Circle {
  type: 'circle'
  radius: number
}

interface Rectangle {
  type: 'rectangle'
  width: number
  height: number
}

type Shape = Circle | Rectangle

function area(shape: Shape): number {
  switch (shape.type) {
    case 'circle':
      return Math.PI * shape.radius * shape.radius
    case 'rectangle':
      return shape.width * shape.height
  }
}
```

## The `never` type

在类型缩小过程中，你可以将联合类型的选择范围缩小到只剩下一种可能性，从而消除所有其他可能性。在这种情况下，TypeScript 将使用 never 类型来表示一个不应该存在的状态。

## Exhaustiveness checking

类型 never 可以赋值给任何类型；然而，没有任何类型可以赋值给 never （除了 never 本身）。这意味着你可以使用类型缩小，并依赖 never 在 switch 语句中出现来进行`穷尽性`检查。

```typescript
interface Circle {
  kind: "circle";
  radius: number;
}
 
interface Square {
  kind: "square";
  sideLength: number;
}
 
type Shape = Circle | Square

function getArea(shape: Shape) {
  switch (shape.kind) {
    case 'circle':
      return Math.PI * shape.radius ** 2
    case 'square':
      return shape.sideLength ** 2
    default:
      const _exhaustiveCheck: never = shape
      return _exhaustiveCheck
  }
}

// 新增一种类型
interface Triangle {
  kind: 'triangle'
  sideLength: number
}

type Shape = Circle | Square | Triangle

function getArea(shape: Shape) {
  switch (shape.kind) {
    case 'circle':
      return Math.PI * shape.radius ** 2
    case 'square':
      return shape.sideLength ** 2
    default:
      const _exhaustiveCheck: never = shape
      // Type 'Triangle' is not assignable to type 'never'.
      return _exhaustiveCheck
  }
}
```
