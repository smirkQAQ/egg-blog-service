/*
 * @Author: LC
 * @Date: 2021-04-05
 * @Description: 阿里oss上传
 */
const fs = require('fs');
const alioss = require('../utils/alioss');
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
    fs.unlinkSync(file.path);
    ctx.upload = { url, filekey };  // 挂载在ctx, 传递给下个中间件
    await next(); 
  } 
}

module.exports = UploadController
