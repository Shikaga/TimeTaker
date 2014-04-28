define([], function() {
    function SubscriptionDisposer() {
        this.subscriptions = [];
    }

    SubscriptionDisposer.prototype.addSubscription = function(observable, subscription, id) {
        this.subscriptions.forEach(function(sub) {
            if (sub.observable == observable) {
                if (!sub.id || sub.id === id) {
                    sub.subscription.dispose();
                    sub.subscription = subscription;
                    return;
                }


            }
        })
        this.subscriptions.push({subscription: subscription, observable: observable, id: id});
    }

    return SubscriptionDisposer;
})