(function (uppit, document) {
    "use strict";
    if (!uppit instanceof Object) {
        throw new Error('Uppit object not found for dragAndDrop plugin');
    }

    uppit.plugins.dragAndDrop = (function () {
        var handleDragEnter,
            handleDragExit,
            handleWithNoop,
            triggerDrop,
            handleDrop,
            element,
            handleElementSet;

        handleDragEnter = (function () {
            return function (event) {
                event.preventDefault();
                event.stopPropagation();
            };
        }());

        handleDragExit = (function () {
            return function (event) {
                event.preventDefault();
                event.stopPropagation();
            };
        }());

        handleWithNoop = function (event) {
            event.preventDefault();
            event.stopPropagation();
        };

        triggerDrop = function (file) {
            var event = document.createEvent('Event');
            event.initEvent('filedrop', true, true);
            event.file = file;
            element.dispatchEvent(event);
        };

        handleDrop = (function () {
            return function (event) {
                event.preventDefault();
                event.stopPropagation();

                var dataTransfer,
                    files,
                    index;

                dataTransfer = event.dataTransfer;

                files = dataTransfer.files;

                for (index = 0; index < files.length; index++) {
                    triggerDrop(files[index]);
                }
            };
        }());

        function init() {
            element.addEventListener('dragenter', handleDragEnter);
            element.addEventListener('dragover', handleWithNoop);
            element.addEventListener('dragexit', handleDragExit);
            element.addEventListener('drop', handleDrop);
        };

        handleElementSet = (function () {
            return function (event) {
                element = event.elements.element;
                init();
            };
        }());

        document.addEventListener('elementSet', handleElementSet);
        return {};
    }());
}(uppit, window.document));