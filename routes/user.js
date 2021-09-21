const Router = require('koa-router');
const router = new Router({ prefix: '/user' });
const {
  login,
  signIn
} = require('../controllers/user');

router.post('/login', login);
router.post('/signIn', signIn);

module.exports = router
