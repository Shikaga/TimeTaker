require(['js/LocalStorageSerializer', 'js/Activity', 'js/Session'], function(LocalStorageSerializer, Activity, Session) {

    var MockLocalStorage = function() {
        this.getItem = localStorage.getItem = sinon.stub();
        this.setItem = localStorage.setItem = sinon.spy();
        this.clear = localStorage.clear = sinon.spy();
    }

    function getSetItemFor(spy, type) {
        return _.filter(
            _.map(
                _.range(spy.callCount), function(num) {return spy.getCall(num)}),
            function(call) {return call.args[0] == type})
    }

    test( "serializer returns no activities if none exist", function() {
        mockLocalStorage = new MockLocalStorage();

        var lss = new LocalStorageSerializer(ko.observableArray(),ko.observableArray());
        var activities = lss.getActivities();

        equal(activities().length, 0);
    });

    test( "serializer returns activities if they exist", function() {
        mockLocalStorage = new MockLocalStorage();
        mockLocalStorage.getItem.withArgs('activities').returns(JSON.stringify([{name: 'Activity1', description: 'Description1', color: '#111111'}]));

        var lss = new LocalStorageSerializer(ko.observableArray(),ko.observableArray());
        var activities = lss.getActivities();

        equal(activities().length, 1);
        equal(activities()[0].name(), 'Activity1');
    });

    test( "activities returned are the same object", function() {
        mockLocalStorage = new MockLocalStorage();
        mockLocalStorage.getItem.withArgs('activities').returns(JSON.stringify([{name: 'Activity1', description: 'Description1', color: '#111111'}]));

        var lss = new LocalStorageSerializer(ko.observableArray(),ko.observableArray());
        var activities = lss.getActivities();
        var activities2 = lss.getActivities();

        equal(activities()[0], activities2()[0]);
    });

    test( "serializer saves activities that are added", function() {
        mockLocalStorage = new MockLocalStorage();

        var lss = new LocalStorageSerializer(ko.observableArray(),ko.observableArray());
        var activities = lss.getActivities();
        activities.push(new Activity());

        var serializedArray = JSON.parse(mockLocalStorage.setItem.getCall(0).args[1]);
        equal(serializedArray[0].name, activities()[0].name());
    });


    test( "serializer saves activities when fields changed", function() {
        mockLocalStorage = new MockLocalStorage();

        var lss = new LocalStorageSerializer(ko.observableArray(),ko.observableArray());
        var activities = lss.getActivities();
        var activity = new Activity()
        activities.push(activity);

        activity.name('name');
        var serializedArray = JSON.parse(getSetItemFor(mockLocalStorage.setItem, 'activities')[1].args[1]);
        equal(serializedArray[0].name, 'name');

        activity.description('description');
        var serializedArray = JSON.parse(getSetItemFor(mockLocalStorage.setItem, 'activities')[2].args[1]);
        equal(serializedArray[0].description, 'description');

        activity.color('color');
        var serializedArray = JSON.parse(getSetItemFor(mockLocalStorage.setItem, 'activities')[3].args[1]);
        equal(serializedArray[0].color, 'color');
    });

    test( "serializer saves activities when fields changed with initial activity", function() {
        mockLocalStorage = new MockLocalStorage();
        mockLocalStorage.getItem.withArgs('activities').returns(JSON.stringify([{name: 'Activity1', description: 'Description1', color: '#111111'}]));

        var lss = new LocalStorageSerializer(ko.observableArray(),ko.observableArray());
        var activities = lss.getActivities();
        var activity = activities()[0];

        activity.name('name');
        var serializedArray = JSON.parse(getSetItemFor(mockLocalStorage.setItem, 'activities')[0].args[1]);
        equal(serializedArray[0].name, 'name');

        activity.description('description');
        var serializedArray = JSON.parse(getSetItemFor(mockLocalStorage.setItem, 'activities')[1].args[1]);
        equal(serializedArray[0].description, 'description');

        activity.color('color');
        var serializedArray = JSON.parse(getSetItemFor(mockLocalStorage.setItem, 'activities')[2].args[1]);
        equal(serializedArray[0].color, 'color');
    });












    // SESSSIONS

    test( "serializer returns no sessions if none exist", function() {
        mockLocalStorage = new MockLocalStorage();

        var lss = new LocalStorageSerializer(ko.observableArray(),ko.observableArray());
        var sessions = lss.getSessions();

        equal(sessions().length, 0);
    });

    test( "sessions are linked to their activities", function() {
        mockLocalStorage = new MockLocalStorage();
        mockLocalStorage.getItem.withArgs('activities').returns(JSON.stringify([{name: 'Activity1', description: 'Description1', color: '#111111', id: 'activityId'}]));
        mockLocalStorage.getItem.withArgs('sessions').returns(JSON.stringify([{activityId: 'activityId', logs: [{text: 'example1', timestamp: 0}], timer: {start: 0, end: 60000}}]));

        var lss = new LocalStorageSerializer(ko.observableArray(),ko.observableArray());
        var activities = lss.getActivities();
        var sessions = lss.getSessions();

        equal(sessions().length, 1);
        equal(sessions()[0].activity, activities()[0]);
        equal(sessions()[0].logs()[0].text(), 'example1');
    });

    test( "serializer saves sessions that are added", function() {
        mockLocalStorage = new MockLocalStorage();
        mockLocalStorage.getItem.withArgs('activities').returns(JSON.stringify([{name: 'Activity1', description: 'Description1', color: '#111111', id: 'activityId'}]));
        mockLocalStorage.getItem.withArgs('sessions').returns(JSON.stringify([{activityId: 'activityId', logs:[], timer: {start: 0, end: 60000}}]));

        var lss = new LocalStorageSerializer(ko.observableArray(),ko.observableArray());
        var sessions = lss.getSessions();
        var activities = lss.getActivities();
        sessions.push(new Session(activities()[0]));

        var serializedArray = JSON.parse(getSetItemFor(mockLocalStorage.setItem, 'sessions')[0].args[1]);
        equal(serializedArray[0].activityId, activities()[0].id);
    });


    test( "serializer saves sessions when timer changed", function() {
        //TODO
        equal(1,1);
    });
//
//    test( "serializer saves activities when fields changed with initial activity", function() {
//        mockLocalStorage = new MockLocalStorage();
//        mockLocalStorage.getItem.withArgs('activities').returns(JSON.stringify([{name: 'Activity1', description: 'Description1', color: '#111111'}]));
//
//        var lss = new LocalStorageSerializer();
//        var activities = lss.getActivities();
//        var activity = activities()[0];
//
//        activity.name('name');
//        var serializedArray = JSON.parse(mockLocalStorage.setItem.getCall(0).args[1]);
//        equal(serializedArray[0].name, 'name');
//
//        activity.description('description');
//        var serializedArray = JSON.parse(mockLocalStorage.setItem.getCall(1).args[1]);
//        equal(serializedArray[0].description, 'description');
//
//        activity.color('color');
//        var serializedArray = JSON.parse(mockLocalStorage.setItem.getCall(2).args[1]);
//        equal(serializedArray[0].color, 'color');
//    });

});