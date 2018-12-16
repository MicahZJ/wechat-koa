const Koa = require('koa')
const session = require('koa-session-minimal')
const MysqlSession = require('koa-mysql-session')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const cors = require('koa2-cors');

const { query } = require('./util/db')
const app = new Koa();
// 使用ctx.body解析中间件
app.use(bodyParser())
// 使用跨域
app.use(cors());

let login = new Router();
login.post('/',async (ctx, next) => {
  const formData = ctx.request.body
  console.log('登录信息', formData)
  const res = await singIn(formData)
  ctx.cookies.set(
    'user',
    'admin',
    {
      domain: 'localhost',  // 写cookie所在的域名
      path: '/login',       // 写cookie所在的路径
      maxAge: 10 * 60 * 1000, // cookie有效时长
      expires: new Date('2019-02-15'),  // cookie失效时间
      httpOnly: false,  // 是否只用于http请求中获取
      overwrite: false  // 是否允许重写
    })
  ctx.body = res
})

async function singIn(options) {
  let _sql = `SELECT * from user
              where email="${options.userEmail}" and password="${options.passWord}"
              limit 1`
  let dataList = await query( _sql )
  console.log('登录查询结果', dataList)
  if (dataList.length > 0) {
    return {code: 200,data: {}, message: '匹配成功'}
  } else {
    return {code: 500,data: {}, message: '账号或密码错误'}
  }
  
}

let register = new Router();
register.post('/', async (ctx, next) => {

})

async function actionRegister() {
  let formData = ctx.request.body
  let result = {
    code: false,
    data: null,
    message: ''
  }
}

// 装载所有子路由
let router = new Router()
router.use('/api/login', login.routes(), login.allowedMethods())
router.use('/api/register', register.routes(), register.allowedMethods())

// 加载路由中间件
app.use(router.routes()).use(router.allowedMethods());

app.listen(3000)
console.log('app started at port 3000...')