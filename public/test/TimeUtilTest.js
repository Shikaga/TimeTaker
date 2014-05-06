require.config({
    map: {
        '*': {
            'js/TimestampGenerator': 'MockTimestampGenerator',
            'js/TextLogHandler': '../js/TextLogHandler',
            'js/TimeFormatter': '../js/TimeFormatter',
            'js/Log': '../js/Log',
            'js/Timer': '../js/Timer'
        }
    }
});

require(['../js/TimeUtil'], function(TimeUtil) {
    mockNode = sinon.spy();
    ko.applyBindings = sinon.spy();

    test( "todayTimestamp", function() {
        var fakeClock = sinon.useFakeTimers(10000000000); //18:46:40 26/4/1970
        var todayTimestamp = TimeUtil.prototype.getTodayTimestamp();

        equal(todayTimestamp, 9932400000) // 00:00:00 26/4/1970

        fakeClock.restore();
    });

    test( "tomorrowTimestamp", function() {
        var fakeClock = sinon.useFakeTimers(10000000000); //18:46:40 26/4/1970
        var tomorrowTimestamp = TimeUtil.prototype.getTomorrowTimestamp();

        equal(tomorrowTimestamp, 10018800000) // 00:00:00 27/4/1970

        fakeClock.restore();
    });

    test( "tomorrowTimestamp month rollover", function() {
        var fakeClock = sinon.useFakeTimers(10279600000); //00:26:40 30/4/1970
        var tomorrowTimestamp = TimeUtil.prototype.getTomorrowTimestamp();

        equal(tomorrowTimestamp, 10364400000) // 00:00:00 1/5/1970

        fakeClock.restore();
    });

    test( "firstOfWeekTimestamp", function() {
        var fakeClock = sinon.useFakeTimers(10000000000); //18:46:40 26/4/1970
        var firstOfWeekTimestamp = TimeUtil.prototype.getFirstOfWeekTimestamp();

        equal(firstOfWeekTimestamp, 9414000000) // 00:00:00 20/4/1970

        fakeClock.restore();
    });

    test( "firstOfNextWeekTimestamp", function() {
        var fakeClock = sinon.useFakeTimers(10000000000); //18:46:40 26/4/1970
        var firstOfWeekTimestamp = TimeUtil.prototype.getFirstOfNextWeekTimestamp();

        equal(firstOfWeekTimestamp, 10018800000) // 00:00:00 27/4/1970

        fakeClock.restore();
    });

    test( "firstOfMonthTimestamp", function() {
        var fakeClock = sinon.useFakeTimers(10000000000); //18:46:40 26/4/1970
        var firstOfMonthTimestamp = TimeUtil.prototype.getFirstOfMonthTimestamp();

        equal(firstOfMonthTimestamp, 7772400000) // 00:00:00 1/4/1970

        fakeClock.restore();
    });

    test( "firstOfNextMonthTimestamp", function() {
        var fakeClock = sinon.useFakeTimers(10000000000); //18:46:40 26/4/1970
        var firstOfNextMonthTimestamp = TimeUtil.prototype.getFirstOfNextMonthTimestamp();

        equal(firstOfNextMonthTimestamp, 10364400000) // 00:00:00 1/5/1970

        fakeClock.restore();
    });

    test( "firstOfNextMonthTimestamp year rollover", function() {
        var fakeClock = sinon.useFakeTimers(29964000000); //20:20:00 13/12/1970
        var firstOfNextMonthTimestamp = TimeUtil.prototype.getFirstOfNextMonthTimestamp();

        equal(firstOfNextMonthTimestamp, 31532400000) // 00:00:00 1/1/1971

        fakeClock.restore();
    });

    test( "firstOfYearMonthTimestamp year", function() {
        var fakeClock = sinon.useFakeTimers(61532400000); //05:20:00 14/12/1971
        var firstOfNextMonthTimestamp = TimeUtil.prototype.getFirstOfYearTimestamp();

        equal(firstOfNextMonthTimestamp, 31532400000) // 00:00:00 1/1/1971

        fakeClock.restore();
    });

    test( "firstOfNextYearMonthTimestamp year", function() {
        var fakeClock = sinon.useFakeTimers(61532400000); //05:20:00 14/12/1971
        var firstOfNextMonthTimestamp = TimeUtil.prototype.getFirstOfNextYearTimestamp();

        equal(firstOfNextMonthTimestamp, 63068400000) // 00:00:00 1/1/1972

        fakeClock.restore();
    });

    test( "datestamp", function() {
        equal(TimeUtil.prototype.getDateStamp(0), "01011970"); // 00:00:00 1/1/1972
        equal(TimeUtil.prototype.getDateStamp(61532400000), "14121971"); //05:20:00 14/12/1971
        equal(TimeUtil.prototype.getDateStamp(63068400000), "01011972"); // 00:00:00 1/1/1972
    });
});
