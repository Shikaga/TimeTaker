require.config({
    map: {
        '*': {
            "js/ColorPalette": "../js/ColorPalette",
            "js/GoalHandler": "../js/GoalHandler",
            "js/TimeUtil": "../js/TimeUtil"
        }
    }
});

require(['../js/Activity','../js/Session', '../js/CalendarUtils', 'MockGlobals'], function(Activity, Session, CalendarUtils, MockGlobals) {
    globals = MockGlobals;

    test( "a single session returns in its date", function() {
        var activity = new Activity();
        var session = new Session(activity);
        session.timer.startTime = new ko.observable(0);
        var calendarUtils = new CalendarUtils();
        var sessions = new ko.observableArray();
        sessions.push(session);

        var dayMap = calendarUtils.getSortedDayMapForSessions(sessions);
        deepEqual(Object.keys(dayMap), ["01011970"]);
        equal(dayMap["01011970"][0], session);
    });

    test( "a two sessions returns different dates", function() {
        var activity = new Activity();
        var session = new Session(activity);
        session.timer.startTime = new ko.observable(0);//1/1/1970
        var session2 = new Session(activity);
        session2.timer.startTime = new ko.observable(10000000000);//18:46:40 26/4/1970

        var calendarUtils = new CalendarUtils();
        var sessions = new ko.observableArray();
        sessions.push(session);
        sessions.push(session2);

        debugger;
        var dayMap = calendarUtils.getSortedDayMapForSessions(sessions);
        deepEqual(Object.keys(dayMap), ["26041970", "01011970"]);
        equal(dayMap["01011970"][0], session);
        equal(dayMap["26041970"][0], session2);
    });
});