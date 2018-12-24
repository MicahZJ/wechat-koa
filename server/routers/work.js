/**
 * 操作 子路由
 */

const router = require('koa-router')()
const adminApiConfig = require('../controls/operate')

const routers = router
  .post('/article', adminApiConfig.selectArticleInfo)
  .post('/addNew', adminApiConfig.addInfo)
  .post('/edit', adminApiConfig.editArticleInfo)
  .post('/delete', adminApiConfig.hiddenInfo)

module.exports = routers