define(['js/Timer'], function(Timer) {
    function Session(activity) {
        this.activity = activity;
        this.timer = new Timer();
        this.logs = ko.observableArray();
    }

    Session.prototype.serialize = function() {
        return {
            activityId: this.activity.id
        }
    }

    return Session;
})