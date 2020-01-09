最近又学习了下koa2，参考各种资料整理了一套开箱即用的模板，和大家一起学习交流，主要用到的技术栈是node，koa2，mongoose，mongodb数据库，以及一些常用的中间件，log4js，jwt，cros等



### 项目构建
---

介绍下目录结构，如下

```
├── README.md 项目描述
├── app  业务侧代码
│   ├── controller 与路由关联的api方法
│   └── modal 数据模型
│      ├── baseDal.js  基础模型
│      └── user.js   具体模型
├── app.js 入口文件
├── bin 命令
│   ├── run  nodemon 的入口文件
│   └── www 
├── config 配置文件
│   ├── corsConfig.js cros配置
│   ├── dbConfig.js 数据库配置
│   ├── jwtConfig.js jwt配置
│   ├── logConfig.js 日志配置 
│   └── serverConfig.js 服务配置
├── logs  日志目录（该文件夹由配置文件自动生成）
│   ├── error 错误日志
│   └── response 普通响应日志 
├── middleware  中间件
│   └── loggers.js  日志中间件
├── public 公共资源（vue打包后的文件放在此处）
│   └── index.html html入口文件（示例）
├── routes  路由
│   ├── allRoute.js 总路由配置（文件名是路由名构成的一部分）
│   ├── test.js 各个模块路由配置
│   └── users.js  
├── utils 公用方法 
│   ├── logUtil.js 
│	├── mkdir.js 
│   └── serve.js
├── .eslintrc eslint配置文件
└── package.json

```
代码里基本都有注释，用的基本都是常用的语法，你可以基于此模板进行开发，大家一起学习交流，下面是baseDal的代码示例，你可以在这里继续扩展你想要的方法
```
/*
  该模块定义了基础的模型，所有扩展模型基于此模型
  同时扩展模型也可以定义自身的方法 如model user
*/
let mongoose = require("mongoose");

class BaseDal {
  constructor(Model, Schema) {
    this.model = mongoose.model(Model, Schema);
  }
  // 定义共同的方法
  findOne (dataArr = {}) {
    return new Promise((resolve, reject) => {
      this.model.findOne(dataArr, function (e, docs) {
        if (e) {
          reject(e);
        } else {
          resolve(docs);
        }
      })
    })
  }
  find (dataArr = {}, skip = {}) {
    return new Promise((resolve, reject) => {
      this.model.find(dataArr, null, skip, function (e, docs) {
        if (e) {
          reject(e);
        } else {
          resolve(docs);
        }
      })
    })
  }
  count (dataArr = {}, skip = {}) {
    return new Promise((resolve, reject) => {
      this.model.where(dataArr, null, skip).count(function (e, docs) {
        if (e) {
          reject(e);
        } else {
          resolve(docs);
        }
      })
    })
  }
  save (dataArr) {
    return new Promise((resolve, reject) => {
      let user = new this.model(dataArr);
      user.save(function (e, data) {
        if (e) {
          reject(e);
        } else {
          resolve(data);
        }
      });
    })
  }
  update (option = {}, dataArr = {}) {
    return new Promise((resolve, reject) => {
      this.model.update(option, dataArr, function (e, data) {
        if (e) {
          reject(e);
        } else {
          resolve(data);
        }
      });
    })
  }
  delete (dataArr) {
    return new Promise((resolve, reject) => {
      this.model.remove({
        _id: dataArr.id
      }, function (e, data) {
        if (e) {
          reject(e);
        } else {
          resolve(data);
        }
      });
    })
  }
}

export default BaseDal

```
modal user继承BaseDal，你可以在modal下继续添加你需要的模块
```
let mongoose = require("mongoose");
import BaseDal from './BaseDal'
let Schema = mongoose.Schema;
let UserSchema = new Schema({
    userName: String, // 用户名
    password: String, // 密码
    createTime: {
        type: Date,
        dafault: Date.now()
    },
    updateTime: {
        type: Date,
        dafault: Date.now()
    },
})

UserSchema.pre('save', function (next) {
    if (this.isNew) {
        this.createTime = this.updateTime = Date.now()
    }
    else {
        this.updateTime = Date.now()
    }
    next()
})
class User extends BaseDal{
    constructor() {
        super("user", UserSchema); // 调用父类的constructor(Model, Schema)
    }
    // 此处定义子类的方法

    // findOne (dataArr = {}) {
    //     return new Promise( (resolve, reject) => {
    //         this.model.findOne(dataArr, function (e, docs) {
    //             if (e) {
    //                 reject(e);
    //             } else {
    //                 resolve(docs);
    //             }
    //         })
    //     })
    // }

}

let USER = new User()

export { USER }

```

 [koa2学习地址参考](https://koa.bootcss.com/)

