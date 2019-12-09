const router = require('koa-router')();
const fs = require('fs')
// const user = require('./user');
// const test = require('./test');

// router.use('/user', user.routes(), user.allowedMethods());
// router.use('/test', test.routes(), test.allowedMethods());

const files = fs.readdirSync(__dirname).filter(file => file !== 'allRoute.js')
// console.log(files);

for (const file of files) {
  if (file.endsWith('js')) {
    const routeFile = require(`./${file}`)
    router.use(`/${file.replace(/\.js/, '')}`, routeFile.routes(), routeFile.allowedMethods());
  }
}

module.exports = router;
