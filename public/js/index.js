var socket = io(); 
        
socket.on('connect', function(){
    console.log('Connected to the server');

    //not emitting event until we are connected

    // socket.emit('createMessage', {
    //     from: 'jen@example.com',
    //     text: 'Happy New Year'
    // });

});

//no arrow function here, maynot work with mobile, mozilla
socket.on('disconnect', function () {
    console.log('Disconnected from the server');
});
    
//listen to custom event, not name of a built-in event
//1st argument: name of our custom event
//2nd argument: callback function, gets called when the event gets fired

//data provided is 1st argument of callback function
socket.on('newMessage', function (message){
    console.log('New message', message);
});

//emit data from client to server