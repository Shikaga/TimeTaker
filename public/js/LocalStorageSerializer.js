define(['js/Activity', 'js/Session'], function(Activity, Session) {
    function LocalStorageSerializer(activities, sessions) {
        this.activities = activities;
        this.sessions = sessions;
        this._deserialize();
        this.activities.subscribe(function() {
            this._listenToFields();
            this._serialize();
        }.bind(this))
        this.sessions.subscribe(function() {
            this._listenToFields();
            this._serialize();
        }.bind(this))
    }

    LocalStorageSerializer.prototype._listenToFields = function() {
        this.activities().forEach(function(activity) {
            this._listenTo(activity.name);
            this._listenTo(activity.description);
            this._listenTo(activity.color);
            this._listenTo(activity.weekHoursGoal);
            this._listenTo(activity.weekdayHoursGoal);
        }.bind(this))
        this.sessions().forEach(function(session) {
            this._listenTo(session.timer.endTime);
        }.bind(this));
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

        var serializedSessions = localStorage.getItem('sessions');
        if (serializedSessions) {
            serializedSessions = JSON.parse(serializedSessions);
            serializedSessions.forEach(function(serial) {
                var sessionActivity = null;
                this.activities().forEach(function(activity) {
                    if (activity.id == serial.activityId) {
                        sessionActivity =  activity;
                    }
                })
                var session = new Session(sessionActivity);
                session.deserialize(serial);
                this.sessions.push(session);
            }.bind(this))
        }
    }

    LocalStorageSerializer.prototype._serialize = function() {
        var serializedArray = [];
        this.activities().forEach(function(activity) {
            serializedArray.push(activity.serialize());
        })
        localStorage.setItem('activities', JSON.stringify(serializedArray));

        var serializedArray = [];
        this.sessions().forEach(function(session) {
            serializedArray.push(session.serialize());
        })
        localStorage.setItem('sessions', JSON.stringify(serializedArray));
    }

    LocalStorageSerializer.prototype.getActivities = function() {
        return this.activities;
    }

    LocalStorageSerializer.prototype.getSessions = function() {
        return this.sessions;
    }

    return LocalStorageSerializer;
})