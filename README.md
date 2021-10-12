## 主要技术栈 
```
nodejs, koa2, sequelize(ORM框架)
```
### 启动
```
npm install
```

* 开发环境启动     
  
```
npm run dev
```

* 生产环境启动    
  
```
npm run start
```

## sequelize-cli

- 初始化 Migrations 配置文件和目录

```
npx sequelize init:config
npx sequelize init:migrations
npx sequelize init:seeders
```

`config/config.json` 识别env环境 连接不同数据库

