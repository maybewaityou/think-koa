/**
 * Created by MeePwn
 * https://github.com/maybewaityou
 *
 * description:
 *
 */
import * as fs from 'fs';
import * as Koa from 'koa';
import * as os from 'os';
import * as path from 'path';

export default () => async (ctx: Koa.Context, next: () => Promise<any>) => {
  // ignore non-POSTs || files is undefined
  if ('POST' !== ctx.method || !ctx.request.body.files) { return await next(); }

  const file = ctx.request.body.files.file;
  const reader = fs.createReadStream(file.path);
  const stream = fs.createWriteStream(path.join(os.tmpdir(), Math.random().toString()));
  reader.pipe(stream);
  console.log('uploading %s -> %s', file.name, stream.path);

  ctx.redirect('/');
};
