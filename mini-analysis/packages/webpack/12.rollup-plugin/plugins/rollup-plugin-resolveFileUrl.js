function resolveFileUrlPlugin(options = {}) {
  return {
    name: 'resolveFileUrl',
    resolveId(source) {//source = logger
      if (source === 'logger') {
        return source;
      }
    },
    load(importee) {
      if (importee === 'logger') {
        //向输出目录里生成一个新的文件，文件名叫logger.js ,文件内容叫console.log("logger")
        let referenceId = this.emitFile({
          type: 'asset',
          source: 'export default "logger"',
          fileName: 'logger.js'
        });
        console.log('referenceId', referenceId);//ed4a110a
        //return `export default import.meta.ROLLUP_FILE_URL_${referenceId}`;
        return `
           var loggerUrl = import.meta.ROLLUP_FILE_URL_${referenceId};
           import(loggerUrl).then(result=>console.log(result.default))
           export default loggerUrl;
        `;
      }
    },
    //用来自定义url地址的 import  logger from
    /**
     * 所以它肯定是一个路径
    var logger = new URL('logger.js', import.meta.url).href;
     var logger = new URL('logger.js', document.baseURI).href;
     */
    /*   resolveFileUrl({ fileName, chunkId, format, moduleId, referenceId, relativePath }) {
        return `new URL('${fileName}',document.baseURI).href`;
      } */
  }
}
export default resolveFileUrlPlugin;
