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
	});

    test( "starts timer and toggles buttons when start clicked", function() {
        var tlh = new FreeformTimerHandler();
        tlh.clickStart();
        equal(tlh.startButtonVisible(), false);
        equal(tlh.stopButtonVisible(), true);
        equal(tlh.timer.start.called, true);
    });

    test( "stops timer and toggles buttons when stop clicked", function() {
        var tlh = new FreeformTimerHandler();
        tlh.clickStart();
        tlh.clickStop();
        equal(tlh.startButtonVisible(), true);
        equal(tlh.stopButtonVisible(), false);
        equal(tlh.timer.stop.called, true);
    });

});