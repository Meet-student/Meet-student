//const connect = require('connect');
const http = require('http');
const static = require('serve-static');
const middlewares = connect();
middlewares.use(static(__dirname));
middlewares.use((req, res, next) => {
  console.log('middleware1');
  next();
});
middlewares.use((req, res, next) => {
  console.log('middleware2');
  next();
});
middlewares.use((req, res, next) => {
  res.end('hello');
  //next();
});
middlewares.use((req, res, next) => {
  console.log('middleware3');
});
http.createServer(middlewares).listen(3000, () => console.log('3000'));


function connect() {
  const middlewares = [];
  const handler = (req, res) => {
    let index = 0;
    function next() {
      middlewares[index++](req, res, next);
    }
    next();
  }
  handler.use = function (middleware) {
    middlewares.push(middleware);
  }
  return handler;
}