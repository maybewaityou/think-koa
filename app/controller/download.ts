/**
 * Created by MeePwn
 * https://github.com/maybewaityou
 *
 * description:
 *
 */
import * as Koa from 'koa';
import * as send from 'koa-send';
import * as path from 'path';

export default {

  async download(ctx: Koa.Context, next: () => Promise<any>) {
    checkParams(ctx);

    const fileName = ctx.request.body.fileName;
    ctx.attachment(fileName);
    try {
      const status = await send(ctx, fileName, { root: path.resolve(__dirname, '../public') });
      await next();
    } catch (e) {
      ctx.body = e;
    }
  },

};

function checkParams(ctx: Koa.Context) {
  const fileName = ctx.request.body.fileName;
  if (!fileName) {
    ctx.throw(400, 'fileName is empty');
  }
}
