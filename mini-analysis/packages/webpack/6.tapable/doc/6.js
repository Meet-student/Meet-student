(function anonymous(name, age) {
  var _x = this._x;//header

  return new Promise((function (_resolve, _reject) {


    var _counter = 3;
    var _done = (function () {//成功会调用_done
      _resolve();
    });
    function _error(_err) {//如果失败了会调用_error
      _reject(_err);
    };

    var _fn0 = _x[0];
    var _promise0 = _fn0(name, age);

    _promise0.then((function (_result0) {
      if (--_counter === 0) _done();
    }), function (_err0) {
      if (_counter > 0) {
        _error(_err0);//如果有一个promise失败了，那么就让整个promise失败，
        _counter = 0;//把counter直接设置为0
      }
    });

    var _fn1 = _x[1];
    var _hasResult1 = false;
    var _promise1 = _fn1(name, age);
    if (!_promise1 || !_promise1.then)
      throw new Error('Tap function (tapPromise) did not return promise (returned ' + _promise1 + ')');
    _promise1.then((function (_result1) {
      _hasResult1 = true;
      if (--_counter === 0) _done();
    }), function (_err1) {
      if (_hasResult1) throw _err1;
      if (_counter > 0) {
        _error(_err1);
        _counter = 0;
      }
    });

    var _fn2 = _x[2];
    var _hasResult2 = false;
    var _promise2 = _fn2(name, age);
    if (!_promise2 || !_promise2.then)
      throw new Error('Tap function (tapPromise) did not return promise (returned ' + _promise2 + ')');
    _promise2.then((function (_result2) {
      _hasResult2 = true;
      if (--_counter === 0) _done();
    }), function (_err2) {
      if (_hasResult2) throw _err2;
      if (_counter > 0) {
        _error(_err2);
        _counter = 0;
      }
    });
  }));
})