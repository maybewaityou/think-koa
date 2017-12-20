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

  async checkForUpdates(ctx: Koa.Context, next: () => Promise<any>) {
    ctx.body = {
      module_0_version: '1.0',
      module_1_version: '1.0',
    };
    await next();
  },

  async download(ctx: Koa.Context, next: () => Promise<any>) {
    checkParams(ctx.request.query);

    // 判断下载 全量包/增量包
    const fileName = ctx.request.query.fileName;
    const platform = ctx.request.query.platform;
    const moduleFolder = ctx.request.query.moduleFolder;
    const isIncrementalPacket = ctx.request.query.isIncrementalPacket;
    const rootPath = path.resolve(__dirname, '../public');
    const fileFolderName = isIncrementalPacket === 'true' ? 'incremental-packet' : 'full-package';
    const bundleFolder = `${rootPath}/jsbundle/${platform}/${moduleFolder}/${fileFolderName}`;

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
  const moduleFolder: string = params.moduleFolder;
  const isIncrementalPacket = params.isIncrementalPacket;
  const fileFolderName = isIncrementalPacket === 'true' ? 'incremental-packet' : 'full-package';
  const rootPath = path.resolve(__dirname, '../public');
  const filePath = `${rootPath}/jsbundle/${platform}/${moduleFolder}/${fileFolderName}`;

  if (!fileName) {
    throwError('0001', { location: __filename });
  } else if (!platform || (platform.toLowerCase() !== platformMap.ios && platform.toLowerCase() !== platformMap.android)) {
    throwError('0002', { location: __filename });
  }

  if (!fs.existsSync(filePath)) {
    throwError(`0003`, { location: __filename, detailsMessage: `${fileName} is not exist.` });
  }

}
