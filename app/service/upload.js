'use strict';

const Service = require('egg').Service;
const COS = require('cos-nodejs-sdk-v5');
const sendToWormhole = require('stream-wormhole');
const fs = require('fs');

class UploadService extends Service {
  async upload({ filename, filepath }) {
    const cos = new COS(this.config.txcos);
    const { Region, Bucket, folder } = this.config.txcos;
    const stream = fs.createReadStream(filepath);
    return new Promise((resolve, reject) => {
      cos.putObject({
        Bucket, /* Bucket,名称 必须 */
        Region, /* 所属地域 必须 */
        Key: folder + filename, /* 必须 */
        Body: stream, // 上传文件对象
      }, async function(err, data) {
        if (err) {
          reject(err);
          await sendToWormhole(filepath);
          return;
        }
        resolve(data);
      });
    });
  }
}

module.exports = UploadService;
