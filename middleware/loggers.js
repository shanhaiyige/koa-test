const logUtil = require('../utils/logUtil');
import { errdata} from '../utils/serve'
export default () => {
    return async (ctx, next) => {
        //响应开始时间
        const start = new Date();
        //响应间隔时间
        let ms;
        try {
            //开始进入到下一个中间件
            await next();
            console.log('respon');
            ms = new Date() - start;
            //记录响应日志
            logUtil.logResponse(ctx, ms);

        } catch (error) {
            console.log('error');
            console.log(error)
            ms = new Date() - start;
            //记录异常日志
            logUtil.logError(ctx, error, ms);
            
            // 错误时返回信息 如果不定义，代码里throw error的地方会进入到这里
            // 客户端因为服务端没有返回信息而显示 not found
            ctx.body =  errdata(error.message);

        }
    }
}