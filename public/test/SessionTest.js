require(['../lib/squire', 'test/MockTimer'], function(Squire, MockTimer) {
//    globals = MockGlobals;
    var squire = new Squire();
    squire.mock('js/Timer', MockTimer);

    squire.require(['js/Activity','js/Session', 'test/MockGlobals','lib/emitr'], function(Activity, Session, MockGlobals, Emitr) {
        emitr = new Emitr();

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
            equal(serial.timer, "serializedTimer");
        })

        test("deserialize", function() {
            var activity = new Activity();
            var session = new Session(activity);
            session.addLog("exampleLog");

            var serial = session.serialize();

            var session2 = new Session(activity);
            session2.deserialize(serial);

            equal(session2.logs()[0].text(), "exampleLog");
            equal(session2.timer.deserialize.calledWith("serializedTimer"), true);

        })
    });
});