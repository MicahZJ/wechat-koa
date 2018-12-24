/**
 * 登录相关
 */

const sqlQueryConfig = require('./sql-query')

// 登录
let adminSignIn = async (ctx, next) => {
  const formData = ctx.request.body
  console.log('登录信息', formData)
  
  const res = await sqlQueryConfig.signIn(formData)
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
}

const adminApiConfig = {
  adminSignIn: adminSignIn
}

module.exports = adminApiConfig