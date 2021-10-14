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

  // add your middleware config here
  // config.middleware = [];

  // 服务端口配置
  config.cluster = {
    listen: {
      port: 7001,
      hostname: '172.17.10.241', // 不建议设置 hostname 为 '0.0.0.0'，它将允许来自外部网络和来源的连接，请在知晓风险的情况下使用 /服务器使用内网ip
      // path: '/var/run/egg.sock',
    }
  }

  // 引入mysql配置
  config.sequelize = {
    host: '127.0.0.1',
    port: 3306,
    username: 'blog_pro',
    database: 'blog_pro',
    password: 'cE7xpjMthJ8sGHf4'
  };

  // reaid配置
  config.redis = {
    client: {
      port: 6479,          // Redis port
      host: '127.0.0.1',   // Redis host
      password: 'cE7xpjMthJ8sGHf4',
      db: 0,
    },
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
