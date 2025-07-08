
class Scope {
  constructor(options = {}) {
    this.name = options.name;//作用域的名称，没有什么用
    this.parent = options.parent;//父作用域
    this.names = options.names || [];//此作用域内声明的变量
    this.isBlock = !!options.isBlock;//判断当前的作用域是否是块级作用域
  }
  add(name, isBlockDeclaration) {//是否是块级声明 let const  Block var 不属于
    if (this.isBlock && !isBlockDeclaration) {//当前作用域是块级的，但是name 不是块级的 var
      this.parent.add(name, isBlockDeclaration)
    } else {
      this.names.push(name);
    }
  }
  findDefiningScope(name) {
    //如果自己这个作用域内声明了此变量,返回自己
    if (this.names.includes(name)) {
      return this;
    } else if (this.parent) {//如果说自己没有此变量，但是有父作用域，用父作用域的方法找此变量
      return this.parent.findDefiningScope(name);
    } else {//自己没有，也没有父亲，返回null
      return null;
    }
  }
}
module.exports = Scope;