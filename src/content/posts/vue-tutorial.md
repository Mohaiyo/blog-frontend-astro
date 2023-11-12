---
title: '14 Architectural Design Ideas for a Spacious Interior'
pubDate: 2022-07-01
description: '这是我 Astro 博客的第一篇文章。'
author: 'Mohaiyo'
image:
  url: 'https://t7.baidu.com/it/u=825057118,3516313570&fm=193&f=GIF'
  alt: 'The full Astro logo.'
category: '读书笔记'
tags: ['astro', 'blogging', 'learning in public', 'vue']
---

## 模板语法

### 指令

> 指令 (Directives) 是带有 v- 前缀的特殊属性。指令属性的值预期是单个 JavaScript 表达式 (v-for 是例外情况，稍后我们再讨论)。指令的职责是，_当表达式的值改变时，将其产生的连带影响，响应式地作用于 DOM_。

- 参数
- 参数2
- 参数3
- 参数四

> 一些指令能够接收一个“参数”，在指令名称之后以冒号表示。例如，v-bind 指令可以用于响应式地更新 HTML 属性：

```html
<a v-bind:href="url">飞上天</a>
```

> 在这里，href是参数，告知 v-bind 指令将该元素的 href 属性与表达式 url 的值绑定。另一个例子是 v-on 指令，它用于监听 DOM 事件

```html
<a v-on:click="doSomething">事件监听点击事件作为参数</a>
```

> 在这里参数是监听的事件名。我们也会更详细地讨论事件处理

- 修饰符
  > .stop .prevent等

## Class与Style绑定

> 操作元素的 class 列表和内联样式是数据绑定的一个常见需求。因为它们都是属性，所以我们可以用 v-bind 处理它们：只需要通过表达式计算出字符串结果即可。不过，字符串拼接麻烦且易错。因此，在将 v-bind 用于 class 和 style 时，Vue.js 做了专门的增强。表达式结果的类型除了字符串之外，还可以是对象或数组。

### 绑定 HTML Class

- 对象语法
  > 我们可以传给 v-bind:class 一个对象，以动态地切换 class：

```html
<div v-bind:class="{ active: isActive }">calss 的对象语法</div>
```

> 上面的语法表示 active 这个 class 存在与否将取决于数据属性 isActive 的 truthiness。你可以在对象中传入更多属性来动态切换多个 class。此外，v-bind:class 指令也可以与普通的 class 属性共存。当有如下模板:

```html
<div class="static" v-bind:class="{ active: isActive, 'text-danger': hasError }"> </div>
```

> 和如下 data：

```js
data: {
  isActive: true,
  hasError: false
}
```

> 结果渲染为：

```html
<div class="static active"></div>
```

> 绑定的数据对象不必内联定义在模板里,可以直接在data里面定义classObject用于表示样式的合集。或者在计算属性也可以这样定义

- 数组语法

> 我们可以把一个数组传给 v-bind:class，以应用一个 class 列表：

```html
<div v-bind:class="[activeClass, errorClass]"></div>
```

```js
data: {
  activeClass: 'active',
  errorClass: 'text-danger'
}
```

> 渲染结果

```html
<div class="active text-danger"></div>
```

> 如果你也想根据条件切换列表中的 class，可以用三元表达式：

```html
<div v-bind:class="[isActive ? activeClass : '', errorClass]">数组绑定</div>
```

> 不过，当有多个条件 class 时这样写有些繁琐。所以在数组语法中也可以使用对象语法

```html
<div v-bind:class="[{ active: isActive }, errorClass]"></div>
```

- 用在组件上

> 当在一个自定义组件上使用 class 属性时，这些类将被添加到该组件的根元素上面。这个元素上已经存在的类不会被覆盖。如：

```js
Vue.component('my-component', {
  template: '<p class="foo bar">Hi</p>'
})
```

> 然后在使用它的时候添加一些 class：

```html
<my-component class="baz boo"></my-component>
```

> HTML 将被渲染为:

```html
<p class="foo bar baz boo">Hi</p>
```

### 绑定内联样式

- 对象语法
  > 和class绑定一样
- 数组语法
  > 和class绑定一样的
- 自动添加前缀
  > 当 v-bind:style 使用需要添加浏览器引擎前缀的 CSS 属性时，如 transform，Vue.js 会自动侦测并添加相应的前缀。
- 多重值
  > 从 2.3.0 起你可以为 style 绑定中的属性提供一个包含多个值的数组，常用于提供多个带前缀的值，例如：

```html
<div :style="{ display: ['-webkit-box', '-ms-flexbox', 'flex'] }"></div>
```

> 这样写只会渲染数组中最后一个被浏览器支持的值。在本例中，如果浏览器支持不带浏览器前缀的 flexbox，那么就只会渲染 display: flex。

## 列表渲染

### 数组的v-for

> 数组的列表渲染 item in items or item of items

### 一个对象的v-for

> 你也可以用 v-for 通过一个对象的属性来迭代。

```html
<ul id="v-for-object" class="demo">
  <li v-for="(value, key, index) in object"> {{index}} - {{ key }} - {{ value }} </li>
</ul>
```

> 在遍历对象时，是按 Object.keys() 的结果遍历，_但是不能保证它的结果在不同的 JavaScript 引擎下是一致的_。

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

```js
example1.items = example1.items.filter(function (item) {
  return item.message.match(/Foo/)
})
```

> 你可能认为这将导致 Vue 丢弃现有 DOM 并重新渲染整个列表。幸运的是，事实并非如此。Vue 为了使得 DOM 元素得到最大范围的重用而实现了一些智能的、启发式的方法，所以用一个含有相同元素的数组去替换原来的数组是非常高效的操作。

### 注意事项

> 由于 JavaScript 的限制，Vue 不能检测以下变动的数组：

1.当你利用索引直接设置一个项时，例如：vm.items[indexOfItem] = newValue 2.当你修改数组的长度时，例如：vm.items.length = newLength

> 差点被面试官带坑里了，上次他问我，如果直接赋值，就譬如说这样

```js
this.items[0].name = 'modify'
```

> 其实是可以赋值成功，而且vue也可以检测到数据的改变的。只是`this.items[0] = {name: 'modify'}` 这样是不允许的，检测不了其变动为了解决第一类问题，以下两种方式都可以实现和 vm.items[indexOfItem] = newValue 相同的效果，同时也将触发状态更新：

```js
// Vue.set
Vue.set(example1.items, indexOfItem, newValue)
// Array.prototype.splice
example1.items.splice(indexOfItem, 1, newValue)
```

> 为了解决第二类问题，你可以使用 splice：

```js
example1.items.splice(index, howmany, item1, item2)
// splice() 方法向/从数组中添加/删除项目，然后返回被删除的项目。 会改变原来的数组
```

### 对象更改检测注意事项

> 还是由于 JavaScript 的限制，Vue 不能检测对象属性的添加或删除

```js
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

```js
var vm = new Vue({
  data: {
    userProfile: {
      name: 'Anika'
    }
  }
})
```

> 你可以添加一个新的 age 属性到嵌套的 userProfile 对象：

```js
Vue.set(vm.userProfile, 'age', 27)
// 或者
vm.$set(vm.userProfile, 'age', 27)
```

> 有时你可能需要为已有对象赋予多个新属性，比如使用 Object.assign() 或 \_.extend()。在这种情况下，你应该用两个对象的属性创建一个新的对象。所以，如果你想添加*新的响应式属性*，不要像这样：

```js
Object.assign(vm.userProfile, {
  age: 27,
  favoriteColor: 'Vue Green'
})
```

> 你应该这样做：

```js
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
