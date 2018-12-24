/**
 * 增删改查
 */

const sqlQueryConfig = require('./sql-query')

// 查询列表
let selectArticleInfo = async (ctx, next) => {
  const formData = ctx.request.body
  console.log('article参数', formData)
  
  const res = await sqlQueryConfig.queryArticleInfo(formData)
  ctx.body = res
}

// 添加数据
let addInfo = async (ctx, next) => {
  const formData = ctx.request.body
  console.log('addInfo', formData)
  
  const res = await sqlQueryConfig.addArticleInfo(formData)
  ctx.body = res
}

// 修改数据
let editArticleInfo = async (ctx, next) => {
  const formData = ctx.request.body
  console.log('article参数', formData)
  
  const res = await sqlQueryConfig.editInfo(formData)
  ctx.body = res
}

// 删除-> 隐藏选中数据
let hiddenInfo = async (ctx, next) => {
  const formData = ctx.request.body
  console.log('hidden参数', formData)
  
  if (formData.deleteStatus === 0) { // 单选
    ctx.body = await sqlQueryConfig.hiddenArticleInfo(formData)
  } else if (formData.deleteStatus === 1) { // 多选
    ctx.body = await sqlQueryConfig.hiddenArticleInfoLimit(formData)
  }
}

const operateConfig = {
  selectArticleInfo: selectArticleInfo,
  addInfo: addInfo,
  editArticleInfo: editArticleInfo,
  hiddenInfo: hiddenInfo,
}

module.exports = operateConfig