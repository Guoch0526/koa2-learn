const mysql = require('mysql')
const pool = mysql.createPool({
  connectionLimit: 10,    // 连接数量, 默认 10
  host     :  '127.0.0.1',
  user     :  'root',
  password :  '12345678',
  database :  'mysql',
})

const query = (sql, values) => {
  return new Promise((resolve, reject) => {
    pool.getConnection(function(err, connection) {
      if (err) {
        reject(err)
      } else {
        // 这里也可以用 pool.query
        // 区别：pool.getConnection 获取到的 connection 在其回调函数中是一致的，可以保证系列查询在同一个 connection 上依次串行执行；
        // pool.query 每次调用则可能在不同的connection上执行查询
        connection.query(sql, values, function(error, results, fields) {
          if (error) {
            reject(error)
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

// eg:
async function selectAllData( ) {
  let sql = 'SELECT * FROM user'
  let dataList = await query(sql)
  return dataList
}

async function getData() {
  let dataList = await selectAllData()
  console.log(dataList)
}

getData()

