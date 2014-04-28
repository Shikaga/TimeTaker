define([], function() {
    function TimeUtil() {

    }
    TimeUtil.prototype.getTodayTimestamp = function() {
        var date = new Date();
        var beginningOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        return beginningOfDay.getTime();
    }

    TimeUtil.prototype.getTomorrowTimestamp = function() {
        var date = new Date();
        var beginningOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
        return beginningOfDay.getTime();
    }

    TimeUtil.prototype.getFirstOfWeekTimestamp = function() {
        var date = new Date();
        var day = date.getDay();
        var beginningOfMonth = new Date(date.getFullYear(), date.getMonth(), date.getDate()  - day + (day == 0 ? -6:1));
        return beginningOfMonth.getTime();
    }

    TimeUtil.prototype.getFirstOfNextWeekTimestamp = function() {
        var date = new Date();
        var day = date.getDay();
        var beginningOfMonth = new Date(date.getFullYear(), date.getMonth(), date.getDate()  - day + (day == 0 ? -6:1) + 7);
        return beginningOfMonth.getTime();
    }

    TimeUtil.prototype.getFirstOfMonthTimestamp = function() {
        var date = new Date();
        var beginningOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
        return beginningOfMonth.getTime();
    }

    TimeUtil.prototype.getFirstOfNextMonthTimestamp = function() {
        var date = new Date();
        var beginningOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 1);
        return beginningOfMonth.getTime();
    }

    TimeUtil.prototype.getFirstOfYearTimestamp = function() {
        var date = new Date();
        var beginningOfYear = new Date(date.getFullYear(), 0, 1);
        return beginningOfYear.getTime();
    }

    TimeUtil.prototype.getFirstOfNextYearTimestamp = function() {
        var date = new Date();
        var beginningOfYear = new Date(date.getFullYear() + 1, 0, 1);
        return beginningOfYear.getTime();
    }

    return TimeUtil;
})