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
