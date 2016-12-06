var connect = require('connect');
var serveStatic = require('serve-static');
connect().use(serveStatic(__dirname)).listen(4732); 
console.log('Local Server Running on port: 4732');