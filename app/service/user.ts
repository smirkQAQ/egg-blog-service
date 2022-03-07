/*
 * @Author: LC
 * @Date: 2022/3/4
 * @Description:
 */

import { Service } from 'egg';

export default class UserService extends Service {
  async generateToken(data) {
    const { ctx, app } = this;
    const token = ctx.helper.getToken(data); // token生成
    await app.redis.set(data.uid + data.email, token, 'ex', 7200); // 保存到redis
    return token;
  }

  async register({ email, password }) {
    const { ctx } = this;
    return ctx.model.User.create({
      email,
      password: ctx.helper.cryptPwd(password),
    });
  }

  async findUser({ email, id, status = 1 }) {
    const { ctx } = this;
    const query: any = { status };
    email && (query.email = email);
    id && (query.id = id);
    return ctx.model.User.findOne({
      where: query,
    });
  }

  async getUsers({ page, pageSize }: any) {
    const where = { status: 1 };
    const { count, rows } = await this.ctx.model.User.findAndCountAll({
      where,
      offset: (page - 1) * pageSize,
      limit: pageSize,
      order: [[ 'createdAt', 'DESC' ]],
    });
    return { count, users: rows };
  }

  async queryUserById(id) {
    return this.ctx.model.User.findOne({
      where: { id, status: 1 },
      attributes: [
        'id',
        'userName',
        'email',
        'nickName',
        'avatar',
        'website',
        'github',
        'github',
        'gitee',
        'profession',
        'summary',
        'accountType',
      ],
    });
  }

  async updateAccount(params, id) {
    return this.ctx.model.User.update(params, { where: { id } });
  }

  async viewAddOne(id) {
    const { literal } = this.app.Sequelize;
    return this.ctx.model.User.update(
      {
        totalView: literal('total_view + 1'),
      },
      {
        where: { id },
      },
    );
  }
}
