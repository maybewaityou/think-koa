/**
 * Created by MeePwn
 * https://github.com/maybewaityou
 *
 * description:
 *
 */
import * as Koa from 'koa';

export default {

  async index(ctx: Koa.Context, next: () => Promise<any>) {
    await ctx.render('index', {
      title: 'Hello Koa 2 !',
    });
    await next();
  },

  async checkForUpdates(ctx: Koa.Context, next: () => Promise<any>) {
    ctx.body = {
      module_0_version: '1.0',
      module_1_version: '1.0',
    };
    await next();
  },

};
