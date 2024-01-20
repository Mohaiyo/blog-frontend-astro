---
title: '创建一个现代npm包的最佳实践'
pubDate: 2024-01-21
description: '技术总是在变化，您的流程和实践需要跟上这些变化。因此，虽然npm已有 13 年历史，但您围绕npm包创建的实践应该会更加现代。不过，如果您感觉它们可能有点过时了，请继续阅读。'
author: 'Wayne.Liang'
image:
  cover: '../assets/tech-tools-and-practices/best-practices-create-modern-npm-package.png'
  alt: 'Best practices for creating a modern npm package with security in mind'
category: '技术工具与实践'
tags: ['NPM', "GITHUB"]
---

> 原文地址 [Best practices for creating a modern npm package with security in mind](https://snyk.io/blog/best-practices-create-modern-npm-package/)

> 原文作者 [Brian clark](https://snyk.io/contributors/brian-clark/)

## Contents

## 简介

在本教程中，我们将逐步使用现代最佳实践（截至 2023 年）创建 npm 包。 您将首先学习如何创建 npm 包，以便熟悉构建包并将其发布到 npm 注册表。 然后，您将了解如何通过设置测试框架、持续集成和部署管道、安全检查以及用于发布的自动化语义版本管理来制作更强大且可用于生产的 npm 包。 在本教程结束时，您将对自己生成现代且可持续的 npm 包的能力充满信心。 让我们开始吧！
