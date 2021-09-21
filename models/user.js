const moment = require('moment');
const md5 = require('md5')
const { sequelize } = require('../utils/db')
const { DataTypes, Model } = require('sequelize')

// 定义用户模型
class User extends Model {

}

// 初始用户模型
User.init({
  id: {
    type: DataTypes.INTEGER(10).UNSIGNED,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING(50),
    allowNull: false,
    // 备注
    comment: '用户昵称'
  },
  email: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: 'user_email_unique',
    comment: '登录邮箱'
  },
  password: {
    type: DataTypes.STRING,
    set(val) {
      this.setDataValue("password", md5(val));
    },
    allowNull: false,
    comment: '登录密码'
  },
  status: {
    type: DataTypes.TINYINT,
    allowNull: true,
    defaultValue: 1,
    comment: '用户状态：0-禁用,1-正常'
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    get() {
      return moment(this.getDataValue('created_at')).format('YYYY-MM-DD HH:mm:ss');
    }
  }
}, {
  sequelize,
  modelName: 'user',
  tableName: 'user'
})


module.exports = {
  User
}
