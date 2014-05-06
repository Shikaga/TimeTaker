require.config({
    map: {
        '*': {
            "js/ColorPalette": "../js/ColorPalette",
            "js/GoalHandler": "../js/GoalHandler"
        }
    }
});

require(['../js/Activity', 'MockGlobals'], function(Activity, MockGlobals) {
    globals = MockGlobals;

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
        activity.weekHoursGoal(1);
        activity.weekdayHoursGoal(2);

        var serial = activity.serialize();
        equal(serial.name, "name1");
        equal(serial.description, "description1");
        equal(serial.color, "#111111");
        equal(serial.id, activity.id);
        equal(serial.weekHoursGoal, 1);
        equal(serial.weekdayHoursGoal, 2);
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
        equal(activity.weekHoursGoal(), null);
        equal(activity.weekdayHoursGoal(), null);
    })

    test("deserialize with goals", function() {
        var activity = new Activity();
        activity.deserialize({
            name: 'name2',
            description: 'description2',
            color: '#222222',
            id: 'exampleId',
            weekHoursGoal: 1,
            weekdayHoursGoal: 2
        })

        equal(activity.name(), "name2");
        equal(activity.description(), "description2");
        equal(activity.color(), "#222222");
        equal(activity.id, "exampleId");
        equal(activity.weekHoursGoal(), 1);
        equal(activity.weekdayHoursGoal(), 2);
    })
});