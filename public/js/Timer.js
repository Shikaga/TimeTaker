define(['js/TimeFormatter'], function(TimeFormatter) {
	function Timer() {
        this.FIVE_SECONDS = 5000;
        this.HALF_MINUTE = 30000;
        this.TWO_MINUTES = 120000;
        this.FIVE_SECONDS = 5000;
        this.FIVE_SECONDS = 5000;
        this.startTimestamp = ko.observable(new Date().getTime());
        this.endTimestamp = ko.observable(new Date().getTime());
        this.elapsedTime = ko.computed(function() {
            return this.endTimestamp() - this.startTimestamp()
        }.bind(this))
        this.timerInterval = null;
        this.output = ko.observable(this.getTimeOutput(0));

        this.startTime = ko.computed(function() {
            return this.getFormattedTime(this.startTimestamp())
        }.bind(this))

        this.endTime = ko.computed(function() {
            return this.getFormattedTime(this.endTimestamp())
        }.bind(this))
	}

    Timer.prototype.getTimeOutput = function(timeElapsedInMilliseconds) {
        if (timeElapsedInMilliseconds < this.FIVE_SECONDS) {

        } else if (timeElapsedInMilliseconds < this.HALF_MINUTE) {
            //Round to nearest 5 seconds
            timeElapsedInMilliseconds = 5000 * Math.floor(timeElapsedInMilliseconds/5000);
        } else if (timeElapsedInMilliseconds < this.TWO_MINUTES) {
            //Round to nearest 30 seconds
            timeElapsedInMilliseconds = 30000 * Math.floor(timeElapsedInMilliseconds/30000);
        } else {
            //Round to nearest 1 minute
            timeElapsedInMilliseconds = 60000 * Math.floor(timeElapsedInMilliseconds/60000);
        }
        return TimeFormatter.hoursMinutesSecond(timeElapsedInMilliseconds);
    }

    Timer.prototype.getFormattedTime = function(timestamp) {
        var rawTime = new Date(timestamp).toLocaleTimeString();
        return rawTime.substr(0, rawTime.length - 6) + "" + rawTime.substr(rawTime.length - 3);
    }

	Timer.prototype.start = function() {
        this.startTimestamp = ko.observable(new Date().getTime());
        this.timerInterval = setInterval(function() {
            this.endTimestamp(new Date().getTime());
            var timeElapsedMilliseconds = this.endTimestamp() - this.startTimestamp();
            this.output(this.getTimeOutput(timeElapsedMilliseconds));
        }.bind(this),100);
	}

	Timer.prototype.stop = function() {
        clearInterval(this.timerInterval);
        this.output(this.getTimeOutput(0));
	}

    Timer.prototype.serialize = function() {
        return {
            start: this.startTimestamp(),
            stop: this.endTimestamp()
        }
    }
    Timer.prototype.deserialize = function(serial) {
        this.startTimestamp(serial.start);
        this.endTimestamp(serial.stop);
    }

	return Timer;
})