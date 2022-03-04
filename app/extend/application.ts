/*
 * @Author: LC
 * @Date: 2022/1/7
 * @Description:
 */
import { Application } from 'egg';
// 私有属性用 Symbol 来挂载。
// Symbol 的描述遵循 jsdoc 的规则，描述映射后的类名+属性名。
// 事务单例
const TRANSACTION = Symbol('Application#transaction');
import * as _ from 'lodash';

export default {
  _,
  // 事务
  async transaction(this: Application) {
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
