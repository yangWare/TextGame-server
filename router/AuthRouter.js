/**
 * Created by yanglei on 2018/2/24.
 */
function checkAuth (app) {
    app.use(async (ctx, next) => {
        const userAuthModel = ctx.dbHandler.userAuthModel
        let cookieId = ctx.cookies.get('id')
        let authObj = await  userAuthModel.findById(cookieId)
        if (authObj.length > 0) {
            next()
        } else {
            ctx.assert('', 401, '登录信息失效. 请重新登录!')
        }
    })
}

function authRouter (router) {
    router.post('/login', async (ctx, next) => {
        const userAuthModel = ctx.dbHandler.userAuthModel
        let paramer = ctx.request.body
        try {
            ctx.response.status = 302
            let authObj = await userAuthModel.find(paramer.account)
            if (authObj.length > 0) {
                let pwd = authObj[0].pwd
                if (pwd === paramer.password) {
                    ctx.cookies.set('id', authObj[0]._id)
                    ctx.redirect('https://www.baidu.com')
                } else {
                    ctx.redirect(ctx.request.header.referer)
                }
            } else {
                ctx.redirect(ctx.request.header.referer)
            }
        } catch (e) {
            ctx.redirect(ctx.request.header.referer)
        }
    })
    router.post('/register', async (ctx, next) => {
        const userAuthModel = ctx.dbHandler.userAuthModel
        let paramer = JSON.parse(ctx.request.body)
        try {
            ctx.response.set('Access-Control-Allow-Origin', ctx.request.headers.origin)
            let authObj = await userAuthModel.find(paramer.account)
            if (authObj.length > 0) {
                ctx.response.status = 200
                ctx.response.body = {
                    code: -1,
                    message: '用户名已存在'
                }
            } else {
                await userAuthModel.add({
                    account: paramer.account,
                    pwd: paramer.password
                })
                ctx.response.status = 200
                ctx.response.body = {
                    code: 0,
                    message: '注册成功'
                }
            }
        } catch (e) {
            ctx.response.body = {
                code: -1,
                message: e
            }
        }
    })
}

module.exports = {
    checkAuth,
    authRouter
}