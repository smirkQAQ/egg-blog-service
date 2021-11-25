/*
 * @Author: LC
 * @Date: 2021/11/23
 * @Description:
 */
'use strict';
// 事务单例
const TRANSACTION = Symbol('Application#transaction');
const _ = require('lodash');

module.exports = {
  _,
  // 事务
  async transaction() {
    if (!this[TRANSACTION]) {
      this[TRANSACTION] = await this.model.transaction();
    }
    return this[TRANSACTION];
  },
  getTransaction() {
    return this[TRANSACTION];
  },
  deleteTransaction() {
    this[TRANSACTION] = null;
  },
};
