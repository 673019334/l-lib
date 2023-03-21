---
nav:
  title: JS
order: 2
---

# js 数据类型

js 中的数据类型分为两大类

- 基本数据类型
- 引用数据类型

**区别**

储存位置不同

## **基本数据类型**

- String

- Number

- Boolean

- Undefined

- Null

- symbol

**undefined**

类型只有一个值，就是`undefined`。当使用了`var`或`let`声明了变量但没有初始时，就相当于给变量赋予了一个`undefined`值。

**String**

字符串可以使用双引号("")、单引号（''）或者（``）标示

```js
let str1 = 'zhangsan';
let str2 = 'lisi';
let str3 = 'wangwu';
```

**Null**

`Null`也是只有一个值，即特殊值`null`

null 值表示一个空指针对象，这也是使用`typeof`判断会返回`Object`

**Symbol**

独一无二的值

```js
let symb1 = Symbol();
let symb2 = Symbol();
console.log(symb1 == symb2); //false
let symb3 = Symbol('test');
let symb4 = Symbol('test');
console.log(symb3 == symb4); //false
```

## **引用数据类型**

Object

Array

Function

Date

RegExp

...

**Object**

可以使用字面量的方式创建

```JS
const obj= {
  name:"zhangsan",
  age:20,
  hobby:function(){
    console.log("打篮球")
  }
}
```

**Array**

```
let arr =[1,2,'abc']
```

**Function**

函数存在三种定义方式

- 函数声明
- 函数表达式
- 箭头函数

**函数声明**

```js
function count(num1, num2) {
  return num1 + num2;
}
```

**函数表达式**

```js
let count = function (num1, num2) {
  return num1 + num2;
};
```

**箭头函数**

```js
let count = (num1, num2) => {
  return num1 + num2;
};
```

## 存储区别

基本数据类型和引用数据类型存储的位置不同

- 基本数据类型：栈中
- 引用数据类型：存储在堆中

**值类型**

```js
let a = 100;
let b = a;
a = 200;
console.log(b); //100
```

<img src="https://pic.imgdb.cn/item/64197856a682492fcc54ad74.jpg"/>

**引用类型**

```js
let a = { age: 20 };
let b = a;
b.age = 21;
```

<img src="https://pic.imgdb.cn/item/6419744fa682492fcc4e0e5f.jpg"/>
