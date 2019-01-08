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
    var formattedTime = moment(message.createdAt).format('h:mm a');
    //html() return the markup inside message-template
    var template = jQuery('#message-template').html();
    //now mustache methods are available b/c we add a script tag message-template
    var html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formattedTime
    });

    //Mustache lets you inject values
    jQuery('#messages').append(html);

    // console.log('New message', message);
    // //jquery to create that element, then modify that element and add
    // //it to the markup, making it visible
    // var li = jQuery('<li></li>');
    // li.text(`${message.from} ${formattedTime}: ${message.text}`);

    // jQuery('#messages').append(li);
});

socket.on('newLocationMessage',function(message){
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var template = jQuery('#location-message-template').html();
    var html = Mustache.render(template, {
        from: message.from,
        url: message.url,
        createdAt: formattedTime
    });
    jQuery('#messages').append(html);
    
    // var li = jQuery('<li></li>');
    // //open this link in new tab
    // var a = jQuery('<a target="_blank">My current location</a>');

    // //set text and attribute here instead of in the string=> safer, prevent s.o injecting html code
    // li.text(`${message.from} ${formattedTime}: `);

    // //a.attribute
    // //1 argument: e.g: target: fetch the value "_blank"
    // //2 argument: set the value
    // a.attr('href', message.url);
    // li.append(a);
    // jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', function(e){
    e.preventDefault();

    //same selector jQuery('[name=message]') twice => make a variable
    var messageTextbox = jQuery('[name=message]');
    //3rd: ack
    socket.emit('createMessage', {
        from: 'User',
        //selector, select any element that has name attribute=message
        text: messageTextbox.val()
    }, function(){
        //no parameter; get the value, parameter: set the string
        //set str to empty when the message has been sent
        messageTextbox.val('');
    });
});

//click event listener for send location button
var locationButton = jQuery('#send-location');
locationButton.on('click', function () {
    //check if user has access to geolocaiton api
    if(!navigator.geolocation){
        //no geolocation obj
        return alert('Geolocation not supported by your browser');
    };

    //only disable when it's sending location
    //remove this disabled in both success and failure cases
    //change text of button
    locationButton.attr('disabled', 'disabled').text('Sending location...');

    //find coordinates based off the browser for the user
    //1st function: parameter is the location info, 2nd: error handler
    navigator.geolocation.getCurrentPosition( function(position){
        locationButton.removeAttr('disabled').text('Send location');
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function(){
        locationButton.removeAttr('disabled').text('Send location');
        alert('Unable to fetch the location');
    });
});
