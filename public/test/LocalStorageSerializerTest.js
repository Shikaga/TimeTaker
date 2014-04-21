require.config({
    map: {
        '*': {
            'js/Activity': '../js/Activity'
        }
    }
});

require(['../js/LocalStorageSerializer', '../js/Activity'], function(LocalStorageSerializer, Activity) {

    var MockLocalStorage = function() {
        this.getItem = localStorage.getItem = sinon.stub();
        this.setItem = localStorage.setItem = sinon.spy();
        this.clear = localStorage.clear = sinon.spy();
    }

    test( "serializer returns no activities if non exist", function() {
        mockLocalStorage = new MockLocalStorage();

        var lss = new LocalStorageSerializer();
        var activities = lss.getActivities();

        equal(activities().length, 0);
    });

    test( "serializer returns activities if they exist", function() {
        mockLocalStorage = new MockLocalStorage();
        mockLocalStorage.getItem.withArgs('activities').returns(JSON.stringify([{name: 'Activity1', description: 'Description1', color: '#111111'}]));

        var lss = new LocalStorageSerializer();
        var activities = lss.getActivities();

        equal(activities().length, 1);
        equal(activities()[0].name(), 'Activity1');
    });

    test( "serializer saves activities that are added", function() {
        mockLocalStorage = new MockLocalStorage();

        var lss = new LocalStorageSerializer();
        var activities = lss.getActivities();
        activities.push(new Activity());

        var serializedArray = JSON.parse(mockLocalStorage.setItem.getCall(0).args[1]);
        equal(serializedArray[0].name, activities()[0].name());
    });


    test( "serializer saves activities when fields changed", function() {
        mockLocalStorage = new MockLocalStorage();

        var lss = new LocalStorageSerializer();
        var activities = lss.getActivities();
        var activity = new Activity()
        activities.push(activity);

        activity.name('name');
        var serializedArray = JSON.parse(mockLocalStorage.setItem.getCall(1).args[1]);
        equal(serializedArray[0].name, 'name');

        activity.description('description');
        var serializedArray = JSON.parse(mockLocalStorage.setItem.getCall(2).args[1]);
        equal(serializedArray[0].description, 'description');

        activity.color('color');
        var serializedArray = JSON.parse(mockLocalStorage.setItem.getCall(3).args[1]);
        equal(serializedArray[0].color, 'color');
    });

    test( "serializer saves activities when fields changed with initial activity", function() {
        mockLocalStorage = new MockLocalStorage();
        mockLocalStorage.getItem.withArgs('activities').returns(JSON.stringify([{name: 'Activity1', description: 'Description1', color: '#111111'}]));

        var lss = new LocalStorageSerializer();
        var activities = lss.getActivities();
        var activity = activities()[0];

        activity.name('name');
        var serializedArray = JSON.parse(mockLocalStorage.setItem.getCall(0).args[1]);
        equal(serializedArray[0].name, 'name');

        activity.description('description');
        var serializedArray = JSON.parse(mockLocalStorage.setItem.getCall(1).args[1]);
        equal(serializedArray[0].description, 'description');

        activity.color('color');
        var serializedArray = JSON.parse(mockLocalStorage.setItem.getCall(2).args[1]);
        equal(serializedArray[0].color, 'color');
    });


});