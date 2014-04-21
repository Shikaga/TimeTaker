define(['js/Activity'], function(Activity) {
    function ActivitySelector(activities) {
        this.activities = activities;
        this.activityVisible = ko.observable(false);
        this.selectedActivity = ko.observable(activities()[0]);

        this.activities.subscribe(function() {
            if (typeof this.selectedActivity() === 'undefined') {
                this.selectedActivity(this.activities()[0]);
            }
        }.bind(this))

        this.addNewActivity = function() {
            var activity = new Activity();
            this.selectedActivity(activity);
            this.activities.push(activity);
            this.activityVisible(true);
        }.bind(this);

        this.selectActivity = function(activity) {
            this.selectedActivity(activity);
        }
    }
    return ActivitySelector;
})