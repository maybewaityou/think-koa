/**
 * Created by MeePwn
 * https://github.com/maybewaityou
 *
 * description:
 *
 */
import koa from 'koa';
import bodyParser from 'koa-bodyparser';
// import cors from 'koa-cors';
import json from 'koa-json';
import logger from 'koa-logger';
// import errorHandler from 'koa-onerror';
import session from 'koa-session';
import staticRes from 'koa-static';
import views from 'koa-views';

// const router = require('./config/routes');

// 初始化实例
const app = new koa();
app.keys = ['think-koa'];

// error handler
// errorHandler(app);

// middlewares
app.use(logger());
app.use(session(app));
// app.use(cors());
app.use(bodyParser({
  enableTypes: ['json', 'form', 'text'],
}));
app.use(json());
// app.use(staticRes(__dirname + '/public'));
//
// // template
// app.use(views(__dirname + '/views', {
//   extension: 'pug',
// }));

// logger
// app.use(async (ctx, next) => {
//   const start = new Date();
//   await next();
//   const ms = new Date() - start;
//   console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
// });

// routes
// app.use(router.routes(), router.allowedMethods());

app.listen(9999);
