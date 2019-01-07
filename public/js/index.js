var socket = io(); 
socket.on('connect', function(){
    console.log('Connected to the server');

    //not emitting event until we are connected

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
    //jquery to create that element, then modify that element and add
    //it to the markup, making it visible
    var li = jQuery('<li></li>');
    li.text(`${message.from}: ${message.text}`);

    jQuery(`#messages`).append(li);
});

jQuery('#message-form').on('submit', function(e){
    e.preventDefault();

    //3rd: ack
    socket.emit('createMessage', {
        from: 'User',
        //selector, select any element that has name attribute=message
        text: jQuery('[name=message]').val()
    }, function(){

    });
});

