'use strict';

const Controller = require('egg').Controller;

class uploadController extends Controller {
  async upload() {
    const { ctx } = this;
    // const { field, filename, filepath } = ctx.params
    const { statusCode, Location, RequestId } = await ctx.service.upload.upload(ctx.params);

    ctx.body = {
      code: statusCode,
      msg: '上传成功！',
      data: {
        path: 'https://' + Location,
        uid: RequestId,
      },
    };
  }
}

module.exports = uploadController;
