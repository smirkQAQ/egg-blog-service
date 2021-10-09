'use strict';

const Controller = require('egg').Controller;

class UploadController extends Controller {
  async upload() {
    const { ctx } = this;
    const { statusCode, Location, RequestId } = await ctx.service.upload.upload(ctx.request.files[0]);
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

module.exports = UploadController;
