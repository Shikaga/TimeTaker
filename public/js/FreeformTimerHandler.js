define(['js/TextLogHandler', 'js/Timer'], function(TextLogHandler, Timer) {
	function FreeformTimerHandler() {
		this.startButtonVisible = ko.observable(true);
		this.stopButtonVisible = ko.observable(false);
		this.textLogHandler = new TextLogHandler();
        this.timer = new Timer();
        this.clickStart = function() {
            this.startButtonVisible(false);
            this.stopButtonVisible(true);
            this.timer.start();
        }.bind(this);
        this.clickStop = function() {
            this.startButtonVisible(true);
            this.stopButtonVisible(false);
            this.timer.stop();

        }
	}
	return FreeformTimerHandler;
})