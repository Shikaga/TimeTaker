require.config({
    map: {
        '*': {
            'js/TimestampGenerator': 'MockTimestampGenerator',
            'js/Timer': 'MockTimer',
            'js/Session': '../js/Session',
            'js/Activity': '../js/Activity',
            'js/TimeFormatter': '../js/TimeFormatter',
            'js/TimeUtil': 'MockTimeUtil',
            'js/SubscriptionDisposer': '../js/SubscriptionDisposer'
        }
    }
});

require(['../js/ActivityTimeAccumulator', '../js/Activity', '../js/Session', 'MockTimeUtil'], function(ActivityTimeAccumulator, Activity, Session, MockTimeUtil) {
    ko.applyBindings = sinon.spy();

    test( "accumulator init", function() {
        var activity = new Activity();
        var session = new Session(activity);
        var accumulator = new ActivityTimeAccumulator(ko.observableArray([]));
        equal(accumulator._getTotalTime(activity)(), 0);
    });

    test( "accumulator returns elapsed time for single session", function() {
        var activity = new Activity();
        var session = new Session(activity);
        session.timer.elapsedTime(100);
        var array = ko.observableArray([session]);

        var accumulator = new ActivityTimeAccumulator(array);
        equal(accumulator._getTotalTime(activity)(), 100);
    });

    test( "accumulator updates when session timer updates", function() {
        var activity = new Activity();
        var session = new Session(activity);
        session.timer.elapsedTime(100);
        var array = ko.observableArray([session]);

        var accumulator = new ActivityTimeAccumulator(array);
        var totalTime = accumulator._getTotalTime(activity);

        session.timer.elapsedTime(200);
        equal(totalTime(), 200);
    });

    test( "accumulator returns elapsed time for multiple sessions", function() {
        var activity = new Activity();
        var session = new Session(activity);
        session.timer.elapsedTime(100);
        var session2 = new Session(activity);
        session2.timer.elapsedTime(900);
        var array = ko.observableArray([session, session2]);

        var accumulator = new ActivityTimeAccumulator(array);
        equal(accumulator._getTotalTime(activity)(), 1000);
    });


    test( "accumulator updates when session added", function() {
        var activity = new Activity();
        var session = new Session(activity);
        session.timer.elapsedTime(100);
        var array = ko.observableArray([session]);

        var accumulator = new ActivityTimeAccumulator(array);
        var totalTime = accumulator._getTotalTime(activity);


        var session2 = new Session(activity);
        session2.timer.elapsedTime(900);
        array.push(session2);

        equal(totalTime(), 1000);
    });

    test( "accumulator only sums sessions for specified activity", function() {
        var activity = new Activity();
        var session = new Session(activity);
        var activity2 = new Activity();
        var session2 = new Session(activity2);

        session.timer.elapsedTime(100);
        session2.timer.elapsedTime(200);
        var array = ko.observableArray([session, session2]);

        var accumulator = new ActivityTimeAccumulator(array);

        var totalTime1 = accumulator._getTotalTime(activity);
        var totalTime2 = accumulator._getTotalTime(activity2);

        equal(totalTime1(), 100);
        equal(totalTime2(), 200);
    });

    test( "accumulator can pick sessions started today", function() {
        MockTimeUtil.prototype.getTodayTimestamp = function() {return 100}
        MockTimeUtil.prototype.getTomorrowTimestamp = function() {return 300}

        var activity = new Activity();
        var session = new Session(activity);
        session.timer.elapsedTime(100);
        session.timer.startTimestamp = ko.observable(0);

        var session2 = new Session(activity);
        session2.timer.elapsedTime(200);
        session2.timer.startTimestamp = ko.observable(200);

        var session3 = new Session(activity);
        session3.timer.elapsedTime(400);
        session3.timer.startTimestamp = ko.observable(1000);


        var array = ko.observableArray([session, session2, session3]);

        var accumulator = new ActivityTimeAccumulator(array);
        equal(accumulator._getTotalTimeToday(activity)(), 200);

        MockTimeUtil.prototype.getTodayTimestamp = function() {}
        MockTimeUtil.prototype.getTomorrowTimestamp = function() {}
    });

    test( "accumulator can pick sessions started this week", function() {
        MockTimeUtil.prototype.getFirstOfWeekTimestamp = function() {return 100}
        MockTimeUtil.prototype.getFirstOfNextWeekTimestamp = function() {return 300}

        var activity = new Activity();
        var session = new Session(activity);
        session.timer.elapsedTime(100);
        session.timer.startTimestamp = ko.observable(0);

        var session2 = new Session(activity);
        session2.timer.elapsedTime(200);
        session2.timer.startTimestamp = ko.observable(200);

        var session3 = new Session(activity);
        session3.timer.elapsedTime(400);
        session3.timer.startTimestamp = ko.observable(1000);


        var array = ko.observableArray([session, session2, session3]);

        var accumulator = new ActivityTimeAccumulator(array);
        equal(accumulator._getTotalTimeThisWeek(activity)(), 200);

        MockTimeUtil.prototype.getFirstOfWeekTimestamp = function() {}
        MockTimeUtil.prototype.getFirstOfNextWeekTimestamp = function() {}
    });


    test( "accumulator can pick sessions started this month", function() {
        MockTimeUtil.prototype.getFirstOfMonthTimestamp = function() {return 100}
        MockTimeUtil.prototype.getFirstOfNextMonthTimestamp = function() {return 300}

        var activity = new Activity();
        var session = new Session(activity);
        session.timer.elapsedTime(100);
        session.timer.startTimestamp = ko.observable(0);

        var session2 = new Session(activity);
        session2.timer.elapsedTime(200);
        session2.timer.startTimestamp = ko.observable(200);

        var session3 = new Session(activity);
        session3.timer.elapsedTime(400);
        session3.timer.startTimestamp = ko.observable(1000);


        var array = ko.observableArray([session, session2, session3]);

        var accumulator = new ActivityTimeAccumulator(array);
        equal(accumulator._getTotalTimeThisMonth(activity)(), 200);

        MockTimeUtil.prototype.getFirstOfMonthTimestamp = function() {}
        MockTimeUtil.prototype.getFirstOfNextMonthTimestamp = function() {}
    });


    test( "accumulator can pick sessions started this year", function() {
        MockTimeUtil.prototype.getFirstOfYearTimestamp = function() {return 100}
        MockTimeUtil.prototype.getFirstOfNextYearTimestamp = function() {return 300}

        var activity = new Activity();
        var session = new Session(activity);
        session.timer.elapsedTime(100);
        session.timer.startTimestamp = ko.observable(0);

        var session2 = new Session(activity);
        session2.timer.elapsedTime(200);
        session2.timer.startTimestamp = ko.observable(200);

        var session3 = new Session(activity);
        session3.timer.elapsedTime(400);
        session3.timer.startTimestamp = ko.observable(1000);


        var array = ko.observableArray([session, session2, session3]);

        var accumulator = new ActivityTimeAccumulator(array);
        equal(accumulator._getTotalTimeThisYear(activity)(), 200);

        MockTimeUtil.prototype.getFirstOfYearTimestamp = function() {}
        MockTimeUtil.prototype.getFirstOfNextYearTimestamp = function() {}
    });
});