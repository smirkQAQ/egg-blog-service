/*
 * @ Author: LC
 * @ Date: 2021-03-14
 * @ Description: 前端接口集中导出
 */

const UserController = require('./web/user');
const ArticleController = require('./web/article');
const IndexController = require('./web/index');

module.exports = {
  UserController,
  ArticleController,
  IndexController
}
