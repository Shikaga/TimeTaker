require.config({
    map: {
        '*': {
            'js/Activity': '../js/Activity'
        }
    }
});

require(['../js/ActivitySelector', '../js/Activity'], function(ActivitySelector, Activity) {
    mockActivities = ko.observableArray([new Activity(), new Activity()]);

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
        equal(as.selectedActivity(), as.activities()[2])
    });

    test( "can select an activity", function() {
        var as = new ActivitySelector(ko.observableArray());
        as.addNewActivity();
        as.addNewActivity();
        as.addNewActivity();
        as.selectActivity(as.activities()[0]);

        equal(as.selectedActivity(), as.activities()[0]);
    });

});