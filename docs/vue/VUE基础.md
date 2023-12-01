# VUE基础

>  `vue.js` 是一套用于构建用户界面的渐进式框架

## 1.引入

我们还是先通过 \<script\> 的方式来引入 <u>vue</u>

```html
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
```

```js
let app = new Vue({
		
})
```



## 2.组件

### 组件基本分类

+ 根组件
+ 可复用的功能组件

### 根组件的创建

通过 `vue` 提供的构造函数可以实例化出来一个跟组件实例对象

```js
let app = new Vue(创建组件所需要的一些配置选项);
```

### 可复用的功能组件创建

通过 `Vue` 提供的静态方法 `component` 窗口可复用的功能组件

```js
let component1 = Vue.component(创建组件所需要的一些配置选项)
```

> 组件配置选项：https://cn.vuejs.org/v2/api

## 3.组件内容的渲染

渲染一个组件可以通过两种方式

+ template 选项
+ render 选项 (函数)

### template

type:string

组件的模版结构HTML,内容会被vue进行渲染，生成最终的HTML结构，并替代占位(挂载)元素

### render

type : (createElement: () => VNode) => VNode

## 4.组件中的数据（状态）

## 5.模版语法

## 6.数据到视图的更新