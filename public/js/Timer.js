define([], function() {
	function Timer() {
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