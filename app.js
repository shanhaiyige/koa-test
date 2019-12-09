const Koa = require('koa');
const app = new Koa();
const path = require('path');
const convert = require('koa-convert');
const json = require('koa-json');

const koaStatic = require('koa-static');
const bodyparser = require('koa-bodyparser')();
// const koaBody = require('koa-body');
const logger = require('koa-logger');
const loggers = require('./middleware/loggers');

const koaJwt = require('koa-jwt') //路由权限控制
const jwt = require('jsonwebtoken') // 用于加密解密

const cors = require('koa2-cors'); // 跨域
const helmet = require("koa-helmet") // 防御攻击

const router = require('./routes/allRoute'); // 路由
const db = require('./config/dbConfig');  // 数据库配置
const jwtConfig = require('./config/jwtConfig'); // jwt 加密方式

import  corsHandler from './config/corsConfig' 

app.use(convert.compose(
  // koaBody({ multipart: true }),
  bodyparser,
  json(),
  logger(),
  helmet(),
  cors(corsHandler),
))
// middlewares koaStatic 加载静态资源
// http://localhost:2019/taide.jpg
app.use(koaStatic(path.join(__dirname, 'public')));

// 本地log
app.use(convert(loggers()));

// Custom 401 handling if you don't want to expose koa-jwt errors to users
app.use(async (ctx, next) => {
  return next().catch((err) => {
    if (401 == err.status) {
      ctx.status = 401;
      ctx.body = {
        status: 401,
        msg: '登录过期，请重新登录'
      }
    } else {
      throw err;
    }
  });
});

//koaJwt验证
app.use(koaJwt({
  secret: jwtConfig.secret, key: 'jwtdata', getToken (ctx) {
    let token = ctx.header.authorization;
    let jwtData = jwt.verify(token.slice(7), jwtConfig.secret)
    ctx.state = {
      data: jwtData
    }
  }
}).unless({
  path: [
    /^\/api\/user\/login/,
    /^\/api\/user\/register/,
    /^((?!\/api).)*$/ // 设置除了私有接口外的其它资源，可以不需要认证访问
  ]
}))

// use route
router.prefix('/api')
app.use(router.routes(), router.allowedMethods());

// mongodb connect
db.connect();

// 被loggers捕获到的错误不会触发这个事件,但可以手动触发
app.on('error', function (err, ctx) {
  console.error('server error', err, ctx);
});

module.exports = app;
