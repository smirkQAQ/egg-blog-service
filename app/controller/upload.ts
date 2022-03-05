/*
 * @Author: LC
 * @Date: 2022/3/5
 * @Description:
 */
import BaseController from '@/lib/base-controller';
import { POST, RequestMapping } from "@/lib/add-router";
import auth from '@/lib/auth';

@RequestMapping('/upload')
@auth
export default class UploadController extends BaseController {
  @POST('')
  async upload() {
    try {
      const { ctx, service } = this;
      const { statusCode, Location, RequestId } = await service.upload.upload(ctx.request.files[0]) as any;
      this.success({ path: 'https://' + Location, uid: RequestId }, '上传成功!', statusCode);
    } catch (e) {
      this.fail('上传失败，请重新上传');
    }
  }
}