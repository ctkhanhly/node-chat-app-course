var expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', ()=>{
    it('should generate correct message object', ()=>{
        var message = generateMessage('Ly', 'Hello World');
        expect(message.from).toBe('Ly');
        expect(message.text).toBe('Hello World');
        //or
        expect(message).toInclude({from: 'Ly', text: 'Hello World'});
        expect(message.createdAt).toBeA('number');
        
    });
});

describe('generateLocationMessage', ()=>{
    it('should generate correct location object', ()=>{
        //10.806265, 106.632334
        var latitude = 10.806265;
        var longitude = 106.632334;
        var from = 'Ly';
        var url = `https://www.google.com/maps?q=${latitude},${longitude}`;
        var message = generateLocationMessage(from, latitude, longitude);
        expect(message).toInclude({from, url});
        expect(message.createdAt).toBeA('number');
    });
});