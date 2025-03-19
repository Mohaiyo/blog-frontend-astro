---
title: 'Drag & drop does not work in shopify react bridge Modal'
pubDate: 2025-03-19
description: '记录可拖拽的复杂交互在Shopify React Bridge Modal中无法生效的问题'
author: 'Wayne.Liang'
image:
  cover: '../assets/front-end-dev/dnd-kit-not-working-in-shopify-app-bridge-modal-cover.jpg'
  alt: 'islands architecture'
category: '前端开发'
tags: ['Shopify', 'Remix']
---

## Contents

## A problem with drag & drop in the new AppBridge modal

开发过程中我将此 dnd-kit 示例导入到模式中，但它不起作用。项目不可拖动。控制台中没有错误或任何其他指示.

详细 Issue[见](https://github.com/Shopify/shopify-app-bridge/issues/364)

## How to Solve

- 不使用Shopify app bridge 的Modal，换成页面
- 使用Shopify app bridge 的Modal，但是需要通过src属性引入页面。
