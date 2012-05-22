(function (uppit) {
    "use strict";
    if (!uppit instanceof Object) {
        throw new Error('Uppit object not found for ajaxUploader plugin');
    }

    uppit.plugins.ajaxUploader = (function () {

        var upload,
            handleFileDrop,
            element = uppit.getElement();

        upload = function (file) {
            var handleOnload,
                xhr,
                fd;

            fd = new FormData();
            xhr = new XMLHttpRequest();

            triggerDone = function (file) {
                var event = document.createEvent('Event');
                event.initEvent('upload.done', true, true);
                event.file = file;
                event.xhr = xhr;
                element.dispatchEvent(event);
            };

            handleOnload = (function () {
                return function (event) {
                    triggerDone(file);
                };
            }());

            xhr.addEventListener('load', handleOnload);
            xhr.addEventListener('progress', function() {console.log('progress')}, true);

            xhr.open(
                'POST', 
                'upload.php', 
                true
            );

            fd.append('file', file);
            xhr.send(fd);
        };

        handleFileDrop = (function () {
            return function (event) {
                event.stopPropagation();
                upload(event.file);
            };
        }());

        element.addEventListener('filedrop', handleFileDrop);

        return {};
    }());
})(uppit);