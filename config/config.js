/*
 * @ Author: LC
 * @ Date: 2021-03-14
 * @ Description: 项目配置文件
 * @ development 开发环境配置
 * @ production  生产环境配置
 */

module.exports = {
  development: {
    mongo: {
      uri: 'mongodb://localhost:27017/test'
    },
   port: '3000',
  },

  production: {
    mongo: {
      uri: 'mongodb://localhost:27017/test'
    },
   port: '8080',
  },

}
 