const mysql = require('mysql')
const db = mysql.createPool({
  host: 'localhost',   // 数据库地址
  user: 'root',    // 数据库用户
  password: '123456',   // 数据库密码
  database: 'KOA2-qa',  // 选中数据库
  port: 3306,
  multipleStatements: true//允许多条sql同时执行
})

let query = ( sql, values ) => {
  return new Promise(( resolve, reject ) => {
    db.getConnection(function(err, connection) {
      if (err) {
        reject( err )
      } else {
        connection.query(sql, values, ( err, rows) => {
          
          if ( err ) {
            reject( err )
          } else {
            resolve( rows )
          }
          connection.release()
        })
      }
    })
  })
}

module.exports = { query }
