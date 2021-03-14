/*
 * @Author: LC
 * @Date: 2021-03-14
 * @Description: 
 */

const Koa = require('koa')
const app = new Koa()
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')

// 路由导入
const webRouter = require('./routes/webRouter');
const crmRouter = require('./routes/crmRouter');


// error handler
onerror(app)

// middlewares 中间件
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// 启动路由
app.use(webRouter.routes(), webRouter.allowedMethods())
app.use(crmRouter.routes(), crmRouter.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
