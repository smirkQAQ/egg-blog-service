import 'egg';
import * as COS from 'cos-nodejs-sdk-v5';
import { Transporter } from 'nodemailer';

declare module 'egg' {
  // 扩展 service
  interface IService {

  }
  // 扩展 context
  interface Context {

  }
  // 扩展 app
  interface Application {
    cos: COS,
    nodemailer: Transporter
  }
  // 扩展你的配置
  interface EggAppConfig {

  }
  // 扩展自定义环境
  // type EggEnvType = 'local' | 'unittest' | 'prod' | 'sit';
}
