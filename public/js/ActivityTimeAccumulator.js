define(['js/TimeFormatter', 'js/TimeUtil', 'js/SubscriptionDisposer'], function(TimeFormatter, TimeUtil, SubscriptionDisposer) {
    function ActivityTimeAccumulator(sessions) {
        this.sessions = sessions;
        console.log(this.sessions());
        this.subscriptionDisposer = new SubscriptionDisposer();
    }

    ActivityTimeAccumulator.prototype._subscribe = function(sessionsFunc, observable) {
        this._watchSessions(sessionsFunc(), observable);
        this.subscriptionDisposer.addSubscription(this.sessions, this.sessions.subscribe(function() {
            this._watchSessions(sessionsFunc(), observable);
        }.bind(this)), sessionsFunc);
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
        var observable = this._getTotalTimeToday(activity);
        return ko.computed(function() {
            return TimeFormatter.hoursMinutesSecond(observable());
        }.bind(this));
    }

    ActivityTimeAccumulator.prototype.getTotalTimeThisWeekFormatted = function(activity) {
        var observable = this._getTotalTimeThisWeek(activity);
        k = observable;
        return ko.computed(function() {
            return TimeFormatter.hoursMinutesSecond(observable());
        }.bind(this));
    }

    ActivityTimeAccumulator.prototype.getTotalTimeThisMonthFormatted = function(activity) {
        var observable = this._getTotalTimeThisMonth(activity);
        return ko.computed(function() {
            return TimeFormatter.hoursMinutesSecond(observable());
        }.bind(this));
    }

    ActivityTimeAccumulator.prototype.getTotalTimeThisYearFormatted = function(activity) {
        var observable = this._getTotalTimeThisYear(activity);
        return ko.computed(function() {
            return TimeFormatter.hoursMinutesSecond(observable());
        }.bind(this));
    }

    ActivityTimeAccumulator.prototype.getTotalTimeFormatted = function(activity) {
        var observable = this._getTotalTime(activity);
        return ko.computed(function() {
            return TimeFormatter.hoursMinutesSecond(observable());
        }.bind(this));
    }



    return ActivityTimeAccumulator;
})