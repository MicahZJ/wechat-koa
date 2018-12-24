/**
 * 整合所有子路由
 */

const router = require('koa-router')()
const admin = require('./admin')
const dataOperate = require('./work')

router.use('/api/login', admin.routes(), admin.allowedMethods())
router.use('/api/activity', dataOperate.routes(), dataOperate.allowedMethods())

module.exports = router