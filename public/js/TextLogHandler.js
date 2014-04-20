define(['js/TimestampGenerator', 'js/Timer'], function(TimestampGenerator, Timer) {
        function TextLogHandler() {
            this.sessions = ko.observableArray();
            this.textField = ko.observable();
            this.textFieldEnabled = ko.observable(false);
            this.addSession = function(activity) {
                var session = {
                    activity: activity,
                    logs: ko.observableArray(),
                    timer: new Timer()
                };
                session.timer.start();
                this.sessions.push(session);
                this.activeSession = session;
                this.textFieldEnabled(true);
            }
            this.stopSession = function() {
                this.activeSession.timer.stop();
                this.activeSession = null;
                this.textFieldEnabled(false);
            }
            this.addLog = function() {
                if (this.activeSession) {
                    if (this.textField() !== "" && this.textField() !== null && this.textField() !== undefined) {
                        this.activeSession.logs.push({text: ko.observable(this.textField()),
                            timestamp: TimestampGenerator.getTimestamp()});
                        this.textField("");
                    }
                }

            }.bind(this);
        }
        return TextLogHandler;
});