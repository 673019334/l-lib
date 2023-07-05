---
nav:
  title: webpack
order: 2
---

# 基本使用

## 基础使用

**1.创建项目目录**

```JS
webpack_demo # 项目根目录（所有指令必须在这个目录运行）
    └── src # 项目源码目录
        ├── js # js文件目录
        │   ├── count.js
        │   └── sum.js
        └── main.js # 项目主文件
```

**2.创建文件**

- count.js

  ```js
  export default function count(x, y) {
    return x - y;
  }
  ```

- sum.js

  ```JS
  export default function sum(...args) {
    return args.reduce((p, c) => p + c, 0);
  }
  ```

- main.js

  ```js
  import count from './js/count';
  import sum from './js/sum';

  console.log(count(2, 1));
  console.log(sum(1, 2, 3, 4));
  ```

  3.**安装依赖**

进入到项目根目录下，运行如下指令

初始化`package.json`

```
npm init -y
```

运行完成后，会生成一个 package.josn 文件

安装依赖

```
npm i webpack webpack-cli -D
```

**4.启用 webpack**

- 开发者模式

  ```
  npx webpack ./src/main.js --mode=development
  ```

- 生产者模式

  ```
  npx webpack ./src/main.js --mode=production
  ```

  - `npx webpack`:是用来运行本地安装的 webpack 包的。
  - .`/src/main.js`:指定 webpack 从 main.js 文件开始打包。
  - `--mode=xxx`:指定模式(环境)。

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

```js
module.exports = {
  module: {
    rules: [
      {
        test: '/.css$/', //只检测css文件
        use: [
          //执行顺序从左向右，从上往下
          'style-loader', //将js中css通过创建style标签添加到html文件中生效
          'css-loader', //将css资源编译成commonjs模块加载到js中去
        ],
      },
    ],
  },
};
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
        test: '/.less$/', //只检测css文件
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

### 处理 sass 和 scss 资源

安装

```js
npm i sass sass-loader -D
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
          'sass-loader', //会将scss文件编译成css文件
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
          'stylus-loader', //会将stylus文件编译成css文件
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

### 输出资源情况

- 如果此时查看 dist 目录，会发现多了图片资源
  - 因为 webpack 会将打包好的资源输出到 dist 目录下面
- 为什么样式资源没有 输出后没有单独的样式文件

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

> type：“asset/resource” 和 type:"asset"的区别

- `type:"asset/resource"`：相当于`file-loader`,将文件转化成 webpack 能识别的资源，其他不做处理
  - `type:"asset"`：相当于`url-loader`,将文件转化成 webpack 能识别的资源，当资源小于某个大小的时候会处理成 data URI 形式

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

> 只能处理 js 的模块化语法
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

```js
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

开发中一点点写 rules 规则太费劲了，所以有更好的办法，继承现有的规则。

现有以下较为有名的规则：

- [Eslint 官方的规则 open in new window](https://eslint.bootcss.com/docs/rules/)：`eslint:recommended`
- [Vue Cli 官方的规则 open in new window](https://github.com/vuejs/vue-cli/tree/dev/packages/@vue/cli-plugin-eslint)：`plugin:vue/essential`
- [React Cli 官方的规则 open in new window](https://github.com/facebook/create-react-app/tree/main/packages/eslint-config-react-app)：`react-app`

```JS
// 例如在React项目中，我们可以这样写配置
module.exports = {
  extends: ["react-app"],
  rules: {
    // 我们的规则会覆盖掉react-app的规则
    // 所以想要修改规则直接改就是了
    eqeqeq: ["warn", "smart"],
  },
};

```

**安装**

1.安装包

```js
npm i eslint-webpack-plugin eslint -D
```

2.定义 eslint 配置文件

- .eslintrc.js

  ```JS
  module.exports = {
    // 继承 Eslint 规则
    extends: ["eslint:recommended"],
    env: {
      node: true, // 启用node中全局变量
      browser: true, // 启用浏览器中全局变量
    },
    parserOptions: {
      ecmaVersion: 6,
      sourceType: "module",
    },
    rules: {
      "no-var": 2, // 不能使用 var 定义变量
    },
  };

  ```

  3.配置 webpack.config.js

  ```js
  const path = require("path");
  const ESLintWebpackPlugin = require("eslint-webpack-plugin");
  plugins: [
      new ESLintWebpackPlugin({
        // 指定检查文件的根目录
        context: path.resolve(__dirname, "src"),
      }),
    ],
  ```

  4.VSCode Eslint 插件

  vscode 中，下载 eslint 插件，不用编译就能看到错误提示，可以提前解决

  但是此时会对项目中所有的文件进行检查，我们 dist 目录下的打包后文件就会报错。但是我们只要检查 src 下面的文件，不需要检查 dist 下面的文件。

  所以可对 Eslint 忽略文件解决。在项目根目录下新建下面文件：

  `.eslintignore`

  ```
  忽略dist 目录下所有文件
  dist
  ```

### bable

js 编译器

主要用于将 es6 语法编写的代码转化为向后兼容的 js 语法，以遍能够运行在当前和旧版本的浏览器或者其它的环境中

**1.配置文件**

配置文件的写法有很多种

- bable.config.\* :新建文件，位于项目根目录

  - `babel.config.js`
  - `babel.config.json`

- `.babelrc.*`：新建文件，位于项目根目录

  - `.babelrc`
  - `.babelrc.js`
  - `.babelrc.json`

  - `package.json` 中 `babel`：不需要创建文件，在原有文件基础上写

babel 会查找和自动读取它们，所以以上配置文件只需要存在一个即可

**2.具体配置**

我们以 `babel.config.js` 配置文件为例：

```JS
module.exports = {
  // 预设
  presets: [],
};
```

1. presets 预设

简单理解：就是一组 Babel 插件, 扩展 Babel 功能

- `@babel/preset-env`: 一个智能预设，允许您使用最新的 JavaScript。
- `@babel/preset-react`：一个用来编译 React jsx 语法的预设
- `@babel/preset-typescript`：一个用来编译 TypeScript 语法的预设

**3.在 webpack 中使用**

```js
npm i babel-loader @babel/core @babel/preset-env -D
```

1. 定义 Babel 配置文件

- babel.config.js

```JS
module.exports = {
  presets: ["@babel/preset-env"],
};
```

- webpack.config.js

  ```js
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/, // 排除node_modules代码不编译
        loader: 'babel-loader',
      },
    ];
  }
  ```

  2.运行指令

```JS
npx webpack
```

打开打包后的 `dist/static/js/main.js` 文件查看，会发现箭头函数等 ES6 语法已经转换了

## 处理 HTML 资源

作用

自动引入打包好的 js 文件

1.下载

```js
npm i html-webpack-plugin
```

2.引入

```js
const HtmlWebpackPlugin = require('html-webpack-plugin');
plugins:[
	new HtmlWebpackPlugin({
   	 template: path.resolve(__dirname,"public/index.html")
  });
]
```

- template :模板，以 public/index.html 创建新的 html
- 新的 html:结构和原来一致，自动引入打包输出的资源

## 开发服务器&&自动化

每次更新完代码后，都需要手动输入 npx webpack 后才能编译代码，此处就是解决这个问题

**下载包**

```js
npm i webpack-dev-server -D
```

- 可以监视文件变化，文件变化后，会自动打包
- 是在内存中编译打包的，在 dist 目录下没有打包

**配置**

webpack.config.js

```js
devServer:{
	host:"localhost",//启动服务器域名
	port:"3000",//启动服务器端口号
	open:true,//是否自动打开浏览器
}
```

**指令**

```js
npx webpack serve
npx webpack serve --config ./config/webpack.dev.js //指定文件路径运行
```

**指令配置**

Package.json 文件中

- 使用 npm run dev
- npm start ---只有 start 不需要写 run

```js
script:{
  "start":"npm run dev"
	"dev":"webpack serve --config ./config/webpack.dev.js",
  "build":"webpack  --config ./config/webpack.prod.js"
}
```

## 提取 css 成单独文件

css 目前是被打包到了 js 文件中，会出现闪屏的状态

这样对于网站来说，会出现闪屏现象，用户体验不好

我们应该是使用单独的 css 文件，通过 link 标签加载

**下载**

```js
npm i mini-css-extract-plugin
```

- 下载后不能再使用 style-loader,因为 style-loader 会动态创建 script 标签

**使用**

```js
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
  module: {
    rules: [
      {
        test: '/.less$/', //只检测css文件
        //loader:''//只能使用一个loader
        use: [
          //执行顺序从左向右，从上往下
          MiniCssExtractPlugin.loader,
          'css-loader', //将css资源编译成commonjs模块加载到js中去
          'less-loader', //会将less文件编译成css文件
        ],
      },
    ],
  },
  plugin: [
    new MiniCssExtractPlugin({
      filename: 'static/css/mini.css',
    }),
  ],
};
```
