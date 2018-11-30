const fs = require('fs')
const getSqlMap = require('./get-sql-map')

let sqlContentMap = {}

// 同步读取指定路径文件内容
function getSqlContent(path, fileName) {
  let content = fs.readFileSync(path, 'binary')
  sqlContentMap[fileName] = content
}

function getSqlContentMap() {
  let sqlMap = getSqlMap()
  for(let key in sqlMap) {
    getSqlContent(sqlMap[key], key)
  }

  return sqlContentMap
}

module.exports = getSqlContentMap