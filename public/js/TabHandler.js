define([], function() {
    function TabHandler() {
        this.weekVisible = ko.observable(true);
        this.activityVisible = ko.observable(false);
        this.tomatoVisible = ko.observable(false);
        this.freeformVisible = ko.observable(false);

        this.weekClicked = function() {
            this.weekVisible(true);
            this.activityVisible(false);
            this.tomatoVisible(false);
            this.freeformVisible(false);
        }.bind(this)

        this.activityClicked = function() {
            this.weekVisible(false);
            this.activityVisible(true);
            this.tomatoVisible(false);
            this.freeformVisible(false);
        }.bind(this)

        this.tomatoClicked = function() {
            this.weekVisible(false);
            this.activityVisible(false);
            this.tomatoVisible(true);
            this.freeformVisible(false);
        }.bind(this)

        this.freeformClicked = function() {
            this.weekVisible(false);
            this.activityVisible(false);
            this.tomatoVisible(false);
            this.freeformVisible(true);
        }.bind(this);
    }

    return TabHandler;
})