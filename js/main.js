function resizeTextlogArea() {
    var minHeight = 30; // Define a minimum height for the middle div

    var resizeMiddle = function() {
        var h = $('body').height() - $('#footer').height() - $('#header').height() - 20;
        h = h > minHeight ? h : minHeight;
        $('#main').height(h);
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
