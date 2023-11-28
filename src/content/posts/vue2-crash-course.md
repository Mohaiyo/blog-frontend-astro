---
title: 'Vue2 Crash Course'
pubDate: 2018-02-23
description: 'Vue2系列-起步'
author: 'Wayne.Liang'
image:
  url: ''
  alt: ''
category: '读书笔记'
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


## Class与Style绑定

操作元素的 class 列表和内联样式是数据绑定的一个常见需求。因为它们都是属性，所以我们可以用 v-bind 处理它们：只需要通过表达式计算出字符串结果即可。不过，字符串拼接麻烦且易错。因此，在将 v-bind 用于 class 和 style 时，Vue.js 做了专门的增强。表达式结果的类型除了字符串之外，还可以是对象或数组。

### 绑定 HTML Class

#### 对象语法

我们可以传给 v-bind:class 一个对象，以动态地切换 class：

```html
<div v-bind:class="{ active: isActive }">calss 的对象语法</div>
```

上面的语法表示 active 这个 class 存在与否将取决于数据属性 isActive 的 <a href="https://developer.mozilla.org/zh-CN/docs/Glossary/Truthy" target="_blank">truthiness</a>。你可以在对象中传入更多属性来动态切换多个 class。此外，v-bind:class 指令也可以与普通的 class 属性共存。当有如下模板:

```html
<div class="static" v-bind:class="{ active: isActive, 'text-danger': hasError }"> </div>
```

和如下 data：

```javascript
data: {
  isActive: true,
  hasError: false
}
```

结果渲染为：

```html
<div class="active static"></div>
```

绑定的数据对象不必内联定义在模板里,可以直接在data里面定义classObject用于表示样式的合集。

```html
<div v-bind:class="classObject"></div>
```

```javascript
data: {
  classObject: {
    active: true,
    'text-danger': false
  }
}
```

或者在计算属性也可以这样定义

```javascript
data: {
  isActive: true,
  error: null
},
computed: {
  classObject: function () {
    return {
      active: this.isActive && !this.error,
      'text-danger': this.error && this.error.type === 'fatal'
    }
  }
}
```


#### 数组语法

我们可以把一个数组传给 v-bind:class，以应用一个 class 列表：

```html
<div v-bind:class="[activeClass, errorClass]"></div>
```

```javascript
data: {
  activeClass: 'active',
  errorClass: 'text-danger'
}
```

渲染结果

```html
<div class="active text-danger"></div>
```

如果你也想根据条件切换列表中的 class，可以用三元表达式：

```html
<div v-bind:class="[isActive ? activeClass : '', errorClass]">数组绑定</div>
```

不过，当有多个条件 class 时这样写有些繁琐。所以在数组语法中也可以使用对象语法

```html
<div v-bind:class="[{ active: isActive }, errorClass]"></div>
```

#### 用在组件上

当在一个自定义组件上使用 class 属性时，这些类将被添加到该组件的根元素上面。这个元素上已经存在的类不会被覆盖。如：

```javascript
Vue.component('my-component', {
  template: '<p class="foo bar">Hi</p>'
})
```

后在使用它的时候添加一些 class：

```html
<my-component class="baz boo"></my-component>
```

HTML 将被渲染为:

```html
<p class="foo bar baz boo">Hi</p>
```

### 绑定内联样式

#### 对象语法

`v-bind:style` 的对象语法十分直观——看着非常像 CSS，但其实是一个 JavaScript 对象。CSS property 名可以用驼峰式 (camelCase) 或短横线分隔 (kebab-case，记得用引号括起来) 来命名：

```html
<div v-bind:style="{ color: activeColor, 'font-size': fontSize + 'px', marginTop: '10px' }"></div>
```

```javascript
data: {
  activeColor: 'red',
  fontSize: 30
}
```

直接绑定到一个样式对象通常更好，这会让模板更清晰：

```html
<div v-bind:style="styleObject"></div>
```

```javascript
data: {
  styleObject: {
    color: 'red',
    fontSize: '13px'
  }
}
```

同样的，对象语法常常结合返回对象的计算属性使用。


#### 数组语法

v-bind:style 的数组语法可以将多个样式对象应用到同一个元素上：

```html
<div v-bind:style="[baseStyles, overridingStyles]"></div>
```

#### 自动添加前缀

当 `v-bind:style` 使用需要添加浏览器引擎前缀的 CSS 属性时，如 `transform`，Vue.js 会自动侦测并添加相应的前缀。

#### 多重值

> 从 2.3.0 起你可以为 style 绑定中的属性提供一个包含多个值的数组，常用于提供多个带前缀的值，例如：

```html
<div :style="{ display: ['-webkit-box', '-ms-flexbox', 'flex'] }"></div>
```

这样写只会渲染数组中最后一个被浏览器支持的值。在本例中，如果浏览器支持不带浏览器前缀的 flexbox，那么就只会渲染 `display: flex`。

## 列表渲染

### 数组的v-for

数组的列表渲染 item in items or item of items

### 一个对象的v-for

你也可以用 v-for 通过一个对象的属性来迭代。

```html
<ul id="v-for-object" class="demo">
  <li v-for="(value, key, index) in object"> {{index}} - {{ key }} - {{ value }} </li>
</ul>
```

在遍历对象时，是按 `Object.keys()` 的结果遍历，但是**不能**保证它的结果在不同的 JavaScript 引擎下是一致的。

### key

> key的用法 一般来说使用v-for最好尽量加上:key属性，除非渲染的列表非常简单，或者刻意依赖默认行为以获取性能上面的提升

### 数组更新检测

> Vue 包含一组观察数组的变异方法，所以它们也将会触发视图更新。这些方法如下

- 变异方法
  - push()
  - pop()
  - shift()
  - unshift()
  - splice()
  - sort()
  - reverse()

### 替换数组

> 变异方法 (mutation method)，顾名思义，会改变被这些方法调用的原始数组。相比之下，也有非变异 (non-mutating method) 方法，例如：filter(), concat() 和 slice() 。这些不会改变原始数组，但总是返回一个新数组。当使用非变异方法时，可以用新数组替换旧数组：

```javascript
example1.items = example1.items.filter(function (item) {
  return item.message.match(/Foo/)
})
```

> 你可能认为这将导致 Vue 丢弃现有 DOM 并重新渲染整个列表。幸运的是，事实并非如此。Vue 为了使得 DOM 元素得到最大范围的重用而实现了一些智能的、启发式的方法，所以用一个含有相同元素的数组去替换原来的数组是非常高效的操作。

### 注意事项

> 由于 JavaScript 的限制，Vue 不能检测以下变动的数组：

1.当你利用索引直接设置一个项时，例如：vm.items[indexOfItem] = newValue 2.当你修改数组的长度时，例如：vm.items.length = newLength

> 差点被面试官带坑里了，上次他问我，如果直接赋值，就譬如说这样

```javascript
this.items[0].name = 'modify'
```

> 其实是可以赋值成功，而且vue也可以检测到数据的改变的。只是`this.items[0] = {name: 'modify'}` 这样是不允许的，检测不了其变动为了解决第一类问题，以下两种方式都可以实现和 vm.items[indexOfItem] = newValue 相同的效果，同时也将触发状态更新：

```javascript
// Vue.set
Vue.set(example1.items, indexOfItem, newValue)
// Array.prototype.splice
example1.items.splice(indexOfItem, 1, newValue)
```

> 为了解决第二类问题，你可以使用 splice：

```javascript
example1.items.splice(index, howmany, item1, item2)
// splice() 方法向/从数组中添加/删除项目，然后返回被删除的项目。 会改变原来的数组
```

### 对象更改检测注意事项

> 还是由于 JavaScript 的限制，Vue 不能检测对象属性的添加或删除

```javascript
var vm = new Vue({
  data: {
    a: 1
  }
})
// `vm.a` 现在是响应式的

vm.b = 2
// `vm.b` 不是响应式的
```

> 对于已经创建的实例，Vue 不能动态添加根级别的响应式属性。但是，可以使用 Vue.set(object, key, value) 方法向嵌套对象添加响应式属性。例如，对于：

```javascript
var vm = new Vue({
  data: {
    userProfile: {
      name: 'Anika'
    }
  }
})
```

> 你可以添加一个新的 age 属性到嵌套的 userProfile 对象：

```javascript
Vue.set(vm.userProfile, 'age', 27)
// 或者
vm.$set(vm.userProfile, 'age', 27)
```

> 有时你可能需要为已有对象赋予多个新属性，比如使用 Object.assign() 或 \_.extend()。在这种情况下，你应该用两个对象的属性创建一个新的对象。所以，如果你想添加*新的响应式属性*，不要像这样：

```javascript
Object.assign(vm.userProfile, {
  age: 27,
  favoriteColor: 'Vue Green'
})
```

> 你应该这样做：

```javascript
vm.userProfile = Object.assign({}, vm.userProfile, {
  age: 27,
  favoriteColor: 'Vue Green'
})
```

### 显示过滤/排序结果

> 有时，我们想要显示一个数组的过滤或排序副本，而不实际改变或重置原始数据。在这种情况下，可以创建返回过滤或排序数组的计算属性。或者计算属性不适用的情况下，使用methods方法

### 一个组件的v-for

> 2.2.0+ 的版本里，当在组件中使用 v-for 时，key 现在是必须的。需要注意的是组件需要明确数据的来源，减少代码的耦合很重要 所以不会自动将item注入组件，而是用props来接收

```html
<my-component v-for="item in items" :key="item.id"></my-component>
```

## 事件处理

### 事件修饰符

> 在事件处理程序中调用 event.preventDefault() 或 event.stopPropagation() 是非常常见的需求。尽管我们可以在方法中轻松实现这点，但更好的方式是：方法只有纯粹的数据逻辑，而不是去处理 DOM 事件细节。为了解决这个问题，Vue.js 为 v-on 提供了事件修饰符。之前提过，修饰符是由点开头的指令后缀来表示的

- .stop
- .prevent
- .once
- .capture
- .self

```html
<!-- 阻止单击事件继续传播 -->
<a v-on:click.stop="doThis"></a>

<!-- 提交事件不再重载页面 -->
<form v-on:submit.prevent="onSubmit"></form>

<!-- 修饰符可以串联 -->
<a v-on:click.stop.prevent="doThat"></a>

<!-- 只有修饰符 -->
<form v-on:submit.prevent></form>

<!-- 添加事件监听器时使用事件捕获模式 -->
<!-- 即元素自身触发的事件先在此处处理，然后才交由内部元素进行处理 -->
<div v-on:click.capture="doThis">...</div>

<!-- 只当在 event.target 是当前元素自身时触发处理函数 -->
<!-- 即事件不是从内部元素触发的 -->
<div v-on:click.self="doThat">...</div>
```

> 2.3.0 新增

Vue 还对应 addEventListener 中的 passive 选项提供了 .passive 修饰符

```html
<!-- 滚动事件的默认行为 (即滚动行为) 将会立即触发 -->
<!-- 而不会等待 `onScroll` 完成  -->
<!-- 这其中包含 `event.preventDefault()` 的情况 -->
<div v-on:scroll.passive="onScroll">...</div>
```

> 这个 .passive 修饰符尤其能够提升移动端的性能。

