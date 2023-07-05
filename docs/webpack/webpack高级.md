---
nav:
  title: webpack
order: 2
---

# webpack 高级

## webpack 优化

- 1.提升开发体验
- 2.提升打包构建速度
- 3.减少代码体积
- 4.优化代码运行性能

## 提升开发体验

### SourceMap

**为什么使用**

开发时我们运行的代码是经过 webpack 编译后的代码，此时如果代码运行出错，控制台提示错位代码的位置我们是看不到的

**是什么**

SourceMap(源代码映射)，用来生成构建后的代码和原代码之间的映射关系。

他会生成一个 xxx.map 的文件，里面包含原代码和构建后的代码每一行、每一列的映射关系。当构建后代码出错了，会通过 xxx.map 文件，从构建后的代码找到映射出错误的位置，帮助我们快速找到错误的根源

**怎么用**

- 开发模式

  `cheap-module-source-map`

  - 优点：打包编译速度快，只包含行映射

  - 缺点：没有列映射

    ```
    modules.exports ={
    	 mode:"development",
    	 devtool:"cheap-module-source-map"
    }
    ```

- 生产模式

  `source-map`

  - 优点：包含行列映射信息

  - 缺点：没有列映射

    ```
    modules.exports={
    	mode:"production",
    	devtool:"source-map"
    }
    ```

## 提升打包构建速度

### HotModuleReplacement

**为什么**

因为开发过程中，我们可能修改了一个模块的代码，webpack 默认会将所有的模块重新打包，
