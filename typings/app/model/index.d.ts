// This file is created by egg-ts-helper@1.29.1
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportArticle from '../../../app/model/article';
import ExportComment from '../../../app/model/comment';
import ExportTag from '../../../app/model/tag';
import ExportTagRelationships from '../../../app/model/tagRelationships';
import ExportUser from '../../../app/model/user';

declare module 'egg' {
  interface IModel {
    Article: ReturnType<typeof ExportArticle>;
    Comment: ReturnType<typeof ExportComment>;
    Tag: ReturnType<typeof ExportTag>;
    TagRelationships: ReturnType<typeof ExportTagRelationships>;
    User: ReturnType<typeof ExportUser>;
  }
}
