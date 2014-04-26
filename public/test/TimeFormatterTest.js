require.config({
    map: {
        '*': {
        }
    }
});

require(['../js/TimeFormatter'], function(TimeFormatter) {


    test( "hoursMinutesSecondsFormat", function() {
        function timeEqual(time, expected) {
            equal(TimeFormatter.hoursMinutesSecond(time), expected);
        }

        timeEqual(0, "00:00");
        timeEqual(999, "00:00");
        timeEqual(1000, "00:01");
        timeEqual(9000, "00:09");
        timeEqual(59000, "00:59");
        timeEqual(60000, "01:00");
        timeEqual(9*60000, "09:00");
        timeEqual(10*60000, "10:00");
        timeEqual(59*60000, "59:00");
        timeEqual(60*60000, "1:00:00");
        timeEqual(25*60*60000, "25:00:00"); //No such thing as days
    });

});
