/*
 * @Author: LC
 * @Date: 2022/3/4
 * @Description:
 */
import BaseController from '../lib/base-controller';
import {GET, RequestMapping} from "../lib/add-router";

@RequestMapping('/user')
export default class UserController extends BaseController {
  @GET('/test')
  public async test() {
    this.success('/test', 'Hello Word!');
  }
}
