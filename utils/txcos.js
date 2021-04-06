/*
 * @Author: LC
 * @Date: 2021-04-06
 * @Description: 腾讯cos 初始化 和 创建存储对象
 */
var COS = require('cos-nodejs-sdk-v5');
const config = require('../config/config');
const globalConfig = config[process.env.NODE_ENV];

var cos = new COS(globalConfig.txcos);


module.exports = (key, path) => {
  const txconfig = globalConfig.txcos
  return new Promise((resolve, reject) => {
    cos.putObject({
      Bucket: txconfig.Bucket, /* 必须 */
      Region: txconfig.Region,    /* 必须 */
      Key: key,              /* 必须 */
      StorageClass: 'STANDARD',
      Body: path, // 上传文件对象
    }, function(err, data) {
      if(err) {
        reject(err);
        return;
      }
      resolve(data);
    });
  })
}