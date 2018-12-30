const path = require('path');
const express = require('express');


//app.use publicPath
const  publicPath = path.join(__dirname, '../public');



console.log(__dirname + '/../public');//shows going into and out of /../
console.log(publicPath);

//path is a built-in module, doesnt have to install via npm

//static middleware, configure, create new express app
//port.listen 3000
//console.log(server is up )
//start server in terminal, => make server runs on port 3000

var port = 3000;
var app = express();
app.use(express.static(publicPath));

app.listen(port, ()=>{
    console.log(`Server is up on port ${port}`);
});