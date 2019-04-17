const Router = require('koa-router');
const router = module.exports = new Router();

router.get('/', (ctx, next) => ctx.body = 'welcome to /');
