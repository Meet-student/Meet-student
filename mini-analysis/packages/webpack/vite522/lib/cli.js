let { createServer } = require('./server');
; (async function () {
  const server = await createServer();
  server.listen(9999);
})();