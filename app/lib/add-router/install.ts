/**
 * 封装路由中间件装饰器注入，支持class和methods
 * @param target 装饰目标
 * @param value 当装是目标为静态方法时候 为此方法名
 * @param fn 注入的中间件方法
 * @2022/1/22 17:17
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export default (target: any, value: any, fn: Function): void => {
  // 没有value，说明是作用于class
  if (value === undefined) {
    // 初始化 _middlewares
    if (!target.prototype._middlewares) {
      target.prototype._middlewares = { all: [ fn ] };
    } else {
      target.prototype._middlewares.all.push(fn);
    }
  } else {
    // 初始化 _middlewares
    if (!target.constructor.prototype._middlewares) {
      target.constructor.prototype._middlewares = { all: [] };
    }
    if (target.constructor.prototype._middlewares[value]) {
      target.constructor.prototype._middlewares[value].push(fn);
    } else {
      target.constructor.prototype._middlewares[value] = [ fn ];
    }
  }
};
