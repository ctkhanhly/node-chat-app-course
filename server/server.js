const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');


//app.use publicPath
const  publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();

var server = http.createServer(app);

var io = socketIO(server);

app.use(express.static(publicPath));


io.on('connection',(socket)=>{
    console.log('New user connected');

    //emit the event to a single connection
    // socket.emit('newMessage', {
    //     from: 'hehe@example.com',
    //     text: 'hello world',
    //     createdAt: 456
    // });

    socket.on('createMessage', (message)=>{
        console.log('create Message', message);
        //emit an event to every single connection or everyone
        //that opens the same link in the browser
        io.emit('newMessage', {
            from: message.from,
            text: message.text,
            //createdAt by server only to prevent spoofing from user
            createdAt: new Date().getTime()
        })
    });

    socket.on('disconnect', ()=>{
        console.log('User was disconnected');
    });

});


server.listen(port, ()=>{
    console.log(`Server is up on port ${port}`);
});