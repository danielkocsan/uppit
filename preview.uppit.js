(function (uppit) {
    if (!uppit instanceof Object) {
        throw new Error ('Uppit object not found for ajaxUploader plugin');
    }

    uppit.plugins.preview = (function () {
        var createPreview,
            handleFileDrop,
            handleLoad,
            element = uppit.getElement(),
            fileNodes = [];

        handleLoad = function (data, file) {
            
        };
        

        createPreview = function (file) {
            var fileNode = document.createElement('div')
            fileNode.innerHTML = file.name;
            element.appendChild(fileNode);
            fileNodes.push(fileNode);
            
            var fileReader = new FileReader();

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
            for(var i = 0; i < fileNodes.length; i++) {
                var fileNode = fileNodes[i];

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

        element.addEventListener('filedrop', handleFileDrop);
        element.addEventListener('upload.done', handleUploadDone);

        return {};
    }());
}(uppit));