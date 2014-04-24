define(['js/Timer', 'js/Log'], function(Timer, Log) {
    function Session(activity) {
        this.activity = activity;
        this.timer = new Timer();
        this.logs = ko.observableArray();
    }

    Session.prototype.addLog = function(message) {
        this.logs.push(new Log(message));
    }

    Session.prototype.serialize = function() {
        return {
            activityId: this.activity.id,
            logs: _.map(this.logs(), function(log) {
                return log.serialize();
            }),
            timer: this.timer.serialize()
        }
    }

    Session.prototype.deserialize = function(serial) {
        serial.logs.forEach(function(serialLog) {
            var log = new Log();
            log.deserialize(serialLog);
            this.logs.push(log)
        }.bind(this))
        this.timer.deserialize(serial.timer);
    }

    return Session;
})