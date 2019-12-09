const router = require('koa-router')();
import {resdata} from '../utils/serve'

router.get('/', function (ctx) {
  console.log('token**********',ctx.state.jwtdata);
  ctx.body =  resdata('0000', 'success', ctx.state.jwtdata);
});
router.put('/put', async (ctx) => {
  console.log(ctx.request.body);
  let reqBody = ctx.request.body;
  console.log(reqBody);
  
  ctx.body = 'this a users test put!';
});
router.del('/del', async (ctx) => {
  console.log(ctx.query);
  let params = ctx.query;
  console.log(params);
  ctx.body = 'this a users test del!';
});

module.exports = router;
