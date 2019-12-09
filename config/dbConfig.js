// 先安装mongodb
let dbName = "testkoa";
let dbHost = "mongodb://127.0.0.1:27017/";
let mongoose = require("mongoose");

exports.connect = function () {
  mongoose.connect(dbHost + dbName, { useNewUrlParser: true, useUnifiedTopology: true });
  
  let db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function () {
    console.log('数据库已连接!');
  });
}