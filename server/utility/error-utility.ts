/**
 * Created by MeePwn
 * https://github.com/maybewaityou
 *
 * description:
 *
 */
import { errorMap } from '../data-map/index';
import Exception, { IExtra } from '../model/exception';

/**
 * 抛出异常
 */
export const throws = (exception: Exception) => {
  throw exception;
};

/**
 * 抛出异常
 */
export const throwError = (errorCode: string, extra?: IExtra) => {
  const tmpErrorMap: any = errorMap;
  if (!tmpErrorMap[errorCode]) {
    throwError('unknown', extra);
  }
  throwException(tmpErrorMap[errorCode].name, tmpErrorMap[errorCode].message, extra);
};

/**
 * 抛出异常
 */
export const throwException = (name: string, message: string, extra?: IExtra) => {
  throw new Exception(name, message, extra);
};
