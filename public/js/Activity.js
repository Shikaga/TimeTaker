define(['js/ColorPalette', 'js/GoalHandler'], function(ColorPalette, GoalHandler) {
    function Activity() {
        this.colors = ColorPalette;
        this.name = ko.observable('Unnamed Activity');
        this.description = ko.observable("");
        this.color = ko.observable(ColorPalette[0]);
        this.setColor = function(color) {
            this.color(color);
        }
        this.id = Math.random().toString();

        this.weekdayHoursGoal = ko.observable(null);
        this.weekHoursGoal = ko.observable(null);

        this.setGoals = function() {
            window.goalsModal(new GoalHandler(this))
        }

        this.totalTimeToday = globals.activityTimeAccumulator.getTotalTimeTodayFormatted(this);
        this.totalTimeThisWeek = globals.activityTimeAccumulator.getTotalTimeThisWeekFormatted(this);
        this.totalTimeThisMonth = globals.activityTimeAccumulator.getTotalTimeThisMonthFormatted(this);
        this.totalTimeThisYear = globals.activityTimeAccumulator.getTotalTimeThisYearFormatted(this);
        this.totalTime = globals.activityTimeAccumulator.getTotalTimeFormatted(this);
    }

    Activity.prototype.serialize = function() {
        return {
            name: this.name()
            ,description: this.description()
            ,color: this.color()
            ,id: this.id
            ,weekdayHoursGoal: this.weekdayHoursGoal()
            ,weekHoursGoal: this.weekHoursGoal()
        }
    }

    Activity.prototype.deserialize = function(serial) {
        this.name(serial.name);
        this.description(serial.description);
        this.color(serial.color);
        this.id = serial.id;
        this.weekdayHoursGoal(serial.weekdayHoursGoal);
        this.weekHoursGoal(serial.weekHoursGoal);
    }

    return Activity;
})