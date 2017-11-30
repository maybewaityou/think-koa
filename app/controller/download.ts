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
    const platform: string = ctx.request.query.platform;
    const rootPath = path.resolve(__dirname, '../public');
    const fileFolder = `${rootPath}/jsbundle/${platform}/`;

    // TODO 添加逻辑, 判断下载 全量包/增量包

    try {
      ctx.attachment(fileName);
      const status = await send(ctx, fileName, { root: fileFolder });
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
  const filePath = `${rootPath}/jsbundle/${platform}/${fileName}`;

  if (!fileName) {
    throwError('0001', { location: __filename });
  } else if (!platform || (platform.toLowerCase() !== platformMap.ios && platform.toLowerCase() !== platformMap.android)) {
    throwError('0002', { location: __filename });
  }

  if (!fs.existsSync(filePath)) {
    throwError(`0003`, { location: __filename, detailsMessage: `${fileName} is not exist.` });
  }

}
