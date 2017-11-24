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
    const fileName = 'test.json';
    ctx.attachment(fileName);
    const filePath = await send(ctx, fileName, { root: path.resolve('public') });
    await next();
  },

};
