require.config({
    map: {
        '*': {
            'js/TimestampGenerator': 'MockTimestampGenerator'
        }
    }
});

require(['../js/TextLogHandler'], function(TextLogHandler) {
    mockNode = sinon.spy();
    ko.applyBindings = sinon.spy();

    test( "textLogHandler starts with no logs", function() {
        var tlh = new TextLogHandler(mockNode);
        equal(tlh.logs().length,0);
    });

    test( "textLogHandler can add log", function() {
        var tlh = new TextLogHandler(mockNode);
        tlh.textField('Log1');
        tlh.addLog();
        equal(tlh.logs().length, 1);
        equal(tlh.logs()[0].text(), 'Log1');
    });

    test( "textLogHandler clears field when log added", function() {
        var tlh = new TextLogHandler(mockNode);
        tlh.textField('Log1');
        tlh.addLog();
        equal(tlh.textField(), "");
    });

    test( "textLogHandler cannot add string before set", function() {
        var tlh = new TextLogHandler(mockNode);
        tlh.addLog();
        equal(tlh.logs().length, 0);
    });

    test( "textLogHandler cannot add empty, null, undefined string", function() {
        var tlh = new TextLogHandler(mockNode);
        tlh.textField('');
        tlh.addLog();
        tlh.textField(null);
        tlh.addLog();
        tlh.textField(undefined);
        tlh.addLog();
        equal(tlh.logs().length, 0);
    });


    test( "textLogHandler gets timestamp when log added", function() {
        var tlh = new TextLogHandler(mockNode);
        tlh.textField('Log1');
        tlh.addLog();
        equal(tlh.logs()[0].timestamp(), "MockTimestamp");
    });

});