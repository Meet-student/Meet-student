
const alias = {
  js: 'application/javascript',
  css: 'text/css',
  html: 'text/html',
  json: 'application/json'
}
function send(req, res, content, type) {
  res.setHeader('Content-Type', alias[type]);
  res.statusCode = 200;
  return res.end(content);//把内容直接写入响应体给浏览器或者说客户端并结束响应
}
module.exports = send;