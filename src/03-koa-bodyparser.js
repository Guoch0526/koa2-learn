const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const app = new Koa()
app.use(bodyParser())   // use bodyParser 中间件

app.use(async ctx => {
  if (ctx.url === '/' && ctx.method === 'GET') {
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
    // 注意：ctx.request是context经过封装的请求对象，ctx.req是context提供的node.js原生HTTP请求对象，
    // 同理ctx.response是context经过封装的响应对象，ctx.res是context提供的node.js原生HTTP请求对象。
    let postData = ctx.request.body
    ctx.body = postData
  } else {
    ctx.body= '404'
  }
})

app.listen(3000)