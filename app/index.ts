/**
 * Created by MeePwn
 * https://github.com/maybewaityou
 *
 * description:
 *
 */
import * as Koa from 'koa';
import * as bodyParser from 'koa-bodyparser';
import * as json from 'koa-json';
import * as logger from 'koa-logger';
import * as session from 'koa-session';
import * as staticRes from 'koa-static';
import * as views from 'koa-views';
import * as path from 'path';

import cors from './middleware/cors';
import errorHandler from './middleware/onerror';
import router from './routes';

const app = new Koa();
app.keys = ['think-koa'];

// error handler
errorHandler(app);

// middlewares
app.use(logger());
app.use(session(app));
app.use(cors());
app.use(bodyParser({
  enableTypes: ['json', 'form', 'text'],
}));
app.use(json());
// resource
app.use(staticRes(path.resolve(__dirname, './public')));
// template
app.use(views(path.resolve(__dirname, './views'), {
  extension: 'pug',
}));
// logger
app.use(async (ctx: Koa.Context, next: () => Promise<any>) => {
  const start = new Date();
  await next();
  const ms = new Date().getMilliseconds() - start.getMilliseconds();
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});
// routes
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(9999);
