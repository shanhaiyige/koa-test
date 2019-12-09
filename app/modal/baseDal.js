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
