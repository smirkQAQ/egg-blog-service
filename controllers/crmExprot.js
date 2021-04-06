/*
 * @ Author: LC
 * @ Date: 2021-03-14
 * @ Description: 前端接口集中导出
 */

const UserController = require('./crm/user');
const ArticleController = require('./crm/article');

module.exports = {
  UserController,
  ArticleController
}
