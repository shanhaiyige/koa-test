const router = require('koa-router')();
import {login, register} from '../app/controller/user'


router.post('/login', async (ctx) =>{
  console.log(ctx.request.body);
  let reqBody = ctx.request.body;
  ctx.body = await login(reqBody);
});

router.post('/register', async (ctx) =>{
  console.log(ctx.request.body);
  let reqBody = ctx.request.body;
  ctx.body = await register(reqBody);
});

module.exports = router;
