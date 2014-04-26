define([], function() {
    function ActivityTimeAccumulator(sessions) {
        this.sessions = sessions;
    }

    ActivityTimeAccumulator.prototype.getTotalTime = function(activity) {
        return ko.computed(function() {
            return _.reduce(this.sessions(), function(memo, session) {
                if (session.activity === activity) {
                    return memo + session.timer.elapsedTime();
                } else {
                    return memo;
                }
            }, 0)
        }.bind(this));
    }

    return ActivityTimeAccumulator;
})