require.config({
    map: {
        '*': {
        }
    }
});

require(['../js/SubscriptionDisposer'], function(SubscriptionDisposer) {

    test( "SubscriptionDisposer init", function() {
        var subscriptionDisposer = new SubscriptionDisposer();
        var observable = ko.observable(1);
        var testValue = 1;
        subscriptionDisposer.addSubscription(observable, observable.subscribe(function(newValue) {
            testValue = newValue;
        }));
        observable(2);
        equal(testValue,2);
    });

    test( "subscriptionDesposer old subscriptions are removed when new ones added", function() {
        var subscriptionDisposer = new SubscriptionDisposer();
        var observable = ko.observable(1);
        var testValue = 1;
        subscriptionDisposer.addSubscription(observable, observable.subscribe(function(newValue) {
            testValue = newValue;
        }));
        observable(2);
        equal(testValue,2);

        subscriptionDisposer.addSubscription(observable, observable.subscribe(function(newValue) {
            //Do nothing
        }));
        observable(3);
        equal(testValue,2);
    });

    test( "subscriptionDesposer can support different observables", function() {
        var subscriptionDisposer = new SubscriptionDisposer();
        var observable = ko.observable(1);
        var observable2 = ko.observable(4);
        var testValue = 1;
        var testValue2 = 4;
        subscriptionDisposer.addSubscription(observable, observable.subscribe(function(newValue) {
            testValue = newValue;
        }));
        subscriptionDisposer.addSubscription(observable2, observable2.subscribe(function(newValue) {
            testValue2 = newValue;
        }));
        observable(2);
        observable2(5);
        equal(testValue,2);
        equal(testValue2,5);

        subscriptionDisposer.addSubscription(observable, observable.subscribe(function(newValue) {
            //Do nothing
        }));
        observable(3);
        observable2(6);
        equal(testValue,2);
        equal(testValue2,6);
    });

    test( "subscriptionDesposer can support different observables", function() {
        var subscriptionDisposer = new SubscriptionDisposer();
        var observable = ko.observable(1);
        var testValue = 1;
        var testValue2 = 4;
        subscriptionDisposer.addSubscription(observable, observable.subscribe(function(newValue) {
            testValue = newValue;
        }), 1);
        subscriptionDisposer.addSubscription(observable, observable.subscribe(function(newValue) {
            testValue2 = newValue;
        }), 2);
        observable(2);
        equal(testValue,2);
        equal(testValue2,2);

        subscriptionDisposer.addSubscription(observable, observable.subscribe(function(newValue) {
            // do nothing
        }), 1);

        observable(3);
        equal(testValue,2);
        equal(testValue2,3);
    });

});