function createHash() {
  return require('crypto').createHash('md5');
}
let entry = {
  entry1: 'entry1',
  entry2: 'entry2'
}
let entry1 = 'require("depModule1"';
let entry2 = 'require("depModule2")';
let depModule1 = ')depModule1+';
let depModule2 = 'depModule2';
//1生成hash hash是基于所有模块进行计算,整个项目中任何一个文件发生改变，hash就会变
let hash = createHash()
  .update(entry1)
  .update(entry2)
  .update(depModule1)
  .update(depModule2)
  .digest('hex')
console.log(hash);
//chunkhash
let entry1ChunkHash = createHash()
  .update(entry1)
  .update(depModule1)
  .digest('hex')
console.log(entry1ChunkHash);
let entry2ChunkHash = createHash()
  .update(entry2)
  .update(depModule2)
  .digest('hex')
console.log(entry2ChunkHash);


let entry1File = entry1 + depModule1;
//先根据entry1这个代码块chunk生成entry1对应的文件，然后获取文件内容，然后根据文件内容生成hash
let entry1ContentHash = createHash()
  .update(entry1File)
  .digest('hex')
console.log(entry1ContentHash);