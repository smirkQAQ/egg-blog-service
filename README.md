## 主要技术栈 
```
nodejs, koa2, mongoose, es6, async/await
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

#### 项目结构

* 入口文件：  app.js   

* 项目配置文件:    config/*

* 工具库 :  utils/*     
  
* 接口router配置 :  routes/*     
      
* schema/数据库 :  models/*      
  
* 接口逻辑层 :  controllers/*     
  
* 公共中间件 :  middlewares/*  

##   统一处理响应请求 (成功/失败) 

  middlewares/response.js

  ```
# 返回错误
  调用 ctx.error({
        msg: '错误提示',
        status: '默认为400',
        data: '返回的数据',
        error: '具体错误信息'
       })      
     
# 返回成功    
  调用 ctx.success({
        msg: '成功提示',
        data: '数据',
      })

  ```