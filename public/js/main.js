x = 0;
y = 0;


function resizeTextlogArea() {
    var minHeight = 30; // Define a minimum height for the middle div

    var resizeMiddle = function() {
        var h = $('body').height() - $('#freeform-footer').height() - $('#header').height() - 120;
        h = h > minHeight ? h : minHeight;

        h2 = $('body').height() - $('#header').height() - 150;
        h2 = h2 > minHeight ? h2 : minHeight;

        $('#freeform-main').height(h);
        $('#activity-activities').height(h2);
    }

    $(document).ready(resizeMiddle);
    $(window).resize(resizeMiddle);
}

ko.bindingHandlers.scrollOnUpdate = {
    init: function (element, valueAccessor, allBindingsAccessor, viewModel) {
        z = element;
        var sessions = allBindingsAccessor().scrollOnUpdate;
        sessions.subscribe(function() {
            console.log('!');
            setTimeout(function() {
                element.scrollTop = element.scrollHeight;
                console.log(element.scrollTop, element.scrollHeight);
            },0);
        })
    },
    update: function(element, valueAccessor, allBindingsAccessor, viewModel) {
        setTimeout(function() {
            element.scrollTop = element.scrollHeight;
        },0);
    }
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
