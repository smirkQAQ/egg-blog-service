### 创建迁移文件 
```
npx sequelize migration:generate --name={name}
```

### 执行迁移文件
```
npx sequelize db:migrate
```

### 回滚
```
npx sequelize db:migrate:undo
```

#### queryInterface 方法
```javascript
// 创建
queryInterface.createTable('表名', '字段名'， { /* 属性 */ })
// 添加列
queryInterface.addColumn('表名', '字段名'， { /* 属性 */ })
// 删除
queryInterface.removeColumn('表名', '字段名'， { /* 查询参数 */ })
// 更新
queryInterface.changeColumn('表名', '字段名'， { /* 属性 */ })
```

