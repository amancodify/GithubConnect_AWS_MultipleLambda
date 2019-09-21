var UserService = require("../service/UserService");
var moment = require('moment');


async function datesControl() {
    var a = moment('2019-01-01');
    var b = moment('2019-08-31');
    var arr = [];
    for (var m = moment(a); m.diff(b, 'days') <= 0; m.add(6, 'days')) {
        var next = moment(m);
        var obj = {
            from: m.format('YYYY-MM-DD'),
            to: next.add(5, 'days').format('YYYY-MM-DD'),
            isStarted: false,
            isCompleted: false
        }
        arr.push(obj);
    }
    return await UserService.createDates(arr);
}

async function getSingleDate() {
    return await UserService.getDate();
}

async function get7Dates() {
    return await UserService.get7Dates();
}

datesControl();

exports.datesControl = datesControl;
exports.getSingleDate = getSingleDate;
exports.get7Dates = get7Dates;