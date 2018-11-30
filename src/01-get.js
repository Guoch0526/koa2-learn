const Koa = require('koa')
const app = new Koa()

// get 方式参数获取
app.use(async ctx => {
  const url = ctx.url
  // 从 request 中获取
  const request = ctx.request
  const req_query = request.query 
  const req_query_string = request.querystring

  // 直接从 ctx 中获取
  const ctx_query = ctx.query
  const ctx_query_string = ctx.querystring

  ctx.body = {
    url,
    req_query,
    req_query_string,
    ctx_query,
    ctx_query_string
  }
})

app.listen(3000)