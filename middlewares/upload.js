/*
 * @Author: LC
 * @Date: 2021-04-05
 * @Description: 阿里oss上传
 */
const fs = require('fs');
// const alioss = require('../utils/alioss');
const txcos = require('../utils/txcos');
const config = require('../config/config');
const globalConfig = config[process.env.NODE_ENV];

class UploadController {
  // 图片上传到阿里云oss中间件
  static async alioss (ctx, next) {   
    const file = ctx.request.files.file;
    if(!file){
      return ctx.error({ msg: '上传失败!' });
    }
    // const { id } = fields;

    const isexit = await fs.existsSync(file.path);
    if(!isexit) return ctx.error({ msg: '上传文件时发生错误!' });
    
    // 同步阿里oss
    // let filekey = id + files.file.name;
    let filekey = file.name;
    if(globalConfig.alioss.folder){
      filekey = globalConfig.alioss.folder + filekey;
    }
    const result = await alioss(filekey, file.path);
    if( !result || !result.url ) return ctx.error({ msg: '上传到云端时发生错误!' });
    const { url } = result;
    // 删除本地文件
    fs.unlinkSync(file.path);
    ctx.upload = { url, filekey };  // 挂载在ctx, 传递给下个中间件
    await next(); 
  }
  static async txcos (ctx, next) {
    const file = ctx.request.files.file;
    if(!file){
      return ctx.error({ msg: '上传失败!' });
    }
    const isexit = await fs.existsSync(file.path);
    if(!isexit) return ctx.error({ msg: '上传文件时发生错误!' });
    // 同步腾讯云cos
    let filekey = file.name;
    if(globalConfig.txcos.folder){
      filekey = globalConfig.txcos.folder + filekey;
    }
    let reader = fs.createReadStream(file.path)  // 创建可读流
    const result = await txcos(filekey, reader);
    if( result.statusCode !== 200 ) return ctx.error({ msg: '上传到云端时发生错误!', data: result });
    const { Location } = result;
    // 删除本地文件
    fs.unlinkSync(file.path);
    ctx.upload = { url: Location, key: filekey };  // 挂载在ctx, 传递给下个中间件
    await next(); 
  }
}

module.exports = UploadController
