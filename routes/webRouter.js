/*
 * @ Author: LC
 * @ Date: 2021-03-14
 * @ Description: 前端的接口配置
 */

const { 
  UserController, 
  ArticleController, 
  IndexController 
} = require('../controllers/webExprot.js');
const upload = require('../middlewares/upload');
const router = require('koa-router')();

router.post('/api/user/login', UserController.login);
router.post('/api/user/registered', UserController.registered);

router.post('/api/article/createArticle', ArticleController.createArticle);

router.get('/api/index/quireList', IndexController.qureryList);

// test
router.post('/api/test/upload', upload.alioss, async(ctx) => {
  const { url, id } = ctx.upload; 
  if(!url) return ctx.error({ msg:'上传失败!' });
  return ctx.success({ msg:'上传成功!', data: { url,id } });
})



module.exports = router;
