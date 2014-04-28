define(['js/TimeFormatter', 'js/TimeUtil'], function(TimeFormatter, TimeUtil) {
    function ActivityTimeAccumulator(sessions) {
        this.sessions = sessions;
    }

    ActivityTimeAccumulator.prototype._subscribe = function(sessions, observable) {
        this._watchSessions(sessions(), observable);
        this.sessions.subscribe(function() {
            this._watchSessions(sessions(), observable);
        }.bind(this))
    }

    ActivityTimeAccumulator.prototype._watchSessions = function(sessions, observable) {
        observable(0);
        sessions.forEach(function(session) {
            var oldTimes = this._sumSessions(_.reject(sessions, function(sess) {return session === sess}));
            observable(oldTimes + session.timer.elapsedTime());
            session.timer.elapsedTime.subscribe(function(elapsedTime) {
                observable(elapsedTime + oldTimes);
            }.bind(this))
        }.bind(this))
    }

    ActivityTimeAccumulator.prototype._getTotalTime = function(activity) {
        var observable = new ko.observable();
        this._subscribe(function() {return this._getAllActivity(activity)}.bind(this), observable);
        return observable;
    }

    ActivityTimeAccumulator.prototype._getTotalTimeToday = function(activity) {
        var observable = new ko.observable();
        this._subscribe(function() {
            return _.filter(this._getAllActivity(activity), function(session) {
                return TimeUtil.prototype.getTodayTimestamp() < session.timer.startTimestamp() &&
                    TimeUtil.prototype.getTomorrowTimestamp() > session.timer.startTimestamp()
            })}.bind(this), observable);
        return observable;
    }

    ActivityTimeAccumulator.prototype._getTotalTimeThisWeek = function(activity) {
        var observable = new ko.observable();
        this._subscribe(function() {
            return _.filter(this._getAllActivity(activity), function(session) {
                return TimeUtil.prototype.getFirstOfWeekTimestamp() < session.timer.startTimestamp() &&
                    TimeUtil.prototype.getFirstOfNextWeekTimestamp() > session.timer.startTimestamp()
            })}.bind(this), observable);
        return observable;
    }

    ActivityTimeAccumulator.prototype._getTotalTimeThisMonth = function(activity) {
        var observable = new ko.observable();
        this._subscribe(function() {
            return _.filter(this._getAllActivity(activity), function(session) {
                return TimeUtil.prototype.getFirstOfMonthTimestamp() < session.timer.startTimestamp() &&
                    TimeUtil.prototype.getFirstOfNextMonthTimestamp() > session.timer.startTimestamp()
            })}.bind(this), observable);
        return observable;
    }

    ActivityTimeAccumulator.prototype._getTotalTimeThisYear = function(activity) {
        var observable = new ko.observable();
        this._subscribe(function() {
            return _.filter(this._getAllActivity(activity), function(session) {
                return TimeUtil.prototype.getFirstOfYearTimestamp() < session.timer.startTimestamp() &&
                    TimeUtil.prototype.getFirstOfNextYearTimestamp() > session.timer.startTimestamp()
            })}.bind(this), observable);
        return observable;
    }

    ActivityTimeAccumulator.prototype._sumSessions = function(sessions) {
        return _.reduce(sessions, function(memo, session) {
            return memo + session.timer.elapsedTime();
        }, 0)
    }

    ActivityTimeAccumulator.prototype._getAllActivity = function(activity) {
        return _.filter(this.sessions(), function(session) {
            return session.activity === activity;
        })
    }

    ActivityTimeAccumulator.prototype.getTotalTimeTodayFormatted = function(activity) {
        return ko.computed(function() {
            return TimeFormatter.hoursMinutesSecond(this._getTotalTimeToday(activity)());
        }.bind(this));
    }

    ActivityTimeAccumulator.prototype.getTotalTimeThisWeekFormatted = function(activity) {
        return ko.computed(function() {
            return TimeFormatter.hoursMinutesSecond(this._getTotalTimeThisWeek(activity)());
        }.bind(this));
    }

    ActivityTimeAccumulator.prototype.getTotalTimeThisMonthFormatted = function(activity) {
        return ko.computed(function() {
            return TimeFormatter.hoursMinutesSecond(this._getTotalTimeThisMonth(activity)());
        }.bind(this));
    }

    ActivityTimeAccumulator.prototype.getTotalTimeThisYearFormatted = function(activity) {
        return ko.computed(function() {
            return TimeFormatter.hoursMinutesSecond(this._getTotalTimeThisYear(activity)());
        }.bind(this));
    }

    ActivityTimeAccumulator.prototype.getTotalTimeFormatted = function(activity) {
        return ko.computed(function() {
            return TimeFormatter.hoursMinutesSecond(this._getTotalTime(activity)());
        }.bind(this));
    }



    return ActivityTimeAccumulator;
})