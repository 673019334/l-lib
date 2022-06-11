---
order: 49
---

# this

## this 是什么

- 是一个关键字，一般在函数调用中使用，但是 this 具体指向谁，一般是由函数的调用方式决定

## this 指向问题

> 谁调用，指向谁（除了 new）

- 只看定义，无法确认指向谁，只有调用的时候才能发现 se
- 默认绑定，指向 window 的情况

```javascript
function fn() {
  console.log(this);
}
fn();

setTimeout(() => {
  console.log(this);
}, 1000);

setInterval(() => {
  console.log(this);
}, 1000);
```

- 隐式绑定 :指向调用者
  - 调用者.函数名称（）

```javascript
let obj = {
  name: 'zhangsan',
  fn: function () {
    console.log(this);
  },
  dog: {
    desc: '动物',
    eat: function () {},
  },
};
obj.fn(); //obj
obj.dog.eat(); //obj.dog
let tem = obj.fn;
tem(); // window
```

- new 绑定 执行实例

```javascript
function Person() {
  console.log(this);
}
let p = new Person(); // P
```

- 硬绑定
  - call apply bind
  - 绑定的是谁就指向谁

## 改变 this 指向

- 使用方式
  - `函数名.call(this指向,参数1，参数2，参数3,...)`
  - `函数名.apply(this指向,[参数1，参数2，...])`
  - `函数名.bind(this指向)(参数1，参数2)`
- 应用场景
  - 借用构造函数

```javascript
function Person(name, age) {
  this.name = name;
  this.age = age;
}
let obj = {
  desc: '借用构造函数',
};

Person.call(obj, 'lisi', 20);
console.log(obj); //{ desc:"借用构造函数",name:"lisi",age:20}
```

- apply 适用于参数本来就是在数组中的

```javascript
let arr = [1, 2, 3, 4];
Math.max(1, 2, 3, 4); //4
Math.max.call(null, arr);
```
