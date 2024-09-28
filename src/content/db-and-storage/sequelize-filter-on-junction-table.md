---
title: 'Sequelize Eager Loading - filter on junction table'
pubDate: 2024-09-28
description: 'Sequelize Eager Loading how to filter on the junction table'
author: Wayne.Liang
image:
  cover: '../assets/db-and-storage/sequelize-filter-on-junction-table.png'
  alt: 'filter on junction table'
category: '数据库与存储'
tags: ['Sequelize']
---

# Sequelize Eager Loading - filter on junction table

每当包含来自多对多关系的模型时，您还可以对连接表应用过滤器。这是通过在 include 的 through 选项中应用的 where 选项完成的。例如：

```nodejs
User.findAll({
  include: [
    {
      model: Project,
      through: {
        where: {
          // Here, `completed` is a column present at the junction table
          completed: true,
        },
      },
    },
  ],
});
```

将生成如下sql.

```sql
SELECT
  `User`.`id`,
  `User`.`name`,
  `Projects`.`id` AS `Projects.id`,
  `Projects`.`name` AS `Projects.name`,
  `Projects->User_Project`.`completed` AS `Projects.User_Project.completed`,
  `Projects->User_Project`.`UserId` AS `Projects.User_Project.UserId`,
  `Projects->User_Project`.`ProjectId` AS `Projects.User_Project.ProjectId`
FROM `Users` AS `User`
LEFT OUTER JOIN `User_Projects` AS `Projects->User_Project` ON
  `User`.`id` = `Projects->User_Project`.`UserId`
LEFT OUTER JOIN `Projects` AS `Projects` ON
  `Projects`.`id` = `Projects->User_Project`.`ProjectId` AND
  `Projects->User_Project`.`completed` = 1;
```
