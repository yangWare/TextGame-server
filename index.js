/**
 * Created by yanglei on 2018/2/23.
 */
const Koa = require('koa')
const Router = require('koa-router')
const KoaBody = require('koa-body')
const DbHnadler = require('./db/DbHandler')
const AuthRouter = require('./router/AuthRouter')

const app = new Koa()
DbHnadler().then(dbHandler => {
    app.context.dbHandler = dbHandler
    console.log('连接数据库成功~')
})
app.use(KoaBody())

// app.use((context, next) => {
//     if (context.request.method === 'OPTIONS') {
//         context.response.status = 200
//         context.response.set('Access-Control-Allow-Origin', context.request.headers.origin)
//         context.response.set('Access-Control-Allow-Headers', 'content-type')
//     } else {
//         next()
//     }
// })

const router = new Router()

router.use(async (context, next) => {
    if (context.request.method === 'OPTIONS') {
        context.response.status = 200
        context.response.set('Access-Control-Allow-Origin', context.request.headers.origin)
        context.response.set('Access-Control-Allow-Headers', 'content-type')
    } else {
        await next()
    }
})

AuthRouter.authRouter(router)
app.use(router.routes()).use(router.allowedMethods());

app.listen(3000)