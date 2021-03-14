/*
 * @ Author: LC
 * @ Date: 2021-03-14
 * @ Description: 前端的接口配置
 */

const UserController = require('../controllers/webExprot.js');
const router = require('koa-router')();

router.get('/api/user/login', UserController.login);

module.exports = router;
