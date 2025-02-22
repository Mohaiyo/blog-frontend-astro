---
title: '多平台切换，如何设置SSH认证'
pubDate: 2025-02-20
description: '本文介绍如何理解和设置SSH进行仓库认证。'
author: 'Wayne.Liang'
image:
  cover: '../assets/tech-tools-and-practices/git-set-up-ssh-repository-authentication.png'
  alt: 'ssh repository authentication'
category: '技术工具与实践'
tags: ['Git']
---


## Contents

## 介绍

本文主要介绍，在实际使用Git进行仓库认证时，遇到的一些问题。平时除了使用GitHub外，也会使用GitLab， 云效等进行代码管理。

## Git命令行操作未授权常见问题

当Git命令行操作因为仓库未授权而失败时，会看到如下错误输出：

```bash
remote: 找不到代码库，请确认是否有权限且代码库路径正确
致命错误：无法访问 'https://codeup.aliyun.com/...'：The requested URL returned error: 403
```

或者
```bash
找不到代码库，请确认是否有权限且代码库路径正确
致命错误：无法读取远程仓库。

请确认您有正确的访问权限并且仓库存在。
```

## Git的SSH认证方式

Git 的 SSH 认证使用公钥认证，通过 ssh-keygen 生成公私钥，并将公钥上传到代码平台个人配置中。

SSH 支持通过主机别名设定公私钥。在 ~/.ssh/config 文件中配置如下：

 
```bash
Host codeup.aliyun.com
  User Wayne
  HostName codeup.aliyun.com
  Port 22
  IdentityFile ~/.ssh/personal_gmail
```

示例配置了主机别名 codeup.aliyun.com，用于本地。当使用 ssh://codeup.aliyun.com/my/example.git 克隆仓库时，实际连接 codeup.aliyun.com，端口 22，用户 git，私钥 ~/.ssh/personal_gmail。

** 如何确认 SSH 协议下 Git 登录的用户账号和使用的公私钥？ **

例如，对于 `ssh://codeup.aliyun.com/my/example.git`，使用 ssh 登录命令查看认证是否成功及用户名：

```bash
$ ssh codeup.aliyun.com
Welcome to Codeup, Wayne!
Connection to codeup.aliyun.com closed.
```

从输出可以看到云效代码平台服务器允许SSH登录，在显示登录账号为Wayne之后服务器切断连接。

还可以在 SSH 连接命令中添加 -v参数查看认证使用的公私钥，如下：


```bash
ssh -v gi*@codeup.aliyun.com
```

## 遇到的问题记录

实际推送不成功的原因是因为码云复制的SSH地址中包含的别名为`codeup.aliyun.com`。

```bash
git remote add origin git@codeup.aliyun.com:xxxx/example.git
```

而我本地ssh config文件内配置的别名是`aliyun`，因此导致认证失败。如下配置为原本配置

```bash
Host aliyun
  User Wayne
  HostName codeup.aliyun.com
  Port 22
  IdentityFile ~/.ssh/personal_gmail
```


## 解决办法

### 方法一
1. 直接将SSH地址中的`codeup.aliyun.com`替换为`aliyun`即可。

### 方法二
1. 将 ssh config中的 Host改为 `codeup.aliyun.com`。