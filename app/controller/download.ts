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
    /* 校验参数 */
    checkParams(ctx.request.query);

    const params = ctx.request.query;
    const fileName = params.fileName;
    const rootPath = path.resolve(__dirname, '../public');
    const filePath = `${rootPath}/${fileName}`;

    if (!fs.existsSync(filePath)) {
      throwException('file not found', 'no such file on the server', { location: __filename });
    }

    ctx.attachment(fileName);
    try {
      const status = await send(ctx, fileName, { root: rootPath });
      await next();
    } catch (e) {
      throwException('download error', 'unknown exception', { location: __filename, origin: e });
    }
  },

};

function checkParams(params: any) {
  const fileName: string = params.fileName;
  const platform: string = params.platform;
  if (!fileName) {
    throwException('params error', '\'fileName\' in params is invalid', { location: __filename });
  } else if (!platform || (platform.toLowerCase() !== 'ios' && platform.toLowerCase() !== 'android')) {
    throwException('params error', '\'platform\' in params is invalid', { location: __filename });
  }
}
