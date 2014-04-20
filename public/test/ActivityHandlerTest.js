require.config({
	map: {
		'*': {
            "js/Activity": "../js/Activity"
		}
	}
});

require(['../js/ActivityHandler'], function(ActivityHandler) {
	mockNode = sinon.spy();
	ko.applyBindings = sinon.spy();

    test( "activityHandler init", function() {
        var ah = new ActivityHandler();
        equal(ah.activities().length, 0);
        equal(ah.activityVisible(), false);
    });

    test( "add activity", function() {
        var ah = new ActivityHandler();
        ah.addNewActivity();

        equal(ah.activities().length, 1);
        equal(ah.activityVisible(), true);
        equal(ah.selectedActivity().name(), "Unnamed Activity")
        equal(ah.selectedActivity().selected(), true)
    });

    test( "only one activity selected", function() {
        var ah = new ActivityHandler();
        ah.addNewActivity();
        ah.addNewActivity();
        ah.addNewActivity();

        equal(ah.activities().length, 3);
        equal(ah.activities()[0].selected(), false);
        equal(ah.activities()[1].selected(), false);
        equal(ah.activities()[2].selected(), true);
        equal(ah.selectedActivity().selected(), true)
    });

    test( "can select an activity", function() {
        var ah = new ActivityHandler();
        ah.addNewActivity();
        ah.addNewActivity();
        ah.addNewActivity();
        ah.selectActivity(ah.activities()[0]);

        equal(ah.activities()[0].selected(), true);
        equal(ah.activities()[1].selected(), false);
        equal(ah.activities()[2].selected(), false);
        equal(ah.selectedActivity(), ah.activities()[0]);
    });


});