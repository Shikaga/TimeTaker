define(['js/Activity'], function(Activity) {
    function ActivityHandler() {
        this.activities = ko.observableArray();
        this.activityVisible = ko.observable(false);
        this.selectedActivity = ko.observable();

        this.unselectAllActivities = function() {
            this.activities().forEach(function(activity) {
                activity.selected(false);
            });
        }


        this.addNewActivity = function() {
            this.unselectAllActivities();
            var activity = new Activity();
            this.selectedActivity(activity);
            this.activities.push(activity);
            this.activityVisible(true);
        }.bind(this);

        this.selectActivity = function(activity) {
            this.unselectAllActivities();
            this.selectedActivity(activity);
            activity.selected(true);
        }
    }

    return ActivityHandler;
})