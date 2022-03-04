/*
 * @Author: LC
 * @Date: 2022/1/7
 * @Description:
 */
import { Application, Router, Context } from 'egg';
import 'reflect-metadata'; // Reflect Metadata 是 ES7 的一个提案，它主要用来在声明的时候添加和读取元数据。https://jkchao.github.io/typescript-book-chinese/tips/metadata.html
/**
 * 路由注入类
 * @2022/1/7 14:49
 */
class RouterHelper {
  // 各 Controller 的装饰目标
  targets: { [key: string]: any } = {};
  /**
   * 注入路由
   * @param router egg的路由
   */
  public injectRouter(router: Router) {
    // 便利所有 Controller target
    const keys = Object.keys(this.targets);
    // 每个Controller 的装饰逻辑
    keys.forEach(key => {
      const target = this.targets[key];
      // 获取当前类的 meta : { target, prefix }
      const controllerMeta = Reflect.getMetadata('controller', target);
      // 获取当前类所有Meta的Key: n个路由 + ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑👆 routerKeys: [ 'router_/*', 'controller' ]
      const routerKeys: Array<string> = Reflect.getMetadataKeys(target);
      routerKeys.forEach(routerKey => {
        // 二级路由处理
        if (routerKey.startsWith('router_')) {
          const routerData = Reflect.getMetadata(routerKey, target);
          // routerKey = routerKey.split('_')[1];
          // 静态写法 router.get('/xxx', xxx, controller.xxx.xxx);
          // 这里直接批量注入，（controllerMeta.prefix：RequestMapping获取得一级路由 + routerData.path: 请求方法装饰器的二级路由） 拼接路由路径
          router[routerData.method](
            controllerMeta.prefix + routerData.path,
            ...(target.prototype?._middlewares?.all || []),
            ...(target.prototype?._middlewares?.[routerData.handler] || []),
            async (ctx: Context) => {
              // 得到class实例
              const instance = new target(ctx);
              await instance[routerData.handler].call(instance); // 不太明确call意图
              // await instance[routerData.handler]();
            },
          );
        }
      });
    });
  }
}

const routerHelper = new RouterHelper();

enum RequestMethods {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  DELETE = 'delete',
  ALL = 'all',
  PATCH = 'patch'
}

/**
 * 路由装饰器 传入一级路劲
 * @param prefix 前缀 不传为 当前类名
 * @2022/1/7 14:40
 */
function RequestMapping(prefix?: string | undefined) {
  prefix = prefix ? prefix.replace(/\/+$/g, '') : '/';
  if (prefix === '/') {
    prefix = '';
  }
  return (target: any) => {
    // 获取class名
    const controllerName = target.GetControllerName();
    // 当不传路劲值时候获取类名作为路劲，并且转为小写
    const prefixPro = (prefix ? prefix : '/' + controllerName).toLocaleLowerCase();
    // 挂载 key为controller 的 meta: { target, prefix }
    Reflect.defineMetadata('controller', {
      target,
      prefix: prefixPro,
    }, target);
    routerHelper.targets[prefixPro + controllerName] = target; // (prefixPro + controllerName) 一条RequestMapping标识的key
  };
}

/**
 * 路由装饰器
 * 绑定 存储 controller 类名 路径 请求方法, 方便injectRouter调用
 * @param path 路径
 * @param method 请求方法（get，post等）
 */
function request(path: string, method: RequestMethods) {
  return function(target: any, value: any) {
    Reflect.defineMetadata(`router_${path}`, {
      handler: value,
      path,
      method,
    }, target.constructor);
  };
}

function POST(path: string) {
  return request(path, RequestMethods.POST);
}

function GET(path: string) {
  return request(path, RequestMethods.GET);
}

function PUT(path: string) {
  return request(path, RequestMethods.PUT);
}

function DEL(path: string) {
  return request(path, RequestMethods.DELETE);
}

function ALL(path: string) {
  return request(path, RequestMethods.ALL);
}

function PATCH(path: string) {
  return request(path, RequestMethods.PATCH);
}

/**
 * 抛出router，在router.ts中直接使用AddRouter(app);即可完成自动注入路由
 * @param app application
 * @param options 参数，目前只有prefix，就是所有路由的前缀
 */
export function AddRouter(app: Application, options?: { prefix?: string }) {
  const { router } = app;
  if (options && options.prefix) {
    router.prefix(options.prefix);
  }
  routerHelper.injectRouter(router);
}

export {
  RequestMapping,
  POST,
  GET,
  PUT,
  DEL,
  PATCH,
  ALL,
};
