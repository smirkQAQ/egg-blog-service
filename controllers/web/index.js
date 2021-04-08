/*
 * @Author: LC
 * @Date: 2021-03-28
 * @Description: 首页列表接口逻辑
 */
const moment = require('moment')
const ArticleModel = require('../../models/articleModel');  // 文章
const TagsModel = require('../../models/tagsModel');  // 文章

class IndexController {
  static async qureryList(ctx) {
    // 条件查询
    let params = {};
    let { pageIndex, pageSize, categoryId } = ctx.query;
    pageIndex?pageIndex:1;
    pageSize?pageSize:20;

    const skip = (Number(pageIndex)-1)*Number(pageSize);
    const totals = await ArticleModel.find(params).countDocuments();
    const lists = await ArticleModel.find(params).sort({createdDate: '-1'}).skip(Number(skip)).limit(Number(pageSize))
                                   .populate('author', { name: 1, avatar: 1, displayName: 1 }).populate('comments');
    if(!lists) return ctx.error({ msg: '暂无数据!' });
    return ctx.success({ data: { lists, totals } });
  } 
  static async qureryTags(ctx) {
    const data = await TagsModel.find()
    if(data.length == 0) return ctx.error({ msg: '暂无数据!' })
    return ctx.success({ data })
  }
}

module.exports = IndexController;
