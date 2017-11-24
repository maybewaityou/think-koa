/**
 * Created by MeePwn
 * https://github.com/maybewaityou
 *
 * description:
 *
 */
import * as Koa from 'koa';
import * as send from 'koa-send';

export default {

  async download(ctx: Koa.Context, next: () => Promise<any>) {
    const status = await send(ctx, '../../../public/test.json');
    console.log(status);
    await next();
  },

};
