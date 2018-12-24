/**
 * 登录 子路由
 */

const router = require('koa-router')()
const adminApiConfig = require('../controls/login')

const routers = router
  .post('/', adminApiConfig.adminSignIn)

module.exports = routers