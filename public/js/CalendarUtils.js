define(["js/TimeUtil"], function(TimeUtil) {
    function CalendarUtils() {

    }

    CalendarUtils.prototype.getSortedDayMapForSessions = function(sessions) {
        var dayMap = {};
        sessions().forEach(function(session) {
            var datestamp = TimeUtil.prototype.getDateStamp(session.timer.startTime());
            if (!dayMap[datestamp]) {
                dayMap[datestamp] = [];
            }
            dayMap[datestamp].push(session);
        })
        return dayMap;
    }

    return CalendarUtils;
})