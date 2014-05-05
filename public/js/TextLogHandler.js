define(['js/TimestampGenerator', 'js/Timer', 'js/Session'], function(TimestampGenerator, Timer, Session) {
        function TextLogHandler(sessions) {
            this.sessions = sessions;
            this.textField = ko.observable();
            this.textFieldEnabled = ko.observable(false);
            this.addSession = function(activity) {
                var session = new Session(activity);
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
                        this.activeSession.addLog(this.textField());
                        this.textField("");
                    }
                }

            }.bind(this);
            this.deleteSession = function(session) {
                this.sessions.remove(session);
            }
        }
        return TextLogHandler;
});