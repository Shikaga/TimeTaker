define(['js/TextLogHandler', 'js/Timer'], function(TextLogHandler, Timer) {
	function FreeformTimerHandler() {
		this.startButtonVisible = ko.observable(true);
		this.stopButtonVisible = ko.observable(false);
        this.durationVisible = ko.observable(false);

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