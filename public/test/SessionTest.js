require.config({
    map: {
        '*': {
            "js/ColorPalette": "../js/ColorPalette",
            'js/TimestampGenerator': 'MockTimestampGenerator',
            'js/Timer': 'MockTimer',
            'js/Log': '../js/Log'
        }
    }
});

require(['../js/Activity','../js/Session'], function(Activity, Session) {

    test("add logs", function() {
        var activity = new Activity();
        var session = new Session(activity);
        session.addLog("exampleLog");

        equal(session.logs()[0].text(), "exampleLog");
    })

    test("serialize", function() {
        var activity = new Activity();
        var session = new Session(activity);
        session.addLog("exampleLog");

        var serial = session.serialize();
        equal(serial.activityId, activity.id);
        equal(serial.logs[0].text, "exampleLog");
    })

    test("deserialize", function() {
        var activity = new Activity();
        var session = new Session(activity);
        session.addLog("exampleLog");

        var serial = session.serialize();

        var session2 = new Session(activity);
        session2.deserialize(serial);

        equal(session2.logs()[0].text(), "exampleLog");

    })
});