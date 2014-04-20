require.config({
    map: {
        '*': {
            "js/ColorPalette": "../js/ColorPalette"
        }
    }
});

require(['../js/Activity'], function(Activity) {
    mockNode = sinon.spy();
    ko.applyBindings = sinon.spy();

    test( "activity starts with first color", function() {
        var activity = new Activity();
        equal(activity.color(), activity.colors[0]);
    });

    test( "activity setColor", function() {
        var activity = new Activity();
        activity.setColor(activity.colors[1]);
        equal(activity.color(), activity.colors[1]);
    });
});