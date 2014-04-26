define(['js/ColorPalette'], function(ColorPalette) {
    function Activity() {
        this.colors = ColorPalette;
        this.name = ko.observable('Unnamed Activity');
        this.description = ko.observable("");
        this.color = ko.observable(ColorPalette[0]);
        this.setColor = function(color) {
            this.color(color);
        }
        this.id = Math.random().toString();
        this.totalTime = globals.activityTimeAccumulator.getTotalTimeFormatted(this);
    }

    Activity.prototype.serialize = function() {
        return {
            name: this.name()
            ,description: this.description()
            ,color: this.color()
            ,id: this.id
        }
    }

    Activity.prototype.deserialize = function(serial) {
        this.name(serial.name);
        this.description(serial.description);
        this.color(serial.color);
        this.id = serial.id;
    }

    return Activity;
})