/*
 * @Author: LC
 * @Date: 2021-04-05
 * @Description: alioss 初始化 由于ali-oss的node sdk目前只支持generator,因此需要用co和promise做一层封装以支持async/await
 */
const co = require('co');
const OSS = require('ali-oss');
const config = require('../config/config');
const globalConfig = config[process.env.NODE_ENV];

module.exports = (key, path) => {
  const client = new OSS(globalConfig.alioss);
   return new Promise((resolve, reject) => {
    co(function* () {
     const result = yield client.put(key, path);
     resolve(result);
    }).catch(function (err) {
     reject(err);
    });
  })
}