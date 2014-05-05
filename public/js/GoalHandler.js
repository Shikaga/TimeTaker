define([], function() {
    function GoalHandler(activity) {
        this.weekdayHours = ko.observable(activity.weekdayHoursGoal());
        this.weekHours = ko.observable(activity.weekHoursGoal());

        this.visible = ko.observable(true);
        this.getNumber = function(observable) {
            var int = Number.parseFloat(observable());
            if (isNaN(int)) return null;
            return int;
        }
        this.saveButtonEnabled = ko.computed(function() {
            return this.getNumber(this.weekdayHours) !== activity.weekdayHoursGoal() || this.getNumber(this.weekHours) !== activity.weekHoursGoal()
        }.bind(this))
        this.cancelButtonEnabled = ko.observable(true);
        this.save = function() {
            activity.weekdayHoursGoal(this.getNumber(this.weekdayHours));
            activity.weekHoursGoal(this.getNumber(this.weekHours));
            this.visible(false);
        }.bind(this);
        this.cancel = function() {
            this.visible(false);
        }.bind(this);
    }

    return GoalHandler;
})