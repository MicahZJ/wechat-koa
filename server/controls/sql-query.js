/**
 * sql 查询回调
 */

const { query } = require('../util/db')

let signIn = async (options) => {
  let _sql = `SELECT * FROM user
              WHERE email="${options.userEmail}" AND password="${options.passWord}"
              limit 1`
  let dataList = await query (_sql)
  console.log ('登录查询结果', dataList)
  
  if (dataList.length > 0) {
    return {code: 200, data: {}, message: '匹配成功'}
  } else {
    return {code: 500, data: {}, message: '账号或密码错误'}
  }
}

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

const sqlQueryConfig = {
  signIn: signIn,
  queryArticleInfo: queryArticleInfo,
  addArticleInfo: addArticleInfo,
  editInfo: editInfo,
  hiddenArticleInfo: hiddenArticleInfo,
  hiddenArticleInfoLimit: hiddenArticleInfoLimit,
}
module.exports = sqlQueryConfig