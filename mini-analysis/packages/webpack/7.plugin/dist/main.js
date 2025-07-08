(() => {
	"use strict";
	var modules = ({
		"jquery":
			((module) => {
				module.exports = window["$"];
			}),
		"lodash":
			((module) => {
				module.exports = window["_"];
			})
	});
	var cache = {};
	function require(moduleId) {
		var cachedModule = cache[moduleId];
		if (cachedModule !== undefined) {
			return cachedModule.exports;
		}
		var module = cache[moduleId] = {
			exports: {}
		};
		modules[moduleId](module, module.exports, require);
		return module.exports;
	}
	(() => {
		require.n = (module) => {
			var getter = module && module.__esModule ?
				() => (module['default']) :
				() => (module);
			require.d(getter, { a: getter });
			return getter;
		};
	})();
	(() => {
		require.d = (exports, definition) => {
			for (var key in definition) {
				if (require.o(definition, key) && !require.o(exports, key)) {
					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
				}
			}
		};
	})();
	(() => {
		require.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
	})();
	(() => {
		require.r = (exports) => {
			if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
			}
			Object.defineProperty(exports, '__esModule', { value: true });
		};
	})();
	var exports = {};
	(() => {
		require.r(exports);
		var jquery_0__ = require("jquery");
		var jquery_0___default = /*#__PURE__*/require.n(jquery_0__);
		let _ = require("lodash");
		console.log((jquery_0___default()));
		console.log(_);
	})();
})()
	;