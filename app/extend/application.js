'use strict';
// 事务单例
const TRANSACTION = Symbol('Application#transaction');

module.exports = {
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
