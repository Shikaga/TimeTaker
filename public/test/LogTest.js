require.config({
    map: {
        '*': {
            'js/TimestampGenerator': 'MockTimestampGenerator',
            'js/Timer': 'MockTimer'
        }
    }
});

require(['../js/Log'], function(Log) {

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
    })
});