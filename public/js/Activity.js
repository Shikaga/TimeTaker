define(['js/ColorPalette'], function(ColorPalette) {
    function Activity() {
        this.colors = ColorPalette;
        this.name = ko.observable('Unnamed Activity');
        this.description = ko.observable("");
        this.selected = ko.observable(true);
        this.color = ko.observable(ColorPalette[0]);
        this.setColor = function(color) {
            this.color(color);
        }
    }
    return Activity;
})