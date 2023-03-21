---
nav:
  title: JS
order: 1
---

# var、let、const 之间的区别

## var

- 使用 var 声明的变量存在变量提升的情况

- 对一个变量多次声明，后面的变量会覆盖前面的变量声明

- 在函数内部使用 var 声明，变量是局部的；不使用 var 声明，则该变量是全局的

  ```js
  console.log(str); // undefined
  var str = 'hahhah';

  //函数内部使用var定义
  var a = 20;
  function test() {
    var a = 30;
  }
  console.log(a); //20

  //函数内部不使用var定义
  var a = 20;
  function test() {
    a = 30;
  }
  console.log(a); //30
  ```

## let

> let 是 es6 新增的关键字，用于声明变量

- 不存在变量提升，前置访问会报错
- 不允许重复声明
- 块级作用域

## const

> const 是 es6 新增的关键字，用于定义常量

- 是一个只读的常量，一旦声明，常量就不可以被修改
- 不可以重复定义
- 块级作用域
