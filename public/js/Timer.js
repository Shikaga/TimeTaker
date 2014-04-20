define([], function() {
	function Timer() {
        this.timerInterval = null;
		this.output = ko.observable(this.getTimeOutput(0));
	}

    Timer.prototype.getTimeOutput = function(timeElapsedInMilliseconds) {
        if (timeElapsedInMilliseconds < 5000) {
            return "00:0" + Math.floor(timeElapsedInMilliseconds / 1000);
        } else if (timeElapsedInMilliseconds < 30000) {
            return "00:" + Math.floor(timeElapsedInMilliseconds / 10000) + "" + (5 * Math.floor(timeElapsedInMilliseconds / 5000) % 10);
        } else if (timeElapsedInMilliseconds < 120000) {
            return "0" + Math.floor(timeElapsedInMilliseconds / 60000) + ":" + (3 * Math.floor(timeElapsedInMilliseconds / 30000)) % 6 + "0";
        } else if (timeElapsedInMilliseconds < 3600000) {
            return Math.floor(timeElapsedInMilliseconds / 600000) + "" + Math.floor(timeElapsedInMilliseconds / 60000) % 10 + ":00"
        } else {
            return Math.floor(timeElapsedInMilliseconds / 3600000) + ":" + Math.floor(timeElapsedInMilliseconds / 600000) % 6 + "" + Math.floor(timeElapsedInMilliseconds / 60000) % 10 + ":00"
        }
    }

	Timer.prototype.start = function() {
        this.timeStarted = new Date().getTime();
        this.timerInterval = setInterval(function() {
            var timeElapsedMilliseconds = new Date().getTime() - this.timeStarted;
            this.output(this.getTimeOutput(timeElapsedMilliseconds));
        }.bind(this),100);
	}

	Timer.prototype.stop = function() {
        clearInterval(this.timerInterval);
        this.timeStarted = null;
        this.output(this.getTimeOutput(0));
	}

	return Timer;
})