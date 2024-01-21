---
title: '创建一个现代npm包的最佳实践'
pubDate: 2024-01-21
description: '技术总是在变化，你的流程和实践需要跟上这些变化。因此，虽然npm已有 13 年历史，但你围绕npm包创建的实践应该会更加现代。不过，如果你感觉它们可能有点过时了，请继续阅读。'
author: 'Wayne.Liang'
image:
  cover: '../assets/tech-tools-and-practices/best-practices-create-modern-npm-package.png'
  alt: 'Best practices for creating a modern npm package with security in mind'
category: '技术工具与实践'
tags: ['NPM', 'GITHUB']
---

> 原文地址 [Best practices for creating a modern npm package with security in mind](https://snyk.io/blog/best-practices-create-modern-npm-package/)

> 原文作者 [Brian clark](https://snyk.io/contributors/brian-clark/)

## Contents

## 简介

在本教程中，我们将逐步使用现代最佳实践（截至 2023 年）创建 npm 包。 你将首先学习如何创建 npm 包，以便熟悉构建包并将其发布到 npm 注册表。 然后，你将了解如何通过设置测试框架、持续集成和部署管道、安全检查以及用于发布的自动化语义版本管理来制作更强大且可用于生产的 npm 包。 在本教程结束时，你将对自己生成现代且可持续的 npm 包的能力充满信心。 让我们开始吧！

## 先决条件

1. 熟悉Node.js,Javascript,GitHub,和GitHub Actions
2. 可以用于协助创建npm包的开发工具

## 简单示例NPM包

我们首先通过一个简单的例子来了解一下创建和发布 npm 包的过程。如果你已经熟悉这一点，你可以跳到[生产就绪的npm包](#生产就绪的npm包)部分，其中涵盖了更高级的主题。

### 设置你自己的项目

你需要在 GitHub 中创建一个项目才能开始，因此请按照以下步骤启动项目。如果你已经有一个现成的可供使用，你可以跳到下一章节，但请**务必仔细检查本小节的步骤 5**中有关包名称。

1. 创建 GitHub 存储库：[https://github.com/new](https://github.com/new)

2. 克隆提供的示例仓库到本地,地址如下。

```bash
git clone https://github.com/snyk-snippets/simple-npm-package.git
```

3. 打开终端并将目录更改为克隆项目的文件夹。

```bash
cd simple-npm-package
```

4. 运行 `npm init -y` 创建 `package.json` 文件。注意：如果你克隆了示例存储库，则无需执行此步骤。

5. 使用范围名称更新 `package.json` 中的 `name` 属性。示例：`@[username]/simple-npm-package`。请务必使用你的用户名或组织名称，而不是 **@snyk-snippets**。

创建项目后，你可以继续创建 npm 帐户。通过本教程的其余部分，你将看到我正在处理存储库的本地克隆`clarkio/simple-npm-package`。

### 设置你的npm账号

为了能够让你的 npm 包可供其他人使用，你需要一个 npm 帐户。以下步骤将引导你创建自己的帐户（如果你还没有帐户），启用双因素身份验证 (2FA) 以提高帐户的安全性，并将你的帐户连接到本地计算机。

1. 在 [https://www.npmjs.com/signup](https://www.npmjs.com/signup) 上注册 npm。
2. 为了获得更好的安全性，请在你的 npm 帐户上启用 2FA：https://docs.npmjs.com/configuring-two-factor-authentication
3. 使用命令 `npm login` 在终端中使用你的 npm 帐户登录，然后按照屏幕上的说明进行操作：

```bash
> npm login
npm notice Log in on https://registry.npmjs.org/
Username: clarkio
Password:
Email: (this IS public) <email address>
npm notice Please use the one-time password (OTP) from your authenticator application
Enter one-time password from our authenticator app: <OTP>
Logged in as clarkio on https://registry.npmjs.org/.
```

一旦你拥有一个 npm 项目和一个 npm 帐户，你就可以将你的 npm 包发布到[公共和官方 npmjs 注册表](https://npmjs.org/).使其可供其他人使用。在执行之前，你可以按照以下步骤检查将要发布的内容，然后运行实际的发布过程：

1. 在终端中，运行 `npx npm-packlist` 以查看将包含在包的发布版本中的内容。

这可确保你不会丢失包正常运行所需的任何源代码文件。确保你不会意外向公众泄露敏感信息（例如带有数据库凭据或 API 密钥的本地配置文件）也是一个很好的做法。

```bash
> npx npm-packlist
LICENSE
index.js
package.json
README.md
```

2. 在终端中，运行 `npm publish --dry-run` 以查看实际运行该命令时会执行什么操作。
3. 在终端中，运行 `npm publish --access=public` 以将包实际发布到 npm。注意：作用域包（@clarkio/simple-npm-package）需要 `--access=public`，因为它们默认是私有的。如果它没有作用域并且在 `package.json` 中没有将私有字段设置为 `true`，那么它也将是公共的。

```bash
> npm publish --access=public
npm notice
npm notice 📦@clarkio/simple-npm-package@0.0.1
npm notice === Tarball Contents ===
npm notice 1.1kB LICENSE
npm notice 1.2kB README.md
npm notice 95B index.js
npm notice 690B package.json
npm notice === Tarball Details===
npm notice name: @clarkio/simple-npm-package
npm notice version: 0.0.1
npm notice filename:@clarkio/simple-npm-package-0.0.1.tgz
npm notice package size:2.1 kB
npm notice unpacked size: 4.1 kB
npm notice shasum:6f335d6254ebb77a5a24ee729650052a69994594
npm notice integrity:sha512-VZ1K1eMFOKeJW[...]7ZjKFVAxLcpdQ==
npm notice total files:4
npm notice
This operation requires a one-time password.
Enter OTP: <OTP>
+ @clarkio/simple-npm-package@0.0.1
```

你完成了！你已经完成了自己的 npm 包的构建和部署。接下来，你将学习如何制作一个更强大的包，为生产环境做好准备并得到更广泛的使用。

## 生产就绪的npm包

虽然前面的示例包可能会在生产中使用，随着时间的推移，它需要手动来跟上其维护。使用工具和自动化以及适当的测试和安全检查将有助于最大限度地减少保持包顺利运行的总体工作量。让我们更深入地了解其中涉及什么。

以下章节将涵盖：

1. 设置你的 `modern-npm-package`项目
2. 构建 CommonJS (CJS) 和 ECMAScript (ESM) 模块格式
3. 设置和编写单元测试
4. 实施安全检查
5. 自动化版本管理和发布

如果你在阅读本文时没有自己的项目可以使用，可以使用以下示例项目作为参考：https://github.com/snyk-snippets/modern-npm-package

### 设置你的项目

你需要在 GitHub 中创建一个项目才能开始，因此请按照以下步骤启动项目。如果你已经有一个现成项目可供使用，你可以跳到下一章节，但请**务必仔细检查本小节的步骤 5**中有关包名称。

1. 创建 新的GitHub 存储库：[https://github.com/new](https://github.com/new)

2. 克隆提供的示例仓库到本地,地址如下。

```bash
git clone git@github.com:snyk-snippets/modern-npm-package.git
```

3. 打开终端并将目录更改为克隆项目的文件夹。

```bash
cd modern-npm-package
```

4. 运行 `npm init -y` 创建 `package.json` 文件。注意：如果你克隆了示例存储库，则无需执行此步骤。

5. 使用范围名称更新 `package.json` 中的 `name` 属性。示例：`@[username]/modern-npm-package`。请务必使用你的用户名或组织名称，而不是 **@snyk-snippets**。

6. 为包编写代码（或者仅使用 index.ts 中的 hello world 示例）。

创建项目后，你可以继续创建 npm 帐户。通过本教程的其余部分，你将看到我正在处理存储库的本地克隆`clarkio/modern-npm-package`。

### 构建CommonJS和ECMAScript模块化格式的npm包

虽然 ECMAScript 模块格式现在在 Node.js 12+ 版本中得到原生支持，但它尚未被社区广泛采用。为了面向未来并支持这两种格式，你将看到如何使用 TypeScript 为它们准备 npm 包。

1. 首先创建一个基础名为`tsconfig.base.json`的配置文件。这是通用的编译设置，无论你的目标是哪种模块格式，都可以使用这些设置。请根据你的项目需要随意调整这些，特别是如果你不使用提供的示例，你将需要调整文件属性以与你的项目结构保持一致。

```json
{
  "compilerOptions": {
    "strict": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "skipLibCheck": true,
    "checkJs": true,
    "allowJs": true,
    "declaration": true,
    "declarationMap": true,
    "allowSyntheticDefaultImports": true
  },
  "files": ["../src/index.ts"]
}
```

2. 然后创建一个 CommonJS 格式的 TypeScript 配置文件，并将其命名为 `tsconfig.cjs.json`。

- `lib` 属性向 TypeScript 指示它应该引用哪些类型来帮助你为项目编写代码。
- `target` 属性向 TypeScript 指示要编译项目代码的 JavaScript 版本。
- `module` 属性向 TypeScript 指示编译项目代码时应使用哪种 JavaScript 模块格式。
- `moduleResolution` 属性帮助 TypeScript 确定如何引用“import”语句
- `outDir` 和 `declarationDir` 属性向 TypeScript 指示将编译代码和定义代码中使用的类型的结果放置在哪里。

```json
{
  "extends": "./tsconfig.base.json",
  "compilerOptions": {
    "lib": ["ES6", "DOM"],
    "target": "ES6",
    "module": "CommonJS",
    "moduleResolution": "Node",
    "outDir": "../lib/cjs",
    "declarationDir": "../lib/cjs/types"
  }
}
```

3. 之后，创建 ECMAScript 格式的 TypeScript 配置文件并将其命名为 `tsconfig.esm.json`。这里的属性与你在 CommonJS 配置中看到的相同，但现在将现代 ECMAScript 模块格式作为其输出。

```json
{
  "extends": "./tsconfig.base.json",
  "compilerOptions": {
    "lib": ["ES2022", "DOM"],
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "NodeNext",
    "outDir": "../lib/esm",
    "declarationDir": "../lib/esm/types"
  }
}
```

4. 使用指向 `lib` 文件夹的 `files` 字段更新你的 `package.json` 文件，其中包含 TypeScript 为你构建包的结果。

5. 使用`exports`字段更新 `package.json` 文件，以定义如何根据使用的模块加载器（CJS 与 ESM）查找源文件。你可以在[Node.js 文档](https://nodejs.org/api/packages.html#packages_exports)中阅读有关此导出字段支持的更多信息。

```json
  "exports": {
    ".": {
      "import": {
        "types": "./lib/esm/types/index.d.ts",
        "default": "./lib/esm/index.mjs"
      },
      "require": {
        "types": "./lib/cjs/types/index.d.ts",
        "default": "./lib/cjs/index.js"
      }
    }
  },
```

6. 更新 `package.json` 文件 `main` 和 `types` 字段以指向包的 CJS 版本。这是作为默认,后备选项。

```json

"types": "./lib/cjs/types/index.d.ts",
"main": "./lib/cjs/index.js"

```

7. 将 `files` 字段添加到 `package.json` 文件中，以指示 npm 打包代码进行发布时应包含哪些文件。

```json
"files": [
   "lib/**/*"
],
```

8. 通过 `package.jso`n 中的 `script` 字段创建命令以使用 `tsc` 并编译包的 CJS 和 ESM 格式。这将导致生成 `lib` 文件夹的源文件。

- `clean` 脚本用于删除过去构建的输出并从头开始。
- `build:esm` 脚本末尾的 `mv lib/esm/index.js` `lib/esm/index.mjs` 重命名文件扩展名，以便 Node.js 模块加载器知道它是 ESM 模块。
- npm 在打包 npm 包以准备发布到注册表之前使用 `prepack` 脚本

```json
 "clean": "rm -rf ./lib",
  "build": "npm run clean && npm run build:esm && npm run build:cjs",
  "build:esm": "tsc -p ./configs/tsconfig.esm.json && mv lib/esm/index.js lib/esm/index.mjs",
  "build:cjs": "tsc -p ./configs/tsconfig.cjs.json",
  "prepack": "npm run build"
```

9. 现在，你可以在终端中运行 `npm run build`，让 TypeScript 构建你的项目，为使用和发布做好准备。

这就是使用 TypeScript 构建支持 CommonJS 和 ECMAScript 模块格式的 npm 包所需要做的所有设置。接下来，你将学习如何针对 npm 包代码设置和运行测试，以确保它产生你期望的结果。

### 设置和编写单元测试

为了对代码的行为和结果充满信心，你需要实施测试过程。测试迫使你在首次创建代码时以不同的方式思考代码的功能，而不是典型的、愉快的路径。举个例子，你可以想办法破坏一个函数，使其抛出错误或产生不期望的结果。这样做将使你的应用程序更具弹性和可持续性，并确保在添加更多应用程序时不会出现任何中断。

如果你想更深入地进行测试并了解其最佳实践，请务必阅读 Yoni Goldberg 的 [JavaScript 最佳实践存储库](https://github.com/goldbergyoni/javascript-testing-best-practices)。

#### 单元测试

确保你的包按照你希望的方式运行需要针对你的代码编写测试。你需要一些工具来帮助设置项目来运行单元测试并显示结果。这些工具是 Mocha.js、Chai.js 和 ts-node。 [Mocha.js](https://mochajs.org/) 是一个测试运行程序，[Chai.js](https://www.chaijs.com/) 是一个断言库，可帮助确定你是否从代码中获得了预期的结果，而 [ts-node](https://www.npmjs.com/package/ts-node) 帮助我们在 TypeScript 项目中使用这些工具。请按照以下步骤为你的 npm 包设置并运行测试：

1. 在终端中使用以下命令安装开发人员依赖项：

```bash
npm i -D mocha @type/mocha chai @types/chai ts-node
```

2. 在项目的根目录中创建一个新文件 `.mocharc.json` ，其中包含以下内容：

```json
{
  "extension": ["ts"],
  "spec": "./**/*.spec.ts",
  "require": "ts-node/register"
}
```

3. 在项目的根目录中创建一个测试文件夹。

4. 在测试文件夹中创建一个index.spec.ts 文件。

5. 在`index.spec.ts`文件中编写单元测试来测试`index.ts`中的代码。你可以参考示例 npm 包存储库作为示例：https://github.com/snyk-snippets/modern-npm-package/blob/main/tests/index.spec.ts

6. 在 `package.json` 文件的脚本部分添加一个`test`属性，并为其指定值 `mocha`。

```json
  "scripts": {
    "clean": "rm -rf ./lib",
    "build": "npm run clean && npm run build:esm && npm run build:cjs",
    "build:esm": "tsc -p ./configs/tsconfig.esm.json && mv lib/esm/index.js lib/esm/index.mjs",
    "build:cjs": "tsc -p ./configs/tsconfig.cjs.json",
    "prepack": "npm run build",
    "test": "mocha"
  },
```

7. 从项目的根文件夹在终端中运行 `npm test` 以执行测试并查看结果：

```bash
bc@mbp-snyk modern-npm-package % npm test

> @clarkio/modern-npm-package@0.0.0-development test
> mocha

  NPM Package
    ✔️ should be an object
    ✔️ should have a helloworld property

  Hello World Function
    ✔️  should be a function
    ✔️ should return the hello world message

4 passing (22ms)
```

#### 在管道中进行测试

现在你已经有了测试来验证代码的行为，你可以在管道中使用它们。这将有助于确保存储库中引入的任何更改都不会破坏你的代码行为。按照以下步骤创建测试工作流程作为项目管道的一部分。

1. 为你的存储库创建一个新的 GitHub Action：`https://github.com/<your-account-or-organization>/<your-repo-name>/actions/new`
2. 将工作流程重命名为`tests.yml`
3. 在工作流程文件中插入以下 `Snyk Action` 脚本：

```yaml
name: Tests

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [12.x, 14.x, 16.x, 18.x]

    steps:
      - uses: actions/checkout@v3
      - name: Use Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v3
        with:
          node-version: ${{ matrix.node-version }}
      - run: npm ci
      - run: npm test
```

此 YAML 脚本检查你的最新代码，安装其依赖项，并运行 `npm test` 命令来执行你的测试。它对`node-version`版本字段中列出的每个 Node.js 版本执行此操作，以便你可以确保代码在每个运行时按预期工作。

你现在已经完成了项目的设置，以便根据 npm 包的代码运行和评估测试。但是，你可能会想“如何在另一个项目中使用我的 npm 包进行测试？”让我们看看接下来如何实现这一目标。

#### npm包测试

通过单元测试对你的 npm 包的代码有信心是一回事，但确保整个 npm 包的使用体验是另一回事。这涉及将你的 npm 包作为依赖项拉入另一个项目，并查看它的使用是否像你期望的那样顺利。你可以通过以下4种方法进行测试：

1. 通过 `npm pack` 输出安装
2. 通过相对路径安装
3. 通过 `npm link`安装
4. 通过注册表安装（例如 [npmjs.com](https://www.npmjs.com/) 上的 npm 公共注册表）

##### npm pack

这种方法将利用`npm pack`命令将你的npm包打包并压缩成一个单独的文件`<package-name>.tgz`。然后，你可以转到要在其中使用该软件包的项目，并通过此文件进行安装。执行以下步骤：

1. 从你的npm包目录中，在终端中运行`npm pack`。注意生成的.tgz文件及其位置。

2. 切换到要使用npm软件包的项目目录。示例：`cd /path/to/project`

3. 在客户端项目目录中，运行`npm install /path/to/package.tgz，但请将其替换为第1步生成的.tgz文件所在位置的正确路径。

4. 然后，你可以开始在该客户端项目中使用该软件包来测试功能。

这样做将使你尽可能接近实际生产环境中使用自己的npm软件包。

##### npm link

这种方法将利用`npm link`命令，在尝试在客户端项目中安装时指向你的软件包目录。执行以下步骤：

1. 从你的npm包目录中，在终端中运行 `npm link`。

2. 切换到要使用该npm软件包的项目目录。 示例：`cd /path/to/project`

3. 从客户端项目目录中运行`npm link <name-of-your-package>`。

当引用代码时，这会将客户端项目指向npm软件包目录。这不会给你完全像生产一样使用你的软件包的体验，但可以确保功能按预期工作。

##### 相对路径

这种方法利用你已经掌握的使用`npm install`命令的知识。它类似于`npm link`，而无需了解像`link`这样的新命令。

1. 从客户端项目目录中，在终端中运行 `npm install /path/to/your/package`。

与`npm link`方法类似，这将允许你在客户端项目中快速测试软件包的功能，但不会给你完全像生产一样使用你的软件包的体验。这是因为它指向完整的软件包源代码目录，而不是你在npm注册表中找到的构建版本。

##### npm注册表

此方法利用公共（或自己）NPM软件包注册表。它涉及发布软件包并像任何其他NPM软件包一样进行安装。

1. 使用本文前面概述的步骤通过 `npm publish` 命令发布你的NPM软件包

2. 切换到要使用该npm软件包的项目目录。示例：`cd /path/to/project`

3. 从客户端项目目录中运行 `npm install <name-of-your-package>`。

感谢Mirco Kraenz [@MKraenz](https://twitter.com/MKraenz)创建了一个[Twitter线程](https://twitter.com/MKraenz/status/1559188177696436226?s=20&t=LJg1FbyDLTmiOGAUQh7LmQ)来总结我们在直播过程中学到的东西！

现在，你已经构建了支持现代模块格式的软件包，并通过单元测试和打包测试确保其正常运行。接下来，你需要确保没有安全问题，并防止在你的NPM软件包中引入新问题。

### 实施安全检查

跳过这部分的翻译了，如果有兴趣，可以跳到原文了解。

### 自动化版本管理和发布

每当你合并主分支中的更改时，你不希望手动更新npm包的版本并每次都发布它。相反，你希望自动化此过程。如果你还记得本文早些时候简单的npm包示例中使用了以下命令来更新npm包的版本然后发布它：

```bash
npm version <major|minor|patch>
npm publish
```

你还希望遵循行业标准语义化版本控制，以便包的消费者理解不同版本变化对注册表所产生的影响。

#### 什么是语义版本控制？

语义化版本控制规定版本号由三个占位符组成。第一个是主要版本，第二个是次要版本，最后一个是补丁版本。要了解更多关于语义化版本控制、版本管理和锁文件的信息，请阅读[《什么是 Package Lock JSON 以及 Yarn 和 NPM 包如何使用锁文件》](https://snyk.io/blog/what-is-package-lock-json/)。

如果你能够跳过手动操作，并通过 GitHub Actions 设置自动化工作流来处理 npm 包发布，那就太幸运了！因为有一款名为 Semantic Release 的工具可以与 GitHub Actions 集成。帮助自动化这个过程的关键在于，在提交项目变更时使用所谓的[conventional commits](https://www.conventionalcommits.org/en/v1.0.0/)方式。这样可以使自动化工具相应地更新所有内容，并知道如何准备下一个项目发布。

以下步骤将指导你为现代 npm 包进行设置。

1. 在终端中运行：`npm i -D semantic-release`
2. 在终端中运行：`npx semantic-release-cli setup`
3. 按照终端提示提供所需的令牌：你需要从 GitHub 获取一个个人访问令牌。

- 请前往 `https://github.com/<your-name-or-github-organization>/<your-repo-name>/settings/secrets/actions/new` 创建一个访问令牌，但请用你相应的存储库详细信息替换它。
- 在创建此令牌时，请使用以下范围：

![personal access token](https://snyk.io/_next/image/?url=https%3A%2F%2Fres.cloudinary.com%2Fsnyk%2Fimage%2Fupload%2Fv1663712555%2Fwordpress-sync%2Fblog-create-npm-packages-new-token.png&w=2560&q=75)

4. 你还需要一个来自npm的Automation-type访问令牌，该令牌将仅在CI环境中使用，以便能够绕过你账户的双重身份验证。要创建一个，请访问`https://www.npmjs.com/settings/<your-npm-account>/tokens`。请务必选择“Automation”类型，因为这将用于CI/CD工作流程中。

![new access token](https://snyk.io/_next/image/?url=https%3A%2F%2Fres.cloudinary.com%2Fsnyk%2Fimage%2Fupload%2Fv1663712548%2Fwordpress-sync%2Fblog-create-npm-packages-token.png&w=2560&q=75)

```bash
bc@mbp-snyk modern-npm-package % npx semantic-release-cli setup
? What is your npm registry? https://registry.npmjs.org/
? What is vour nom username? clarkio
? What is your pm password? [hidden]
? What is your NPM two-factor authentication code? <2FA code>
Provide a GitHub Personal Access Token (create a token at https://github.com/settings/tokens/new?scopes=repo
<token>
? What CI are you using? Github Actions
bc@mbp-snyk modern-npm-package %
```

5. 将你的npm令牌添加到GitHub存储库中，作为一个存储库秘密。链接：`https://github.com/<your-name-or-organization//settings/secrets/actions/new`。将秘钥的名称设置为`NPM_TOKEN`，并使用在之前步骤中获取的值。

![NPM_TOKEN](https://snyk.io/_next/image/?url=https%3A%2F%2Fres.cloudinary.com%2Fsnyk%2Fimage%2Fupload%2Fv1663712560%2Fwordpress-sync%2Fblog-create-npm-packages-secret.png&w=2560&q=75)

6. 回到你的项目中，打开 `package.json` 文件，并添加一个如下所示的 `releases` 键。如果你的仓库主分支仍然叫做 `master` 而不是 `main`，请相应地更新上述 `branches` 的值。

```json
"release": {
    "branches": ["main"]
  }
```

7. 同样在 `package.json` 文件中添加一个 `publishConfig` 键：

```json
"publishConfig": {
    "access": "public"
 }
```

8. 通过使用 `semantic-release` npm 脚本进行干运行来测试一切是否正常。将以下命令中的 `NPM_TOKEN=` 和 `GH_TOKEN=` 值设置为你各自的 token 值。然后将完整命令复制并在终端中运行，以查看是否一切都正确运行。进程日志将显示在终端输出中。如果出现任何问题，它们将在此处可见，并提供解决方法的详细信息。

9. 确认干运行成功完成后，可以为 GitHub 仓库设置新的 GitHub Action 来处理发布过程。转到 GitHub 上的存储库，并点击“Actions”。

10. 点击**New workflow**选项。

11. 将工作流重命名为 `release.yml`。

12. 在新工作流文件中添加以下 YAML 脚本。该脚本基本上表示一旦 Snyk 安全检查工作成功完成，则执行发布任务（release job）。发布任务会检出代码、设置 Node.js 环境、安装依赖项，然后使用你的 GitHub 和 npm 令牌运行 semantic release。

```yaml
name: Release
on:
  workflow_run:
    workflows: ['Snyk Security Check', 'Tests']
    branches: [main]
    types:
      - completed

jobs:
  release:
    name: Release
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v2
        with:
          fetch-depth: 0
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: 'lts/*'
      - name: Install dependencies
        run: npm ci
      - name: Release
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          NPM_TOKEN:${{ secrets.NPM_TOKEN }}
        run:npx semantic-release
```

13. 提交你的本地更改并将其推送到你的GitHub存储库

可以通过在终端中运行命令 `git commit -am '<your commit message>'`，然后 `git push` 来完成此操作。

也可以使用 VS Code 的[版本控制功能](https://code.visualstudio.com/docs/sourcecontrol/overview)来完成这个步骤。

14. 设置好所有内容后，现在你可以使用[conventional commits](https://www.conventionalcommits.org/zh-hans/v1.0.0/)将更改推送到主分支（或通过合并拉取请求），然后发布工作流程将运行（当然要先进行 Snyk 安全检查）。你可以在示例 [modern-npm-package 存储库工作流程](https://github.com/clarkio/modern-npm-package/actions/runs/2886059078)中查看一个实例。

## 通过GitHub使用Snyk进行持续安全监控

跳过这部分的翻译了，如果有兴趣，可以跳到原文了解。

## 开始创建现代的NPM包

让我们总结一下你在本文中学到的所有内容。首先，你了解了如何设置、创建和部署一个简单的npm包。这对于第一次发布自己的npm包来说是很好的，可以让你熟悉所需步骤。然而，如果你希望制作一个用于生产环境的npm包，按照这种方式进行操作会相当费时且不可持续。

为了实现制作一个适合生产环境使用的软件包，接下来你学习了如何构建通用模块（CommonJS）和ECMAScript模块（ESM），设置并编写单元测试，实施安全检查以及自动化版本管理和发布。有了这些知识，现在你已经准备好制作更多易于被社区或公司使用的npm包了。
