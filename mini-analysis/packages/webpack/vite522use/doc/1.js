let querystring = 'a=1&b=2&c=3';
let query = new URLSearchParams(querystring);
console.log(query);
console.log(query.has('a'));