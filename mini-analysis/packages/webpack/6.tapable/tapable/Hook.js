

class Hook {
  constructor(args) {
    this.args = Array.isArray(args) ? args : [];//参数列表['name','age']
    this.taps = [];//这是一个数组，用来存放我们的回调函数
    this.call = CALL_DELEGATE;
    this.callAsync = CALL_ASYNC_DELEGATE;
    this.promise = PROMISE_DELEGATE;
    this._x = null;
    this.interceptors = [];
  }
  intercept(interceptor) {
    this.interceptors.push(interceptor)
  }
  tap(options, fn) {
    this._tap('sync', options, fn);//type=sync ,注册的是同步回调函数 fn
  }
  tapAsync(options, fn) {
    this._tap('async', options, fn);
  }
  tapPromise(options, fn) {
    this._tap('promise', options, fn);
  }
  _tap(type, options, fn) {
    //如果传入的是字符串，包装成对象
    if (typeof options === 'string') {
      options = { name: options }
    }
    const tapInfo = { ...options, type, fn };
    this.runRegisterInterceptors(tapInfo);
    this._insert(tapInfo);
  }
  runRegisterInterceptors(tapInfo) {
    for (const interceptor of this.interceptors) {
      if (interceptor.register) {
        interceptor.register(tapInfo);
      }
    }
  }
  _insert(tapInfo) {
    let before;
    if (typeof tapInfo.before === 'string') {
      before = new Set([tapInfo.before]);
    } else if (Array.isArray(tapInfo.before)) {
      before = new Set(tapInfo.before);
    }
    let stage = 0;
    if (typeof tapInfo.stage === 'number') {
      stage = tapInfo.stage;
    }
    let i = this.taps.length;//i=3
    while (i > 0) {
      i--;//i=1
      const x = this.taps[i];//x=5
      this.taps[i + 1] = x;
      const xStage = x.stage || 0;
      if (before) {
        if (before.has(x.name)) {
          before.delete(x.name);//把5从Set[3,5]中删除 Set=[3]
          continue;
        }
        if (before.size > 0) {
          continue;
        }
      }
      if (xStage > stage) {//5>2
        continue;
      }
      i++;//i=1
      break;
    }
    this.taps[i] = tapInfo;
  }
  compile(options) {
    throw new Error('此方法是抽象方法，需要子类实现');
  }
  _createCall(type) {
    return this.compile({
      taps: this.taps,//tapInfo的数组 {name,fn,type}
      args: this.args,//形参数组 ['name','age']
      type,// sync
      interceptors: this.interceptors
    });
  }
}
const CALL_DELEGATE = function (...args) {//name,age   13
  this.call = this._createCall('sync');//动态创建call方法
  return this.call(...args);//args=[' ',12]
}
const CALL_ASYNC_DELEGATE = function (...args) {//name,age   13
  this.callAsync = this._createCall('async');//动态创建call方法
  return this.callAsync(...args);//args=[' ',12]
}
const PROMISE_DELEGATE = function (...args) {//name,age   13
  this.promise = this._createCall('promise');//动态创建call方法
  return this.promise(...args);//args=[' ',12]
}
module.exports = Hook;