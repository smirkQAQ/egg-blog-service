/*
 * @ Author: LC
 * @ Date: 2021-03-14
 * @ Description: 前端的接口配置
 */
const { 
  UserController, 
  IndexController,
  ArticleController 
} = require('../controllers/webExprot.js');
const router = require('koa-router')();

router.post('/api/user/login', UserController.login);                                 // 登陆
router.post('/api/user/registered', UserController.registered);                       // 注册
router.get('/api/index/quireList', IndexController.qureryList);                       // 列表查询
router.get('/api/index/qureryTags', IndexController.qureryTags);                      // 分类查询
router.get('/api/index/getArticleDetail', ArticleController.getArticleDetail);                      // 文章详情
 

module.exports = router;
