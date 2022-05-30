---
group:
  order: 1
---

# ts

## 1.ts 是什么

> Typed JavaScript at Any Scale. 添加了类型系统的 JavaScript，适用于任何规模的项目。[官网描述]

## 2.环境搭建

初期学习可以使用在线地址：[地址](https://www.typescriptlang.org/zh/play)

## 3.ts 类型系统

### 3.1 类型系统是什么

类型系统包含两个重要的组成部分

- 类型标注 : 先声明是什么类型
- 类型检查 : ts 编译器就可以根据这个类型检查

### 3.2 类型标注

- 基础类型
- 空和未定义类型
- 对象类型
- 数组类型
- 元祖类型
- 枚举类型
- 无值类型
- Never 类型
- 任意类型
- 位置类型

### 3.2.1 基础类型

基础类型包含`string`、`number` 、`boolean`

语法

```ts
let str: string = '字符串';
let num: number = 2;
let bool: boolean = true;
```

### 3.2.2 空和未定义

`null`、`undefined`

语法

```ts
let a: null;
let age: undefined;
```

注意点

- `null和undefined`只包含自身, 数据在被标记后，null 和 undefined 是 不能被修改的

```ts
let b: null;
b = null; // ok
b = 1; // 此时会报错
```

- 如果一个变量声明了，但是确没有赋值,那么该变量的值为`undefined`,但是如果类型没有标注默认会是`any`

```ts
let x: number; // 类型为number ,值为undefined
let y; //类型为any,值为undefined
```

- 如果返回的类型可能包含 null 的话，最好先做验证

```ts
let ele = document.querySelector('div');
// 获取元素的方法返回的类型可能会包含 null，所以最好是先进行必要的判断，再进行操作
if (ele) {
  ele.style.display = 'none';
}
```

### 3.2.3 对象类型

> 此处针对 {}

- 字面量标注
- 接口
- 定义类或者构造函数 [todo,后续补充]

#### 字面量标注

- 方便
- 不便于维护

```ts
let user: { name: string; age: number } = {
  name: '张三',
  age: 20,
};
user.name; //ok
user.sex; // 错误
```

#### 接口

- 复用性高
- 只能作为类型标注使用，不能作为具体的值，只是一种抽象结构的定义，并不是实体，没有具体功能实现
- 定义方式
- 接口之间的多个属性可以使用逗号隔开，也可以使用分号隔开
- 接口只是一种类型不能作为值使用
- 可选属性 `key?:类型`
- 只读属性 `readonly key :类型`
- 任意属性 `[prop:类型]:类型`，一但使用了任意类型，那么确定属性和可选属性的类型必须是它的类型子集
- 使用接口描述函数
- 接口合并
- 多个同名的接口合并成一个接口
- 如果合并的接口存在同名的非函数成员，则必须保证他们类型一致，否则编译报错
- 接口中的同名函数则是采用重载（参照下文函数类型）

```ts
interface Person {
  name: string;
  age: number;
  sex?: string; //可选属性
  readonly cardNo: number; //只读属性
  [props: string]: any; //任意类型
}
let use_b: Person = {
  name: '张三',
  age: 20,
  cardNo: 11111111111111,
};
user.name; //ok
user.sex; // 错误

//使用接口描述函数,如果使用接口来单独描述一个函数,是没有key的
interface IFunc {
  //小括号内是参数,括号外是返回值
  (a: string): string;
}
let fn2: IFunc = function (a) {
  return 'test';
};
```

### 3.2.3 数组类型

> ts 中数据存储的类型必须一致，所以在标注数组类型的时候，同时要标注数组中每一项的内容

简单标组

```ts
let arr: number[] = []; //代表每一项都是number类型
arr[0] = 1; //ok
arr[1] = 'text'; //error
```

使用泛型标注 `Array<类型>`

```ts
let arr1: Array<number> = [];
arr1[0] = 1; //ok
arr1[1] = 'text'; //error
```

### 3.2.4 元组类型

元组类型和数组类似，元组就是固定长度的数组

### 3.2.5 枚举类型

可以给数据赋一些友好的名字

```ts
enum STATUS {
  TODO = '01',
  FINISH = '02',
  WAIT = '03',
}
```

- key 不能是数字，名称可以大写也可以小写，推荐全大写【通常使用全大写的方式标注为常量】
- value 可以是数字，称为数字类型枚举；也可以是字符串，称为字符串类型枚举；但是不能是其它类型的值，默认数字是 0
- 枚举值（value）可以省略,省略的情况下
  - 第一个枚举值默认是 0
  - 非第一个枚举值为上一个数字枚举值 +1
  - 如果前一个枚举值类型为字符串，则后续枚举项必须手动赋值
- 枚举值是只读(常量)，初始化后不可以修改

### 3.2.6 无值类型

表示没有任何数据类型，通常用于无返回值的函数标注，函数默认标注类型为`void`

```ts
function fn(): void {
  //  没有return 或者return undefined
}
```

### 3.2.7 Never 类型

当一个函数永远不可能执行`return`时，返回的就是 Never,与 Void 不同，void 是执行了 return,只是没有返回值

```ts
function fn1(): never {
  //  没有return 或者return undefined
  throw new Error('error');
}
```

### 3.2.8 任意类型

不确定这个值是什么类型，或者不需要对这个类型进行检查的时候，就可以标注为 any 类型

```ts
let d: any;
```

- 一个变量未标注类型且没有赋值的情况下默认是 any 类型
- 任何类型的值都可以赋给 any 类型
- any 类型也可以赋值给任意类型
- any 类型有任意属性和方法

### 3.2.9 函数类型

- 函数标注
  - 直接在函数中标注
  - 使用`type`标注
  - 使用`interface`标注
- 参数
  - 可选参数:通过参数名称后面添加`？`来标注该参数是可选的
  - 剩余参数：有默认值的参数也可以是可选的；设置了默认值的参数可以根据值自动推导；
    - 是一个数组，标注的时候要注意
  - this 的标注:可以显示标注在第一个参数位，不占用参数位的位置
- 返回值
- 函数重载
  - 依据不同参数类型或参数个数执行一些不同函数体

```ts
export {};
// 普通函数标注
function fn(a: number, b: number): number {
  return a + b;
}
fn(1, 1);
// 入参是callback ,在入参处标注
function fn2(callback: (a: number, b: number) => number) {
  callback(1, 2);
}
fn2((a, b) => {
  return 1;
});

// 入参是callback , 使用type 进行标注,type callback 是一个类型名称，编译后的代码中会被删除
type callback = (a: number, b: number) => number;
function fn3(callback: callback): void {}

// 使用interface 标注,当有其余参数时
interface Icallback {
  name: string;
  age: number;
  hobby(): void;
}
function fn4(callback: Icallback) {}
fn4({
  name: 'zhangan',
  age: 20,
  hobby: () => {},
});
// 使用interface标注，且无其余参数，可以省略key值
interface Icallback2 {
  (name: string, age: number): number;
}
function fn5(callback: Icallback2) {}
fn5((name, age) => {
  return 20;
});

// 使用interface标注，且不省略key值的情况下，则传入的必须是一个对象
interface Icallback3 {
  person(name: string, age: number): number;
}
function fn6(callback: Icallback3) {}
// 注意此时的传入形式必须是对象
fn6({
  person(name, age) {
    return 2;
  },
});
```

```ts
export {};
// 函数的可选参数
function fn1(a: number, b?: string) {}

// 函数的默认参数

function fn2(items: Array<number>, order = 'desc') {}
fn2([1, 4, 9]);

// 使用联合参数设置函数默认值

function fn3(items: Array<number>, order: 'desc' | 'asc' = 'asc') {}
fn3([1, 4, 9]);
fn3([1, 4, 9], 'desc');
fn3([1, 4, 9], 'asc');
```

```ts
export {};
// 剩余参数
interface IObj {
  [props: string]: any;
}
function fn1(targrt: IObj, ...rest: Array<IObj>) {}
```

```ts
export {};
// 函数中的this
// 普通函数中的 this

interface IObj {
  a: number;
  fn: (x: number) => void;
}
let obj1: IObj = {
  a: 1,
  fn: function (x) {
    // this :any类型
    console.log(this);
  },
};
let obj2: IObj = {
  a: 1,
  fn: function (this: IObj, x) {
    // this 指向Iobj
    //通过第一个参数位标注 this 的类型，它对实际参数不会有影响
    console.log(this);
  },
};
obj2.fn(1);

// 箭头函数：箭头函数中的this 不能像普通函数那样进行标注，它的this取决于它所在作用域this的标注类型
```

```ts
// 函数重载
// 上边是声明
function add(arg1: string, arg2: string): string;
function add(arg1: number, arg2: number): number;

// 下边是实现
//TypeScript 中的函数重载也只是多个函数的声明，具体的逻辑还需要自己去写，他并不会真的将你的多个重名 function 的函数体进行合并

function add(arg1: string | number, arg2: string | number) {
  // 在实现上我们要注意严格判断两个参数的类型是否相等，而不能简单的写一个 arg1 + arg2
  if (typeof arg1 === 'string' && typeof arg2 === 'string') {
    return arg1 + arg2;
  } else if (typeof arg1 === 'number' && typeof arg2 === 'number') {
    return arg1 + arg2;
  }
}

function showOrHide(ele: HTMLElement, attr: 'display', value: 'block' | 'none'): any;
function showOrHide(ele: HTMLElement, attr: 'opacity', value: number): any;
function showOrHide(ele: HTMLElement, attr: string, value: any) {
  ele.style[attr] = value;
}

let div = document.querySelector('div');

if (div) {
  showOrHide(div, 'display', 'none');
  showOrHide(div, 'opacity', 1);
  // 通过函数重载可以设置不同的参数对应关系
  showOrHide(div, 'display', 1); //报错
}
```

## 3.3 高级类型标注

### 3.3.1 联合类型

联合类型也称为多选类型，当我们需要注释一个变量为多个类型之一时可以选择联合类型 ，即`或`的关系

```ts
export {};
let a: string | number | boolean;
```

### 3.3.2 交叉类型

交叉类型也可以称为联合类型，可以把多种类型合并到一起称为一种新类型，即`并且`的关系

- ts 在编译过程中只会进行语法的转换（比如扩展运算符，箭头函数等语法进行转换，对于 api 是不会进行转换的，而是引入一些扩展库进行处理）
- 如果我们的代码中使用了`target`中没有的 api，则需要手动进行引入，默认情况下 ts 会根据 target 载入核心类型库
  - `target`为`ES5`时：`["dom"，“es5”,"scripthost"]`
  - `target`为`ES6`时：`["dom"，“es6”,"dom.iterable","scripthost"]`
  - 如果代码中使用了这些默认载入库以外的代码，则可以通过 `lib` 选项来进行设置
  - [参考链接](http://www.typescriptlang.org/docs/handbook/compiler-options.html)

```ts
export {};
// 对一个对象进行扩展
interface o1 {
  x: string;
  y: number;
}
interface o2 {
  z: number;
}
let o: o1 & o2 = Object.assign({}, { x: 'test', y: 1 }, { z: 1 });
```

### 3.3.3 字面量类型

当我们需要标注的不是某个类型，而是一个固定值的时候，就需要使用字面量类型，配合联合类型使用会更有效

```ts
function setPosition(ele: Element, direction: 'left' | 'top' | 'bottom') {
  // ....
}
let box = document.getElementById('box');
box && setPosition(box, 'left'); // ok
box && setPosition(box, 'right'); //报错
```

### 3.3.4 类型别名

有时候类型标注比较复杂的时候，这个时候我们可以给类型标注起一个比较简单的名字

```ts
export {};
type dir = 'left' | 'top' | 'bottom';
function setPosition(ele: Element, direction: dir) {
  // ....
}

// 使用类型别名定义函数类型
type callback = (a: string) => string;
let fn: callback = function () {
  return 'fn';
};
// 或者直接这样写
let fn2: (a: string) => string = function () {
  return 'fn';
};
```

### 3.3.5 类型推断

ts 编译器会根据当前上下文自动推断出对应的类型标注，这个推断会发生在如下情况下

- 初始化变量
- 设置函数默认参数值
- 返回函数值

```ts
export {};
// 可以自动推断出x 为number类型
let x = 1;
x = 'test'; // 会报错，提示不能将“test”分配给类型“number”

// 函数参数类型、函数返回值会根据对应的默认值和返回值进行自动推断
function fn(a = 1) {
  return a * a;
}
```

### 3.3.6 类型断言

标注一个更加精确的类型（缩小类型标注的范围）

- 断言是一种预判，并不会对数据本身产生实际的作用，即：类似转换，但并非真的转换了

```ts
let img = document.querySelector('#img');
```

img 的类型 为 `Element`,而 `Element`类型其实只是元素类型的通用类型，如果我们去访问 src 这个属性是有问题的，我们需要把它的类型标注的更为精确：`HTMLImageElement`类型，这个时候可以使用类型断言，它类似于一种类型转换

```ts
let img1 = <HTMLImageElement>document.querySelector('#img');
//或者
let img = document.querySelector('#img') as HTMLImageElement;
```

## 4.注意点

### 4.1 type 和 interface 的区别

interface

- 只能描述 `object/class/fn`的类型
- 同名的 interface 会自动合并，利用扩展
- 当属性重合，且类型不一致时会报错 type
- 可以描述任意类型
- 不能重名
