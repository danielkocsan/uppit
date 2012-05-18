var uppit = function () {
    var element = null,
        plugins = {},
        addFile,
        files = [];
    
    return {
        setElement: function (elmnt) {
            element = elmnt;
        },
        getElement: function () {
            return element;
        },
        plugins: plugins
    }
}();