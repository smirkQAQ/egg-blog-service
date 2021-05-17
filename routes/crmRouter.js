/*
 * @ Author: LC
 * @ Date: 2021-03-14
 * @ Description: 管理后台的接口配置
 */
const { 
  UserController, 
  ArticleController
} = require('../controllers/crmExprot.js');
const router = require('koa-router')();
const upload = require('../middlewares/upload');

router.post('/api/article/createArticle', ArticleController.createArticle);               // 创建文章
router.post('/api/article/upload', upload.txcos, ArticleController.createUpload);         // 上传
router.put('/api/article/articlePut', ArticleController.articlePut);                      // 编辑文章
router.delete('/api/article/delArticle', ArticleController.delArticle);                   // 删除文章
router.delete('/api/article/delComment', ArticleController.delComment);                   // 删除评论
 



module.exports = router;