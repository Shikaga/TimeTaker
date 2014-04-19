define(['js/TimestampGenerator'], function(TimestampGenerator) {
        function TextLogHandler() {
            this.logs = ko.observableArray();
            this.textField = ko.observable();
            this.addLog = function() {
                if (this.textField() !== "" && this.textField() !== null && this.textField() !== undefined) {
                    this.logs.push({text: ko.observable(this.textField()),
                        timestamp: TimestampGenerator.getTimestamp()});
                    this.textField("");
                }
            }.bind(this);
        }
        return TextLogHandler;
});