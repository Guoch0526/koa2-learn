const Koa = require('koa')
const views = require('koa-views')    // koa模板使用中间件
const path = require('path')

const app = new Koa()
// 加载模板引擎
app.use(views(path.join(__dirname, '../template'), {
  extension: 'ejs',
}))

app.use(async ctx => {
  const title = 'Koa2-tpl'
  await ctx.render('index', {
    title,
  })
})

app.listen(3000)