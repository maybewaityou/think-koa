/**
 * Created by MeePwn
 * https://github.com/maybewaityou
 *
 * description:
 *
 */

export default {

  async index(ctx: any, next: any) {
    ctx.body = 'Hello Koa ~';
    await next();
  },

};
