var uppit = function (document) {
    "use strict";
    var element = null,
        plugins = {},
        filesNode,
        createNodes;

    function setElement(elmnt) {
        var event = document.createEvent('Event');
        
        element = elmnt;
        createNodes();
        
        event.initEvent('elementSet', true, true);
        event.elements = {
            element: elmnt,
            files: filesNode
        };
        document.dispatchEvent(event);
    };

    createNodes = function () {
        var clearNode = document.createElement('div');
        clearNode.setAttribute('class', 'clear');
        
        filesNode = document.createElement('div');
        filesNode.setAttribute('id', 'files');
        
        element.appendChild(filesNode);
        element.appendChild(clearNode);
    };

    return {
        setElement: setElement,
        getElement: function () {
            return element;
        },
        plugins: plugins
    };
}(window.document);