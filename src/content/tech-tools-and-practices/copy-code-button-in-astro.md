---
title: '在Astro markdown代码块中添加复制代码按钮'
pubDate: 2023-12-20
description: '在这篇博文中，我们将讨论如何使用 Astro.build 框架向 HTML 代码块添加复制代码按钮。但是，提供的 JavaScript 代码也可以在任何其他 HTML 项目中使用。'
author: 'Wayne.Liang'
image:
  cover: '../assets/tech-tools-and-practices/add-copy-button-to-md-block-code.png'
  alt: 'vue2 crash course'
category: '技术工具与实践'
tags: ['Astro']
---

> 原文地址 [Adding a Copy Code Button in Astro Markdown Code Blocks](https://timneubauer.dev/blog/copy-code-button-in-astro/)

> 原文作者 [Tim Neubauer](https://timneubauer.dev/)

## Contents

## 介绍

在网站上的代码块中添加`Copy Code`按钮可以极大地增强访问者的用户体验。它允许用户快速轻松地从您的网站复制代码片段，而无需手动选择、复制和粘贴代码。这可以节省用户时间并改善他们在您网站上的整体体验。

## 准备Astro布局

首先，我们将创建一个名为`BlogPostLayout.astro`的新布局。 此布局将用于显示我们的 Markdown 文件。 在此布局中，我们稍后将添加一些客户端 JavaScript，这些 JavaScript 将在 Markdown 文件生成的 HTML 的每个 `<pre>` 标记内添加复制代码按钮。

```astro
---
---

<script></script>
<slot />
```

由于 Astro 为 Markdown 和 MDX 页面提供了特殊的 frontmatter 布局属性，因此我们可以在 Markdown 页面中指定或新创建 Astro 布局。

```astro
---
layout: ./layouts/BlogPostLayout.astro
---

# Post Title

post content
```

## 添加复制按钮

在我们新创建的布局中，我们添加一些客户端 JavaScript 将按钮渲染到 dom 上。 我们首先定义一个名为`copyButtonLabel`的变量并将其值设置为`Copy Code`。 该变量将用于设置我们将添加到代码块的复制按钮的标签。

```javascript
let copyButtonLabel = 'Copy Code'
```

接下来，我们使用 `document.querySelectorAll` 函数选择页面的所有 `pre` 元素。 为了使选定的 `elmenets` 可迭代，我们使用 `Array.from` 方法将它们转换为数组，并将其存储在`codeBlock`变量中。

```javascript
let codeBlocks = Array.from(document.querySelectorAll('pre'))
```

对于每个代码块，我们创建一个新的`div`元素并将其`position`属性设置为`relative`。 这将用作代码块的包装器，并将确保复制按钮相对于代码块的位置正确。

```javascript
for (let codeBlock of codeBlocks) {
  let wrapper = document.createElement('div')
  wrapper.style.position = 'relative'
}
```

然后，我们创建一个`button`元素，为其分配`copy-code`类，并将其内部 HTML 设置为`copyButtonLabel`变量的值。

```javascript
let copyButton = document.createElement('button')
copyButton.className = 'copy-code'
copyButton.innerHTML = copyButtonLabel
```

复制代码类用于设置按钮的样式。 由于我们使用`position:relative`属性创建了包装元素，因此我们将复制代码的位置设置为绝对位置。

```css
.copy-code {
  position: absolute;
  top: 0;
  right: 0;
  background-color: #3730a3;
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
  line-height: 1rem;
}

.copy-code:hover {
  background-color: #312e81;
}
```

回到 JavaScript。 我们将代码块的`tabindex`属性设置为`0`，并将复制按钮附加到其上。 这将使代码块可聚焦并允许用户使用键盘与其交互。

```javascript
codeBlock.setAttribute('tabindex', '0')
codeBlock.appendChild(copyButton)
```

然后，我们用新创建的`div`元素包装代码块，并将其插入到其父元素中的代码块之前。

```javascript
codeBlock.parentNode.insertBefore(wrapper, codeBlock)
wrapper.appendChild(codeBlock)
```

最后，我们为复制按钮添加一个单击事件监听器，并在单击时调用`copyCode`函数。

```javascript
copyButton.addEventListener('click', async () => {
  await copyCode(codeBlock, copyButton)
})
```

`copyCode`函数是一个异步函数，它将代码块和按钮作为参数。 它选择代码块中的`code`元素，获取其内部文本，并使用`navigator.clipboard.writeText`方法将其写入剪贴板。

```javascript
async function copyCode(block, button) {
  let code = block.querySelector('code')
  let text = code.innerText

  await navigator.clipboard.writeText(text)
}
```

为了提供代码已被复制的视觉反馈，按钮的内部文本更改为`Code Copied`，并在 `700` 毫秒后设置为默认值。

```javascript
async function copyCode(block, button) {
  let code = block.querySelector('code')
  let text = code.innerText

  await navigator.clipboard.writeText(text)

  // visual feedback that task is completed
  button.innerText = 'Code Copied'

  setTimeout(() => {
    button.innerText = copyButtonLabel
  }, 700)
}
```

就是这样！ 你的 astro 布局应该是这样的。

```astro
---
---

<script>
  let copyButtonLabel = "Copy Code";
  let codeBlocks = Array.from(document.querySelectorAll("pre"));

  for (let codeBlock of codeBlocks) {
    let wrapper = document.createElement("div");
    wrapper.style.position = "relative";

    let copyButton = document.createElement("button");
    copyButton.className = "copy-code";
    copyButton.innerHTML = copyButtonLabel;

    codeBlock.setAttribute("tabindex", "0");
    codeBlock.appendChild(copyButton);
    // wrap codebock with relative parent element
    codeBlock.parentNode.insertBefore(wrapper, codeBlock);
    wrapper.appendChild(codeBlock);

    copyButton.addEventListener("click", async () => {
      await copyCode(codeBlock, copyButton);
    });
  }

  async function copyCode(block, button) {
    let code = block.querySelector("code");
    let text = code.innerText;

    await navigator.clipboard.writeText(text);

    // visual feedback that task is completed
    button.innerText = "Code Copied";

    setTimeout(() => {
      button.innerText = copyButtonLabel;
    }, 700);
  }
</script>

<slot />
```

使用此 JavaScript 代码，您可以轻松地将`Copy Code`按钮添加到网站上的任何代码块，使其对您的用户来说更加用户友好和高效。 该代码很容易理解，您可以对其进行自定义以满足您的需求。
