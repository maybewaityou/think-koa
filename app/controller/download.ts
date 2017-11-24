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
import { throwException } from '../utility/error-utility';

export default {

  async download(ctx: Koa.Context, next: () => Promise<any>) {
    checkParams(ctx.request.query);

    const fileName = ctx.request.query.fileName;
    try {
      ctx.attachment(fileName);
      const status = await send(ctx, fileName, { root: path.resolve(__dirname, '../public') });
      await next();
    } catch (e) {
      throwException('download error', 'unknown exception', { location: __filename, origin: e });
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
    throwException('params exception', '\'fileName\' in params is invalid', { location: __filename });
  } else if (!platform || (platform.toLowerCase() !== 'ios' && platform.toLowerCase() !== 'android')) {
    throwException('params exception', '\'platform\' in params is invalid', { location: __filename });
  }

  if (!fs.existsSync(filePath)) {
    throwException('params exception', `no such file on the server, ${fileName} is not exist`, { location: __filename });
  }

}
