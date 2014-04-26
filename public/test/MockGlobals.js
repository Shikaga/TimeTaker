define([], function() {
    return {activityTimeAccumulator: {
        getTotalTime: ko.observable(0),
        getTotalTimeFormatted: ko.observable("00:00")
    }}
})