require(['../js/TabHandler'], function(TabHandler) {

    test( "starts in week view", function() {
        var tabHandler = new TabHandler();
        equal(tabHandler.weekVisible(),true);
        equal(tabHandler.activityVisible(),false);
        equal(tabHandler.tomatoVisible(),false);
        equal(tabHandler.freeformVisible(),false);
    });

    test( "changes to week", function() {
        var tabHandler = new TabHandler();
        tabHandler.weekClicked();
        equal(tabHandler.weekVisible(),true);
        equal(tabHandler.activityVisible(),false);
        equal(tabHandler.tomatoVisible(),false);
        equal(tabHandler.freeformVisible(),false);
    });
    test( "changes to activity", function() {
        var tabHandler = new TabHandler();
        tabHandler.activityClicked();
        equal(tabHandler.weekVisible(),false);
        equal(tabHandler.activityVisible(),true);
        equal(tabHandler.tomatoVisible(),false);
        equal(tabHandler.freeformVisible(),false);
    });
    test( "changes to tomato", function() {
        var tabHandler = new TabHandler();
        tabHandler.tomatoClicked();
        equal(tabHandler.weekVisible(),false);
        equal(tabHandler.activityVisible(),false);
        equal(tabHandler.tomatoVisible(),true);
        equal(tabHandler.freeformVisible(),false);
    });
    test( "changes to freeform", function() {
        var tabHandler = new TabHandler();
        tabHandler.freeformClicked();
        equal(tabHandler.weekVisible(),false);
        equal(tabHandler.activityVisible(),false);
        equal(tabHandler.tomatoVisible(),false);
        equal(tabHandler.freeformVisible(),true);
    });
})