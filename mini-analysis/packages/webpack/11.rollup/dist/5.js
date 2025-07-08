const MagicString = require('magic-string');
const ms = new MagicString('var name = 1');
ms.clone();
console.log(ms.clone().toString());