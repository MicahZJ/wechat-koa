const Koa = require('koa')
const session = require('koa-session-minimal')
const MysqlSession = require('koa-mysql-session')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const cors = require('koa2-cors');
const routers = require('./routers/index')
const app = new Koa();

// 使用ctx.body解析中间件
app.use(bodyParser())

// 使用跨域
app.use(cors());

// 初始化路由中间件
app.use(routers.routes()).use(routers.allowedMethods());

// 设置监听端口
app.listen(3000)
console.log('app started at port 3000...')