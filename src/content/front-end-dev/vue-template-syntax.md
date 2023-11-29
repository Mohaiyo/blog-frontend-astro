---
title: 'Vue2简明指南之--模板语法'
pubDate: 2018-02-23
description: '通过探索其富有表现力的模板语法，深入了解 Vue.js 2 的动态世界。从用于无缝数据绑定的双大括号到 v-if 和 v-for 等强大指令，了解 Vue.js 2 如何简化 UI 开发。'
author: 'Wayne.Liang'
image:
  cover: '../assets/front-end-dev/vue2-template-syntax-cover.png'
  alt: 'template-syntax'
category: '前端开发'
tags: ['Vue.js', 'Vue2']
---

## 模板语法

所有的Vue.js 的模板都是合法的 HTML，所以能被遵循规范的浏览器和 HTML 解析器解析。底层的实现上，Vue 将模板编译成虚拟 DOM 渲染函数 (render函数)。结合响应系统，Vue 能够智能地计算出最少需要重新渲染多少组件，并把 DOM 操作次数减到最少。

### 插值

#### 文本

使用“Mustache”语法 (双大括号) 的文本插值

```html
<span>Message: {{ msg }}</span>
```

#### 原始HTML

双大括号会将数据解释为普通文本，而非 HTML 代码。为了输出真正的 HTML，你需要使用 v-html 指令：

```html
<p>Using mustaches: {{ rawHtml }}</p>
<p>Using v-html directive: <span v-html="rawHtml"></span></p>
```

#### Attribute

Mustache 语法不能作用在 HTML attribute 上，遇到这种情况应该使用 v-bind 指令：

```html
<div v-bind:id="dynamicId"></div>
```
对于布尔值属性，v-bind工作起来略有不同，在下面的例子中

```html
<button v-bind:disabled="disabled">Button</button>
```

如果 disabled 的值是 null、undefined、0、'' 或 false，则 disabled attribute 甚至不会被包含在渲染出来的 `<button>` 元素中。

### 指令

指令 (Directives) 是带有 v- 前缀的特殊属性。指令属性的值预期是**单个 JavaScript 表达式** (v-for 是例外情况，稍后我们再讨论)。指令的职责是，当表达式的值改变时，将其产生的连带影响，响应式地作用于 DOM。

#### 参数

一些指令能够接收一个“参数”，在指令名称之后以冒号表示。例如，v-bind 指令可以用于响应式地更新 HTML 属性：

```html
<a v-bind:href="url">狗狗要飞上天了</a>
```

在这里，href是参数，告知 v-bind 指令将该元素的 href 属性与表达式 url 的值绑定。另一个例子是 v-on 指令，它用于监听 DOM 事件

```html
<a v-on:click="doSomething">事件监听点击事件作为参数</a>
```

在这里参数是监听的事件名。

#### 动态参数

> 2.6新增

从 2.6.0 开始，可以用方括号括起来的 JavaScript 表达式作为一个指令的参数：

```html
<!--
注意，参数表达式的写法存在一些约束，如之后的“对动态参数表达式的约束”章节所述。
-->
<a v-bind:[attributeName]="url"> ... </a>
```

这里的 attributeName 会被作为一个 JavaScript 表达式进行动态求值，求得的值将会作为最终的参数来使用。

```html
<template>
  <a v-bind:[attributeName]="url">where to go?</a>
</template>

<script>
  export default {
    data() {
      return {
        attributeName: 'href'
      }
    }
  }
</script>
````

上面的绑定将等价于 `v-bind:href`。同样地，你可以使用动态参数为一个动态的事件名绑定处理函数：

```html
<a v-on:[eventName]="doSomething"> ... </a>
```
在这个示例中，当 eventName 的值为 "focus" 时，v-on:[eventName] 将等价于 v-on:focus。

##### 对动态参数的值的约束

动态参数预期会求出一个字符串，异常情况下值为 null。这个特殊的 null 值可以被显性地用于移除绑定。任何其它非字符串类型的值都将会触发一个警告。

##### 对动态参数表达式的约束

动态参数表达式有一些语法约束，因为某些字符，如空格和引号，放在 HTML attribute 名里是无效的。例如：

```html
<!-- 这会触发一个编译警告 -->
<a v-bind:['foo' + bar]="value"> ... </a>
```

变通的办法是使用没有空格或引号的表达式，或用计算属性替代这种复杂表达式。


#### 修饰符

修饰符 (modifier) 是以半角句号 . 指明的特殊后缀，用于指出一个指令应该以特殊方式绑定。例如，.prevent 修饰符告诉 v-on 指令对于触发的事件调用 event.preventDefault()：

```html
<form v-on:submit.prevent="onSubmit">...</form>
```

### 缩写

`v-` 前缀作为一种视觉提示，用来识别模板中 Vue 特定的 attribute。当你在使用 Vue.js 为现有标签添加动态行为 (dynamic behavior) 时，`v-` 前缀很有帮助，然而，对于一些频繁用到的指令来说，就会感到使用繁琐。同时，在构建由 Vue 管理所有模板的<a href="https://en.wikipedia.org/wiki/Single-page_application" target="_blank">单页面应用程序 (SPA - single page application)</a>时，v- 前缀也变得没那么重要了。因此，Vue 为 v-bind 和 v-on 这两个最常用的指令，提供了特定简写：

#### v-bind缩写


```html
<!-- 完整语法 -->
<a v-bind:href="url">...</a>

<!-- 缩写 -->
<a :href="url">...</a>

<!-- 动态参数的缩写 (2.6.0+) -->
<a :[key]="url"> ... </a>
```


#### v-on缩写

```html
<!-- 完整语法 -->
<a v-on:click="doSomething">...</a>

<!-- 缩写 -->
<a @click="doSomething">...</a>

<!-- 动态参数的缩写 (2.6.0+) -->
<a @[event]="doSomething"> ... </a>
```
