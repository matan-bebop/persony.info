#!/usr/bin/env php
<?php
if(file_exists($env = __DIR__ . '/env.php')){
    require $env;
}
// change the following paths if necessary
if(empty($yii)){
    exit('Please provide Yii path in env.php');
}

require $yii;

Yii::createConsoleApplication(__DIR__ . '/config/main.php')->run();
