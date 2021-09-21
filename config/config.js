/*
 * @ Author: LC
 * @ Date: 2021-03-14
 * @ Description: 项目配置文件
 * @ development 开发环境配置
 * @ production  生产环境配置
 */

module.exports = {
  development: {
    port: '3000',
    secret: {
      secretKey: 'blog9527',
      expiresIn: 60 * 60 // 一小时失效
    }, // jwt 密钥
    mysql: {
      host: 'localhost',
      user: 'root',
      password: '',
      port: '3306',
      database: 'blog_test',
      charset:'utf8mb4'   //字符集一定要写，否则表情包存储不了
    },
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
    port: '8080',
    secret: 'blog9527', // jwt 密钥
    mysql: {
      host: 'localhost',
      user: 'root',
      password: '',
      port: '3306',
      database: 'blog_pro',
      charset:'utf8mb4'   //字符集一定要写，否则表情包存储不了
    },
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

}
 