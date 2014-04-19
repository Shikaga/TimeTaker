define([], function() {
    return {
        getTimestamp: function() {
            var date = new Date();
            return ko.observable(date.toLocaleTimeString());
        }
    }
})