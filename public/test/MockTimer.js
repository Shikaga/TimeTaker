define([], function() {
    function MockTimer() {

    }
    MockTimer.prototype.startTime = ko.observable();
    MockTimer.prototype.endTime = ko.observable();
    MockTimer.prototype.start = sinon.spy();
    MockTimer.prototype.stop = sinon.spy();
    MockTimer.prototype.serialize = sinon.stub();
    MockTimer.prototype.serialize.withArgs().returns("serializedTimer");
    MockTimer.prototype.deserialize = sinon.spy();
    return MockTimer;
})