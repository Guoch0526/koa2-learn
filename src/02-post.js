const Koa = require('koa')
const app = new Koa()

function parseQueryStr(queryStr) {
  let queryData = {}
  let queryStrList = queryStr.split('&')
  for(let [index, ele] of queryStrList.entries()) {
    let queryArr = ele.split('=')
    queryData[queryArr[0]] = decodeURIComponent(queryArr[1])
  }

  return queryData
}

function parsePostData(ctx) {
  return new Promise((resolve, reject) => {
    try {
      let postdata = ''
      ctx.req.addListener('data', data => {
        postdata += data
      })
      ctx.req.addListener('end', () => {
        console.log(postdata)
        let parseData = parseQueryStr(postdata)
        resolve(parseData)
      })
    } catch(err) {
      reject(err)
    }
  })
}

app.use(async ctx => {
  if (ctx.url === '/' && ctx.method === 'GET') {
    // 当GET请求时候返回表单页面
    let html = `
      <h1>koa2 request post demo</h1>
      <form method="POST" action="/">
        <p>userName</p>
        <input name="userName" /><br/>
        <p>nickName</p>
        <input name="nickName" /><br/>
        <p>email</p>
        <input name="email" /><br/>
        <button type="submit">submit</button>
      </form>
    `
    ctx.body = html
  } else if (ctx.url === '/' && ctx.method === 'POST') {
    let postData = await parsePostData(ctx)
    ctx.body = postData
  } else {
    ctx.body= '404'
  }
})

app.listen(3000)