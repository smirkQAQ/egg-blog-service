## 主要技术栈 
```
nodejs, egg, typescript, sequelize(ORM框架) redis
```
### Config
运行前需要创建并填写正确的配置 其他环境请遵循config.{env}.ts格式命名
```
eggts/config/config.default.ts // 默认配置
eggts/config/config.local.ts // 本地配置
eggts/config/config.prod.ts // 生产配置
```
## sequelize-cli

- 初始化 Migrations 配置文件和目录

```
npx sequelize init:config
npx sequelize init:migrations
npx sequelize init:seeders
```
### 快速开始
```
$ npm i
```

* 开发环境启动     
```
npm run dev
```

* 生产环境启动    
  
```
$ npm run tsc
$ npm start
```
### Npm Scripts

- Use `npm run lint` to check code style
- Use `npm test` to run unit test
- se `npm run clean` to clean compiled js at development mode once

### Requirement

- Node.js 8.x
- Typescript 2.8+

