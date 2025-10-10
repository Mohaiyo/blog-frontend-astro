---
title: '探索 TypeScript 装饰器的强大功能：轻松扩展和修改代码'
pubDate: 2025-09-18
description: '探索和学习Typescript Decorators装饰器的使用用例。'
author: 'Wayne.Liang'
image:
  cover: '../assets/front-end-dev/typescript-exploring-the-power-of-typescript-decorators.png'
  alt: 'TypeScript decorators'
category: '前端开发'
tags: ['TypeScript']
---

## Contents

## 说明

本文所有的代码均是基于TypeScript V4.9.5版本进行实验,自 TypeScript 5.0 起支持阶段 3 装饰器。参见：[TypeScript 5.0 中的装饰器](https://devblogs.microsoft.com/typescript/announcing-typescript-5-0/#decorators)

## Class Decorator

应用于类，以修改其行为或添加元数据。

tartet: target参数被装饰类的构造函数。如果类被装饰， target 将是该类的构造函数。它允许你访问和修改类构造函数或其原型。

```typescript
function customClassDecorator(target: Function) {
  // Modify the class behavior or prototype here
  target.prototype.customMethod = function () {
    console.log('This is a custom method added by the decorator.')
  }
}

@customClassDecorator
class CustomClass {
  [x: string]: any
  // Class implementation
}

const instance = new CustomClass()
instance.customMethod() // Outp
```

类装饰器的一个常见用例是为类添加功能或元数据，例如日志记录、访问控制或创建单例实例。

## Method Decorator

方法装饰器应用于类中的方法，并允许你修改该方法的行为。它接收方法目标和上下文对象。

方法装饰器的表达式在运行时将被作为函数调用，并具有以下三个参数：

- 对于静态成员，是类的构造函数；对于实例成员，是类的原型
- 成员的名称。
- 成员的属性描述符。

```typescript
function enumerable(value: boolean) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    descriptor.enumerable = value
  }
}

class Greeter {
  greeting: string
  constructor(message: string) {
    this.greeting = message
  }

  @enumerable(false)
  greet() {
    return 'Hello, ' + this.greeting
  }
}

console.log(greeter.greet())
for (let key in greeter) {
  console.log(key)
}
// Hello, world
// greeting
```

方法装饰器适用于实现日志记录、执行时间测量、缓存或身份验证检查等横切关注点,洋葱模型。

## Accessor Decorators

访问器装饰器：用于 get 或 set 访问器。

访问器装饰器声明在属性访问器声明之前。属性装饰器应用于属性访问器的属性描述符，并可用于观察、修改或替换属性访问器的定义。

属性装饰器的表达式将在运行时作为函数被调用，并具有以下三个参数：

- 对于静态成员，是类的构造函数；对于实例成员，是类的原型
- 成员的名称。
- 成员的属性描述符。

```typescript
function configurable(value: boolean) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    descriptor.configurable = value
  }
}

class Point {
  private _x: number
  private _y: number
  constructor(x: number, y: number) {
    this._x = x
    this._y = y
  }

  @configurable(false)
  get x() {
    return this._x
  }

  @configurable(false)
  get y() {
    return this._y
  }
}
```

主要用于观察、修改或替换属性访问器的定义。

## Property Decorators

属性装饰器：应用于属性，允许你修改其特征。属性装饰器是接受目标对象和属性名作为参数的函数。它们通常用于注入元数据或强制执行验证。

```typescript
import 'reflect-metadata'

const formatMetadataKey = Symbol('format')
function format(formatString: string) {
  return Reflect.metadata(formatMetadataKey, formatString)
}
function getFormat(target: any, propertyKey: string) {
  return Reflect.getMetadata(formatMetadataKey, target, propertyKey)
}

class Greeter {
  @format('Hello, %s')
  greeting: string
  constructor(message: string) {
    this.greeting = message
  }
  greet() {
    let formatString = getFormat(this, 'greeting')
    console.log('formatString', formatString)
    return formatString.replace('%s', this.greeting)
  }
}

const greeter = new Greeter('world')
console.log(greeter.greet())
// formatString Hello, %s
// Hello, world
```

```typescript
function ReadOnly(target: any, key: string) {
  Object.defineProperty(target, key, {
    writable: false
  })
}

class Product {
  @ReadOnly
  title = 'Default Title'
}
const product = new Product()
product.title = 'New Title' // TypeError: Cannot assign to read only property 'title' of object '#<Product>'
```

## Parameter Decorators

参数装饰器声明在参数声明之前。参数装饰器应用于类构造函数或方法声明的函数。

参数装饰器：应用于方法参数，提供洞察或验证逻辑。

参数装饰器的表达式将在运行时作为函数被调用，并具有以下三个参数：

- 对于静态成员，是类的构造函数；对于实例成员，是类的原型。
- 成员的名称。
- 函数参数列表中参数的序号。

```typescript
import 'reflect-metadata'

const requiredMetadataKey = Symbol('required')

function required(target: Object, propertyKey: string | symbol, parameterIndex: number) {
  let existingRequiredParameters: number[] = Reflect.getOwnMetadata(requiredMetadataKey, target, propertyKey) || []
  existingRequiredParameters.push(parameterIndex)
  console.log('existingRequiredParameters', existingRequiredParameters)
  Reflect.defineMetadata(requiredMetadataKey, existingRequiredParameters, target, propertyKey)
}

function validate(target: any, propertyName: string, descriptor: TypedPropertyDescriptor<Function>) {
  let method = descriptor.value!
  console.log('method', method)
  descriptor.value = function () {
    let requiredParameters: number[] = Reflect.getOwnMetadata(requiredMetadataKey, target, propertyName)
    if (requiredParameters) {
      for (let parameterIndex of requiredParameters) {
        // arguments is an array-like object
        console.log('arguments', arguments)
        console.log('parameterIndex', parameterIndex)
        console.log('arguments[parameterIndex]', arguments[parameterIndex])
        if (parameterIndex >= arguments.length || arguments[parameterIndex] === undefined) {
          throw new Error('Missing required argument.')
        }
      }
    }
    return method.apply(this, arguments)
  }
}

class BugReport {
  type = 'report'
  title: string

  constructor(t: string) {
    this.title = t
  }

  @validate
  print(@required verbose: boolean, @required name?: string) {
    if (verbose) {
      console.log('name', name)
      return `type: ${this.type}\ntitle: ${this.title}`
    } else {
      return this.title
    }
  }
}

const bugReport = new BugReport('Bug')
console.log(bugReport.print(false))
console.log(bugReport.print(true))
```

## 基于TypeScript 5.0版本的用处示例

### 通过返回兼容的值替换装饰的实体

```typescript
class Person {
  name: string
  constructor(name: string) {
    this.name = name
  }

  @loggedMethod
  greet() {
    console.log(`Hello, my name is ${this.name}.`)
  }
}

function loggedMethod(originalMethod: Function, context: ClassMethodDecoratorContext<unknown>): void | (() => void) {
  const methodName = String(context.name)
  function replacementMethod(this: any, ...args: any[]) {
    console.log(`LOG: Entering method '${methodName}'.`)
    const result = originalMethod.call(this, ...args)
    console.log(`LOG: Exiting method '${methodName}'.`)
    return result
  }
  return replacementMethod
}

const person = new Person('Ron')
person.greet()
// LOG: Entering method 'greet'.
// Hello, my name is Ron.
// LOG: Exiting method 'greet'.
```

### 向其他人公开对装饰实体的访问权限

```typescript
let acc
function exposeAccess(_value, { access }: ClassFieldDecoratorContext<Color, string>) {
  acc = access
}

class Color {
  @exposeAccess
  name = 'green'
}

const green = new Color()

console.log(acc?.get(green))
acc?.set(green, 'red')
console.log(green.name)
// green
// red
```

### 处理装饰实体及其容器

```typescript
function collect(_value, { name, addInitializer }) {
  addInitializer(function () {
    // (A)
    if (!this.collectedMethodKeys) {
      this.collectedMethodKeys = new Set()
    }
    this.collectedMethodKeys.add(name)
  })
}

class C {
  @collect
  toString() {}
  @collect
  [Symbol.iterator]() {}
}
const inst = new C()

inst.collectedMethodKeys === new Set(['toString', Symbol.iterator])
console.log('collectedMethodKeys has toString', inst.collectedMethodKeys.has('toString'))
console.log('collectedMethodKeys has Symbol.iterator', inst.collectedMethodKeys.has(Symbol.iterator))
// collectedMethodKeys has toString true
// collectedMethodKeys has Symbol.iterator true
```

### How are decorators executed?

- Evaluation
- Invocation
- Application

```typescript
function decorate(str) {
  console.log(`EVALUATE @decorate(): ${str}`)
  return () => console.log(`APPLY @decorate(): ${str}`) // (A)
}
function log(str) {
  console.log(str)
  return str
}

@decorate('class')
class TheClass {
  @decorate('static field')
  static staticField = log('static field value');

  @decorate('prototype method')
  [log('computed key')]() {}

  @decorate('instance field')
  instanceField = log('instance field value')
  // This initializer only runs if we instantiate the class
}

// Output:
// EVALUATE @decorate(): class
// EVALUATE @decorate(): static field
// EVALUATE @decorate(): prototype method
// computed key
// EVALUATE @decorate(): instance field
// APPLY @decorate(): prototype method
// APPLY @decorate(): static field
// APPLY @decorate(): instance field
// APPLY @decorate(): class
// static field value
```

Function decorate is invoked whenever the expression decorate() after the @ symbol is evaluated. In line A, it returns the actual decorator function, which is applied later.

### When do decorator initializers run?

When a decorator initializer runs, depends on the kind of decorator:

- Class decorator initializers run after the class is fully defined and all static fields were initialized.
- The initializers of non-static class element decorators run during instantiation, before instance fields are initialized.
- The initializers of static class element decorators run during class definition, before static fields are defined but after other all other class elements were defined.

```typescript
/ We wait until after instantiation before we log steps,
// so that we can compare the value of `this` with the instance.
const steps = [];
function push(msg, _this) {
  steps.push({msg, _this});
}
function pushStr(str) {
  steps.push(str);
}

function init(_value, {name, addInitializer}) {
  pushStr(`@init ${name}`);
  if (addInitializer) {
    addInitializer(function () {
      push(`DECORATOR INITIALIZER ${name}`, this);
    });
  }
}

@init class TheClass {
  //--- Static ---

  static {
    pushStr('static block');
  }

  @init static staticMethod() {}
  @init static accessor staticAcc = pushStr('staticAcc');
  @init static staticField = pushStr('staticField');

  //--- Non-static ---

  @init prototypeMethod() {}
  @init accessor instanceAcc = pushStr('instanceAcc');
  @init instanceField = pushStr('instanceField');

  constructor() {
    pushStr('constructor');
  }
}

pushStr('===== Instantiation =====');
const inst = new TheClass();

for (const step of steps) {
  if (typeof step === 'string') {
    console.log(step);
    continue;
  }
  let thisDesc = '???';
  if (step._this === TheClass) {
    thisDesc = TheClass.name;
  } else if (step._this === inst) {
    thisDesc = 'inst';
  } else if (step._this === undefined) {
    thisDesc = 'undefined';
  }
  console.log(`${step.msg} (this===${thisDesc})`);
}

// Output:
// @init staticMethod
// @init staticAcc
// @init prototypeMethod
// @init instanceAcc
// @init staticField
// @init instanceField
// @init TheClass
// DECORATOR INITIALIZER staticMethod (this===TheClass)
// DECORATOR INITIALIZER staticAcc (this===TheClass)
// static block
// staticAcc
// staticField
// DECORATOR INITIALIZER TheClass (this===TheClass)
// ===== Instantiation =====
// DECORATOR INITIALIZER prototypeMethod (this===inst)
// DECORATOR INITIALIZER instanceAcc (this===inst)
// instanceAcc
// instanceField
// constructor
```

## 公开来自装饰器的数据的技术

### 将公开的数据存储在周围的作用域中

缺点是，如果装饰器来自另外一个模块，将不起作用

###  通过工厂函数管理公开的数据

创建一个工厂函数，将集合以及收集的方法通过工厂函数返回

### 通过类管理公开的数据

类内有两个成员:
- 一个classes,包含收集类的集合
- 一个install函数，类的装饰器

## 学习链接

[JavaScript metaprogramming with the 2022-03 decorators API](https://2ality.com/2022/10/javascript-decorators.html)

[TypeScript Decorators](https://www.typescriptlang.org/docs/handbook/decorators.html#accessor-decorators)
