define(['js/TextLogHandler', 'js/Timer', 'js/ActivitySelector'], function(TextLogHandler, Timer, ActivitySelector) {
	function FreeformTimerHandler(activities) {
        this.activitySelector = new ActivitySelector(activities);

		this.startButtonVisible = ko.observable(true);
		this.stopButtonVisible = ko.observable(false);
        this.durationVisible = ko.observable(false);
        this.freeformTimerVisible = ko.computed(function() {
            return activities().length > 0
        })

		this.textLogHandler = new TextLogHandler();
        x = this;
        this.timer = new Timer();
        this.clickStart = function() {
            this.startButtonVisible(false);
            this.stopButtonVisible(true);
            this.durationVisible(true);
            this.textLogHandler.addSession({name: 'TempActivity'});
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