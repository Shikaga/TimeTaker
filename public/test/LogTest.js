require(['../lib/squire', 'test/MockTimer', 'test/MockTimestampGenerator'], function(Squire, MockTimer, MockTimestampGenerator) {

//    globals = MockGlobals;
    var squire = new Squire();
    squire.mock('js/Timer', MockTimer);
    squire.mock('js/TimestampGenerator', MockTimestampGenerator);

    squire.require(['js/Log'], function(Log) {

        test("new log includes timestamp", function() {
            var log = new Log("logMessage");
            equal(log.text(), "logMessage");
            equal(log.timestamp(), "MockTimestamp");
        })

        test("serialize", function() {
            var log = new Log("logMessage");

            var serial = log.serialize();
            equal(serial.text, "logMessage");
            equal(serial.timestamp, "MockTimestamp");
        })

        test("deserialize", function() {
            var log = new Log();

            log.deserialize({
                text: "logMessage",
                timestamp: "logMessage"
            })

            equal(log.text(), "logMessage");
            equal(log.timestamp(), "logMessage");
        });
    });
});