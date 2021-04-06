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
    alioss: {  // 阿里云oss sdk配置
      region: 'oss-cn-beijing',            
      accessKeyId: 'LTAI5tPgfz8gVLqEk6hDSg4a',
      accessKeySecret: 'FysDB4f2PkLjgptUoxzVzbeIpJ3uEw',
      bucket: 'dengttest',
      folder: 'images/'  // 上传到空间的images文件夹下，可自定义，文件夹需提前创建
    },
    txcos: {
      Region: 'ap-shenzhen-fsi',
      SecretId: 'AKID6yoSsAXpIbfrsgygPzNfKIAvWNxMGZWG',
      SecretKey: 'n5BYihhU8caSnvCFCxtaAXkPqI0aibln',
      Bucket: 'dtcos-1258203853',
      folder: 'images/' 
    }
  },

  production: {
    mongo: {
      uri: 'mongodb://localhost:27017/test'
    },
    port: '8080',
  },

}
 