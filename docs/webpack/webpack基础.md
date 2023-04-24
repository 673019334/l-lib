---
nav:
  title: webpack
order: 2
---

# 基本配置

## 5 个核心概念

- **1.入口（entry）**
- **2.输出（output）**
- **3.loader（加载器）**
- **4.plugins（插件）**
- **5.mode（模式）**

**入口**

> Webapck 从那个文件开始打包

**输出**

> Webpack 打包后的文件输出到哪里去

**loader**

> Webpack 本身只能处理 js,json 等资源，其它类型的资源，如 css，webpack 需要借助 loader 才能解析

**plugins**

> 插件，用于扩展 webpack 的功能

**mode**

> - 开发模式（development）
>   - 编译代码，便于浏览器识别
>   - 代码质量检查
> - 生产模式（production）

## webpack 配置文件

在项目根目录下创建 webpack.config.js 文件

> Webpack 是在 nodejs 的环境下运行的，使用的是 commonjs 规范

```js
const path = require('path');
module.exports = {
  // 入口
  entry: '', //相对路径
  //出口
  output: {
    //文件名称
    filename: '',
    path: path.resolve(__dirname, 'dist'), //路径
  },
  //加载器
  module: {
    rules: [
      // loader规则配置
    ],
  },
  plugins: [
    //plugins的配置
  ],
  mode: 'development', //模式选择 development /production
};
```

## **处理样式资源**

### 处理 css 资源

安装

```
npm i css-loader style-loader --save-dev
```

配置

```css
module.exports ={
	module:{
	rules:[{
		test:'/\.css$/',//只检测css文件
    use:[//执行顺序从左向右，从上往下
      'style-loader', //将js中css通过创建style标签添加到html文件中生效
      'css-loader',//将css资源编译成commonjs模块加载到js中去
      ],
	}]
	}
}
```

### 处理 less 资源

安装

```js
npm i less less-loader -D
```

配置

```js
module.exports = {
  module: {
    rules: [
      {
        test: '/.lesss$/', //只检测css文件
        //loader:''//只能使用一个loader
        use: [
          //执行顺序从左向右，从上往下
          'style-loader', //将js中css通过创建style标签添加到html文件中生效
          'css-loader', //将css资源编译成commonjs模块加载到js中去
          'less-loader', //会将less文件编译成css文件
        ],
      },
    ],
  },
};
```

### 处理 scss 资源

安装

```js
npm i scss scss-loader -D
```

配置

```js
module.exports = {
  module: {
    rules: [
      {
        test: '/.s[ca]ss$/', //只检测scass文件 [代表两个都行]
        //loader:''//只能使用一个loader
        use: [
          //执行顺序从左向右，从上往下
          'style-loader', //将js中css通过创建style标签添加到html文件中生效
          'css-loader', //将css资源编译成commonjs模块加载到js中去
          'scss-loader', //会将scss文件编译成css文件
        ],
      },
    ],
  },
};
```

### 处理 stylus

安装

```
npm i stylus-loader
```

配置

```js
module.exports = {
  module: {
    rules: [
      {
        test: '/.styl$/', //只检测scass文件 [代表两个都行]
        //loader:''//只能使用一个loader
        use: [
          //执行顺序从左向右，从上往下
          'style-loader', //将js中css通过创建style标签添加到html文件中生效
          'css-loader', //将css资源编译成commonjs模块加载到js中去
          'stylus-loaderr', //会将stylus文件编译成css文件
        ],
      },
    ],
  },
};
```

## 处理图片资源

> 图片转换成 bsae64，请求数量会减少
>
> 体积会变大

Webpack4 中，我们处理图片资源会用到如下两个插件

- file-loader
  - 将文件原封不动的输出
- url-loader
  - 小文件转换成 base64

webpack5 中，将这两个功能内置了

```js
rules: [
  {
    test: '/.(png|gif|webp|jpe?g|svg)$/',
    type: 'asset',
    parser: {
      dataUrlCondition: {
        maxSize: 10 * 1024, //小于10kb会转换成base64
      },
    },
  },
];
```

## 修改输出文件目录

```js
output:{
    //文件名称
    filename:"my-first-webpack.bundle.js'",
    path:path.resolve(__dirname,"dist"),//路径
},
rules:[
	{
		test:'/\.(png|gif|webp|jpe?g|svg)$/',
		type:'asset',//会转换成base64
		parser:{
      dataUrlCondition:{
        maxSize:10*1024 //小于10kb会转换成base64
      },
      generator:{
        //输出图片名称
        filename:'static/images/[hash:10][ext][query]'
      }
		}
	}
]
```

- hash：文件 hash,唯一值,:10 代表需要 10 位 hash
- ext：文件原来的后缀
- query：文件 query

## 自动清空上次 dist 目录

```js
output: {
  clean: true;
}
```

## 处理字体图标资源

```js
module: {
  rules: [
    {
      test: '/.(ttf|woff2?)$/',
      type: 'asset/resource', //不会转换成base64
      parser: {
        generator: {
          //输出图片名称
          filename: 'static/media/[hash:10][ext][query]',
        },
      },
    },
  ];
}
```

## 处理其它资源

> 音视频资源

```js
module: {
  rules: [
    {
      test: '/.(mp3|mp4|avi)$/',
      type: 'asset/resource', //不会转换成base64
      parser: {
        generator: {
          //输出图片名称
          filename: 'static/media/[hash:10][ext][query]',
        },
      },
    },
  ];
}
```

## 处理 js 资源

> 只能处理 es6 的模块化语法
>
> 如 ES6 在 IE 上不能运行，需要做处理才能运行
>
> 格式：eslint
>
> 转换：bable

### ESlint

**配置文件**

> 配置文件有多种写法，如下常见的几种，放于项目根目录下
>
> 区别在于配置格式不一样，eslint 会查找和自动读取它们，所以下述文件只要存在一个即可

- .eslintrc
- .eslintrc.js
- .eslintrc.json

**具体配置**

以`.eslintrc.js`配置文件为例

其它配置规则详见：https://eslint.bootcss.com/docs/user-guide/getting-started

```js
module.exports = {
  // 解析选型
  parseOptions:{}
  // 具体检查规则
  rules:{},
  // 继承其它规则
  extends:[],
}
```

**parseOptions**

```
  parserOptions:{
  		ecmaVersion:6,
  		sourceType:'module',
  		ecmaFeatures:{
  		  jsx:true
  		}
  }
```

- ecmaVersion:语法版本
- sourceType:module es 模块化
- ecmaFeatures:es 的其它特性

**rules 具体规则**

https://zh-hans.eslint.org/docs/latest/rules

- "off" 或者 0 ：关闭规则
- "warn"或者 1：开启规则，使用警告级别的错误
- "error"或者 2：开始规则，当被触发时，程序会退出

> 配置选型，第一个参数代表规则，第二个参数代表配置项

```js
rules:{
  "semi": ["error", "always"],//语句结尾分号规则，建议始终使用分号。
  "no-console": "warn",//使用console规则，建议使用其他调试方法。

}
```

**extends 继承**

![image-20230424174658437](/Users/lsy/Library/Application Support/typora-user-images/image-20230424174658437.png)

### bable

## 处理 HTML 资源

## 开发服务器&&自动化
