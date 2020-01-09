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
