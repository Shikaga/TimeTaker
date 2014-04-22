require.config({
    map: {
        '*': {
            "js/ColorPalette": "../js/ColorPalette"
        }
    }
});

require(['../js/Activity'], function(Activity) {
    mockNode = sinon.spy();
    ko.applyBindings = sinon.spy();

    test( "activity starts with first color", function() {
        var activity = new Activity();
        equal(activity.color(), activity.colors[0]);
    });

    test( "activity setColor", function() {
        var activity = new Activity();
        activity.setColor(activity.colors[1]);
        equal(activity.color(), activity.colors[1]);
    });

    test("serialize", function() {
        var activity = new Activity();
        activity.name("name1");
        activity.description("description1");
        activity.color("#111111");

        var serial = activity.serialize();
        equal(serial.name, "name1");
        equal(serial.description, "description1");
        equal(serial.color, "#111111");
        equal(serial.id, activity.id);
    })

    test("deserialize", function() {
        var activity = new Activity();
        activity.deserialize({
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