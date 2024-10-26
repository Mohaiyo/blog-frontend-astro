---
title: 'Sequelize Read Replication'
pubDate: 2024-03-14
description: 'Sequelize数据只读副本'
author: Wayne.Liang
image:
  cover: '../assets/db-and-storage/sequelize-read-replication.png'
  alt: 'Read Replication'
category: '数据库与存储'
tags: ['Sequelize']
---

## Contents

## Read Replication

Sequelize 支持数据库只读副本，即当您想要执行 SELECT 查询时可以连接到多个服务器。当您进行读复制时，您指定一台或多台服务器作为只读副本，一台服务器充当主写入，处理所有写入和更新并将它们传播到副本（请注意，实际的复制过程不是由 Sequelize 处理，而是应由数据库后端设置）。

```nodejs
const sequelize = new Sequelize('database', null, null, {
  dialect: 'mysql',
  port: 3306,
  replication: {
    read: [
      { host: '8.8.8.8', username: 'read-1-username', password: process.env.READ_DB_1_PW },
      { host: '9.9.9.9', username: 'read-2-username', password: process.env.READ_DB_2_PW }
    ],
    write: { host: '1.1.1.1', username: 'write-username', password: process.env.WRITE_DB_PW }
  },
  pool: { // If you want to override the options used for the read/write pool you can do so here
    max: 20,
    idle: 30000
  },
})
```

如果您有任何适用于所有副本的常规设置，则无需为每个实例提供它们。在上面的代码中，数据库名称和端口被传播到所有副本。当您的副本中不包含用户和密码，也会发生同样的情况。每个副本都有以下选项：`host`,`port`,`username`,`password`,`database`。

Sequelize 使用池来管理与副本的连接。 Sequelize 在内部将维护两个使用池配置创建的池。

如果要修改这些，可以在实例化 Sequelize 时将 pool 作为选项传递，如上所示。

每个 `write` 或 `useMaster: true` 查询都会使用写入池。对于 SELECT 将使用读取池。使用基本的循环调度来切换只读副本。
