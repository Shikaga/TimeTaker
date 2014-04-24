require.config({
    map: {
        '*': {
            'js/TimestampGenerator': 'MockTimestampGenerator',
            'js/TextLogHandler': '../js/TextLogHandler'
        }
    }
});

require(['../js/Timer'], function(Timer) {
    mockNode = sinon.spy();
    ko.applyBindings = sinon.spy();



    test( "Timer starts at 00:00", function() {
        var timer = new Timer();
        equal(timer.output(), "00:00");
    });

    test( "Timer increments every second to 00:05", function() {
        var fakeClock = sinon.useFakeTimers();

        var timer = new Timer();
        timer.start();

        equal(timer.output(), "00:00");
        fakeClock.tick(500);
        equal(timer.output(), "00:00");
        fakeClock.tick(500);
        equal(timer.output(), "00:01");
        fakeClock.tick(500);
        equal(timer.output(), "00:01");
        fakeClock.tick(500);
        equal(timer.output(), "00:02");
        fakeClock.tick(500);
        equal(timer.output(), "00:02");
        fakeClock.tick(500);
        equal(timer.output(), "00:03");
        fakeClock.tick(500);
        equal(timer.output(), "00:03");
        fakeClock.tick(500);
        equal(timer.output(), "00:04");
        fakeClock.tick(500);
        equal(timer.output(), "00:04");
        fakeClock.tick(500);
        equal(timer.output(), "00:05");

        fakeClock.restore();
    });

    test( "Timer increments every 5 second to 00:30", function() {
        var fakeClock = sinon.useFakeTimers();

        var timer = new Timer();
        timer.start();

        equal(timer.output(), "00:00");
        fakeClock.tick(5000);
        equal(timer.output(), "00:05");
        fakeClock.tick(2500);
        equal(timer.output(), "00:05");
        fakeClock.tick(2500);
        equal(timer.output(), "00:10");
        fakeClock.tick(2500);
        equal(timer.output(), "00:10");
        fakeClock.tick(2500);
        equal(timer.output(), "00:15");
        fakeClock.tick(2500);
        equal(timer.output(), "00:15");
        fakeClock.tick(2500);
        equal(timer.output(), "00:20");
        fakeClock.tick(2500);
        equal(timer.output(), "00:20");
        fakeClock.tick(2500);
        equal(timer.output(), "00:25");
        fakeClock.tick(2500);
        equal(timer.output(), "00:25");
        fakeClock.tick(2500);
        equal(timer.output(), "00:30");

        fakeClock.restore();
    });

    test( "Timer increments every 5 second to 00:30", function() {
        var fakeClock = sinon.useFakeTimers();

        var timer = new Timer();
        timer.start();

        equal(timer.output(), "00:00");
        fakeClock.tick(5000);
        equal(timer.output(), "00:05");
        fakeClock.tick(2500);
        equal(timer.output(), "00:05");
        fakeClock.tick(2500);
        equal(timer.output(), "00:10");
        fakeClock.tick(2500);
        equal(timer.output(), "00:10");
        fakeClock.tick(2500);
        equal(timer.output(), "00:15");
        fakeClock.tick(2500);
        equal(timer.output(), "00:15");
        fakeClock.tick(2500);
        equal(timer.output(), "00:20");
        fakeClock.tick(2500);
        equal(timer.output(), "00:20");
        fakeClock.tick(2500);
        equal(timer.output(), "00:25");
        fakeClock.tick(2500);
        equal(timer.output(), "00:25");
        fakeClock.tick(2500);
        equal(timer.output(), "00:30");

        fakeClock.restore();
    });

    test( "Timer increments every 30 second to 02:00", function() {
        var fakeClock = sinon.useFakeTimers();

        var timer = new Timer();
        timer.start();

        equal(timer.output(), "00:00");
        fakeClock.tick(30000);
        equal(timer.output(), "00:30");
        fakeClock.tick(15000);
        equal(timer.output(), "00:30");
        fakeClock.tick(15000);
        equal(timer.output(), "01:00");
        fakeClock.tick(15000);
        equal(timer.output(), "01:00");
        fakeClock.tick(15000);
        equal(timer.output(), "01:30");
        fakeClock.tick(15000);
        equal(timer.output(), "01:30");
        fakeClock.tick(15000);
        equal(timer.output(), "02:00");
        fakeClock.tick(15000);
        equal(timer.output(), "02:00");

        fakeClock.restore();
    });


    test( "Timer increments every minute from 02:00", function() {
        var fakeClock = sinon.useFakeTimers();

        var timer = new Timer();
        timer.start();

        equal(timer.output(), "00:00");
        fakeClock.tick(2 * 60000);
        equal(timer.output(), "02:00");
        fakeClock.tick(30000);
        equal(timer.output(), "02:00");
        fakeClock.tick(30000);
        equal(timer.output(), "03:00");
        fakeClock.tick(30000);
        equal(timer.output(), "03:00");
        fakeClock.tick(30000);
        equal(timer.output(), "04:00");
        fakeClock.tick(30000);
        equal(timer.output(), "04:00");
        fakeClock.tick(30000);
        equal(timer.output(), "05:00");
        fakeClock.tick(5 * 60000);
        equal(timer.output(), "10:00");

        fakeClock.restore();
    });

    test( "Timer shows hour after 60 minutes", function() {
        var fakeClock = sinon.useFakeTimers();

        var timer = new Timer();
        timer.start();

        equal(timer.output(), "00:00");
        fakeClock.tick(59 * 60 * 1000);
        equal(timer.output(), "59:00");
        fakeClock.tick(60000);
        equal(timer.output(), "1:00:00");
        fakeClock.tick(60000);
        equal(timer.output(), "1:01:00");

        fakeClock.restore();
    });

    test( "Timer resets on stop", function() {
        var fakeClock = sinon.useFakeTimers();

        var timer = new Timer();
        timer.start();

        equal(timer.output(), "00:00");
        fakeClock.tick(1000);
        equal(timer.output(), "00:01");
        timer.stop();
        equal(timer.output(), "00:00");
        fakeClock.tick(1000);
        equal(timer.output(), "00:00");

        fakeClock.restore();
    });

    test( "starts with current time shown for begin and end", function() {

        var fakeClock = sinon.useFakeTimers(0); //00:00 1/1/1970

        var timer = new Timer();
        timer.start();
        equal(timer.startTime(),"1:00 AM");
        equal(timer.endTime(),"1:00 AM");

        fakeClock.restore();
    });

    test( "startTime is set correctly", function() {

        var fakeClock = sinon.useFakeTimers(10000000000); //18:46:40 26/4/1970

        var timer = new Timer();
        timer.start();
        equal(timer.startTime(),"6:46 PM");
        equal(timer.endTime(),"6:46 PM");


        fakeClock.restore();
    });

    test( "after one minute end time increments", function() {

        var fakeClock = sinon.useFakeTimers(0); //01:00:00 1/1/1970

        var timer = new Timer();
        timer.start();
        equal(timer.endTime(),"1:00 AM");
        fakeClock.tick(30000);
        equal(timer.endTime(), "1:00 AM");
        fakeClock.tick(30000);
        equal(timer.endTime(), "1:01 AM");
        fakeClock.tick(9 * 60000);
        equal(timer.endTime(), "1:10 AM");


        fakeClock.restore();
    });

    test( "serialize", function() {
        var fakeClock = sinon.useFakeTimers(0); //01:00:00 1/1/1970

        var timer = new Timer();
        timer.start();
        fakeClock.tick(60000);
        timer.stop();

        var serial = timer.serialize();
        equal(serial.start, 0);
        equal(serial.stop, 60000);


        fakeClock.restore();
    });


    test( "deserialize", function() {
        var fakeClock = sinon.useFakeTimers(0); //01:00:00 1/1/1970

        var timer = new Timer();
        timer.deserialize({
            start: 60000,
            stop: 120000
        })

        equal(timer.startTime(),"1:01 AM");
        equal(timer.endTime(),"1:02 AM");

        fakeClock.restore();
    });
});
