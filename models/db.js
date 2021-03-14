/*
 * @ Author: LC
 * @ Date: 2021-03-15
 * @ Description: 数据库连接
 */

const mongoose = require('mongoose');
const config = require('../config/config');

const dbConfig = config[process.env.NODE_ENV||'development'];

mongoose.connect(dbConfig.mongo.uri, { useNewUrlParser: true, useUnifiedTopology: true });

// 连接成功 
mongoose.connection.on('connected', function() {
  console.log('Mongoose 连接到 ' + dbConfig.mongo.uri);
});

// 连接失败
mongoose.connection.on('error', function(err) {
  console.log('Mongoose 连接失败: ' + err);
});

// 断开连接
mongoose.connection.on('disconnected', function() {
  console.log('Mongoose 断开连接');
});
