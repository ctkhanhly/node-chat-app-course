var moment = require('moment');

//stored in utc timezone-independent: jan 1st 1970 00:00:00, milliseconds
//unix timestamp uses seconds

//moment-go to for javascript
//-----
// var date = new Date();
// var months = ['Jan']
// console.log(date.getMonth());//0->11
//-------

var date = moment();// new moment obj like Date()
//date.add(1, 'years').subtract(9, 'months');
console.log(date.format());
//comma is not a part of pattern that format expects, so it will just pass
//it through
console.log(date.format('MMM Do, YYYY'));//short hand version of month
console.log(date.format('h:mm a'));

//moment(): no argument-> current time, with argument: time of the arg
//of our local timezone

var createdAt = 1234;
console.log(moment(createdAt).format('h:mm a'));

var someTimestamp = moment().valueOf();//new Date().getTime()
console.log(someTimestamp);