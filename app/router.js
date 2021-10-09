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

  router.get('/api/account', controller.user.account);
  router.post('/api/upload', controller.upload.upload);

};
