require.config({
	map: {
		'*': {
			'js/TimestampGenerator': 'MockTimestampGenerator',
            'js/TextLogHandler': '../js/TextLogHandler',
            'js/Timer': 'MockTimer'
		}
	}
});

require(['../js/FreeformTimerHandler'], function(FreeformTimerHandler) {
	mockNode = sinon.spy();
	ko.applyBindings = sinon.spy();

	test( "freeformTimerHandler init", function() {
		var tlh = new FreeformTimerHandler();
		equal(tlh.startButtonVisible(), true);
		equal(tlh.stopButtonVisible(), false);
        equal(tlh.textLogHandler.sessions().length, 0);
	});

    test( "starts timer and toggles buttons when start clicked", function() {
        var tlh = new FreeformTimerHandler();
        tlh.textLogHandler.addSession = sinon.spy();

        tlh.clickStart();
        equal(tlh.startButtonVisible(), false);
        equal(tlh.stopButtonVisible(), true);
        equal(tlh.timer.start.called, true);
        equal(tlh.textLogHandler.addSession.called, true)
    });

    test( "clears timer and toggles buttons when stop clicked", function() {
        var tlh = new FreeformTimerHandler();
        tlh.textLogHandler.stopSession = sinon.spy();

        tlh.clickStart();
        tlh.clickStop();
        equal(tlh.startButtonVisible(), true);
        equal(tlh.stopButtonVisible(), false);
        equal(tlh.timer.stop.called, true);

        equal(tlh.textLogHandler.stopSession.called, true)
    });

});