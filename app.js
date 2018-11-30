const fs = require('fs')
const Koa = require('koa')
const app = new Koa()

function render(page) {
  return new Promise((resolve, reject) => {
    fs.readFile(`./view/${page}`, 'binary', (err, data) => {
      if(err) {
        reject(err)
      }
      resolve(data)
    })
  })
}

async function route(url) {
  let view = '404.html'
  switch(url) {
    case '/':
    case '/index':
      view = 'index.html'
      break
    default:
      break
  }

  const html = await render(view)
  return html
}

// app.use(async (ctx, next) => {
//   await next()
//   const rt = ctx.response.get('x-Response-Time')
//   console.log(`${ctx.method} ${ctx.url} - ${rt}`)
// })

// app.use(async (ctx, next) => {
//   const start = Date.now()
//   await next()
//   const ms = Date.now() - start
//   ctx.set('X-Response-Time', `${ms}ms`)
// })

app.use(async ctx => {
  const url = ctx.request.url
  const html = await route(url)
  ctx.body = html
})

app.listen(3000)