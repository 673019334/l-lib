---
nav:
  title: http
order: 20
---

# WebSocket

## 1.简介

`WebSocket` **WebSocket**是一种[网络传输协议](https://zh.wikipedia.org/wiki/网络传输协议)

`WebSocket`:让客户端和服务端之间的数据交互变得更加简单，允许服务器主动向客户端推送数据。在`WebSocket` API 中，浏览器和服务器只需要完成一次握手，两者之间就可以创建持久性的连接，并进行双向数据传输。

对于持续的消息推送，可使用 WebSocket

## 2.创建

我们需要再 url 中使用特殊的协议`ws`来创建`WebSocket`

```js
let socket = newWebSocket('ws://api');
```

同时也有一个加密的 `wss://`协议 ``WebSocket`，类似 https

```js
let socket = newWebSocket('wss://api');
```

`wss://`协议是基于 TLS 协议。在传输时对发送方的数据进行加密，在接收方进行解密。

由于`wss://`是加密的，更加可靠，所以推荐始终使用`wss://`协议。

```js
let socket = new Websocket('ws://test/demo');
socket.onopen = function (e) {
  // socket 连接了
};
socket.onmessage = function (e) {
  console.log(e.data); //服务端返回的数据
};
socket.onclose = function (e) {
  // socket 关闭了
};
socket.onerror = function (e) {
  // socket 出错了
};
```

**步骤**

1.创建`socket`连接，当 socket 被创建后我们就可以监听如下**事件**

2.`onopen`:连接建立是触发

3.`onmessage`:接收到后端返回的数据后触发

4.`onerror`:websocket 出现错误时触发

5.`onclose`:连接关闭后触发

## 3.API

### 事件

上述步骤中出现的四个

### 关闭当前连接

> 浏览器和服务器都可以关闭连接，关闭连接时允许发送一个数字码和文本形式的原因

```js
//socket 实例
socket.close([code], [reason]);
```

`code`:关闭的数字码

`reason`：关闭原因描述

常见的数字码：

| 数字码 | 描述                                             |
| ------ | ------------------------------------------------ |
| 1000   | 默认值，表示正常关闭                             |
| 1001   | 一方正在离开，如服务器正在关闭，浏览器离开了页面 |
| 1006   | 表示连接丢失**，不能手动设置这个数字码**         |
| 1009   | 消息太大，无法处理                               |
| 1011   | 服务器发生错误                                   |

### 发送消息

```js
socket.send('要发送内容');
```

### 连接状态

```
let status = socket.readyState();
```

- 0：(CONNECTING)正在连接
- 1：(OPEN)已经连接并且可以通讯
- 2：(CLOSING)连接正在关闭
- 3：(CLOSED)连接已关闭或者没有连接成功

## 4.数据传输

Websocket 通信由 frames(数据片段)组成，可以从任何一方发送，并且支持如下类型：

- `text frames` :包含各方发送给彼此的文本数据。
- `binary data frames`:包含各方发送给彼此的二进制数据。
- `ping/pong frames` 被用于检查从服务器发送的连接，浏览器会自动响应它们。
- `connection close frame` 以及其他服务 frames。

浏览器中我们仅使用文本或者二进制 frames。

通过`socket.send(body)`方法可以发送文本或者二进制数据。

body 可以是字符串或者二进制格式，其中二进制格式包括`Blob`、`ArrayBuffer`等。

当收到数据时，文本则是字符串。如果收到的是二进制格式的数据，我们可以在 Blob 和 ArrayBuffer 格式之间进行选择。默认为`blob`，如果我们想要换成 ArrayBuffer，则可以通过`socket.binaryType`属性设置：

```javascript
socket.binaryType = 'arraybuffer'; // 接受arraybuffer
socket.onmessage = (event) => {
  // event.data 可以是文本（如果是文本），也可以是 arraybuffer（如果是二进制数据）
};
```

## 5.图示

## 6.注意

WebSocket 自身并不包含重新连接（reconnection），身份验证（authentication）和很多其他高级机制。因此，有针对于此的客户端/服务端的库，并且也可以手动实现这些功能。
