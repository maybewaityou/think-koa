/**
 * Created by MeePwn
 * https://github.com/maybewaityou
 *
 * description:
 *
 */
import * as fs from 'fs';
import * as Koa from 'koa';
import * as send from 'koa-send';
import * as path from 'path';
import { platformMap } from '../data-map/index';
import { throwError, throwException } from '../utility/error-utility';

export default {

  async download(ctx: Koa.Context, next: () => Promise<any>) {
    checkParams(ctx.request.query);

    const fileName = ctx.request.query.fileName;
    try {
      ctx.attachment(fileName);
      const status = await send(ctx, fileName, { root: path.resolve(__dirname, '../public') });
      await next();
    } catch (e) {
      throwError('0004', { location: __filename, origin: e });
    }
  },

};

/**
 * 校验参数
 */
function checkParams(params: any) {
  const fileName: string = params.fileName;
  const platform: string = params.platform;
  const rootPath = path.resolve(__dirname, '../public');
  const filePath = `${rootPath}/${fileName}`;

  if (!fileName) {
    throwError('0001', { location: __filename });
  } else if (!platform || (platform.toLowerCase() !== platformMap.ios && platform.toLowerCase() !== platformMap.android)) {
    throwError('0002', { location: __filename });
  }

  if (!fs.existsSync(filePath)) {
    throwError(`0003`, { location: __filename, detailsMessage: `${fileName} is not exist.` });
  }

}
