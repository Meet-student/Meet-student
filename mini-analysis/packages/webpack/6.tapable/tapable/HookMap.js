class HookMap {
  constructor(factory) {
    //此map时会存放着很多钩子，他们一般来说是同一类型的
    this.map = new Map();
    this.factory = factory;
  }
  get(key) {
    return this.map.get(key);
  }
  for(key) {
    const hook = this.get(key);
    if (hook) return hook;
    let newHooks = this.factory();
    this.map.set(key, newHooks);
    return newHooks
  }
}
module.exports = HookMap;