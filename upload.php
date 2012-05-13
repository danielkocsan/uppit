<?php
define('URL_BASE', $_SERVER['URL_BASE']);
define('APPILICATION_DIR', realpath(__DIR__) . '/');
define('UPLOAD_DIR', APPILICATION_DIR . 'files/');

foreach ($_FILES as $file) {
    $fileName = $file['tmp_name'];
    $destination = UPLOAD_DIR . basename($file['name']);
    
    move_uploaded_file($fileName, $destination);
}