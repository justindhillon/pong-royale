const express = require('express');

const app = express();
const port = 8080; // Set Port Here

app.use(express.static('front-end'))

app.listen(port);
console.log('Server started at http://localhost:' + port);
