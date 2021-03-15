/*
 * @ Author: LC
 * @ Date: 2021-03-14
 * @ Description: 前端的接口配置
 */

const { UserController } = require('../controllers/webExprot.js');
const router = require('koa-router')();

router.post('/api/user/login', UserController.login);
router.post('/api/user/registered', UserController.registered);

console.log(UserController.registered);


module.exports = router;
