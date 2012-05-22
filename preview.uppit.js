(function (uppit, document) {
    "use strict";
    if (!uppit instanceof Object) {
        throw new Error('Uppit object not found for ajaxUploader plugin');
    }

    uppit.plugins.preview = (function () {
        var createPreview,
            handleFileDrop,
            handleLoad,
            element = uppit.getElement(),
            fileNodes = [],
            setPreviewHref,
            handleUploadDone,
            init,
            handleElementSet,
            filesNode;

        handleLoad = function (data, file) {

        };


        createPreview = function (file) {
            var fileNode = document.createElement('div'),
                fileReader = new FileReader();

            fileNode.innerHTML = file.name;
            fileNode.setAttribute('class', 'file');
            filesNode.appendChild(fileNode);
            fileNodes.push(fileNode);

            fileReader.onload = (function (file) {
                return function (event) {
                    handleLoad(event.target.result, file);
                };
            }(file));

            fileReader.readAsDataURL(file);
        };

        handleFileDrop = (function () {
            return function (event) {
                event.stopPropagation();
                createPreview(event.file);
            };
        }());

        setPreviewHref = function (message, file) {
            var i,
                fileNode;
            for (i = 0; i < fileNodes.length; i += 1) {
                fileNode = fileNodes[i];

                if (fileNode.innerHTML === file.name) {
                    fileNode.innerHTML += message;
                }
            }
        };

        handleUploadDone = (function () {
            return function (event) {
                event.stopPropagation();
                setPreviewHref(event.xhr.responseText, event.file);
            };
        }());

        init = function () {
            element.addEventListener('filedrop', handleFileDrop);
        };

        handleElementSet = (function () {
            return function (event) {
                element = event.elements.element;
                filesNode = event.elements.files;
                init();
            };
        }());

        document.addEventListener('elementSet', handleElementSet);

        return {};
    }());
}(uppit, window.document));