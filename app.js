/*
 * @Author: LC
 * @Date: 2021-03-14
 * @Description: 入口文件
 */
// const sslify = require('koa-sslify').default
// app.use(sslify());
const Koa = require('koa');
const app = new Koa();
const onerror = require('koa-onerror');
const logger = require('koa-logger');
const json = require('koa-json');
const cors = require('koa2-cors');
const koaBody = require('koa-body')
const ratelimit = require('koa-ratelimit');
// const jwtKoa = require("jsonwebtoken");
const Auth = require('./middlewares/tokenAuth')
// 路由导入
const loadRouter = require('./routes/index');
const catchError = require("./middlewares/catchError");
// const cfile = require('./config/config');
// const config = cfile[process.env.NODE_ENV];// 环境

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
  allowMethods: ['GET', 'POST', 'DELETE', 'PUT', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}))
app.use(catchError)
// error handler
onerror(app)

// middlewares 中间件
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

// 文件
app.use(koaBody({
  multipart:true,
  // encoding:'gzip',
  formidable:{
    maxFileSize: 10 * 1024 * 1024, // 修改文件大小限制，默认位2M
    keepExtensions: true, // 带拓展名上传，否则上传的会是二进制文件而不是图片文件
    onFileBegin(name, file) {
      file.path = __dirname + '/public/upload/' + file.name; // 重命名上传文件
    },
    uploadDir: __dirname + '/public/upload/',
  }
}))
// 接口调用频率限制（Rate-Limiting）
// Rate limiter middleware for koa.
// https://github.com/koajs/ratelimit
const db = new Map();
app.use(ratelimit({
  driver: 'memory',
  db: db,
  duration: 60000,
  errorMessage: 'Sometimes You Just Have to Slow Down.',
  id: (ctx) => ctx.ip,
  headers: {
    remaining: 'Rate-Limit-Remaining',
    reset: 'Rate-Limit-Reset',
    total: 'Rate-Limit-Total'
  },
  max: 100,
  disableHeader: false,
  whitelist: (ctx) => {
    // some logic that returns a boolean
  },
  blacklist: (ctx) => {
    // some logic that returns a boolean
  }
}));
// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})
// 挂载响应模板
const errors = require('./utils/http-error')
global.errs = errors

app.use(new Auth().m.unless({ // 全局挂载jwt 配置白名单
  path: [
    /\/signIn/,
    /\/login/
  ]
}))
// 启动路由
loadRouter(app)
// error-handling 已被全局响应中间件接管
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
