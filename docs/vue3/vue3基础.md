---
nav:
  title: vue基础
order: 1
---

## 1.vue3.0 简介

- 2020 年 9 月 18 日,vue.js 发布版`3.0`版本
- 官网发版地址https://github.com/vuejs/core/releases/tag/v3.0.0

## 2.vue3.0 有哪些改进

**1.【性能提升】**

- 打包大小减少`41%`
- 初次渲染快`55%`，更新渲染快`133%`
- 内存减少`54%`

**2.【源码升级】**

- 使用`proxy`代替`defineProperty`实习响应式
- 重写虚拟`DOM`的实现和`Tree-Shaking`

**3.【拥抱 TS】**

vue3.0 更好的支持 ts

**4.【新的特性】**

1.组合 api(composition API)

- setup

- ref 和 reactive

- computed 与 watch

  .....

  2.新的内置组件

* `Fragment`

* `Teleport`

* `Suspense`

  ......

  3.其他改变

- 新的生命周期钩子

- `data`选项应该始终被声明为一个函数

- 移除`keyCode`支持作为`v-on`的修饰符

  ...

## 2.创建 vue3.0 项目

### 2.1 基于 vue-cli 创建

### 2.2 基于 vite 创建【推荐】

vite 是新一代前端构建工具，vite 优势如下

- 轻量的热重载（HMR）,能实现极速的服务启动
- 对 TS、JSX、CSS 等支持开箱使用
- 真正的按需编译，不再等待整个应用编译完成

webpack 构建和 vite 构建对比图如下

![webpack构建](https://raw.githubusercontent.com/673019334/image-oss/main/webpack%E6%9E%84%E5%BB%BA.png)

![vite构建](https://raw.githubusercontent.com/673019334/image-oss/main/vite%E6%9E%84%E5%BB%BA.png)

具体操作

```bash
##创建命令
npm create vue@latest
## 2.具体配置
## 配置项目名称
√ Project name: vue3_test
## 是否添加TypeScript支持
√ Add TypeScript?  Yes
## 是否添加JSX支持
√ Add JSX Support?  No
## 是否添加路由环境
√ Add Vue Router for Single Page Application development?  No
## 是否添加pinia环境
√ Add Pinia for state management?  No
## 是否添加单元测试
√ Add Vitest for Unit Testing?  No
## 是否添加端到端测试方案
√ Add an End-to-End Testing Solution? » No
## 是否添加ESLint语法检查
√ Add ESLint for code quality?  Yes
## 是否添加Prettiert代码格式化
√ Add Prettier for code formatting?  No
```

- `Vite` 项目中，`index.html` 是项目的入口文件，在项目最外层。
- 加载`index.html`后，`Vite` 解析 `<script type="module" src="xxx">` 指向的`JavaScript`。
- `Vue3`**中是通过 **`createApp` 函数创建一个应用实例。

## 3.vue3.0 核心语法

### OptionsAPI 与 CompositionAPI

- vue2.0 的 API 设计是 Options 风格
- vue3.0 的 API 设计是`Composition`（组合）风格的。

- Options API 的弊端

  OptionsAPI，数据、方法、计算属性等，是分散在：data、methods、computed 中的，如果想新增或者修改一个需求，就需要分别修改 data、methods、computed...，不方便维护和修改

- CompositionAPI 的优势

  可以用函数的方式，更加优雅的组织代码，让相关功能更加有序的组织在一起。

### setup

`setup`是`Vue3`中一个新的配置项，值是一个函数，组件中所用到的 data、methods、计算、侦听属性，均配置在 setup 中。

特点如下：

- `setup`函数返回的对象中的内容，可以直接在模版中使用。
- `setup`中访问 this 是 undefined
- `setup`函数会在 beforeCreate 之前调用，是领先所有钩子执行的。

```vue
<template>
  姓名-{{ name }} 年龄-{{ age }}
  <button @click="onAddAge">增加年龄</button>
</template>
<script lang="ts">
setup(){
  let name ="zhangsan"; //原来写在data中的数据，此时name age都不是响应式的数据
  let age = 20;
  function onAddAge(){
    age = age + 1;
    console.log(age); //每次执行都会加1，但是此时页面数据不会更新
  }
 return{name,age onAddAge}
}
</script>
```

#### setup 的返回值

- 返回值是一个对象：则对象中的：属性、方法等，均可以在模版中使用

- 返回值是一个函数，则可以自定义渲染内容

  ```
  setup(){
  	return ()=>'helloworld'
  }
  ```

#### setup 和 optionAPI 之间的关系

- vue3.0 向下兼容 vue2.0 中的语法，但是不推荐 vue3.0 中写 vue2.0 的语法
- Vue2.0 的配置(data,methods...)可以访问到 setup 中的属性、方法。
- 但在 setup 中不能访问到 vue2.0 的配置
- 如果与 vue2.0 冲突，则 setup 优先

#### setup 语法糖

setup 函数有一个语法糖，这个语法糖可以帮助我们把顶层的变量和函数自动 return 出去。

```vue
<template>
  姓名-{{ name }} 年龄-{{ age }}
  <button @click="onAddAge">增加年龄</button>
</template>
<script setup lang="ts">
let name = 'zhangsan';
let age = 20;
function onAddAge() {
  age = age + 1;
  console.log(age); //每次回类加1，但是此时页面数据不会更新
}
</script>
```

#### 自定义组件名称

当使用 setup 语法糖后,组件就无法自定义名称，如下两种方式可以实现自定义名称

**1.使用插件**

1. 第一步：`npm i vite-plugin-vue-setup-extend -D`

2. 第二步：`vite.config.ts`

   ```js
   import { defineConfig } from 'vite';
   import VueSetupExtend from 'vite-plugin-vue-setup-extend';

   export default defineConfig({
     plugins: [VueSetupExtend()],
   });
   ```

3. 第三步：`<script setup lang="ts" name="组件名称">`

**2.使用双 script**

```ts
<script lang="ts">
  export default {
    name:'组件名称',
  }
</script>
<script lang="ts" setup>
</script>
```
