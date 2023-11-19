const url = new URL('http://localhost:3000/user/123?queryparams=something');
const id = url.pathname.split('/').pop(); 
console.log(url.pathname);
console.log(url.pathname.split('/'));

console.log(id);

