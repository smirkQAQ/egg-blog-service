/*
 * @Author: LC
 * @Date: 2022/1/11
 * @Description:
 */

import { Service } from 'egg';
import sendToWormhole from 'stream-wormhole';
import * as fs from 'fs';

export default class UploadService extends Service {
  async upload({ filename: fileName, filepath: filePath }) {
    const { Region, Bucket, folder } = this.config.txcos;
    const stream = fs.createReadStream(filePath);
    return new Promise((resolve, reject) => {
      this.app.cos.putObject({
        Bucket, /* Bucket,名称 必须 */
        Region, /* 所属地域 必须 */
        Key: folder + fileName, /* 必须 */
        Body: stream, // 上传文件对象
      }, async function(err, data) {
        if (err) {
          reject(err);
          await sendToWormhole(filePath);
          return;
        }
        resolve(data);
      });
    });
  }
}
