/*
 * @Author: LC
 * @Date: 2022/1/7
 * @Description:
 */
import { Application } from 'egg';
import { AddRouter } from './lib/add-router';
export default (app: Application) => {
  // 路由自动注入
  AddRouter(app);
};
