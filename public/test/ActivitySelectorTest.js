require.config({
    map: {
        '*': {
            'js/Activity': '../js/Activity'
        }
    }
});

require(['../js/ActivitySelector'], function(ActivitySelector) {
    mockActivities = ko.observableArray([{name: 'actvity1'}, {name: 'activity2'}]);

    test( "ActivitySelector init", function() {
        var as = new ActivitySelector(mockActivities);
        equal(as.activities, mockActivities);
        equal(as.selectedActivity(), mockActivities()[0]);
    });

    test( "ActivitySelector handles empty activities", function() {
        var emptyArray = ko.observableArray();
        var as = new ActivitySelector(emptyArray);
        equal(as.activities, emptyArray);
        equal(as.selectedActivity(), undefined);
    });

    test( "add activity", function() {
        var as = new ActivitySelector(ko.observableArray());
        as.addNewActivity();

        equal(as.activities().length, 1);
        equal(as.selectedActivity().selected(), true)
    });

    test( "when an empty activities is populated, it becomes selected", function() {
        var emptyActivities = ko.observableArray();
        var mockActivity = {name: 'mock'};

        var as = new ActivitySelector(emptyActivities);
        emptyActivities.push(mockActivity);

        equal(as.activities().length, 1);
        equal(as.selectedActivity(), mockActivity)
    });

    test( "only one activity selected", function() {
        var as = new ActivitySelector(ko.observableArray());
        as.addNewActivity();
        as.addNewActivity();
        as.addNewActivity();

        equal(as.activities().length, 3);
        equal(as.activities()[0].selected(), false);
        equal(as.activities()[1].selected(), false);
        equal(as.activities()[2].selected(), true);
        equal(as.selectedActivity().selected(), true)
    });

    test( "can select an activity", function() {
        var as = new ActivitySelector(ko.observableArray());
        as.addNewActivity();
        as.addNewActivity();
        as.addNewActivity();
        as.selectActivity(as.activities()[0]);

        equal(as.activities()[0].selected(), true);
        equal(as.activities()[1].selected(), false);
        equal(as.activities()[2].selected(), false);
        equal(as.selectedActivity(), as.activities()[0]);
    });

});