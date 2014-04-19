define([], function() {
    function MockTimer() {

    }
    MockTimer.prototype.start = sinon.spy();
    MockTimer.prototype.stop = sinon.spy();
    return MockTimer;
})