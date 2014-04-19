define('MockTimestampGenerator', function() {
    return {
        getTimestamp: function() {
            return ko.observable("MockTimestamp");
        }
    }
})