require.config({
    map: {
        '*': {
            'js/TimestampGenerator': 'MockTimestampGenerator',
            'js/Timer': 'MockTimer',
            'js/Session': '../js/Session',
            'js/Activity': '../js/Activity',
            'js/TimeFormatter': '../js/TimeFormatter'
        }
    }
});

require(['../js/ActivityTimeAccumulator', '../js/Activity', '../js/Session'], function(ActivityTimeAccumulator, Activity, Session) {
    ko.applyBindings = sinon.spy();

    test( "accumulator init", function() {
        var activity = new Activity();
        var session = new Session(activity);
        var accumulator = new ActivityTimeAccumulator(ko.observableArray([session]));
        equal(accumulator.getTotalTime(activity)(), 0);
    });

    test( "accumulator returns elapsed time for single session", function() {
        var activity = new Activity();
        var session = new Session(activity);
        session.timer.elapsedTime(100);
        var array = ko.observableArray([session]);

        var accumulator = new ActivityTimeAccumulator(array);
        equal(accumulator.getTotalTime(activity)(), 100);
    });

    test( "accumulator updates when session timer updates", function() {
        var activity = new Activity();
        var session = new Session(activity);
        session.timer.elapsedTime(100);
        var array = ko.observableArray([session]);

        var accumulator = new ActivityTimeAccumulator(array);
        var totalTime = accumulator.getTotalTime(activity);

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
        equal(accumulator.getTotalTime(activity)(), 1000);
    });


    test( "accumulator updates when session added", function() {
        var activity = new Activity();
        var session = new Session(activity);
        session.timer.elapsedTime(100);
        var array = ko.observableArray([session]);

        var accumulator = new ActivityTimeAccumulator(array);
        var totalTime = accumulator.getTotalTime(activity);


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

        var totalTime1 = accumulator.getTotalTime(activity);
        var totalTime2 = accumulator.getTotalTime(activity2);

        equal(totalTime1(), 100);
        equal(totalTime2(), 200);
    });
});