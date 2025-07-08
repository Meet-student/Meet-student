const path = require('path');
console.log(path.join('a', 'b'));//window a\b  linux a/b
console.log(path.posix.join('a', 'b'));// a/b