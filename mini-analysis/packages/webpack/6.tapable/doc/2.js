

function sum(a, b) {
  return a + b;
}

let minus = new Function('a,b', 'return a-b');
debugger
let result = minus(3, 2);
console.log(result);

console.log(sum instanceof Function);
console.log(minus instanceof Function);

