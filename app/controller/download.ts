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

    // 判断下载 全量包/增量包
    const fileName = ctx.request.query.fileName;
    const platform = ctx.request.query.platform;
    const isIncrementalPacket = ctx.request.query.isIncrementalPacket;
    const rootPath = path.resolve(__dirname, '../public');
    const fileFolderName = isIncrementalPacket ? 'incremental-packet' : 'full-package';
    const bundleFolder = `${rootPath}/jsbundle/${platform}/${fileFolderName}`;

    console.log(`== bundleFolder ===>>>> ${bundleFolder}`);

    try {
      ctx.attachment(fileName);
      const status = await send(ctx, fileName, { root: bundleFolder });
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
