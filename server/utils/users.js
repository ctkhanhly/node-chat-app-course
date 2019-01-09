class Users{
    constructor(){
        this.users = [];
    }
    addUser(id, name, room){
        var user = {id,name, room};
        this.users.push(user);
        return user;
    }
    removeUser(id){
        //lodash remove element from array
        //array.splice()
        var target_user;
        this.users = this.users.filter((user)=> {
            if(user.id === id){
                target_user = user;
            };
            return user.id !== id
        });
        return target_user;
        //Andrew's solution---------
        // var user = getUser(id);
        // if(user){
        //     this.users = this.users.filter((user)=>user.id !== id);
        // }
        // return user;
    }
    getUser(id){
        return this.users.filter((user)=> user.id === id)[0];
    }
    getUserList(room){
        var users = this.users.filter((user)=> user.room === room );
        //similar to filter, but return value we want to use 
        //implicitly: { return user.name;};
        var namesArray = users.map((user)=> user.name);
        return namesArray;
    };
};
class Person{
    constructor(name, age){
        this.name = name;
        this.age = age;
    }
    getUserDescription(){
        return `${this.name} is ${this.age} year(s) old`;
    }
}

var me = new Person('Andrew',25);
console.log('this.name', me.name);
console.log('this.age', me.age);
var description = me.getUserDescription();
console.log(description);

module.exports = {Users};