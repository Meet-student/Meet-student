const { parse } = require('url');
const { isJSRequest } = require('../../utils');
const send = require('../send');//express res.send
const transformRequest = require('../transformRequest')
function transformMiddleware(server) {
  return async function (req, res, next) {
    //只转换GET请求
    if (req.method !== 'GET') {
      return next();
    }
    let url = parse(req.url).pathname;//取得路径名
    if (isJSRequest(url)) {//如果说请求是一个JS请求
      //如果成功的转换得到了结果
      const result = await transformRequest(req.url, server);
      if (result) {
        //把转换后得到的代码发送给客户端 
        return send(req, res, result.code, 'js');
      } else {
        return next();
      }
    } else {
      return next();
    }
  }
}
module.exports = transformMiddleware;