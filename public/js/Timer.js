define([], function() {
	function Timer() {
        this.timeElapsedMilliseconds = 0;
        this.timerInterval = null;
		this.output = ko.observable(this.getTimeOutput());
	}

    Timer.prototype.getTimeOutput = function() {
        if (this.timeElapsedMilliseconds < 5000) {
            return "00:0" + Math.floor(this.timeElapsedMilliseconds / 1000);
        } else if (this.timeElapsedMilliseconds < 30000) {
            return "00:" + Math.floor(this.timeElapsedMilliseconds / 10000) + "" + (5 * Math.floor(this.timeElapsedMilliseconds / 5000) % 10);
        } else if (this.timeElapsedMilliseconds < 120000) {
            return "0" + Math.floor(this.timeElapsedMilliseconds / 60000) + ":" + (3 * Math.floor(this.timeElapsedMilliseconds / 30000)) % 6 + "0";
        } else if (this.timeElapsedMilliseconds < 3600000) {
            return Math.floor(this.timeElapsedMilliseconds / 600000) + "" + Math.floor(this.timeElapsedMilliseconds / 60000) % 10 + ":00"
        } else {
            return Math.floor(this.timeElapsedMilliseconds / 3600000) + ":" + Math.floor(this.timeElapsedMilliseconds / 600000) % 6 + "" + Math.floor(this.timeElapsedMilliseconds / 60000) % 10 + ":00"
        }
    }

	Timer.prototype.start = function() {
        this.timerInterval = setInterval(function() {
            this.timeElapsedMilliseconds += 100;
            this.output(this.getTimeOutput());
        }.bind(this),100);
	}

	Timer.prototype.stop = function() {
        clearInterval(this.timerInterval);
        this.timeElapsedMilliseconds = 0;
        this.output(this.getTimeOutput());
	}

	return Timer;
})