var expect = require('expect');

var {generateMessage} = require('./message');

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