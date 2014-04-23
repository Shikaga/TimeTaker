define(['js/TimestampGenerator'], function(TimestampGenerator) {
    function Log(text) {
        this.text = ko.observable(text);
        this.timestamp = TimestampGenerator.getTimestamp()
    }

    Log.prototype.serialize = function() {
        return {
            text: this.text(),
            timestamp: this.timestamp()
        }
    }

    Log.prototype.deserialize = function(serial) {
        this.text(serial.text);
        this.timestamp(serial.timestamp);
    }

    return Log;
})