---
nav:
  title: vue生命周期
order: 2
---

# 生命周期

> vue 组件实例在创建时要经历的一系列初始化步骤，在此过程中，vue 会在特定的时期调用特定的函数，从而可以让开发者有机会在特定阶段运行自己的代码，这些特定的函数称为生命周期钩子

- **规律**

  生命周期分成四个阶段，每个生命周期都有两个钩子，一前一后

  - 创建
  - 挂载
  - 更新
  - 销毁

### Vue 2.0 生命周期

- 创建阶段
  - beforeCreate
  - created
- 挂载阶段
  - beforeMount
  - mouted
- 更新阶段
  - beforeUpdate
  - updated
- 销毁阶段
  - beforeDestory
  - destored

### Vue3.0 生命周期

> 与 vue2.0 不同点
>
> - 除了创建阶段，其余的阶段钩子需要+on
> - 生命周期函数是一个函数，接受一个函数作为参数

- 创建阶段

  - setup

    -

    - <script setup name="App">
      </script>

- 挂载阶段
  - onBeforeMount
    - 使用`onBeforeMount(() => {})`
  - onMounted
- 更新阶段

  - onBeforeUpdate
  - OnUpdated

- **卸载**阶段

  - onBeforeUnMount
  - onUnMounted

### QA

1. #### **父组件和子组件谁先挂载**

   答：子组件先挂载，因为和 vue 的解析顺序有关，从入口文件 index.vue 开始解析，解析过程中发现用到了某个子组件，会先将子组件解析完成后，在继续往下解析。所以是子组件先挂载
