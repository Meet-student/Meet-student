const module1 = require('./module1');
const module2 = require('./module2');
const $ = require('jquery');
console.log(module1, module2, $);
import(/* webpackChunkName:"asyncModule1" */'./asyncModule1');