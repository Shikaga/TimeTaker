require.config({
    map: {
        '*': {
            'js/TimestampGenerator': 'MockTimestampGenerator',
            'js/Timer': 'MockTimer'
        }
    }
});

require(['../js/TextLogHandler'], function(TextLogHandler) {
    mockActivity = {
        name: "MockAtivity"
    }
    ko.applyBindings = sinon.spy();

    test( "textLogHandler init", function() {
        var mockSessions = ko.observableArray();
        var tlh = new TextLogHandler(mockSessions);
        equal(tlh.sessions, mockSessions);
        equal(tlh.textFieldEnabled(),false);
    });

    test("enables text log and timer when session added", function() {
        var mockSessions = ko.observableArray();
        var tlh = new TextLogHandler(mockSessions);

        tlh.textField('Log1');
        tlh.addSession(mockActivity);
        equal(tlh.sessions().length, 1);
        equal(tlh.sessions()[0].activity, mockActivity);
        equal(tlh.textFieldEnabled(),true);
        equal(tlh.activeSession.timer.start.called,true);
    });

    test("disabled text log and stop timer when session stopped", function() {
        var mockSessions = ko.observableArray();
        var tlh = new TextLogHandler(mockSessions);

        tlh.textField('Log1');
        tlh.addSession(mockActivity);
        tlh.stopSession();
        equal(tlh.sessions()[0].timer.stop.called,true);
        equal(tlh.textFieldEnabled(),false);
    });

    test( "textLogHandler can add log", function() {
        var mockSessions = ko.observableArray();
        var tlh = new TextLogHandler(mockSessions);

        tlh.textField('Log1');
        tlh.addSession(mockActivity);
        tlh.addLog();
        equal(tlh.activeSession.logs().length, 1);
        equal(tlh.activeSession.logs()[0].text(), 'Log1');
    });

    test( "textLogHandler unable to add log if no active session", function() {
        var mockSessions = ko.observableArray();
        var tlh = new TextLogHandler(mockSessions);

        tlh.textField('Log1');
        tlh.addLog();
        equal(true, true);
    });

    test( "textLogHandler clears field when log added", function() {
        var mockSessions = ko.observableArray();
        var tlh = new TextLogHandler(mockSessions);

        tlh.addSession(mockActivity);

        tlh.textField('Log1');
        tlh.addLog();
        equal(tlh.textField(), "");
    });

    test( "textLogHandler cannot add string before set", function() {
        var mockSessions = ko.observableArray();
        var tlh = new TextLogHandler(mockSessions);

        tlh.addSession(mockActivity);
        tlh.addLog();
        equal(tlh.activeSession.logs().length, 0);
    });

    test( "textLogHandler cannot add empty, null, undefined string", function() {
        var mockSessions = ko.observableArray();
        var tlh = new TextLogHandler(mockSessions);
        tlh.addSession(mockActivity);

        tlh.textField('');
        tlh.addLog();
        tlh.textField(null);
        tlh.addLog();
        tlh.textField(undefined);
        tlh.addLog();
        equal(tlh.activeSession.logs().length, 0);
    });


    test( "textLogHandler gets timestamp when log added", function() {
        var mockSessions = ko.observableArray();
        var tlh = new TextLogHandler(mockSessions);

        tlh.addSession(mockActivity);

        tlh.textField('Log1');
        tlh.addLog();
        equal(tlh.activeSession.logs()[0].timestamp(), "MockTimestamp");
    });

});