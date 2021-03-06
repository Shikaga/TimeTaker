define(['js/TextLogHandler', 'js/Timer', 'js/ActivitySelector'], function(TextLogHandler, Timer, ActivitySelector) {
	function FreeformTimerHandler(activities,sessions) {
        this.activitySelector = new ActivitySelector(activities);

		this.startButtonVisible = ko.observable(true);
		this.stopButtonVisible = ko.observable(false);
        this.durationVisible = ko.observable(false);
        this.freeformTimerVisible = ko.computed(function() {
            return activities().length > 0
        })

		this.textLogHandler = new TextLogHandler(sessions);
        this.timer = new Timer();
        this.clickStart = function() {
            this.startButtonVisible(false);
            this.stopButtonVisible(true);
            this.durationVisible(true);
            this.textLogHandler.addSession(this.activitySelector.selectedActivity());
            this.timer.start();
        }.bind(this);
        this.clickStop = function() {
            this.startButtonVisible(true);
            this.stopButtonVisible(false);
            this.durationVisible(false);
            this.timer.stop();
            this.textLogHandler.stopSession();
        }
	}
	return FreeformTimerHandler;
})