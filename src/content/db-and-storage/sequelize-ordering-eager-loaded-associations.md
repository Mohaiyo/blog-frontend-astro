---
title: 'Sequelize Eager Loading - ordering eager loaded associations'
pubDate: 2024-09-29
description: 'Sequelize Eager Loading - ordering eager loaded associations'
author: Wayne.Liang
image:
  cover: '../assets/db-and-storage/ordering-eager-loaded-associations.png'
  alt: 'ordering eager loaded associations'
category: '数据库与存储'
tags: ['Sequelize']
---

# Sequelize Eager Loading - ordering eager loaded associations

对于多对多关系，您还可以按连接表中的属性进行排序。例如，假设我们在 Division 和 Department 之间有一个多对多关系，其连接模型为 DepartmentDivision，您可以执行以下操作：。例如：

```nodejs
Company.findAll({
  include: {
    model: Division,
    include: Department,
  },
  order: [[Division, DepartmentDivision, 'name', 'ASC']],
});
```


order 在 include 选项中也起作用的唯一情况是使用 separate： true 时。在这种情况下，用法如下：

```nodejs
// This only works for `separate: true` (which in turn only works for has-many relationships).
User.findAll({
  include: {
    model: Post,
    separate: true,
    order: [['createdAt', 'DESC']],
  },
});
```

