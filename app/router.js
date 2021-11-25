'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  /**
   * 用户
   */
  router.post('/api/user/register', controller.user.register);
  router.post('/api/user/login', controller.user.login);
  router.get('/api/user/logout', controller.user.logout);
  router.get('/api/user/userList', controller.user.userList);
  router.post('/api/user/updateAccount', controller.user.updateAccount);
  router.get('/api/user/sendMailCode', controller.user.sendMailCode);

  /**
   * 文章
   */
  router.get('/api/article/articleList', controller.article.articles);
  router.get('/api/article/detail', controller.article.detail);
  router.get('/api/article/hot', controller.article.hot);

  /**
   * 评论
   */
  router.post('/api/comment/createComment', controller.comment.createComment);
  router.get('/api/comment/comments', controller.comment.comments);
  router.get('/api/comment/setTop', controller.comment.setTop);
  router.get('/api/comment/deleteComment', controller.comment.deleteComment);

  /**
   * 管理端
   */
  router.get('/api/admin/article/deleteArticle', controller.admin.article.deleteArticle);
  router.post('/api/admin/article/saveArticle', controller.admin.article.saveArticle);

  /**
   * 其他
   */
  router.get('/api/account', controller.user.account);
  router.post('/api/upload', controller.upload.upload);

};
