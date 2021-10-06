/**
 * 全局挂载cos实例
 */
const COS = require('cos-nodejs-sdk-v5');
const fs = require('fs');
module.exports = options => {
  return async function cos(ctx, next) {
    const { Region, SecretId, SecretKey, Bucket, folder } = ctx.app.config.txcos
    console.log(Region, SecretId, SecretKey, Bucket, folder)
    ctx.cos = new COS(ctx.app.config.txcos);
    ctx.cos.put = (filename, stream) => {
      let reader = fs.createReadStream(stream)
      new Promise((resolve, reject) => {
        ctx.cos.putObject({
          Bucket: Bucket, /* Bucket,名称 必须 */
          Region: Region,    /* 所属地域 必须 */
          Key: folder + filename,            /* 必须 */
          Body: reader, // 上传文件对象
        }, function(err, data) {
          if(err) {
            reject(err);
            return;
          }
          resolve(data);
        });
      })
    }
    await next();
  };
};