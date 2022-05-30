# Vue.js

## 简介

`vue.js` 是一套用于构造用户界面的渐进式框架;

[官网地址](https://cn.vuejs.org/)

## 1.组件

- 根组件
- 可复用功能组件

### 根组件

创建方式通过`vue`提供的构造函数可以实例化出来一个根组件实例对象

```js
// options 创建组件所需要的一些配置选项{}
var vm = new Vue({
  // 选项
});
```

### 可复用性组件

创建方法通过`vue`提供的静态方法 `component` 可以创建出可复用的组件

```js
let component = Vue.component(options);
```

## 2.options 配置项

### 2.1 组件内容渲染

渲染一个组件的内容可以通过如下两种方式

- template 选项
- el
- render 选项（函数）

#### 2.1.1template

type:string

组件的模板结构（HTML），模板内容会被 Vue 进行渲染，生成 HTML 内容，并替换占位（挂载）元素

#### 2.1.2 el

type:string | Element

提供一个在页面上已经存在的 DOM 元素作为 Vue 的实例挂载目标。可以是 CSS 选择器，也可以是一个 HTMLElement 实例

- 该选择只对`new`创建的实例有效,所以一般是根组件挂载时候使用
- 如果提供了`el`,但是没有提供`template`，则`el`的内容作为`template`
- 如果在实例化时存在这个选项，实例将立即进入编译过程，否则，需要显式调用 vm.$mount() 手动开启编译。
- 即当 `Vue` 实例没有 `el` 选项的时候，它会处于一种 <u>未挂载</u> 的状态，我们可以通过组件 `Vue` 实例对象的 `$mount` 方法来手动挂载，通过该方式，我们也可以达到延迟 `Vue` 实例的挂载的目的

```js
<div id="app"> </div>;

let vm = new Vue({
  el: '#app',
});
```

#### 2.1.3 render

type:(createElement:()=>VNode)=>VNode

直接创建虚拟 Dom 对象，优先级高于 el 和 template

### 2.2 data 选项

组件中的数据（状态）,组件内部使用的数据，`data`中的值，模板中可以直接访问

- vue 根组件中 data 是一个对象
- 可复用组件中的 data 必须是一个函数，且返回一个对象（因为复用性，避免多个实例引用同一个对象）

#### data 的访问

data 中的数据可以直接通过组件实例对象访问，也可以通过实例对象下的 `$data` 属性进行访问

> 组件实例下面有很多$开头的属性,这些都是实例对象内置的一些属性和方法，vue为了区分数据与内置属性方法，内置的属性和方法默认的都是以$开始的，所以我们中的数据应该尽量避免使用`$`开始的数据

```js
var data = { a: 1 };

// 直接创建一个实例
var vm = new Vue({
  data: data,
});
vm.a; // => 1
vm.$data === data; // => true

// Vue.extend() 中 data 必须是函数
var Component = Vue.extend({
  data: function () {
    return { a: 1 };
  },
});
```

## 3.指令

<b>内容输出</b>

### v-text

```html
<p v-text="title"></p>
```

> v-text 会填充整个`innerHTML`，如果原来有值，原来的值会被覆盖

### v-cloak

```html
<p v-text>{{title}}</p>
```

```css
[v-cloak] {
  display: none;
}
```

> 需要搭配 css 一起使用

### v-html

> 为了防止`XSS`攻击，默认情况下输出是不会作为 html 解析的，通过这个指令可以让内容作为 html 解析

### v-once

> 只渲染元素和组件一次，后期的更新不再渲染

### v-pre

> 忽略这个元素和它字元素内容的编译

<b>逻辑处理</b>

### v-show

根据表达式的值，切换元素的显示与隐藏(display 属性)，适用于切换比较频繁的状态

### v-if

根据表达式的值（布尔值）,创建或销毁元素，使用与状态切换不频繁的情况

### v-else/v-else-if
