
/*create by 山海一哥
  date 2019/12/9
  email 2604186978@qq.com
*/
import { USER } from '../modal/user'
import { resdata, errdata } from '../../utils/serve'
const jwt = require('jsonwebtoken')
const jwtConfig = require('../../config/jwtConfig');

async function login (reqBody) {
    try {
        const { userName, password } = reqBody
        if (!userName || !password) {
            return errdata('用户名或密码错误');
        }
        let user = await USER.findOne({ userName, password });
        if (!user) {
            return resdata('0000', 'success', '用户不存在');
        } else {
            let result = await jwt.sign({
                data: user._id,
                //   设置 token 过期时间
                exp: Math.floor(Date.now() / 1000) + (60 * 60), // 60 seconds * 60 minutes = 1 hour
            }, jwtConfig.secret)

            return resdata('0000', 'success', result);
        }
    } catch (err) {
        return errdata(err);
    }
}
async function register (reqBody) {
    // USER.find 是promise对象，可能reject，需要捕获错误
    // await 后的promise reject后，其后的代码块不会继续执行
    // 而是直接进入catch
    try {
        let list = await USER.find({ userName: reqBody.userName });
        let respon = {};
        if (list && list.length > 0) {
            respon = resdata('0000', 'the user is exicet', list);
        } else {
            let newUser = await USER.save(reqBody);
            respon = resdata('0000', 'success', newUser);
        }
        return respon;
    } catch (err) {
        console.log(err)
        // 也可以这种方式  return errdata(err); 
        // 二者的区别在于logger代码块中，如果throw error
        // 会被logger的catch捕获
        throw new Error(err); 
    }
}

export { login, register }