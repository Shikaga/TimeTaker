define([], function() {
    var TimeFormatter = {

    }

    TimeFormatter.hoursMinutesSecond = function(timeElapsedInMilliseconds) {
        var minutesSeconds = Math.floor(timeElapsedInMilliseconds / 600000) % 6 + ""
            + Math.floor(timeElapsedInMilliseconds / 60000) % 10 + ":"
            + Math.floor(timeElapsedInMilliseconds / 10000) % 6 + ""
            + Math.floor(timeElapsedInMilliseconds / 1000) % 10;
        if (timeElapsedInMilliseconds >= 60 * 60 * 1000) {
            var hours = Math.floor(timeElapsedInMilliseconds / 3600000)
            return hours + ":" + minutesSeconds;
        } else {
            return minutesSeconds;
        }
    }

    return TimeFormatter;
})