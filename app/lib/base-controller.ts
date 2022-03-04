import { Controller } from 'egg';

class BaseController extends Controller {
  get user(): any {
    return this.ctx.locals.uid;
  }
  /**
   * 这是在自动创建路由时用到的。
   */
  static GetControllerName() {
    return this.name;
  }

  success(data: any = null, message?: string | undefined, code = 200): void {
    this.ctx.body = { code, data, message };
    this.ctx.status = code || 200;
  }

  fail(message: any, code = 400): void {
    message && message.message === 'Validation Failed' ?
      this.ctx.body = { code, message: message.message, data: null } :
      this.ctx.body = { code, message: message.message || message, data: null };
    this.ctx.status = 200;
  }

  notFound(message: string, code = 404) {
    message = message || 'not found';
    this.ctx.throw(code, message);
  }
}

export default BaseController;
