(function () {
    var uppit = document.getElementById('uppit');
    
    this.handleWithNoop = function (event) {
        event.preventDefault();
        event.stopPropagation();
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
                that.ajaxUpload(files[index])
            }
        }
    }(this)
    
    this.ajaxUpload = function (file) {
        var handleOnload,
            xhr,
            fd;
        
        fd = new FormData();
        xhr = new XMLHttpRequest();
        
        handleOnload = function (xhr) {
            return function (event) {
                console.log(xhr.responseText);
            }
        }(xhr)
        
        xhr.addEventListener('load', handleOnload);
        xhr.addEventListener('progress', function() {console.log('progress')});
        
        xhr.open(
            'POST', 
            'upload.php', 
            true
        );
          
        fd.append('file', file);
        xhr.send(fd);
    }
    
    this.upload = function (file) {
        var reader;
        
        if (!(file instanceof File)) {
            throw new Error('Passed argument is not instance of File');
        }
        
        reader = new FileReader();
        
        reader.addEventListener('progress', function (event) {console.log(event);}, false);
        
        reader.readAsBinaryString(file);
        
        reader.onload = function (that) {
            return function (event) {
                that.ajaxUpload(event.target.result, file);
            }
        }(this)
    }
   
    uppit.addEventListener('dragenter', this.handleWithNoop);
    uppit.addEventListener('dragover', this.handleWithNoop);
    uppit.addEventListener('dragexit', this.handleWithNoop);
    uppit.addEventListener('drop', this.handleDrop);

})();
