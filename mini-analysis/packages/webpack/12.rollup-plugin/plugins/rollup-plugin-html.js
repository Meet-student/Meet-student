

function htmlPlugin() {
  return {
    name: 'html',
    //生成额外的文件
    generateBundle(options, bundle) {
      //webpack compilation.assets[fileName]='';
      //webpack 10小时 rollup 9+1
      let entryName;//入口文件的名称
      for (let fileName in bundle) {
        let assetOrChunkInfo = bundle[fileName];
        if (assetOrChunkInfo.isEntry) {
          entryName = fileName;
        }
      }
      console.log(bundle);
      this.emitFile({
        type: 'asset',//静态文件 js jpg css
        fileName: 'index.html',
        source: `
          <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
          </head>
          <body>
            <script type="module" src="${entryName}"></script>
          </body>
          </html>
        `
      });
      console.log(bundle);
    }
  }
}
export default htmlPlugin;