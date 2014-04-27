define([], function() {
    return {activityTimeAccumulator: {
        getTotalTime: ko.observable(0),
        getTotalTimeFormatted: ko.observable("00:00"),
        getTotalTimeTodayFormatted: ko.observable("00:00"),
        getTotalTimeThisWeekFormatted: ko.observable("00:00"),
        getTotalTimeThisMonthFormatted: ko.observable("00:00"),
        getTotalTimeThisYearFormatted: ko.observable("00:00"),
        getTotalTimeFormatted: ko.observable("00:00")
    }}
})