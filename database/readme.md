## 初始化 Migrations 配置文件和目录

### 创建迁移文件 
```
npx sequelize migration:generate --name={name} // 创建表迁移文件
npx sequelize seed:generate --name={name} // 创建种子迁移文件
```

### 执行迁移文件
```
npx sequelize db:migrate
```

### 回滚
```
npx sequelize db:migrate:undo
```

### 执行种子文件
```
npx sequelize db:seed:all
```

### 回滚
```
npx sequelize db:seed:undo:all
```
#### queryInterface 方法
```javascript
// 创建
queryInterface.createTable('表名', '字段名', { /* 属性 */ })
// 添加列
queryInterface.addColumn('表名', '字段名', { /* 属性 */ })
// 删除
queryInterface.removeColumn('表名', '字段名', { /* 查询参数 */ })
// 更新
queryInterface.changeColumn('表名', '字段名', { /* 属性 */ })
```

#### 创建 方法
```javascript
queryInterface.bulkCreate([...{}], { /* 属性(非必须) */ }) // 第一个参数以数组对象格式(必须)
```