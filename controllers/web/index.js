/*
 * @Author: LC
 * @Date: 2021-03-28
 * @Description: 
 */
const moment = require('moment')
const ArticleModel = require('../../models/articleModel');  // 文章
class IndexController {
  static async qureryList(ctx) {
    const newdate = moment().format('YYYY-MM-DD HH:mm'); // 当前时间
    const weekdate = moment().subtract(7,'days').format('YYYY-MM-DD HH:mm'); // 7天前

    let { pageIndex, pageSize, categoryId } = ctx.query;
    pageIndex?pageIndex:1;
    pageSize?pageSize:20;

    const skip = (Number(pageIndex)-1)*Number(pageSize);
    const totals = await ArticleModel.countDocuments();
    const lists = await ArticleModel.find().sort({createdDate: '-1'}).skip(Number(skip)).limit(Number(pageSize))
                                   .populate('author', { name: 1, avatar: 1, nickname: 1 }).populate('comments');
    if(!lists) return ctx.error({ msg: '暂无数据!' });

    return ctx.success({ data:{ lists, totals } });
  } 
}

module.exports = IndexController;
