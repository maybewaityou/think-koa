/**
 * Created by MeePwn
 * https://github.com/maybewaityou
 *
 * description:
 *
 */
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
export const throwException = (name: string, message: string, extra ?: IExtra) => {
  throw new Exception(name, message, extra);
};
