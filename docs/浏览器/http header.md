---
nav:
  title: http
order: 2
---

# http header

## Request Headers

> 请求头

- Accept:浏览器可以接收的数据格式
- Accept-Encoding:浏览器可接收的压缩算法，如 gzip
- Accept-Language：接收的语言
- Connection:keep-alive 一次 TCP 连接重复使用
- User-Agent(j 简称 UA)：浏览器信息
- Content-type:发送数据的格式，如 application/json
- Cookie:同域,每次请求都会带到后端
- Host:请求的域名
- Headers:{ } //可以自定义 header

## Response Headers

> 响应头

- Content-type 返回数据的格式，如 application/json
- Content-length:返回数据的大小，多少字节
- Content-Encoding:zip
- Content-type：返回的数据格式
- Set-Cookie：服务端向前端设置 cookie
- Expires

## keep-alive

> Connection:keep-alive 是一个通用消息头，允许消息发送者暗示连接状态，还可以用来设置超时时长和最大请求数。

http 协议采用的是"请求-应答"的模式，当客户端发起请求后，服务端才会响应

## http 缓存

### 什么是缓存

是浏览器为了提升网站的加载性能，缩短用户等待时间而采取的措施，浏览器总是想尽量少地向服务器发送请求，能够从自己保存的副本中得到的

### 哪些资源不可以被缓存

> html 不可以被缓存

**静态资源**

- js

- css

- Img

### http 缓存策略

![image-20230323094951329](/Users/lsy/Library/Application Support/typora-user-images/image-20230323094951329.png)

#### 强制缓存

**Cache-Control**

**位置**：response Headers 中

**作用**：控制强制缓存的逻辑

**eg:**Cache-Control:max-age = 31536000（单位是秒），缓存一年的时间

**值**

- max-age
- no-cache：不用强制缓存，交给服务端处理
- no-store：不用强制缓存，也不用服务端作处理
- private：只能允许最终用户作缓存
- public：允许中间路由，代理缓存

**Expires**

**位置**：response Headers 中

**作用**：控制强制缓存的逻辑,但是已经被 Cache-Control 代替

同时存在，以 Cache-Control 为准

#### 协商缓存

> 服务端缓存策略，服务端判断客户端资源是否能用，判断资源是否一致
>
> 一致：返回 304，否则返回 200 和最新的资源

<img src="/Users/lsy/Library/Application Support/typora-user-images/image-20230323102030953.png" alt="image-20230323102030953" style="zoom:50%;" />

**资源标识**

- 在 response header 中，有两种形式
  - Last-Modified 资源的最后修改时间
  - Etag 资源的唯一标识（一个字符串，类似人的指纹），根据内容判断的

<img src="/Users/lsy/Library/Application Support/typora-user-images/image-20230323102941265.png" alt="image-20230323102941265" style="zoom:50%;" />

**Last-Modified 和 Etag 区别**

- 两者同时存在，会优先使用 Etag
- Last-Modified 只能精确到秒级
- 如果资源被重复生成，而内容不变，则 Etag 更精确

## 刷新页面对 http 缓存的影响
