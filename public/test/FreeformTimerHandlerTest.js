require(['js/FreeformTimerHandler'], function(FreeformTimerHandler) {
	mockSessions = ko.observableArray();
    mockActivities = ko.observableArray([{name: 'actvity1'}, {name: 'activity2'}]);

	test( "freeformTimerHandler init", function() {
		var tlh = new FreeformTimerHandler(mockActivities, mockSessions);
		equal(tlh.startButtonVisible(), true);
        equal(tlh.stopButtonVisible(), false);
        equal(tlh.durationVisible(), false);
        equal(tlh.freeformTimerVisible(), true);
        equal(tlh.textLogHandler.sessions, mockSessions);
	});

    test("freeformTimer hidden when no activities present", function() {
        var emptyActivities = ko.observableArray([]);
        var tlh = new FreeformTimerHandler(emptyActivities, mockSessions);
        equal(tlh.freeformTimerVisible(), false);
        emptyActivities.push({name: 'activity1'});
        equal(tlh.freeformTimerVisible(), true);
        emptyActivities.pop();
        equal(tlh.freeformTimerVisible(), false);
    })

    test( "starts timer and toggles buttons when start clicked", function() {
        var tlh = new FreeformTimerHandler(mockActivities, mockSessions);
        tlh.textLogHandler.addSession = sinon.spy();
        tlh.timer.start = sinon.spy();

        tlh.clickStart();
        equal(tlh.startButtonVisible(), false);
        equal(tlh.stopButtonVisible(), true);
        equal(tlh.durationVisible(), true);
        equal(tlh.timer.start.called, true);
        equal(tlh.textLogHandler.addSession.calledWith(tlh.activitySelector.selectedActivity()), true)
    });

    test( "clears timer and toggles buttons when stop clicked", function() {
        var tlh = new FreeformTimerHandler(mockActivities, mockSessions);
        tlh.textLogHandler.stopSession = sinon.spy();
        tlh.timer.stop = sinon.spy();

        tlh.clickStart();
        tlh.clickStop();
        equal(tlh.startButtonVisible(), true);
        equal(tlh.stopButtonVisible(), false);
        equal(tlh.durationVisible(), false);
        equal(tlh.timer.stop.called, true);

        equal(tlh.textLogHandler.stopSession.called, true)
    });

});