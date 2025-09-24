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
import "reflect-metadata";

const requiredMetadataKey = Symbol("required");
 
function required(target: Object, propertyKey: string | symbol, parameterIndex: number) {
  let existingRequiredParameters: number[] = Reflect.getOwnMetadata(requiredMetadataKey, target, propertyKey) || [];
  existingRequiredParameters.push(parameterIndex);
  console.log('existingRequiredParameters', existingRequiredParameters)
  Reflect.defineMetadata( requiredMetadataKey, existingRequiredParameters, target, propertyKey);
}
 
function validate(target: any, propertyName: string, descriptor: TypedPropertyDescriptor<Function>) {
  let method = descriptor.value!;
 console.log('method', method)
  descriptor.value = function () {
    let requiredParameters: number[] = Reflect.getOwnMetadata(requiredMetadataKey, target, propertyName);
    if (requiredParameters) {
      for (let parameterIndex of requiredParameters) {
        // arguments is an array-like object
        console.log('arguments', arguments)
        console.log('parameterIndex', parameterIndex)
        console.log('arguments[parameterIndex]', arguments[parameterIndex])
        if (parameterIndex >= arguments.length || arguments[parameterIndex] === undefined) {
          throw new Error("Missing required argument.");
        }
      }
    }
    return method.apply(this, arguments);
  };
}

class BugReport {
  type = "report";
  title: string;
 
  constructor(t: string) {
    this.title = t;
  }
 
  @validate
  print(@required verbose: boolean, @required name?: string) {
    if (verbose) {
      console.log('name', name)
      return `type: ${this.type}\ntitle: ${this.title}`;
    } else {
     return this.title; 
    }
  }
}

const bugReport = new BugReport('Bug')
console.log(bugReport.print(false))
console.log(bugReport.print(true))

```

## 学习链接

[JavaScript metaprogramming with the 2022-03 decorators API](https://2ality.com/2022/10/javascript-decorators.html)

[TypeScript Decorators](https://www.typescriptlang.org/docs/handbook/decorators.html#accessor-decorators)
