function ajaxUploader(file) {
    
    var handleOnload,
        xhr,
        fd;

    fd = new FormData();
    xhr = new XMLHttpRequest();

    handleOnload = function (that) {
        return function (event) {
            console.log('upload done');
            // console.log(xhr.responseText);
        }
    }(this)

    xhr.addEventListener('load', handleOnload);
    xhr.addEventListener('progress', function() {console.log('progress')}, true);

    xhr.open(
        'POST', 
        'upload.php', 
        true
    );

    fd.append('file', file);
    xhr.send(fd);
}

function dragAndDrop (element) {
    this.handleDragEnter = function (that) {
        return function (event) {
            event.preventDefault();
            event.stopPropagation();
        }
    }(this)
    
    this.handleDragExit = function (that) {
        return function (event) {
            event.preventDefault();
            event.stopPropagation();
        }
    }(this)
    
    this.handleWithNoop = function (event) {
        event.preventDefault();
        event.stopPropagation();
    }
    
    this.triggerDrop = function (file) {
        var event = document.createEvent('Event');
        event.initEvent('filedrop', true, true);
        event.file = file;
        element.dispatchEvent(event);
    }
    
    this.handleDrop = function (that) {
        return function (event) {
            event.preventDefault();
            event.stopPropagation();

            var dataTransfer,
                files,
                index;

            dataTransfer = event.dataTransfer;
            
            files = dataTransfer.files;

            for (index = 0; index < files.length; index++) {
                that.triggerDrop(files[index]);
            }
        }
    }(this)
    
    element.addEventListener('dragenter', this.handleDragEnter);
    element.addEventListener('dragover', this.handleWithNoop);
    element.addEventListener('dragexit', this.handleDragExit);
    element.addEventListener('drop', this.handleDrop);
}

(function (dnd, upl) {
    var uppit = document.getElementById('uppit');
    
    this.setActive = function () {
        uppit.setAttribute('class', 'active');
        uppit.innerHTML = 'Drop it!';
    }
    
    this.setInactive = function () {
        uppit.setAttribute('class', '');
        uppit.innerHTML = 'Drop files here';
    }
    this.startUpload = function () {
        return function event (event) {
            upl(event.file);
        }
    }()
    
    this.handleEnter = function (that) {
       return function (event) {
           that.setActive();
       } 
    }(this)
    
    this.handleDrop = function (that) {
       return function (event) {
           that.setInactive();
       } 
    }(this)
    
    uppit.addEventListener('filedrop', startUpload);
    uppit.addEventListener('dragenter', this.handleEnter);
    uppit.addEventListener('drop', this.handleDrop);
    
    dnd(uppit);
})(dragAndDrop, ajaxUploader);
