require.config({
	map: {
		'*': {
		}
	}
});

require(['../js/Activity', '../js/GoalHandler'], function(Activity, GoalHandler) {
	mockNode = sinon.spy();
	ko.applyBindings = sinon.spy();

    test( "GoalHandler init", function() {
        var activity = new Activity();

        var goalHandler = new GoalHandler(activity);
        equal(goalHandler.visible(), true);
        equal(goalHandler.saveButtonEnabled(), false);
        equal(goalHandler.cancelButtonEnabled(), true);

        equal(goalHandler.weekdayHours(), null);
        equal(goalHandler.weekHours(), null);
    });

    test( "times are set by GoalHandler if they exist", function() {
        var activity = new Activity();
        activity.weekdayHoursGoal(1);
        activity.weekHoursGoal(2);

        var goalHandler = new GoalHandler(activity);
        equal(goalHandler.weekdayHours(), "1");
        equal(goalHandler.weekHours(), "2");
        equal(goalHandler.saveButtonEnabled(), false);
    });

    test( "changing weekday enables save button", function() {
        var activity = new Activity();
        var goalHandler = new GoalHandler(activity);
        goalHandler.weekdayHours("1");
        equal(goalHandler.saveButtonEnabled(), true);
    });

    test( "changing week enables save button", function() {
        var activity = new Activity();
        var goalHandler = new GoalHandler(activity);
        goalHandler.weekHours("1");
        equal(goalHandler.saveButtonEnabled(), true);
    });

    test( "changing hours back disables save button", function() {
        var activity = new Activity();
        activity.weekdayHoursGoal(1);
        activity.weekHoursGoal(2);

        var goalHandler = new GoalHandler(activity);
        goalHandler.weekdayHours("2");
        goalHandler.weekHours("3");
        equal(goalHandler.saveButtonEnabled(), true);

        goalHandler.weekdayHours("1");
        goalHandler.weekHours("2");
        equal(goalHandler.saveButtonEnabled(), false);
    });

    test( "saving sets the activity goals", function() {
        var activity = new Activity();
        activity.weekdayHoursGoal(1);
        activity.weekHoursGoal(2);

        var goalHandler = new GoalHandler(activity);
        goalHandler.weekdayHours(2);
        goalHandler.weekHours(3);
        equal(goalHandler.saveButtonEnabled(), true);
        goalHandler.save();


        equal(activity.weekdayHoursGoal(), 2);
        equal(activity.weekHoursGoal(), 3);
        equal(goalHandler.visible(), false);
    });

    test( "You can save a single number", function() {
        var activity = new Activity();
        activity.weekdayHoursGoal();
        activity.weekHoursGoal();

        var goalHandler = new GoalHandler(activity);
        goalHandler.weekdayHours(2);
        equal(goalHandler.saveButtonEnabled(), true);
        goalHandler.save();


        equal(activity.weekdayHoursGoal(), 2);
        equal(activity.weekHoursGoal(), null);
        equal(goalHandler.visible(), false);
    });

    test( "cancelling does not set activity hours", function() {
        var activity = new Activity();
        activity.weekdayHoursGoal(1);
        activity.weekHoursGoal(2);

        var goalHandler = new GoalHandler(activity);
        goalHandler.weekdayHours("2");
        goalHandler.weekHours("3");
        equal(goalHandler.saveButtonEnabled(), true);
        goalHandler.cancel();


        equal(activity.weekdayHoursGoal(), 1);
        equal(activity.weekHoursGoal(), 2);
        equal(goalHandler.visible(), false);
    });
});