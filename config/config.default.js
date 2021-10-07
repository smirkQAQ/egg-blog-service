/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1632363205996_4896';

  // add your middleware config here
  config.middleware = ['errorHandler', 'params'];

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
    }
  };

  // 校验配置
  config.validate = {
    convert: true,  // 对参数可以使用convertType规则进行类型转换
    // validateRoot: false,
  };

  // 跨域配置
  config.cors = {
    origin:'*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS'
  };

  // 引入mysql配置
  config.sequelize = {
    dialect: 'mysql',
    dialectOptions: {
      charset: 'utf8mb4',
    },
    host: '127.0.0.1',
    port: 3306,
    database: 'blog_test',
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
      '.webp', '.tif', '.xls','.xlsx', '.psd',
      // text
      // '.svg', '.js', '.jsx', '.json', '.css', '.less', '.html', '.htm', '.xml',
      // tar
      '.zip', '.gz', '.tgz', '.gzip',
      // video
      '.mp3', '.mp4', '.avi'
    ],
  };

  // 阿里云oss sdk配置
  config.alioss = {
    region: 'oss-cn-beijing',
    accessKeyId: 'LTAI5tPgfz8gVLqEk6hDSg4a',
    accessKeySecret: 'FysDB4f2PkLjgptUoxzVzbeIpJ3uEw',
    bucket: 'dengttest',
    folder: 'images/'  // 上传到空间的images文件夹下，可自定义，文件夹需提前创建
  };

  config.txcos = {
    Region: 'ap-shenzhen-fsi',
    SecretId: 'AKID6yoSsAXpIbfrsgygPzNfKIAvWNxMGZWG',
    SecretKey: 'n5BYihhU8caSnvCFCxtaAXkPqI0aibln',
    Bucket: 'dtcos-1258203853',
    folder: 'images/'
  }

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};