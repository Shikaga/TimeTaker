require(['js/ActivityHandler', 'test/MockGlobals'], function(ActivityHandler, MockGlobals) {
    globals = MockGlobals;
    test( "activityHandler init", function() {
        var ah = new ActivityHandler(ko.observableArray());
        equal(ah.activitySelector.activities().length, 0);
        equal(ah.activityVisible(), false);
    });

    test( "add activity", function() {
        var ah = new ActivityHandler(ko.observableArray());
        ah.activitySelector.addNewActivity();
        equal(ah.activityVisible(), true);
    });



});