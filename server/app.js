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

// 登录
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

let singIn = async (options) => {
  let _sql = `SELECT * FROM user
              WHERE email="${options.userEmail}" AND password="${options.passWord}"
              limit 1`
  let dataList = await query( _sql )
  console.log('登录查询结果', dataList)
  if (dataList.length > 0) {
    return {code: 200,data: {}, message: '匹配成功'}
  } else {
    return {code: 500,data: {}, message: '账号或密码错误'}
  }
  
}

// 查询列表
let selectArticleInfo = new Router();
selectArticleInfo.post('/',async (ctx, next) => {
  const formData = ctx.request.body
  console.log('article参数', formData)
  const res = await queryArticleInfo(formData)
  ctx.body = res
})

let queryArticleInfo = async (options) => {
  formatPages(options)
  let _sql = `SELECT * FROM data
              WHERE article_status = 1
              ORDER BY modified_time DESC
              limit ${options.limitStart}, ${options.limit}`
  let _sqlForLength = `SELECT * FROM data
              WHERE article_status = 1
              ORDER BY modified_time DESC`
  
  let dataList = await query(_sql)
  let dataLength = await query(_sqlForLength)
  console.log('article查询结果', dataList, dataLength)
  if (dataList.length > 0) {
    return {code: 200,data: { articleList: dataList, totalLength: dataLength.length}, message: '匹配成功'}
  } else {
    return {code: 500,data: {}, message: '账号或密码错误'}
  }
}

let formatPages = (options) => {
  options.limitStart = (options.page - 1) * options.limit
  console.log('format', options)
}

// 添加数据
let addInfo = new Router();
addInfo.post('/', async (ctx, next) => {
  const formData = ctx.request.body
  console.log('addInfo', formData)
  const res = await addArticleInfo(formData)
  ctx.body = res
});

let addArticleInfo = async (options) => {
  let _sql = `INSERT INTO data(create_time, author, article_title, article, hidden, modified_time, article_level,article_status)
              VALUES(CURRENT_TIMESTAMP, '${options.author}', '${options.title}', '${options.article}', 0, CURRENT_TIMESTAMP, 0, 1)`
  
  const res = await query(_sql)
  console.log('插入数据', res)
  if (res.protocol41) {
    return {code: 200,data: { }, message: '添加成功'}
  } else {
    return {code: 500,data: { }, message: '添加失败'}
  
  }
}

// 修改数据
let editArticleInfo = new Router();
editArticleInfo.post('/',async (ctx, next) => {
  const formData = ctx.request.body
  console.log('article参数', formData)
  const res = await editInfo(formData)
  ctx.body = res
})

let editInfo = async (options) => {
  let _sql = `UPDATE data SET article_title='${options.title}',
                              author='${options.author}',
                              hidden='${options.tag}',
                              article='${options.textarea}'
              WHERE id=${options.id}
              LIMIT 1`
  let dataList = await query( _sql )
  console.log('edit修改结果', dataList)
  if (dataList.changedRows === 1 || dataList.protocol41) {
    return {code: 200,data: {}, message: '修改成功'}
  } else {
    return {code: 500,data: {}, message: '修改失败'}
  }
}


// 隐藏选中数据
let hiddenInfo = new Router();
hiddenInfo.post('/', async (ctx, next) => {
  const formData = ctx.request.body
  console.log('hidden参数', formData)
  if (formData.deleteStatus === 0) {
    ctx.body = await hiddenArticleInfo(formData)
  } else if (formData.deleteStatus === 1) {
    ctx.body = await hiddenArticleInfoLimit(formData)
  }
  
  // ctx.body = res
})

let hiddenArticleInfo = async (options) => {
  let _sql = `UPDATE data SET article_status=${options.status}
              WHERE id=${options.id}
              LIMIT 1`
  
  const dataList = await query(_sql)
  console.log('returnHidden', dataList)
  if (dataList.changedRows === 1 || dataList.protocol41) {
    return {code: 200,data: {}, message: '修改成功'}
  } else {
    return {code: 500,data: {}, message: '修改失败'}
  }
}

let hiddenArticleInfoLimit = async (options) => {
  let inList = options.id.join(',')
  console.log(inList, 'idString')
  let _sql = `UPDATE data SET article_status=${options.status}
              WHERE id IN (${inList})`
  
  const dataList = await query(_sql)
  console.log('returnHidden', dataList)
  if (dataList.changedRows >= 1 || dataList.protocol41) {
    return {code: 200,data: {}, message: '修改成功'}
  } else {
    return {code: 500,data: {}, message: '修改失败'}
  }
}


// // 改变数据状态-hidden
// let hiddenInfo = new Router();


// 装载所有子路由
let router = new Router()
router.use('/api/login', login.routes(), login.allowedMethods())
router.use('/api/activity/article', selectArticleInfo.routes(), selectArticleInfo.allowedMethods())
router.use('/api/activity/addNew', addInfo.routes(), addInfo.allowedMethods())
router.use('/api/activity/edit', editArticleInfo.routes(), editArticleInfo.allowedMethods())
router.use('/api/activity/delete', hiddenInfo.routes(), hiddenInfo.allowedMethods())

// 加载路由中间件
app.use(router.routes()).use(router.allowedMethods());

app.listen(3000)
console.log('app started at port 3000...')