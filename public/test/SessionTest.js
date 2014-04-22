require.config({
    map: {
        '*': {
            "js/ColorPalette": "../js/ColorPalette"
        }
    }
});

require(['../js/Activity','../js/Session'], function(Activity, Session) {

    test("serialize", function() {
        var activity = new Activity();
        var session = new Session(activity);

        var serial = session.serialize();
        equal(serial.activityId, activity.id);
    })

    test("deserialize", function() {
        var activity = new Activity();
        var session = new Session(activity);

        session.deserialize({
            name: 'name2',
            description: 'description2',
            color: '#222222',
            id: 'exampleId'
        })

        equal(activity.name(), "name2");
        equal(activity.description(), "description2");
        equal(activity.color(), "#222222");
        equal(activity.id, "exampleId");
    })
});