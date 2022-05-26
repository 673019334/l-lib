<!--
 * @Date: 2022-05-24 22:33:52
 * @LastEditors: LSY
 * @LastEditTime: 2022-05-25 20:09:20
 * @Description: Do not edit
 * @FilePath: /l-lib/docs/系统学习/其它/dumi.md
-->

# dumi

## dumi 是什么

组件开发脚手架

## 快速搭建

- 环境准备，node 版本大于 10.13.0

```
$ node -v
v10.13.0
```

- 安装脚手架，本文采用站点模式

```
$ npx @umijs/create-dumi-lib --site # 初始化一个站点模式的组件库开发脚手架
```

- 安装依赖，启动项目

```
npm i
npx dumi dev 或者 num run start
```

## 配置项

项目的根目录下创建`.umirc.ts`文件，对 dumi 进行配置

```js
export default defineConfig({
  title: 'l-lib',
  outputPath: 'docs-dist',
  mode: 'site', //站点模式 doc| site 两种可以选择，默认doc模式
  // 配置顶部菜单
  navs: [
    null, // null 值代表保留约定式生成的导航，只做增量配置
    {
      title: '我有二级导航',
      path: '链接是可选的',
      // 可通过如下形式嵌套二级导航菜单，目前暂不支持更多层级嵌套：
      children: [
        { title: '第一项', path: 'https://d.umijs.org' },
        { title: '第二项', path: '/guide' },
      ],
    },
  ],
});
```

## 基础使用

### 文档生成

> docs 使用

- docs 文件夹创建一级目录，会生产在 navs 导航栏
- docs/二级文件夹 ，会出现在一级菜单
- docs/二级文件夹/文档.md 文档描述，会出现在内容展示区域
  - 支持 markdown 写法
  - 一级标题--->二级菜单
  - 二级/三级标题--->右侧菜单

## 参考链接

[dumi 使用指南](https://www.mianshigee.com/tutorial/dumi-1.x/config-frontmatter.md)
