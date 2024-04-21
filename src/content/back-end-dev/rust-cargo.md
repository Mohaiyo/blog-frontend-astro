---
title: 'rust cargo'
pubDate: 2024-03-10
description: 'Hello,Cargo!'
author: Wayne.Liang
image:
  cover: '../assets/back-end-dev/rust-cargo.png'
  alt: 'cargo, rust buil system and package manager'
category: '后端开发'
tags: ['Rust']
---

## Content

## Cargo作为Rust构建系统和包管理器，我们可以使用Cargo完成什么操作？

- 我们可以使用`cargo new`创建一个新的项目
- 我们可以使用`cargo build`构建一个项目，并生成可执行的二进制文件。
- 我们可以使用`cargo run`一步实现构建和执行项目的操作。
- 我们可以使用`cargo check`来检查错误项目错误而无需产出二进制文件。
- Cargo 没有将构建结果保存在与我们的代码相同的目录中，而是将其存储在 target/debug 目录中。


## 构建发布

当您的项目最终准备好发布时，您可以使用 `cargo build --release` 对其进行优化编译。此命令将在 target/release 而不是 target/debug 中创建可执行文件。优化使您的 Rust 代码运行得更快，但是打开它们会延长程序编译所需的时间。这就是为什么有两种不同的配置文件：一种用于开发，当您想要快速且频繁地重建时，另一种用于构建最终程序，您将提供给用户，该程序不会重复重建并且运行速度与可能的。如果您正在对代码的运行时间进行基准测试，请务必运行 `cargo build --release` 并使用 target/release 中的可执行文件进行基准测试。
