'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.post('/api/user/register', controller.user.register);
  router.post('/api/user/login', controller.user.login);
  router.get('/api/user/logout', controller.user.logout);
  router.get('/api/user/userList', controller.user.userList);
  router.post('/api/user/updateAccount', controller.user.updateAccount);
  router.get('/api/user/sendMailCode', controller.user.sendMailCode);

  router.get('/api/article/articleList', controller.article.articles);
  router.get('/api/article/detail', controller.article.detail);
  router.get('/api/article/hot', controller.article.hot);
  router.get('/api/comment/comments', controller.comment.comments);

  router.get('/api/admin/article/deleteArticle', controller.admin.article.deleteArticle);
  router.get('/api/admin/article/test', controller.admin.article.test);

  router.get('/api/account', controller.user.account);
  router.post('/api/upload', controller.upload.upload);

};
