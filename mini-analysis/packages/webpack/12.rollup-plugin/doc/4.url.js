var logger = new URL('logger.js', import.meta.url).href;
var logger = new URL('logger.js', document.baseURI).href;

console.log(logger);
