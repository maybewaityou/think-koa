/**
 * Created by MeePwn
 * https://github.com/maybewaityou
 *
 * description:
 *
 */

export interface IExtra {

  /* 原error */
  origin?: Error;
  /* 报错位置 */
  location?: string;
  /* 报错详细信息 */
  detailsMessage?: string;

}

/**
 * 异常
 */
export default class Exception extends Error {
  /* 成功 */
  public success: boolean;
  /* 异常名称 */
  public name: string;
  /* 异常信息 */
  public message: string;
  /* 状态码 */
  public status: number;
  /* 异常描述信息 */
  public description: string;

  constructor(name: string, message: string, extra?: IExtra) {
    super(name);

    this.success = false;
    this.status = 500;
    this.name = name;
    this.message = message;
    this.description = JSON.stringify({ status: this.status, success: this.success, name, message, extra });
  }

}
