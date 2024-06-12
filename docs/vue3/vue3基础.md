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

### ref

> 定义响应式变量

- **语法**

  ```
  let xxx = ref(变量初始值);
  ```

- **返回值：**一个`RefImpl`的实例对象，简称`ref对象`或`ref`，`ref`对象的`value`**属性是响应式的**

- **注意点**

  - ts 中操作访问数据需要添加`.value`;但是模版中不需要`.value`，直接使用即可。
  - `let xxx = ref(变量初始值);`,xxx 不是响应式的，xxx.vaule 是响应式的。

### reactive

> 定义一个响应式的对象，基本的数据类型不要使用它，要用 ref,否则会报错

- **语法**

  ```
  let xxx = reactive(源对象初始值);
  ```

- **返回值**

  一个 proxy 的实例对象，简称:响应式对象

- **注意点**
  - reactive 的响应式是深层次的

### ref 和 reactive 的区别

- ref 接收的数据可以是基本类型也可以对象类型，reactive 只能对象类型

- 若 ref 接收的是对象类型，内部趋势也是调用了 reactive 函数

- ref 创建的变量访问必须使用.value (可以使用 volar 插件自动添加.value)

  <img src="https://raw.githubusercontent.com/673019334/image-oss/main/202405301643777.png" alt="自动补充value" style="zoom:60%;" />

- reactive 重新分配一个对象，会失去响应式（可以使用 Object.assign 去整体替换）

  Object.assign(xxx,{name:'cansy'})

**使用原则**

1.如果要创建一个基本类型，就使用 ref

2.如果创建一个响应式对象，层级不深，ref 和 reactive 都可以

3.如果创建一个响应式对象，层级深，推荐使用 reactive

### toRefs 和 toRef

> 把一个响应式对象中的中的属性转换成 ref 对象。
>
> 注意：当一个对象内的值解构赋值后，也会失去响应式

- toRefs 是批量转换
- ref 是单个转换

```vue
<template>
  姓名-{{ name }} 年龄-{{ age }}
  <button @click="onAddAge">增加年龄</button>
</template>
```

```js
<script setup lang="ts">
  import {reactive ,toRefs} from 'vue';
  const person = reactive({ name: 'zhangsan',age:100,gender });
  let {name,age,gender} = toRefs(person);
  let gender = toRef(person,'gender')//第一个参数响应式对象，第二个参数要结构出来的名称
  function onAddAge(){
    age.value  = age.value + 1;
    console.log(age.value); //每次回类加1，但是此时页面数据不会更新
  }
</script>
```

### computed

> 计算属性，根据已有的数据计算出新的数据
>
> 计算属性是有缓存的，无论模版调用多少次，只要依赖的数据不发生改变，就只会执行一次，method 没有缓存，调用多少次，就会执行多少次

- 计算属性实际上是一个 ref 响应式对象，因此复制的时候需要加上.value

- 当只读的时候 computed 的第一个参数是一个函数

- 当 get/set 的时候，参数是一个对象,对象有两个属性，get/set

  ```vue
  <template>
    <div>姓: <input type="text" v-model="firstName" /></div>
    <div>姓: <input type="text" v-model="lastName" /></div>
    <hr />
    <div>全名:{{ fullName }}</div>
    <button @click="handleChangeName">修改全名</button>
  </template>
  ```

  ```js
  // 需要设置属性时候的写法
  <script setup lang="ts">
  import { ref, computed } from 'vue'
  let firstName = ref('张')
  let lastName = ref('三')
  let fullName = computed({
    get() {
      return firstName.value + lastName.value
    },
    set(val) {
      const [str1, str2] = val.split('-')
      firstName.value = str1
      lastName.value = str2
    }
  })
  function handleChangeName() {
    fullName.value = 'li-si' //引起了set val的变化
  }
  </script>

  ```

  ```js
  //只需要get的写法
  <script setup lang="ts">
    import {(ref, computed)} from 'vue' let firstName = ref('张') let lastName = ref('三') let
    fullName = computed(()=> firstName.value + lastName.value) function handleChangeName(){' '}
    {(fullName.value = 'li-si')}
  </script>
  ```

### Watch

> 监听数据的变化
>
> 只能监听如下四种值的变化

- 1.ref 定义的数据
- 2.reactive 定义的数据
- 函数返回一个值（getter 函数）
- 一个包含上述内容的数组

#### 场景一

> 监听 ref 定义的基本类型数据,直接写名称即可，实际上监听的是 value 的变化

- watch 是一个函数
  - 第一个参数是要监听的值，监听 ref 定义的基本类型时，不需要+.value
  - 第二个参数是一个回调函数，函数的第一个值是发生变化前的值，第二个值是发生变化后的值
- 停止 watch 的方式

```vue
<template>
  <div>num : {{ sum }}</div>
  <button @click="handleNumAdd">num +1</button>
</template>
```

```js
<script setup lang="ts">
import { ref, computed ,watch} from 'vue'
let sum = ref(0);
function handleNumAdd(){
  sum.value  += 1
}
let stopWatch = watch(sum,(newVal,oldVal)=>{
  console.log('oldVal,newVal',oldVal,newVal)
  if(newVal >3){
    stopWatch()
  }
})
</script>
```

#### 场景二

> 监听 ref 定义的对象类型的数据，监听的是对象的地址值，若想监听对象深层数据的变化，需要手动开启深度监听

- 监听的是一个地址
- watch 是一个函数
  - 第一个参数，是 ref 定义的对象
  - 第二个参数回调函数
  - 第三个参数配置项
    - deep:true 深度监听
    - immediate :true//立即监听
    - 等等。。。
- 如果修改的是 ref 中的一个属性，则 oldValue 和 newValue 都是新的值，因为它们是同一个对象
- 如果修改的是整个 ref 对象项，newValue 就是新值,oldValue 是旧值

```js
let person = ref({
  name: '张三',
  age: 10,
});
function handleChangeName() {
  person.value.name = 'lisi';
}
function handleChangeAge() {
  person.value.age = 20;
}
function handleChangePerson() {
  person.value = {
    name: 'wangwu',
    age: 40,
  };
}
watch(
  person,
  (newVal, oldVal) => {
    console.log(newVal, oldVal);
  },
  {
    deep: true, //如果是修改的某个属性，需要开启深度监听才能被监听到
  },
);
```

#### 场景三

> 监听 reactive 定义的对象类型的数据，默认开启深度监听，且无法关闭

- 无法监听地址值，因为对象地址没有改变，本质上在源对象上进行的是赋值

  ```js
  let car = reactive({
    color: 'red',
    brand: 'xiaomi',
  });
  function handleChangeBrand() {
    car.brand = 'huaiwei';
  }
  function handleChangeColor() {
    car.color = 'green';
  }
  function handleChangeCar() {
    car = Object.assign(car, { color: 'yellow', brand: '特斯拉' });
  }
  watch(car, (newVal, oldVal) => {
    console.log(newVal, oldVal);
  });
  ```

#### 场景四

> 监听 ref 或者是 reactive 定义的对象类型数据中的某个属性

- 如果该属性值不是对象类型，而是基本类型，需要写成函数形式，此时 oldValue 是旧值，newValue 是新值
- 如果该属性依然是**对象类型**，可以直接写，也可以写成函数，建议写成函数

#### 场景五

> 监视上述多个数据
