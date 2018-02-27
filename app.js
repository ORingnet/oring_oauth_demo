const express = require('express');
const app = express();
const path = require("path");

app.listen(3000, function() {
  console.log('Example is running at port 3000!');
})

app.use(express.static('public'));
