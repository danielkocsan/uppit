var uppit = function () {
    var element = null,
        plugins = {};
        
    function setElement (elmnt) {
        var event = document.createEvent('Event');
        event.initEvent('elementSet', true, true);
        event.element = elmnt;
        document.dispatchEvent(event);
        element = elmnt;
    }
    
    return {
        setElement: setElement,
        getElement: function () {
            return element;
        },
        plugins: plugins
    }
}();