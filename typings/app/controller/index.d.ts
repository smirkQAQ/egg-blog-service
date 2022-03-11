// This file is created by egg-ts-helper@1.29.1
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportArticle from '../../../app/controller/article';
import ExportComment from '../../../app/controller/comment';
import ExportUpload from '../../../app/controller/upload';
import ExportUser from '../../../app/controller/user';
import ExportAdminArticle from '../../../app/controller/admin/article';

declare module 'egg' {
  interface IController {
    article: ExportArticle;
    comment: ExportComment;
    upload: ExportUpload;
    user: ExportUser;
    admin: {
      article: ExportAdminArticle;
    }
  }
}
