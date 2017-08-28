var express = require('express');
var php = require("php"); 
var path = require("path"); 

var app = express();

app.use("/", php.cgi("/path/to/wordpress")); 

app.listen(9090);

console.log("Server listening!"); 