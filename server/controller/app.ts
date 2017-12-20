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
      title: 'Hello Koa 2!',
    });
    await next();
  },

};
