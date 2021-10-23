'use strict';

const Controller = require('../lib/base_controller');

class UploadController extends Controller {
  async upload() {
    try {
      const { ctx } = this;
      const { statusCode, Location, RequestId } = await ctx.service.upload.upload(ctx.request.files[0]);
      this.success({ path: 'https://' + Location, uid: RequestId }, '上传成功!', statusCode);
    } catch (e) {
      this.fail('上传失败，请重新上传');
    }
  }
}

module.exports = UploadController;
