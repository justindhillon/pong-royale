var express = require('express');
var app = express();
var port = 3000;

app.use(express.static(__dirname + '/'));
app.listen(port);

console.log("Listening on:");
console.log(`http://localhost:${port}`);
