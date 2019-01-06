const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');


//app.use publicPath
const {generateMessage} = require('./utils/message');
const  publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();

var server = http.createServer(app);

var io = socketIO(server);

app.use(express.static(publicPath));


io.on('connection',(socket)=>{
    console.log('New user connected');

    //emit the event to a single connection
    //changed to io.emit instead
    // socket.emit('newMessage', {
    //     from: 'hehe@example.com',
    //     text: 'hello world',
    //     createdAt: 456
    // });

    //socket.emit from Admin text Welcome to the chat app
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

    //socket.broadcast.emit from Admin text New User joined
    //how to know each user's name?
    socket.broadcast.emit('newMessage', generateMessage('Admin', 'A new user joined'));

    socket.on('createMessage', (message)=>{
        console.log('create Message', message);
        //emit an event to every single connection or everyone
        //that opens the same link in the browser
        //-----
        
        io.emit('newMessage', generateMessage(message.from, message.text));

        //-----

        //broadcast is an obj that has its own emit function
        //same as socket.emit or io.emit
        //the only difference is who it gets sent to: everyone but this socket
        //---
        // socket.broadcast.emit('newMessage', {
        //     from: message.from,
        //     text: message.text,
        //     createdAt: new Date().getTime()
        // });
        //----
    });

    socket.on('disconnect', ()=>{
        console.log('User was disconnected');
    });

});


server.listen(port, ()=>{
    console.log(`Server is up on port ${port}`);
});