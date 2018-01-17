/**
 * Created by MeePwn
 * https://github.com/maybewaityou
 *
 * description:
 *
 */
import * as iconv from 'iconv-lite';
import * as Koa from 'koa';
import * as request from 'request-promise-native';
import { resolve as join } from 'url';

type Middleware = (context: Koa.Context, next: () => Promise<any>) => any;

export default function(options: any = {}) {

  if (!(options.host || options.map || options.url)) {
    throw new Error('miss options');
  }

  return async function proxy(context: Koa.Context, next: Middleware) {
    const url = resolve(context.path, options);

    if (typeof options.suppressRequestHeaders === 'object') {
      options.suppressRequestHeaders.forEach((h: any, i: any) => {
        options.suppressRequestHeaders[i] = h.toLowerCase();
      });
    }

    const suppressResponseHeaders: any[] = [];  // We should not be overwriting the options object!
    if (typeof options.suppressResponseHeaders === 'object') {
      options.suppressResponseHeaders.forEach((h: any, i: any) => {
        suppressResponseHeaders.push(h.toLowerCase());
      });
    }

    // don't match
    if (!url) {
      return next;
    }

    // if match option supplied, restrict proxy to that match
    if (options.match) {
      if (!context.path.match(options.match)) {
        return next;
      }
    }

    const parsedBody = getParsedBody(context);

    let opt: any = {
      url: url + (context.querystring ? '?' + context.querystring : ''),
      headers: context.header,
      encoding: null,
      followRedirect: options.followRedirect === false ? false : true,
      method: context.method,
      body: parsedBody,
      json: true,
      resolveWithFullResponse: true,
    };

    // set 'Host' header to options.host (without protocol prefix), strip trailing slash
    if (options.host) { opt.headers.host = options.host.slice(options.host.indexOf('://') + 3).replace(/\/$/, ''); }

    if (options.requestOptions) {
      if (typeof options.requestOptions === 'function') {
        opt = options.requestOptions(context.request, opt);
      } else {
        Object.keys(options.requestOptions).forEach((option) => { opt[option] = options.requestOptions[option]; });
      }
    }

    for (const name in opt.headers) {
      if (options.suppressRequestHeaders && options.suppressRequestHeaders.indexOf(name.toLowerCase()) >= 0) {
        delete opt.headers[name];
      }
    }

    const requestThunk = request(opt);
    let res: any;

    res = await requestThunk;

    if (parsedBody) {
      res = await requestThunk;
    } else {
      // Is there a better way?
      // https://github.com/leukhin/co-request/issues/11
      res = await pipeRequest(context.req, requestThunk);
    }

    context.status = res.statusCode;
    for (const name in res.headers) {
      // http://stackoverflow.com/questions/35525715/http-get-parse-error-code-hpe-unexpected-content-length
      if (suppressResponseHeaders.indexOf(name.toLowerCase()) >= 0) {
        continue;
      }
      if (name === 'transfer-encoding') {
        continue;
      }
      context.set(name, res.headers[name]);
    }

    if (options.encoding === 'gbk') {
      context.body = iconv.decode(res.body, 'gbk');
      return;
    }

    context.body = res.body;

    if (options.yieldNext) {
      return next;
    }
  };
}

function resolve(path: any, options: any) {
  let url = options.url;
  if (url) {
    if (!/^http/.test(url)) {
      url = options.host ? join(options.host, url) : null;
    }
    return ignoreQuery(url);
  }

  if (typeof options.map === 'object') {
    if (options.map && options.map[path]) {
      path = ignoreQuery(options.map[path]);
    }
  } else if (typeof options.map === 'function') {
    path = options.map(path);
  }

  return options.host ? join(options.host, path) : null;
}

function ignoreQuery(url: any) {
  return url ? url.split('?')[0] : null;
}

function getParsedBody(ctx: any) {
  let body = ctx.request.body;
  if (body === undefined || body === null) {
    return undefined;
  }
  const contentType = ctx.request.header['content-type'];
  if (!Buffer.isBuffer(body) && typeof body !== 'string') {
    if (contentType && contentType.indexOf('json') !== -1) {
      body = JSON.stringify(body);
    } else {
      body = body + '';
    }
  }
  return body;
}

function pipeRequest(readable: any, requestThunk: any) {
  return (cb: any) => {
    readable.pipe(requestThunk(cb));
  };
}
