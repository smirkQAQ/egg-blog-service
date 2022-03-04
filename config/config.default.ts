/* eslint valid-jsdoc: "off" */
import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';
import * as path from 'path';

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1632363205996_4896';

  // add your egg config in here
  config.middleware = [ 'errorHandler' ];

  // 静态目录
  config.static = {
    // 静态化访问前缀,如：`http://127.0.0.1:7001/static/images/logo.png`
    prefix: '/static',
    dir: path.join(appInfo.baseDir, 'upload/'), // `String` or `Array:[dir1, dir2, ...]` 静态化目录,可以设置多个静态化目录
    dynamic: true, // 如果当前访问的静态资源没有缓存，则缓存静态文件，和`preload`配合使用；
    preload: false,
    maxAge: 31536000, // in prod env, 0 in other envs
    buffer: true, // in prod env, false in other envs
  };

  // 日志目录
  config.logger = {
    dir: './logs',
    appLogName: `${appInfo.name}控制台日志.log`,
    coreLogName: '框架内核-插件日志.log',
    agentLogName: '代理日志.log',
    errorLogName: '错误日志.log',
  };
  // 定时任务日志
  config.customLogger = {
    scheduleLogger: {
      file: path.join(appInfo.baseDir, 'logs', '定时任务日志.log'),
    },
    // 自定义日志 调用 ctx.getLogger('sbLogger').info('info');
    // sbLogger: {
    //   file: path.join(appInfo.baseDir, 'logs', 'sb.log'),
    //   formatter(meta: any) {
    //     return `[${meta.date}] ${meta.message}`;
    //   },
    //   // ctx logger
    //   contextFormatter(meta: any) {
    //     return `[${meta.date}] [${meta.ctx.ip} ${meta.ctx.method} ${meta.ctx.url}] ${meta.message}`;
    //   },
    // },
  };
  // 安全策略配置
  config.security = {
    csrf: {
      enable: false,
    },
  };
  // 服务端口配置
  config.cluster = {
    listen: {
      port: 7000,
      hostname: '127.0.0.1', // 不建议设置 hostname 为 '0.0.0.0'，它将允许来自外部网络和来源的连接，请在知晓风险的情况下使用
      // path: '/var/run/egg.sock',
    },
  };

  // 校验配置
  config.validate = {
    convert: true, // 对参数可以使用convertType规则进行类型转换
    // validateRoot: false,
  };

  // 跨域配置
  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
  };

  // 引入mysql配置
  config.sequelize = {
    dialect: 'mysql',
    dialectOptions: {
      charset: 'utf8mb4',
      dateStrings: true,
      typeCast(field, next) {
        // for reading from database
        if (field.type === 'DATETIME') {
          return field.string();
        }
        return next();
      },
    },
    host: '127.0.0.1',
    port: 3306,
    database: 'blog_test',
    timezone: '+08:00', // 东八时区
    username: '',
    password: '',
  };

  // redis配置
  config.redis = {
    client: {
      port: 6379, // Redis port
      host: '127.0.0.1', // Redis host
      db: 0,
      password: '',
    },
  };

  // 文件读取方式：file/stream, 白名单默认只允许jpg、gif图片格式
  config.multipart = {
    mode: 'file',
    whitelist: [
      '.jpg', '.jpeg', // image/jpeg
      '.png', // image/png, image/x-png
      '.gif', // image/gif
      '.bmp', // image/bmp
      '.wbmp', // image/vnd.wap.wbmp
      '.webp', '.tif', '.xls', '.xlsx', '.psd',
      // text
      // '.svg', '.js', '.jsx', '.json', '.css', '.less', '.html', '.htm', '.xml',
      // tar
      '.zip', '.gz', '.tgz', '.gzip',
      // video
      '.mp3', '.mp4', '.avi',
    ],
  };

  // 阿里云oss sdk配置
  config.alioss = {
    region: '', // oss-cn-xxxxxx
    accessKeyId: '',
    accessKeySecret: '',
    bucket: '', // 存储桶名称
    folder: 'images/', // 上传到空间的images文件夹下，可自定义，文件夹需提前创建
  };

  config.txcos = {
    Region: 'ap-shenzhen-fsi', // ap-xxxxx-fsi
    SecretId: '',
    SecretKey: '',
    Bucket: '', // 存储桶名称xxxxx-xxxxxxxx
    folder: 'images/',
  };

  // 短信验证
  config.nodemailer = {
    service: 'qq',
    host: 'smtp.qq.com', // 服务 网易163邮箱 smtp.163.com google: smtp.gmail.com
    port: 465, // smtp端口 465
    secure: true,
    auth: {
      user: '', // 用户名
      pass: '', // SMTP授权码
    },
  };
  // the return config will combines to EggAppConfig

  // add your special config in here
  const bizConfig = {
    // sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
  };
  // 如果直接返回 config ，将该类型合并到 EggAppConfig 的时候可能会出现 circulate type 错误。
  return {
    ...config as {},
    ...bizConfig,
  };
};
