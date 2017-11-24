/**
 * Created by MeePwn
 * https://github.com/maybewaityou
 *
 * description:
 *
 */

/**
 * 异常额外信息
 */
interface IExtra {
  /* 异常原始错误 */
  originalError?: Error;
  /* 异常位置 */
  location?: string;
}

type genericExceptionHandler = (error: any, params?: any) => any;

/**
 * 异常
 */
export default class Exception extends Error {
  /* 异常名称 */
  public name: string;
  /* 异常信息 */
  public message: string;
  /* 异常额外信息 */
  public extra?: IExtra;
  /* 异常补救方法 */
  public remedy?: genericExceptionHandler;
  /* 异常描述信息 */
  public description: string;

  constructor(name: string, message: string, extra?: IExtra, remedy?: genericExceptionHandler) {
    super(name);

    this.name = name;
    this.message = message;
    this.extra = extra;
    this.remedy = remedy;
    this.description = JSON.stringify({ name, message, extra, remedy });
  }

}

/**
 * 抛出异常
 */
export function throws(exception: Exception) {
  throw exception;
}

/**
 * 抛出异常
 */
export function throwException(name: string, message: string, extra?: IExtra, remedy?: genericExceptionHandler) {
  throw new Exception(name, message, extra, remedy);
}
