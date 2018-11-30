const mysql = require('mysql')
const pool = mysql.createPool({
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

