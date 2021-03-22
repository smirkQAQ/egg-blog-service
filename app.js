/*
 * @Author: LC
 * @Date: 2021-03-14
 * @Description: 入口文件
 */
const Koa = require('koa');
const app = new Koa();
const onerror = require('koa-onerror');
const logger = require('koa-logger');
require('./models/db');// 连接数据库
const bodyParser = require('koa-bodyparser');
const json = require('koa-json');
const cors = require('koa2-cors');


// 路由导入
const webRouter = require('./routes/webRouter');
const crmRouter = require('./routes/crmRouter');

// 跨域配置
app.use(cors({
  origin: function (ctx) {
     return "*"; // 允许来自所有域名请求
     // return ctx.header.origin;// 当*无法使用时，使用这句,同样允许所有跨域
     // return 'http://localhost:8080'; //单个跨域请求
     // 允许多个跨域
    //  var allowCors = ['http://localhost:8080',  'http://localhost:8081'];
    //  return allowCors.indexOf(ctx.header.origin) > -1 ? ctx.header.origin : '';
  },
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
  maxAge: 5,
  credentials: true,
  allowMethods: ['GET', 'POST', 'DELETE'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}))

// error handler
onerror(app)

// middlewares 中间件
app.use(bodyParser());
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

app.use(require('./middlewares/response'));
app.use(require('./middlewares/servererr'));
// 启动路由
app.use(webRouter.routes(), webRouter.allowedMethods())
app.use(crmRouter.routes(), crmRouter.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
