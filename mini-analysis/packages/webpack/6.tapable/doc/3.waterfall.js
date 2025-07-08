function anonymous(name, age) {
  var _x = this._x;

  var _fn0 = _x[0];
  var result0 = _fn0(name, age);
  if (!result0) name = result0;

  var _fn1 = _x[1];
  var result1 = _fn1(name, age);
  if (!result1) name = result1;
  
  var _fn2 = _x[2];
  _fn2(name, age);

}