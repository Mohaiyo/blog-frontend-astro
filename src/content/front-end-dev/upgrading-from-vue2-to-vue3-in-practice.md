---
title: 'Upgrading from Vue2 to Vue3 in practice'
pubDate: 2025-10-23
description: '记录旧项目从Vue2升级到Vue3的全过程'
author: 'Wayne.Liang'
image:
  cover: '../assets/front-end-dev/upgrading-from-vue2-to-vue3-in-practice.png'
  alt: 'Upgrading from Vue2 to Vue3 in practice'
category: '前端开发'
tags: ['Vue2', 'Vue3', 'element-ui', 'element-plus']
---

## Contents

## 项目以及环境记录

```bash
System:
    OS: macOS 15.5
    CPU: (10) arm64 Apple M4
  Binaries:
    Node: 20.19.2 - ~/.nvm/versions/node/v20.19.2/bin/node
    Yarn: 1.22.4 - ~/.yarn/bin/yarn
    npm: 10.8.2 - ~/.nvm/versions/node/v20.19.2/bin/npm
  Browsers:
    Chrome: 141.0.7390.108
    Edge: Not Found
    Firefox: 143.0.4
    Safari: 18.5
  npmPackages:
    @sentry/vue: ^6.14.3 => 6.14.3
    @vue/babel-helper-vue-jsx-merge-props:  1.0.0
    @vue/babel-plugin-transform-vue-jsx:  1.1.2
    @vue/babel-preset-app:  4.4.1
    @vue/babel-preset-jsx:  1.1.2
    @vue/babel-sugar-functional-vue:  1.1.2
    @vue/babel-sugar-inject-h:  1.1.2
    @vue/babel-sugar-v-model:  1.1.2
    @vue/babel-sugar-v-on:  1.1.2
    @vue/cli-overlay:  4.4.1
    @vue/cli-plugin-babel: ^4.0.0 => 4.4.1
    @vue/cli-plugin-eslint: ^4.0.0 => 4.4.1
    @vue/cli-plugin-pwa: ^4.0.0 => 4.4.1
    @vue/cli-plugin-router:  4.4.1
    @vue/cli-plugin-unit-jest: ^4.0.0 => 4.4.1
    @vue/cli-plugin-vuex:  4.4.1
    @vue/cli-service: ^4.0.0 => 4.4.1
    @vue/cli-shared-utils:  4.4.1
    @vue/component-compiler-utils:  3.1.2
    @vue/eslint-config-prettier: ^5.0.0 => 5.1.0
    @vue/preload-webpack-plugin:  1.1.1
    @vue/test-utils: 1.0.0-beta.29 => 1.0.0-beta.29
    @vue/web-component-wrapper:  1.2.0
    babel-helper-vue-jsx-merge-props:  2.0.3
    eslint-plugin-vue: ^5.0.0 => 5.2.3
    eslint-plugin-vue-libs: ^4.0.0 => 4.0.0
    jest-serializer-vue:  2.0.2
    vue: ^2.6.10 => 2.6.11
    vue-cli-plugin-element: ^1.0.1 => 1.0.1
    vue-count-to: ^1.0.13 => 1.0.13
    vue-eslint-parser:  5.0.0
    vue-highlight-words: ^1.2.0 => 1.2.0
    vue-hot-reload-api:  2.3.4
    vue-i18n: ^8.22.1 => 8.22.1
    vue-jest:  3.0.5
    vue-json-pretty: ^1.7.1 => 1.7.1
    vue-loader:  15.9.2
    vue-router: ^3.0.6 => 3.3.2
    vue-style-loader:  4.1.2
    vue-template-compiler: ^2.6.10 => 2.6.11
    vue-template-es2015-compiler:  1.9.1
    vuex: ^3.0.1 => 3.4.0
  npmGlobalPackages:
    @vue/cli: 5.0.9
```

## Step 1

更新 @vue/cli相关的依赖 使用 `vue upgrade --registry=https://registry.npmjs.org/`进行升级，同时也是用了 `npx npm-check-updates -i --format group` 升级了 `minor` 版本的依赖包。

主要是将vue-cli的包依赖升级到 5.0版本 以及底层的webpack升级到webpack v4.

详细文档，参考 [Migrate from v4 从 v4 迁移](https://cli.vuejs.org/migrations/migrate-from-v4.html)

## Step 2

项目中有几个报错：

- 报错1： 升级完毕之后，由于部分组件依赖了 `path` 包，此依赖包node的 `process` 变量不能用于浏览器，所以新增 `path-browserify` 进行替换。替换完毕之后，使用 `npm run lintfix` 修复语法错误。

- 报错2：

```bash
./node_modules/.pnpm/canvg@3.0.11/node_modules/canvg/lib/index.es.js 6495:11-28
export 'default' (imported as '_asyncToGenerator') was not found in '@babel/runtime/helpers/asyncToGenerator' (module has no exports)
```

排查得知是 `jspdf` 依赖了 `canvg`,导致的问题。

在vue-cli文档中由于`node_modules`默认情况下是会被排除掉的，所以，我们要将 `jspdf`添加到 `vue.config.js` 中的 `transpileDependencies` 选项中.

- 报错3:

`import variables from '@/styles/element-variables.scss'`

使用sass之后，升级之后不支持这种sass变量引用到js中，故替换或者去掉这些引入

- 报错4:

webpack升级以后，`svg-sprite-loader@v4`版本不再支持 `webpack/lib/RuleSet`的引入，导致解析svg错误，将`svg-sprite-loader`升级到v6版本修复该问题。

此时项目已经能顺利跑起来。暂时升级到了最新版的 `vue-cli`。

还有一个登录之后的 router.push报错，需要进行额外的处理。

此处是因为$router.push 路由变化时报错,导致permission.js文件内如下部分代码的逻辑一直catch error又回到login界面

```javascript
const accessRoutes = await store.dispatch('permission/generateRoutes', store.getters.roles)
```

```bash
Redirected when going from "/login?redirect=%2Fdashboard" to "/dashboard" via a navigation guard.
```

## Step 3 迁移源文件

使用社区工具 gogocode 进行转换操作，迁移源文件

```bash
gogocode -s ./src -t gogocode-plugin-vue -o ./src-out
```

转换操作执行完毕后新的Vue3代码会被写入到src-out目录中。

## Step 4 依赖升级

除了升级源码，我们还需要升级 Vue3 相关依赖，这一点也可以自动完成，在终端（terminal）中跳转到需要升级的Vue项目路径，执行如下命令：

```bash
gogocode -s package.json -t gogocode-plugin-vue -o package.json
```

这条命令会帮你把 package.json 里面的 Vue/Vuex/Vue-router/Vue 编译工具 升级到适配 Vue3 的版本

```bash
npm install
```

项目图标文件转换错误的文件记录,主要是使用的图标上el-icon-setting带上了额外的类名如font-14，导致的转换失败，修复该问题即可

- /sponsoredBrandManagement/modelManagement/detail/components/CampaignList.vue
- /amazon-ad-admin-web/src/views/operatingData/realTimeOrder/index

## Step5 报错处理

### Cannot read properties of null (reading 'content')

记不太清楚了，有报错信息应该很好处理

### [vue/compiler-sfc] This experimental syntax requires enabling one of the following parser plugin(s): "jsx", "flow", "typescript"

文件 `src/layouts/components/Sidebar/Item.vue`

将`script`改成`<script lang="jsx">`

### Syntax Error: Error: Codegen node is missing for element/if/for node. Apply appropriate transforms first.

el-dialog处理写法不规范的问题 template #footer没有作为el-dialog的直接子元素导致的报错，很好处理。

### 页面不渲染的问题。

调整 main.js中 use(router)的顺序确保 vue app能引入vue-router插件。

### 升级Vxe-table到Vue3版本，需要确保组件正确引入

由于写法的更新，需要将toolbar和table使用方法重新连接

```bash
   const $table = this.$refs.tableRef;
  const $toolbar = this.$refs.toolbarRef;
  if ($table && $toolbar) {
      $table.connect($toolbar);
  }
```

### 先移除i18n的支持

### element-plus/icons图标无法识别的问题

主要是部分图标在@element-plus/icons中不存在，导致的引入图标失效从而引发的警告

### 更新tinymce组件更新内容的方法

将 @input 方法改成 @update:value

### 修复菜单栏图标无法渲染的问题

全局引入 @element-plus/icons。将组件 `src/layouts/components/Sidebar/Item.vue` 更新成如下代码

```vue
<template>
  <span class="sidebar-item">
    <component :is="icon" v-if="icon" class="sidebar-item__icon" />
    <span v-if="title" class="sidebar-item__title">{{ title }}</span>
  </span>
</template>

<script>
  export default {
    name: 'SidebarItemRender',
    props: {
      icon: {
        type: String,
        default: ''
      },
      title: {
        type: String,
        default: ''
      }
    }
  }
</script>
<style lang="scss" scoped>
  .sidebar-item {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    height: 100%;
    gap: 4px;
  }
  .sidebar-item__icon {
    width: 16px;
    height: 16px;
  }
  .sidebar-item__title {
    font-size: 14px;
  }
</style>
```

### 修复tagsView组件关闭按钮不生效的问题

将span改成el-icon

```vue
<el-icon v-if="!isAffix(tag)" @click.prevent.stop="closeSelectedTag(tag)">
  <ElIconClose />
</el-icon>
```

### el-date-picker统一替换日期格式

日期选择器格式 `value-format="yyyy-MM-dd"`改成`value-format="YYYY-MM-DD"` 周日期选择器需要改成 `format="YYYY-ww"`

### overlay runtimeErrors处理。

部分交互出现 _ResizeObserver loop completed with undelivered notifications._

暂时hack修复,在vue.config.js中devServer属性添加

```javascript
{
  client: {
    overlay: {
      runtimeErrors: (error) => {
        const ignoreErrors = ['ResizeObserver loop completed with undelivered notifications.']
        return !ignoreErrors.includes(error.message)
      }
    }
  }
}
```

### echarts 实例使用ref/reactive或者定义在 data 中 reset出发时导致的错误

```bash
TypeError: Cannot read properties of undefined (reading 'type') at Object.reset
```

修复方案

### 项目中用到了vue-json-pretty

将项目依赖升级到vue3

### i18n问题修复

动态设置语言不生效的问题，新版本需要使用*i18n.global.setLocaleMessage*设置

```javascript
i18n.global.setLocaleMessage(locale, messages[locale])
```

### sass 样式问题

*@import*不再支持，改为 _@use_

### 侧边栏收起状态修复

修改 *sidebar.scss*样式，el-submenu,改成el-sub-menu

还需要单独调节 el-menu--collapse css类下的样式

```css
.el-menu--collapse {
  .el-sub-menu {
    & > .el-sub-menu__title {
      & > .sidebar-item {
        justify-content: center;
      }
      & > .sidebar-item > span {
        height: 0;
        width: 0;
        overflow: hidden;
        visibility: hidden;
        display: inline-block;
      }
    }
  }
  .sub-menu-title-noDropdown {
    & > .sidebar-item {
      justify-content: center;
    }
    & > .sidebar-item > span {
      height: 0;
      width: 0;
      overflow: hidden;
      visibility: hidden;
      display: inline-block;
    }
  }
}
```

### data 中的图标要使用 shallowRef

data中的图标改为通过shallowRef使用

### utcToZonedTime 引入错误的问题修复

date-fns-tz 的引入防范从 `utcToZonedTime` 改为 `toZonedTime`


### dialog中部分样式不生效

历史使用了`.el-dialog__wrapper`作为自定义样式类，改为`.el-modal-dialog`

## Step6 升级eslint

移除`@vue/cli-plugin-eslint`,

使用 `pnpm add -D eslint eslint-plugin-vue vue-eslint-parser globals prettier`更新eslint的配置。同时更新package.json中的脚本命令，修复部分eslint 错误。

```bash
"lint": "eslint ./src --ext .js,.vue --max-warnings=0",
lintfix": "eslint  --fix ./src --ext .js,.vue"
```

更新eslint配置

## Step7 i18n 问题修复

升级i18n到最新版本，动态设置语言不生效的问题，需要更新语法。详细见Step 5

## Step8 页面样式视觉回归测试

检测需要迁移的页面的样式问题，且同步修复，升级完成
