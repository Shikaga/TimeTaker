
require(['js/InactivityNotifier', 'test/MockGlobals', 'lib/emitr'], function(InactivityNotifier, MockGlobals, Emitr) {
    globals = MockGlobals;
    emitr = new Emitr();
    mockNode = sinon.spy();
    ko.applyBindings = sinon.spy();

    test( "InactivityNotifier init", function() {
        var inactivityNotifier = new InactivityNotifier();
        equal(0,0);
    });

    test( "InactivityNotifier will notify the user after 20 minutes", function() {

        var notifyCalled = false;
        var notifyMessage = null;
        emitr.on('notify', function(message) {
            notifyCalled = true;
            notifyMessage = message;
        })

        var fakeClock = sinon.useFakeTimers(0); //01:00:00 1/1/1970
        var inactivityNotifier = new InactivityNotifier();

        fakeClock.tick(19 * 60 * 1000);
        equal(notifyCalled,false);

        fakeClock.tick(1 * 60 * 1000);
        equal(notifyCalled,true);
        equal(notifyMessage, 'What are you up to?');

        fakeClock.restore();
    });

    test( "InactivityNotifier will reset its timer when user event occurs 20 minutes", function() {

        var notifyCalled = false;
        var notifyMessage = null;
        emitr.on('notify', function(message) {
            notifyCalled = true;
            notifyMessage = message;
        })

        var fakeClock = sinon.useFakeTimers(0); //01:00:00 1/1/1970
        var inactivityNotifier = new InactivityNotifier();

        fakeClock.tick(19 * 60 * 1000);
        equal(notifyCalled,false);
        emitr.trigger('userevent');

        fakeClock.tick(1 * 60 * 1000);
        equal(notifyCalled,false);

        fakeClock.tick(19 * 60 * 1000);
        equal(notifyCalled,true);
        equal(notifyMessage, 'What are you up to?');

        notifyCalled = false;

        fakeClock.tick(40 * 60 * 1000);
        equal(notifyCalled,false);

        fakeClock.restore();
    });
});