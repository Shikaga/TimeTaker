define(['js/Activity', 'js/ActivitySelector'], function(Activity, ActivitySelector) {
    function ActivityHandler(activities) {
        this.activitySelector = new ActivitySelector(activities);
        this.activityVisible = ko.computed(function() {
            return (typeof this.activitySelector.selectedActivity() !== 'undefined')
        }.bind(this));
    }

    return ActivityHandler;
})