---
nav:
  title: http
order: 1
---

# 浏览器的 EventLoop

## **概念**

js 是一种单线程的语言，所谓单线程，就是一次只能执行一个任务，如果有多个任务，那就要排队，执行完一个再执行下一个。这种就会造成“假死”的情况，从而无法响应用户的行为。Event loop 就是为了解决这种阻塞问题。是实现单线程非阻塞的方法

**提问：为什么 js 不涉及成多线程的任务**

如果设计成多线程的任务 DOM 的操作就会变的复杂，并且不可控。

现在可以使用`web Worker API`来实现多线程。

在 js 中，所有的任务分成两类

`同步任务`：立即执行任务，同步进行任务一般会进入到主线程中执行

`异步任务`：比如 ajax 请求，定时器等

<img src="https://pic.imgdb.cn/item/641339a2ebf10e5d5320b699.jpg" alt="image.png" style="zoom: 40%;" />

**调用过程**

任务推入到执行栈中取执行，如果是同步任务进入到主线程执行，异步任务就会进行到任务队列中，当主线程上的任务执行完成后，任务队列中的任务会被推到主线程上执行。上述过程不断重复就是 Event loop

**测试**

```javascript
console.log(1);
setTimeout(() => {
  console.log(2);
}, 0);
new Promise((resolve, reject) => {
  console.log('new Promise');
  resolve();
}).then(() => {
  console.log('then');
});
console.log(3);
```

答案：

1->new Promise->3->then->2

## 宏任务和微任务

如果只把任务分为同步和异步，并不是那么的准确，按照上面的描述来说结果应该是 1->new Promise->3->2->then 但实际结果不是,原因是异步任务还可以细分成宏任务和微任务

```javascript
执行过程就变成了;
console.log(1); // 直接打印1
setTimeout(() => {}, 0); //异步任务，属于新的宏任务，放到后面执行
new promise() // 打印 new Promiese
  .then(); //属于微任务，放进任务队列中，后面再执行
console.log(3); //直接打印3
//本轮的宏任务执行完了，现在去微任务列表看是否有微任务，发现 .then 的回调，执行它，打印 'then'
//当一次宏任务执行完，再去执行新的宏任务，这里就剩下一个定时器的宏任务，执行它，打印2
```

<img src="https://pic.imgdb.cn/item/641339c5ebf10e5d532135c5.jpg" alt="image.png" style="zoom: 40%;" />

**常见的宏任务**

- script
- setTimeout/setInterval
- setImmediate（node.js）
- UI rendering
- I/O

**常见的微任务**

- promise.then/catch
- process.nextTick（Node.js）
- MutaionObserver
- Object.observe（已废弃；Proxy 对象替代）

## 验证实现

- js 在执行任务时，GUI 会挂起
- 宏任务结束，微任务完成，页面会 render 一次，然后再次进行宏任务，微任务，render 的循环

**验证一**

如下，大概过了一会后，页面数据进行了一次改变，说明在执行同步代码时，render 无效；否则应该一直执行

![](https://pic.imgdb.cn/item/64133945ebf10e5d531f801b.gif)

**验证二**

```javascript
const button = document.querySelector('button');
let start = Date.now();

for (let i = 0; i < 1000000; i++) {
  //这是一个很花时间的同步任务 大概3秒左右
  button.innerHTML = '我是一个按钮' + i;
}
Promise.resolve().then(() => {
  console.log('微任务触发了', Date.now() - start + 'ms');
  button.innerHTML = Date.now() - start + 'ms';
});
button.addEventListener('click', () => {
  console.log('点击事件触发了', Date.now() - start, 'ms');
});
setTimeout(() => {
  console.log(111);
}, 0);
//上面的任务完成后会执行下面的同步任务
let duration = Date.now() - start;
console.log('同步任务花费了', duration, 'ms');
```

## 结论

- js 引擎首先执行 script 中的同步代码，挂起异步代码
- 同步代码执行完成后，其他线程将任务推到任务队列，此时微任务优先进入，宏任务后进入
- 微任务结束后，会渲染一次，紧接着处理任务队列中的下一个任务
- 宏任务处理结束-微任务-render
- 循环上述过程....
