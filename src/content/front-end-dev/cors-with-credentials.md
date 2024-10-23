---
title: 'CORS with Credentials'
pubDate: 2024-10-23
description: 'CORS with Credentials'
author: 'Wayne.Liang'
image:
  cover: '../assets/front-end-dev/cors-with-credentials.png'
  alt: 'CORS with Credentials'
category: '前端开发'
tags: ['CORS']
---

## Contents

## 附带身份凭证的请求

> 当发出跨源请求时，第三方 cookie 策略仍将适用。无论如何改变本章节中描述的服务器和客户端的设置，该策略都会强制执行。

一般而言，对于跨源 XMLHttpRequest 或 Fetch 请求，浏览器不会发送身份凭证信息。如果要发送凭证信息，需要设置 XMLHttpRequest 对象的某个特殊标志位，或在构造 Request 对象时设置。比如说axios, umi-request 等,在发送请求是都支持credentials参数。除了客户端的请求以外，服务器端也可以在响应中设置 Access-Control-Allow-Credentials 头，以允许浏览器发送凭证信息。如果服务端的响应没有附带 Access-Control-Allow-Credentials: true,浏览器会拒绝该响应，且不会把响应提供给调用的网页内容。

![inlude credentials](https://mdn.github.io/shared-assets/images/diagrams/http/cors/include-credentials.svg)

客户端和服务端的http交互示例代码如下

```http
GET /resources/credentialed-content/ HTTP/1.1
Host: bar.other
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.14; rv:71.0) Gecko/20100101 Firefox/71.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
Accept-Language: en-us,en;q=0.5
Accept-Encoding: gzip,deflate
Connection: keep-alive
Referer: https://foo.example/examples/credential.html
Origin: https://foo.example
Cookie: pageAccess=2

HTTP/1.1 200 OK
Date: Mon, 01 Dec 2008 01:34:52 GMT
Server: Apache/2
Access-Control-Allow-Origin: https://foo.example
Access-Control-Allow-Credentials: true
Cache-Control: no-cache
Pragma: no-cache
Set-Cookie: pageAccess=3; expires=Wed, 31-Dec-2008 01:34:53 GMT
Vary: Accept-Encoding, Origin
Content-Encoding: gzip
Content-Length: 106
Keep-Alive: timeout=2, max=100
Connection: Keep-Alive
Content-Type: text/plain

[text/plain payload]

```

### 预检请求和凭据

CORS 预检请求不能包含cookies凭据。预检请求的响应必须指定 Access-Control-Allow-Credentials: true 来表明可以携带cookies凭据进行实际的请求。

以`eggjs`后端框架为例，在配置cors时，处理要设置cors的安全白名单外，还需要设置credentials: true, 如下：

```Node.js
  config.security = {
    domainWhiteList: [
      'https://example.com'
    ]
  }

  config.cors = {
    credentials: true,
    allowMethods: ['GET', 'HEAD', 'POST', 'OPTIONS']
  }
```

### 附带身份凭证的请求与通配符

在响应附带身份凭证的请求时：

服务器不能将 Access-Control-Allow-Origin 的值设为通配符“\*”，而应将其设置为特定的域，如：Access-Control-Allow-Origin: https://example.com。

服务器不能将 Access-Control-Allow-Headers 的值设为通配符“\*”，而应将其设置为标头名称的列表，如：Access-Control-Allow-Headers: X-PINGOTHER, Content-Type

服务器不能将 Access-Control-Allow-Methods 的值设为通配符“\*”，而应将其设置为特定请求方法名称的列表，如：Access-Control-Allow-Methods: POST, GET

对于附带身份凭证的请求（通常是 Cookie），

这是因为请求的标头中携带了 Cookie 信息，如果 Access-Control-Allow-Origin 的值为“\*”，请求将会失败。而将 Access-Control-Allow-Origin 的值设置为 https://example.com，则请求将成功执行。

另外，响应标头中也携带了 Set-Cookie 字段，尝试对 Cookie 进行修改。如果操作失败，将会抛出异常。

### 第三方 cookie

注意在 CORS 响应中设置的 cookie 适用一般性第三方 cookie 策略。在上面的例子中，页面是在 foo.example 加载，但是第 19 行的 cookie 是被 bar.other 发送的，如果用户设置其浏览器拒绝所有第三方 cookie，那么将不会被保存。

请求中的 cookie（第 10 行）也可能在正常的第三方 cookie 策略下被阻止。因此，强制执行的 cookie 策略可能会使本节描述的内容无效（阻止你发出任何携带凭据的请求）。

Cookie 策略受 SameSite 属性控制。
