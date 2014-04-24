function resizeTextlogArea() {
    var minHeight = 30; // Define a minimum height for the middle div

    var resizeMiddle = function() {
        console.log('?');
        var h = $('body').height() - $('#freeform-footer').height() - $('#header').height() - 200;
        h = h > minHeight ? h : minHeight;

        h2 = $('body').height() - $('#header').height() - 300;
        h2 = h2 > minHeight ? h2 : minHeight;

        $('#freeform-main').height(h);
        $('#activity-activities').height(h2);
    }

    $(document).ready(resizeMiddle);
    $(window).resize(resizeMiddle);
}

ko.bindingHandlers.executeOnEnter = {
    init: function (element, valueAccessor, allBindingsAccessor, viewModel) {
        var allBindings = allBindingsAccessor();
        $(element).keypress(function (event) {
            var keyCode = (event.which ? event.which : event.keyCode);
            if (keyCode === 13) {
                allBindings.executeOnEnter.call(viewModel);
                return false;
            }
            return true;
        });
    }
};
