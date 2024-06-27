---
nav:
  title: vue3.0路由
order: 3
---

# Vue3.0 路由

## 什么是路由

是指在单页面应用中，通过 Js 实现的浏览器对 URL 的控制和管理，使得用户在访问不同 URL 时能够得到不用的视图

## 路由版本

- vue3.0 中要使用`vue-router`的 4.x 版本

## 路由切换

- **1.安装路由依赖**

  `npm i vue-router` :注意 vue3 中要使用 4x 版本，vue2 中使用 3x 版本

- **2.创建路由器实例**

  路由器实例是由 createRouter() 函数创建的，routes 选项中定义了一组路由，把 URL 映射到组件。

  - component：组件
  - path：路由

  ```js
  //src/router/index.ts
  import { createRouter } from 'vue-router';
  import HomeView from './HomeView.vue';
  import AboutView from './AboutView.vue';

  const routes = [
    { path: '/', component: HomeView },
    { path: '/about', component: AboutView },
  ];

  const router = createRouter({
    history: createMemoryHistory(),
    routes,
  });
  ```

- **3.注册路由器插件**

  在 main.ts 文件中注册，一旦创建了路由器实例，需要将其注册为插件，这一步骤使用 use 完成

  > 和大多数的 Vue 插件一样，`use()` 需要在 `mount()` 之前调用。

  插件干了什么

  - 全局注册了`RouterView` 和 `RouterLink` 组件。
  - 添加全局 `$router` 和 `$route` 属性。
  - 启用 `useRouter()` 和 `useRoute()` 组合式函数。
  - 触发路由器解析初始路由

  ```js
  import router from './router';
  //方式一
  const app = createApp(App); // 创建一个应用
  app.use(router); //使用路由
  app.mount('#app');
  // 方式二
  createApp(App).use(router).mount('#app');
  ```

  4.**实现路由切换**

  ```vue
  <template>
    <!-- 导航区 -->
    <div>
      <RouterLink to="/home"> 主页</RouterLink>
      <RouterLink to="/about"> 关于</RouterLink>
    </div>
    <!-- 展示区域 -->
    <div>
      <RouterView />
    </div>
  </template>
  ```

## RouterView 和 RouterLink

**RouterView**

`RouterView`组件可以使用 Vue Router 知道你想要在哪里渲染当前 URL 对应的**路由组件**。它可以放在任何地方，不一定是 APP。vue 中，但放在其它地方的时候需要导入 `import { RouterView } from 'vue-router'`

**RouterLink**

`RouterLink`，创建链接，不同于常规的 a 标签。使得 vue router 能在不重新加载页面的情况下改变 URL，处理 URL 的生成、编码和其他功能。

**属性**

- to : 跳转的路径，

  - 直接跟上字符串，要跳转的路径

  - 对象写法

    ```html
    <router-link active-class="active" :to="{path:'/home'}"> Home </router-link>
    ```

- `active-class`:激活时的类名

## router 和 route

**router**

`router`:路由器实例，即 createRouter()返回的对象。在应用中，访问该对像的方式取决于上下文。例如，在组合式 api 中可以使用`useRouter()`来访问。在选项 API 中，它可以通过`this.$router`来访问

编程式导航使用

**route**

`route`:路由，指当前激活的路由，是一个包含当前路由信息的对象。每当进行路由导航时，`route`对像被称为当前激活的路由信息。`route`对象包含了当前路由的路径、参数、查询参数等信息。在组合式 api 中可以使用`useRoute()`来访问。在选项 API 中，它可以通过`this.$route`来访问

## **注意点**

路由组件：靠路由的规则渲染出来的

```js
routes: [
  {
    name: '', //名称
    path: '', //路径
    component: '', //组件
  },
];
```

- 放在 views/pages 文件夹下面

一般组件:写标签实现的

- 放在 components 下面

## 路由器的工作模式

### **history**

优点：url 美观，不带#号

缺点：项目上线刷新会报 404 错误

> 需要 nginx

```bash
error_page 404 /404.html;
location = /40x.html {
}
```

使用方式

```js
//VUE2.0
mode: 'history';
//VUE3.0
const router = createRouter({
  history: createWebHistory(), //history模式
  /******/
});
// React
BrowserRouter;
```

### **hash 模式**

- 优点：兼容性更好，不需要特殊处理
- 缺点：URL 带有#号，不美观

```js
//VUE3.0
const router = createRouter({
  history: createWebHashHistory(),
});
```

## 命名路由

> 可以简化路由跳转及传参

```js
routes: [
  {
    name: 'home',
    path: '/home',
    component: Home,
  },
  {
    name: 'guanyu',
    path: '/about',
    component: About,
  },
];
```

简化后的写法

- 当有子路由时体现比较明显，下面讲述

```html
<router-link active-class="active" :to="{name:'home'}"> Home </router-link>
```

## 嵌套路由

```js
const router = createRouter({
  history:createWebHistory(),
	routes:[
        {
          name:'guanyu',// 此处可以和path一致，只是这里方面区分
          path:'/about',
          component:About
          children:[ // 嵌套路由要使用
             {
                name:'xiangqing',
                path:'detail',
                component:Detail
		 					}
          ]
        },
			]
	]
})
export default router
```

**使用过程**

- 1.编写子路由组件

- 2.配置路由规则，使用 children 组件

- 3.展示组件中预留一个`<router-view>`

- 4.路由跳转

  ```html
  <router-link to="/about/detail">xxxx</router-link>
  <!-- 或 -->
  <router-link :to="{path:'/about/detail'}"> xxxx </router-link>
  <!-- 或 -->
  <router-link :to="{name:'xiangqing'}"> xxxx </router-link>
  ```

## 路由传参

### query 参数

> 放在路由上，问号后面， &符号拼接

**传递**

```html
<!-- 跳转并携带query参数（to的字符串写法） -->
<router-link to="/news/detail?a=1&b=2&content=欢迎你"> 跳转 </router-link>

<!-- 跳转并携带query参数（to的对象写法） -->
<RouterLink
  :to="{
    //name:'xiang', //用name也可以跳转
    path:'/news/detail',
    query:{
      id:news.id,
      title:news.title,
      content:news.content
    }
  }"
>
  {{news.title}}
</RouterLink>
```

**接收**

```json
import {useRoute} from 'vue-router'
const route = useRoute()
// 打印query参数
console.log(route.query)
```

### params 参数

路由配置

```js
import User from './User.vue';
const routes = [{ path: '/users/:id', component: User, name: 'users' }];
```

传参

```html
<RouterLink :to="`/users/1`">{{users.name}}</RouterLink>

<!-- 跳转并携带params参数（to的对象写法） -->
<RouterLink
  :to="{
    name:'users', //用name跳转
    params:{
      id:1,
    }
  }"
>
  {{users.name}}
</RouterLink>
```

接收

```js
import { useRoute } from 'vue-router';
const route = useRoute();
// 打印params参数
console.log(route.params);
```

> - 传递 params 参数时，若使用 to 的对象写法，必须使用 name 配置项，不能用 path
> - 传递 params 参数时，需要提前在规则中进行占位

## 路由的 params 配置

> 让路由组件更方便的接收到参数，可以将路由参数作为 props 传给组件

```js
const routes = [{ path: '/users/:id', component: User, name: 'users', props: true }];
```

```vue
<!-- User.vue -->
<script setup>
defineProps({
  id: String,
});
</script>

<template>
  <div>User {{ id }}</div>
</template>
```

- 当 props 设置成 true 时，

## replace 属性

> 控制路由跳转操作浏览器的历史记录
>
> replace 不会留下历史记录

| 声明式                            | 编程式                |
| :-------------------------------- | :-------------------- |
| `<router-link :to="..." replace>` | `router.replace(...)` |

## 编程式导航

> 除了使用 `<router-link>` 创建 a 标签来定义导航链接，我们还可以借助 router 的实例方法，通过编写代码来实现。

| 声明式                    | 编程式             |
| :------------------------ | :----------------- |
| `<router-link :to="...">` | `router.push(...)` |

该方法的参数可以是一个字符串路径，或者一个描述地址的对象。

```js
// 字符串路径
router.push('/users/eduardo');

// 带有路径的对象
router.push({ path: '/users/eduardo' });

// 命名的路由，并加上参数，让路由建立 url
router.push({ name: 'user', params: { username: 'eduardo' } });

// 带查询参数，结果是 /register?plan=private
router.push({ path: '/register', query: { plan: 'private' } });

// 带 hash，结果是 /about#team
router.push({ path: '/about', hash: '#team' });
```

- 1.如果提供了 path,params 会被忽略

## 路由重定向

> 作用：将特定的路径，重新定向到已有的路由

```js
{
  path:'/',
  redirect:'/login'
}
```
