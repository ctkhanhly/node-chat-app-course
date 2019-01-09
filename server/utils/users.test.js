const expect = require('expect');

const {Users} = require('./users');


describe('Users', ()=>{
    var users;

    beforeEach(()=>{
        users = new Users();
        users.users = [{
            id: '1',
            name: 'Mike',
            room: 'Node Course'
        }, {
            id: '2',
            name: 'Jen',
            room: 'React Course'
        }, {
            id: '3',
            name: 'Julie',
            room: 'Node Course'
        }];
    });

    it('should add new user', ()=>{
        //Users is wrapped around with {}
        //custom var users different from the above
        var users = new Users();
        var user = {
            id: 123,
            name: 'Ly',
            room: 'HCM'
        };
        var resUser = users.addUser(user.id,user.name,user.room);
        //wrong: expect(users.users).toEqual(users); [{}] versus {[{}]}
        expect(users.users).toEqual([user]);
    });
    it('should remove a user', ()=>{
        var user = users.removeUser('1');
        expect(users.users).toEqual([{
            id: '2',
            name: 'Jen',
            room: 'React Course'
        }, {
            id: '3',
            name: 'Julie',
            room: 'Node Course'
        }]);
        expect(user).toEqual({
            id: '1',
            name: 'Mike',
            room: 'Node Course'
        });
        //Andrew's solution
        expect(user.id).toBe('1');
        expect(users.users.length).toBe(2);
    });
    it('should not remove user', ()=>{
        var user = users.removeUser('4');
        expect(users.users).toEqual([{
            id: '1',
            name: 'Mike',
            room: 'Node Course'
        }, {
            id: '2',
            name: 'Jen',
            room: 'React Course'
        }, {
            id: '3',
            name: 'Julie',
            room: 'Node Course'
        }]);
        //expect(user).toEqual(undefined);
        expect(user).toNotExist();

        //Andrew's solution
        //expect(user).toNotExist();
        expect(users.users.length).toBe(3);
    });
    it('should find user', ()=>{
        var user = users.getUser('1');
        expect(user).toEqual({
            id: '1',
            name: 'Mike',
            room: 'Node Course'
        });
    });
    it('should not find a user', ()=>{
        var user = users.getUser('4');
        //expect(user).toEqual(undefined);
        expect(user).toNotExist();
    });
    it('should return names for Node Course', ()=>{
        var userList = users.getUserList('Node Course');
        expect(userList).toEqual(['Mike', 'Julie']);
    });
    it('should return names for React Course', ()=>{
        var userList = users.getUserList('React Course');
        expect(userList).toEqual(['Jen']);
    });
});