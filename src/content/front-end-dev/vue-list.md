---
title: 'Vue列表渲染'
pubDate: 2018-02-27
description: 'Vue2系列-起步'
author: 'Wayne.Liang'
image:
  cover: '../assets/front-end-dev/vue-list-cover.png'
  alt: 'vue list'
category: '前端开发'
tags: ['Vue.js', 'Vue2']
---

## Contents

## 列表渲染

### 数组的v-for

数组的列表渲染 item in items 或者 item of items

```html
<ul id="list">
  <li v-for="(item, index) in items"> {{ parentMessage }} - {{ index }} - {{ item.message }} </li>
</ul>
```

```html
<div v-for="item of items"></div>
```

### 一个对象的v-for

你也可以用 v-for 通过一个对象的属性来迭代。

```html
<ul id="v-for-object" class="demo">
  <li v-for="(value, key, index) in object"> {{index}} - {{ key }} - {{ value }} </li>
</ul>
```

在遍历对象时，是按 `Object.keys()` 的结果遍历，但是**不能**保证它的结果在不同的 JavaScript 引擎下是一致的。

### 维护状态

一般来说使用v-for最好尽量加上:key属性，除非渲染的列表非常简单，或者刻意依赖默认行为以获取性能上面的提升

> 不要使用对象或数组之类的非基本类型值作为 v-for 的 key。请用字符串或数值类型的值。

### 数组更新检测

### 变更方法

Vue 包含一组观察数组的变异方法，所以它们也将会触发视图更新。这些方法如下

- push()
- pop()
- shift()
- unshift()
- splice()
- sort()
- reverse()

#### 替换数组

变异方法 (mutation method)，顾名思义，会改变被这些方法调用的原始数组。相比之下，也有非变异 (non-mutating method) 方法，例如：`filter()`, `concat()` 和 `slice()` 。这些不会改变原始数组，但总是**返回一个新数组**。当使用非变异方法时，可以用新数组替换旧数组：

```javascript
example1.items = example1.items.filter(function (item) {
  return item.message.match(/Foo/)
})
```

你可能认为这将导致 Vue 丢弃现有 DOM 并重新渲染整个列表。幸运的是，事实并非如此。Vue 为了使得 DOM 元素得到最大范围的重用而实现了一些智能的、启发式的方法，所以用一个含有相同元素的数组去替换原来的数组是非常高效的操作。

#### 注意事项

- 数组更改检测注意事项

由于 JavaScript 的限制，Vue 不能检测以下变动的数组：

1.当你利用索引直接设置一个项时，例如：vm.items[indexOfItem] = newValue

2.当你修改数组的长度时，例如：vm.items.length = newLength


`this.items[0] = { name: 'modify' }` 这样是不允许的，检测不了其变动为了解决第一类问题，以下两种方式都可以实现和 vm.items[indexOfItem] = newValue 相同的效果，同时也将触发状态更新：

```javascript
// Vue.set
Vue.set(example1.items, indexOfItem, newValue)
// Array.prototype.splice
example1.items.splice(indexOfItem, 1, newValue)
```

为了解决第二类问题，你可以使用 splice：

```javascript
example1.items.splice(index, howmany, item1, item2)
// splice() 方法向/从数组中添加/删除项目，然后返回被删除的项目。 会改变原来的数组
```

- 对象更改检测注意事项

还是由于 JavaScript 的限制，Vue 不能检测对象属性的添加或删除

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

对于已经创建的实例，Vue 不能动态添加根级别的响应式属性。但是，可以使用 Vue.set(object, key, value) 方法向嵌套对象添加响应式属性。例如，对于：

```javascript
var vm = new Vue({
  data: {
    userProfile: {
      name: 'Anika'
    }
  }
})
```

你可以添加一个新的 age 属性到嵌套的 userProfile 对象：

```javascript
Vue.set(vm.userProfile, 'age', 27)
// 或者
vm.$set(vm.userProfile, 'age', 27)
```

有时你可能需要为已有对象赋予多个新属性，比如使用 Object.assign() 或 \_.extend()。在这种情况下，你应该用两个对象的属性创建一个新的对象。所以，如果你想添加*新的响应式属性*，不要像这样：

```javascript
Object.assign(vm.userProfile, {
  age: 27,
  favoriteColor: 'Vue Green'
})
```

你应该这样做：

```javascript
vm.userProfile = Object.assign({}, vm.userProfile, {
  age: 27,
  favoriteColor: 'Vue Green'
})
```

### 显示过滤/排序结果

有时，我们想要显示一个数组的过滤或排序副本，而不实际改变或重置原始数据。在这种情况下，可以创建返回过滤或排序数组的计算属性。或者计算属性不适用的情况下，使用methods方法

### 一个组件的v-for

> 2.2.0+ 的版本里，当在组件中使用 v-for 时，key 现在是必须的。需要注意的是组件需要明确数据的来源，减少代码的耦合很重要 所以不会自动将item注入组件，而是用props来接收

```html
<my-component v-for="item in items" :key="item.id"></my-component>
```
