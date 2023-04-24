---
nav:
  title: webpack
order: 1
---

# webpack 前置

## 学习路线

- webpack 基础，包含是什么，有什么用，如何使用
- webpack 高级优化项提升项目打包和构建流程
- 0-1 搭建脚手架并优化
- loader 和 plugin 原理

## 是什么

> webpack 是一个用于现代 JavaScript 应用程序的静态模块打包工具。
>
> 当 webpack 处理应用程序时，会在内部从一个或者多个入口构建一个依赖关系图，然后将项目所需要的每个模块打包成一个或者多个*bundles*，它们均为静态资源，用于展示你的内容

## 为什么需要

开发的时候我们会使用 ES6、less、scss 等预处理器等语法进行开发的时候，浏览器有可能识别不了，需要转换成浏览器可以识别的语法。

打包工具可以帮助我们完成这些事。

除此之外打包工具还可以进行代码压缩、做兼容处理、提升代码性能等

## 依赖环境

- Nodejs
  - fs
  - path
  - os

## 功能介绍

- 开发模式
  - 仅能编辑 js 中的 es mudule 语法
- 生产模式
  - 仅能编辑 js 中的 es mudule 语法，还能压缩 js 代码

## 安装

```
npm i webpack webpack-cli -D
```

```
npx webpack ./src/main.js --mode=development //打包
```

> npx 指令 会把 node_modules 下的.bin 目录临时添加为环境变量
