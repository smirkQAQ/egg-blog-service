// This file is created by egg-ts-helper@1.29.1
// Do not modify this file!!!!!!!!!

import 'egg';
type AnyClass = new (...args: any[]) => any;
type AnyFunc<T = any> = (...args: any[]) => T;
type CanExportFunc = AnyFunc<Promise<any>> | AnyFunc<IterableIterator<any>>;
type AutoInstanceType<T, U = T extends CanExportFunc ? T : T extends AnyFunc ? ReturnType<T> : T> = U extends AnyClass ? InstanceType<U> : U;
import ExportArticle from '../../../app/service/article';
import ExportComment from '../../../app/service/comment';
import ExportUpload from '../../../app/service/upload';
import ExportUser from '../../../app/service/user';

declare module 'egg' {
  interface IService {
    article: AutoInstanceType<typeof ExportArticle>;
    comment: AutoInstanceType<typeof ExportComment>;
    upload: AutoInstanceType<typeof ExportUpload>;
    user: AutoInstanceType<typeof ExportUser>;
  }
}
