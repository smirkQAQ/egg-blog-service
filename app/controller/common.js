/*
 * @Author: LC
 * @Date: 2021/11/8
 * @Description:
 */

'use strict';

const Controller = require('../lib/base_controller');

class CommonController extends Controller {
  async commons() {
    // const { ctx } = this;
    // try {
    //   ctx.validate({
    //     id: 'int',
    //   }, ctx.query);
    //   ctx.service
    // } catch (e) {
    //   this.fail(e);
    // }
  }

  async createCommon() {
    const { ctx } = this;
    try {
      ctx.validate({
        articleId: 'int',
        content: 'string',
        fromUid: 'int',
        // toUid: 'int',
      });
      // await ctx.service.comment.;
      this.success();
    } catch (err) {
      this.fail(err);
    }
  }
}

module.exports = CommonController;
