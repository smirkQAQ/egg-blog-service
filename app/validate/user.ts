import { Application } from 'egg';

export default function(app: Application): void {
  // 校验用户名是否正确
  app.validator.addRule('userName', (_rule, value) => {
    if (/^\d+$/.test(value)) {
      return '用户名应该是字符串';
    } else if (value.length < 3 || value.length > 10) {
      return '用户名的长度应该在3-10之间';
    }
  });
}
