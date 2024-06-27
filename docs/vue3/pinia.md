---
nav:
  title: pinia
order: 4
---

# pinia

## 1.搭建 pinia 环境

步骤

- 1.安装 pinia

  `npm i pinia`

- 2.创建 pinia，在 mian.ts 中使用

  ```js
  import { createPinia } from 'pinia';
  const pinia = createPinia(); //创建状态管理器
  app.use(pinia); //使用插件
  ```

- 此时开发者工具上已经出现了 pinia

![image-20240626170127088](https://raw.githubusercontent.com/673019334/image-oss/main/202406261701196.png)

## 2.存储和读取数据

> store 是一个保存状态的实体，每个组件都可以读取、写入它。
>
> 它有三个概念：state、getter、action，相当于组件中的：data、computed、和 methods

- 1.创建 store，存储数据

  `src/store/count.ts`

  ```js
  import { defineStore } from 'pinia';
  //定义并创建一个store
  //最好使用hooks的方式命名，最好和文件夹名称一致
  export const useCountStore = defineStore('conut', {
    state: function () {
      return {
        count: 1,
      };
    },
    getters: {},
    actions: {},
  });
  ```

  - 第一个参数：一个唯一名称，表示 store 的 id
  - 第二个参数：是个对象,可以有三个属性
  - **state** function，返回一个对象，对象里面定义状态
  - **getters** 对象，对象的 key 是计算属性的值，value 是 function,返回一个计算好的状态，function 的第一个参数是 state，是 state 中定义的值
  - **action** 对象，是定义的方法，key 值是方法名，value 是对应的方法

- 2.读取 store 里面的数据

  ```vue
  <script setup>
  import { useCountStore } from '@/stores/count';
  const counter = useCountStore();
  </script>
  <template>
    <!-- 直接从 store 中访问 state -->
    <div>Current Count: {{ count.count }}</div>
  </template>
  ```

## 3.修改数据(3 种方式)

- 1.直接修改
- 2.使用 patch 修改
- 3.使用 action 代替修改

```vue
import { useCountStore } from '@/stores/count'
const counter = useCountStore();
// 方式一：直接修改
   countStore.count += 1
//  方式二：&patch修改
    countStore.$patch({
      count: countStore.count + 1
   })
// 方式三 使用action
  countStore.increment()
</script>
<template>
  <!-- 直接从 store 中访问 state -->
  <div>Current Count: {{ count.count }}</div>
</template>
```

## 4.storeToRefs

> 借助 `storeToRefs`可以将`store`中的数据转换成`ref`对象，方便在模版中使用
>
> pinia 提供的`storeToRefs`只会将数据做转换，而 vue 中的`toRefs`会转换`store`中的所有数据

```vue
<template>
  <div class="count">
    <h2>{{ count }}</h2>
  </div>
</template>

<script setup lang="ts" name="Count">
import { useCountStore } from '@/store/count';
import { storeToRefs } from 'pinia';
const countStore = useCountStore();
/* 使用storeToRefs转换countStore，随后解构 */
const { count } = storeToRefs(countStore); //此时的count 就是响应式的
</script>
```

## 5.getters

**定义 getters，并访问当前 getters 中的数据**

```js
export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0,
  }),
  getters: {
    //可以通过第一个参数 访问state 里面使用数据
    doubleCount: (state) => state.count * 2,
    // 可以通过this，访问 state 中的数据 ,但是需要自动补全类型和类型标注
    doubleCountPlus(): number {
      return this.count * 2;
    },
  },
});
```

**访问其它 getters**

- 通过 this 访问，但是必须自动补全类型标注

```js
export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0,
  }),
  getters: {
    // 自动推断出返回类型是一个 number
    doubleCount(state) {
      return state.count * 2;
    },
    // 返回类型**必须**明确设置
    doublePlusOne(): number {
      // 整个 store 的 自动补全和类型标注 ✨
      return this.doubleCount + 1;
    },
  },
});
```

**向 getters 中传递参数**

- 当 getter 返回的是一个函数的时候，就可以向他传递参数，该函数可以接受任意参数
- **getter 将不再被缓存**。他们只是一个被调用的函数
- 此种方式不推荐使用

```js
export const useUserListStore = defineStore('userList', {
  getters: {
    getUserById: (state) => {
      return (userId) => state.users.find((user) => user.id === userId);
    },
  },
});
```

```vue
<script setup>
import { useUserListStore } from './store';
const userList = useUserListStore();
const { getUserById } = storeToRefs(userList);
// 请注意，你需要使用 `getUserById.value` 来访问
// <script setup> 中的函数
</script>

<template>
  <p>User 2: {{ getUserById(2) }}</p>
</template>
```

## 6.$subscribe

通过 store 的 `$subscribe()` 方法侦听 `state` 及其变化

```js
countStore.$subscribe((mutate, state) => {
  console.log('mutate,state', mutate, state);
});
```

![image-20240627162834406](https://raw.githubusercontent.com/673019334/image-oss/main/202406271628031.png)

## 7.store 组合式写法

**store**

- defineStore 的第二个参数是个 function，需要将定义的对象和方法 return 出去

```js
import { defineStore } from 'pinia';
import { ref } from 'vue';
export const useCountStore = defineStore('conut', () => {
  const count = ref(2);
  function add() {
    count.value += 1;
  }
  return {
    count,
    add,
  };
});
```

**页面中使用**

```vue
<template>
  {{ countStore.count }}
  <button @click="countStore.add">+1</button>
</template>
<script setup lang="ts">
import { useCountStore } from '@/store/count';
const countStore = useCountStore();
</script>
```
