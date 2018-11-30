const mysql = require('mysql')

const pool = mysql.createPool({
  host     :  '127.0.0.1',
  user     :  'root',
  password :  '12345678',
  database :  'koa_db'
})

/**
 * 同步查询数据库
 * @param {*} sql 查询语句
 * @param {*} values 查询条件
 */
function query(sql, values) {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        reject(err)
      } else {
        connection.query(sql, values, (err, results, fields) => {
          if (err) {
            reject(err)
          } else {
            resolve(results)
          }

          connection.release()
        })
      }
    })
  })
}

module.exports = query