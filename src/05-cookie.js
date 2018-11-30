const Koa = require('koa')
const app = new Koa()

app.use(async ctx => {
  if (ctx.url === '/index') {
    // 设置 cookie
    ctx.cookies.set('uid', 8848, {
      expires: new Date('2018-12-01')
    })

    ctx.body = 'cookie is ok.'
  } else if (ctx.url === '/cookie') {
    // 获取 cookie
    const cookie = ctx.cookies.get('uid')
    ctx.body = 'uid:' + cookie
  } else {
    ctx.body = 'hello'
  }
})

app.listen(3000)