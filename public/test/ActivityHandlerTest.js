require.config({
	map: {
		'*': {
            "js/Activity": "../js/Activity",
            "js/ActivitySelector": "../js/ActivitySelector"
		}
	}
});

require(['../js/ActivityHandler'], function(ActivityHandler) {
	mockNode = sinon.spy();
	ko.applyBindings = sinon.spy();

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