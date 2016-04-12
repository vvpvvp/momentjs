(function(global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
        typeof define === 'function' && define.amd ? define(factory) :
        global.moment = factory();
}(this, function() {
    "use strict";
    const FORMAT_LIST = {
        "l": "YYYY-MM-DD",
        "ll": "YYYY年MM月DD日",
        "k": "YYYY-MM-DD hh:mm",
        "kk": "YYYY年MM月DD日 hh点mm分",
        "kkk": "YYYY年MM月DD日 hh点mm分 q",
        "f": "YYYY-MM-DD hh:mm:ss",
        "ff": "YYYY年MM月DD日 hh点mm分ss秒",
        "fff": "YYYY年MM月DD日 hh点mm分ss秒 星期w",
        "n": "MM-DD",
        "nn": "MM月DD日",
    }

    const _SECONDS = 1000;
    const _MINUTES = 1000 * 60;
    const _HOURS = 1000 * 60 * 60;
    const _DAYS = 1000 * 60 * 60 * 24;
    const _YEARS = _DAYS * 365;
    const MSE = new Date(1970, 0, 1, 0, 0, 0).getTime();

    const WEEK = ['日', '一', '二', '三', '四', '五', '六'];
    const DAY_STRING = ['上午', '下午'];
    let _moment = function() {
        Utils.initMoment(this, ...arguments);
        return this;
    };

    let Utils = {
        initMoment(moment_obj, arg_1, type) {
            var _date = new Date();
            if (arg_1 != undefined) {
                if (Utils.isNumber(arg_1)) {
                    if (arg_1 < 9999999999) arg_1 = arg_1 * 1000;
                    _date.setTime(arg_1);
                } else if (Utils.isArray(arg_1)) {
                    Utils.padMonth(arg_1);
                    _date = new Date(...arg_1);
                } else if (Utils.isDate(arg_1)) {
                    _date = arg_1;
                } else if (Utils.isString(arg_1)) {
                    _date = Utils.parse(arg_1);
                } else if (arg_1 instanceof _moment) {
                    moment_obj = arg_1;
                }
            }
            moment_obj._date = _date;
        },
        parse(str) {
            let aspNetJsonRegex = /^(\d{4})\-?(\d{2})\-?(\d{2})\s?\:?(\d{2})?\:?(\d{2})?\:?(\d{2})?$/i;
            var matched = aspNetJsonRegex.exec(str);
            if (matched !== null) {
                matched.shift();
                Utils.padMonth(matched);
                Utils.popUndefined(matched);
                return new Date(...matched);
            }
            return new Date();
        },
        popUndefined(arr) {
            if (arr.length > 0 && arr[arr.length - 1] == undefined) {
                arr.pop();
                return Utils.popUndefined(arr);
            }
            return arr;
        },
        padMonth(arr) {
            //自动补充月份
            if (arr.length > 1 && arr[1] > 0) arr[1] -= 1;
        },
        isLeapYear(year) {
            return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
        },
        format(date, formatStr) {
            let str = formatStr;
            str = str.replace(/yyyy|YYYY/, date.getFullYear());
            str = str.replace(/yy|YY/, (date.getYear() % 100) > 8 ? (date.getYear() % 100).toString() : '0' + (date.getYear() % 100));
            str = str.replace(/MM/, date.getMonth() > 8 ? (date.getMonth() + 1).toString() : ('0' + (date.getMonth() + 1)));
            str = str.replace(/M/g, (date.getMonth() + 1));
            str = str.replace(/w|W/g, WEEK[date.getDay()]);
            str = str.replace(/dd|DD/, date.getDate() > 9 ? date.getDate().toString() : '0' + date.getDate());
            str = str.replace(/d|D/g, date.getDate());
            str = str.replace(/hh|HH/, date.getHours() > 9 ? date.getHours().toString() : '0' + date.getHours());
            str = str.replace(/h|H/g, date.getHours());
            str = str.replace(/mm/, date.getMinutes() > 9 ? date.getMinutes().toString() : '0' + date.getMinutes());
            str = str.replace(/m/g, date.getMinutes());
            str = str.replace(/ss|SS/, date.getSeconds() > 9 ? date.getSeconds().toString() : '0' + date.getSeconds());
            str = str.replace(/s|S/g, date.getSeconds());
            str = str.replace(/q|Q/g, date.getHours() > 12 ? DAY_STRING[1] : DAY_STRING[0]);
            return str;
        },
        timestamp(date) {
            return Math.floor(date.getTime() / 1000);
        },
        getDays(date) {
            return Math.floor((date.getTime() - MSE) / _DAYS);
        },
        getHours(date) {
            return Math.floor((date.getTime() - MSE) / _HOURS);
        },
        getMonths(date) {
            return date.getYear() * 12 + date.getMonth() + 1;
        },
        isObject(input) {
            return Object.prototype.toString.call(input) === '[object Object]';
        },
        isArray(input) {
            return input instanceof Array || Object.prototype.toString.call(input) === '[object Array]';
        },
        isDate(input) {
            return input instanceof Date || Object.prototype.toString.call(input) === '[object Date]';
        },
        isNumber(input) {
            return input instanceof Number || Object.prototype.toString.call(input) === '[object Number]';
        },
        isString(input) {
            return input instanceof String || Object.prototype.toString.call(input) === '[object String]';
        },
        extend(a, b) {
            for (var i in b) {
                if (hasOwnProp(b, i)) {
                    a[i] = b[i];
                }
            }

            if (hasOwnProp(b, 'toString')) {
                a.toString = b.toString;
            }

            if (hasOwnProp(b, 'valueOf')) {
                a.valueOf = b.valueOf;
            }

            return a;
        },
        makeGetSet(unit) {
            return function(value) {
                if (value != undefined) {
                    // if(unit=="Month")value = value>0?(value-1):0;
                    Date.prototype["set" + unit].call(this._date, value);
                    return this;
                } else {
                    return Date.prototype["get" + unit].call(this._date);
                    // return unit=="Month"?(result+1):result;
                }
            };
        }
    }


    function hasOwnProp(a, b) {
        return Object.prototype.hasOwnProperty.call(a, b);
    }


    _moment.prototype = {
        format(str) {
            let m = this;
            str = str || "l";
            let formatStr = FORMAT_LIST[str] || str;
            return Utils.format(m._date, formatStr);
        },
        toString() {
            return this._date.toString();
        },
        distance(_m, type) {
            let m = this;
            type = type || moment.DAY;
            _m = moment(_m);
            switch (type) {
                case moment.HOUR:
                    return Utils.getHours(m._date) - Utils.getHours(_m._date);
                case moment.DAY:
                    return Utils.getDays(m._date) - Utils.getDays(_m._date);
                case moment.MONTH:
                    return Utils.getMonths(m._date) - Utils.getMonths(_m._date);
                case moment.YEAR:
                    return m._date.getYear() - _m._date.getYear();
            }
            return 0;
        },
        isLeapYear() {
            return Utils.isLeapYear(this.year());
        },
        isThisYear() {
            return Utils.timestamp(this._date);
        },
        isBefore() {
            return Utils.timestamp(this._date);
        },
        isAfter() {
            return Utils.timestamp(this._date);
        },
        month(num) {
            let m = this;
            if (num == undefined) {
                return m._date.getMonth() + 1;
            }
            num = parseInt(num);
            num = m._date.setMonth(num - 1);
            return m;
        },
        add(num, type) {
            let m = this;
            num = parseInt(num);
            type = type || moment.DAY;

            switch (type) {
                case moment.DAY:
                    m.time(m.time() + (num * _DAYS));
                    break;
                case moment.MONTH:
                    let month_add = m.month() + num;
                    let year_add = Math.floor(month_add / 12);
                    month_add = month_add % 12;
                    m.add(year_add, moment.YEAR);
                    m.month(month_add);
                    break;
                case moment.YEAR:
                    m.year(m.year() + num);
                    break;
                case moment.HOUR:
                    m.time(m.time() + (num * _HOURS));
                    break;
                case moment.MINUTE:
                    m.time(m.time() + (num * _MINUTES));
                    break;
                case moment.SECOND:
                    m.time(m.time() + (num * _SECONDS));
                    break;
            }
            return m;
        },
        endOf(type) {
            let m = this;
            type = type || moment.DAY;
            m.startOf(type);
            m.add(1, type);
            if (moment.DAY == type) {
                m.add(-1, moment.SECOND);
            } else {
                m.add(-1, moment.DAY);
            }
            return m;
        },
        startOf(type) {
            let m = this;
            type = type || moment.DAY;
            switch (type) {
                case moment.DAY:
                    m.time(Math.floor((m.time()) / _DAYS) * _DAYS + MSE);
                    break;
                case moment.MONTH:
                    m.date(1);
                    m.startOf(moment.DAY);
                    break;
                case moment.YEAR:
                    m.month(0);
                    m.date(1);
                    m.startOf(moment.DAY);
                    break;
                case moment.HOUR:
                    m.time(Math.floor((m.time()) / _HOURS) * _HOURS + MSE);
                    break;
            }
            return m;
        }
    };

    let momentPrototype__proto = _moment.prototype;

    const methods = {
        "year": "FullYear",
        "day": "Day",
        "date": "Date",
        "hours": "Hours",
        "milliseconds": "Milliseconds",
        "seconds": "Seconds",
        "minutes": "Minutes",
        "time": "Time",
    };

    for (let unit in methods) {
        momentPrototype__proto[unit] = Utils.makeGetSet(methods[unit]);
    }

    let moment = function(param) {
        if (Utils.isObject(param)) {
            //config
            if (param.formatString && Utils.isObject(param.formatString)) {
                Utils.extend(FORMAT_LIST, param.formatString);
            }
        } else {
            return new _moment(param);
        }
    };

    moment.prototype.config = function(param) {
        if (param.formatString && Utils.isObject(param.formatString)) {
            Utils.extend(FORMAT_LIST, param.formatString);
        }
    };

    moment.SECOND = 2;
    moment.MINUTE = 3;
    moment.HOUR = 4;
    moment.DAY = 5;
    moment.MONTH = 6;
    moment.YEAR = 7;
    return moment;
}));
