var moment = require('./moment');

// moment({
//     formatString: {
//         "r": "YYYY"
//     }
// });

// console.log(`moment() \/\/ ${moment()}`);
// console.log(`moment().toString() \/\/ ${moment().toString()}`);
// console.log(`moment().format() \/\/ ${moment().format()}`);
// console.log(`moment().format("l") \/\/ ${moment().format("l")}`);
// console.log(`moment().format("ll") \/\/ ${moment().format("ll")}`);
// console.log(`moment().format("k") \/\/ ${moment().format("k")}`);
// console.log(`moment().format("kk") \/\/ ${moment().format("kk")}`);
// console.log(`moment().format("kkk") \/\/ ${moment().format("kkk")}`);
// console.log(`moment().format("f") \/\/ ${moment().format("f")}`);
// console.log(`moment().format("ff") \/\/ ${moment().format("ff")}`);
// console.log(`moment().format("fff") \/\/ ${moment().format("fff")}`);
// console.log(`moment().format("n") \/\/ ${moment().format("n")}`);
// console.log(`moment().format("nn") \/\/ ${moment().format("nn")}`);
// console.log(`moment().format("r") \/\/ ${moment().format("r")}`);

// console.log(`moment(1459235037).format() \/\/秒 ${moment(1459235037).format()}`);
// console.log(`moment(1459235037000).format() \/\/毫秒 ${moment(1459235037000).format()}`);
// console.log(`moment([2016,12,23,4,3,5]).format("f") \/\/月份自动补充，执行：new Date(2016,11,23,4,3,5) ${moment([2016,11,23,4,3,5]).format("f")}`);
// console.log(`moment([2015,12,3]).format("f") \/\/执行：new Date(2015,11,3) ${moment([2015,12,3]).format()}`);
// console.log(`moment("2014-12-03").format("f") \/\/${moment("2014-12-03").format("f")}`);
// console.log(`moment("2014-12-03 12:34").format("f") \/\/${moment("2014-12-03 12:34").format("f")}`);
// console.log(`moment("2014-12-03 12:34:12").format("f") \/\/${moment("2014-12-03 12:34:34").format("f")}`);
// console.log(`moment("20141203").format("f") \/\/${moment("20141203").format("f")}`);
// console.log(`moment("201412031223").format("f") \/\/${moment("201412031223").format("f")}`);

// console.log(`moment().year(2018).format() \/\/${moment().year(2018).format()}`);
// console.log(`moment().isLeapYear() \/\/${moment().isLeapYear()}`);
// console.log(moment("2012-10-03 23:59:59").add(1,moment.DAY).format("fff"));
// console.log(moment("2012-10-03 23:59:59").add(-1,moment.DAY).format("fff"));

// console.log(moment("2012-10-03 23:59:59").add(26,moment.MONTH).format("fff"));
// console.log(moment("2012-10-03 23:59:59").add(-1,moment.YEAR).format("fff"));

// console.log(moment("2012-10-03 23:59:59").startOf(moment.DAY).format("fff"));
// console.log(moment("2012-10-03 23:59:59").startOf(moment.YEAR).format("fff"));
// console.log(moment("2012-10-03 23:59:59").startOf(moment.MONTH).format("fff"));
// console.log(moment("2012-10-03 23:59:59").startOf(moment.HOUR).format("fff"));

console.log(moment("2012-10-03 23:59:59").month(8).month());
console.log(moment("2012-10-03 23:59:59").endOf(moment.YEAR).format());
console.log(moment("2012-10-03 23:59:59").endOf(moment.MONTH).format());


