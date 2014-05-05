define([], function() {
    function InactivityNotifier() {
        this.TWENTY_MINUTES = 20 * 60 * 1000;
        this.timeout = null;

        emitr.on('userevent', function() {
            clearTimeout(this.timeout);
            this._setTimer();
        }.bind(this))

        this._setTimer();
    }

    InactivityNotifier.prototype._setTimer = function() {
        this.timeout = setTimeout(function() {
            emitr.trigger('notify', 'What are you up to?');
        }, this.TWENTY_MINUTES)
    }

    return InactivityNotifier;
})