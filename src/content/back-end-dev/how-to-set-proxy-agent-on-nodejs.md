---
title: 'nodejs开发面对GFW时,如何设置全局代理'
pubDate: 2024-04-21
description: 'Nodejs开发时设置全局代理'
author: Wayne.Liang
image:
  cover: '../assets/back-end-dev/how-to-set-proxy-agent-on-nodejs.png'
  alt: 'set proxy angent on nodejs dev'
category: '后端开发'
tags: ['Nodejs']
---

## Contents

## Prequired

- 个人或者公司的代理账号
- 自备后端app
- Nodejs

## Code implementation

在项目中安装[undici](https://undici.nodejs.org/#/)

```bash
pnpm i undici -D
```

在项目的入口文件处添加以下代码

```ts
import { env } from "process";
import { setGlobalDispatcher, ProxyAgent } from "undici";

if (env.https_proxy && env.NODE_ENV === 'development') {
  // Corporate proxy uses CA not in undici's certificate store
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  const dispatcher = new ProxyAgent({
    uri: new URL(env.https_proxy).toString(),
    token: `Basic ${Buffer.from("usename:passwordd").toString("base64")}`,
  });
  setGlobalDispatcher(dispatcher);
}
```


