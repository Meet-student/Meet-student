let plugins = [
  {
    async options() {
      console.log('options', 1);
    }
  },
  {
    async options() {
      console.log('options', 2);
      return Promise.resolve('结果');
    }
  },
  {
    async options() {
      console.log('options', 3);
    }
  }
]
//plugins.forEach(plugin => plugin.options());
let index = 0;
function next() {
  let plugin = plugins[index++];
  plugin && plugin.options().then((data) => {
    if (data) {
      console.log('到此结束，后面的插件不走了');
    } else {
      next()
    }
  });
}
next();