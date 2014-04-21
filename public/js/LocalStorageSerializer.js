define(['js/Activity'], function(Activity) {
    function LocalStorageSerializer() {
        this.activities = ko.observableArray();
        this._deserialize();
        this.activities.subscribe(function() {
            this._listenToFields();
            this._serialize();
        }.bind(this))
    }

    LocalStorageSerializer.prototype._listenToFields = function() {
        this.activities().forEach(function(activity) {
            this._listenTo(activity.name);
            this._listenTo(activity.description);
            this._listenTo(activity.color);
        }.bind(this))
    }

    LocalStorageSerializer.prototype._listenTo = function(observable) {
        observable.subscribe(function() {
            this._serialize();
        }.bind(this))
    }

    LocalStorageSerializer.prototype._deserialize = function() {
        var serializedActivities = localStorage.getItem('activities');
        if (serializedActivities) {
            serializedActivities = JSON.parse(serializedActivities);
            serializedActivities.forEach(function(serial) {
                var activity = new Activity();
                activity.deserialize(serial);
                this.activities.push(activity);
            }.bind(this))
            this._listenToFields();
        }
    }

    LocalStorageSerializer.prototype._serialize = function() {
        var serializedArray = [];
        this.activities().forEach(function(activity) {
            serializedArray.push(activity.serialize());
        })
        localStorage.setItem('activities', JSON.stringify(serializedArray));
    }

    LocalStorageSerializer.prototype.getActivities = function() {
        return this.activities;
    }

    return LocalStorageSerializer;
})