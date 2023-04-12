<?php
$SITEADMIN = [
    "name" => "Marcello Corongiu",
    "email" => "info@resconda.it",
];
/**
 * Get log level from LOG_LEVEL env var
 */
define("log_level_debug", 0);
define("log_level_info", 1);
define("log_level_warning", 2);
define("log_level_error", 3);

$LOG_LEVELS = [
    "DEBUG" => constant("log_level_debug"),
    "INFO" => constant("log_level_info"),
    "WARNING" => constant("log_level_warning"),
    "ERROR" => constant("log_level_error"),
];
$env_log_level = getenv("LOG_LEVEL");
if($env_log_level !== false){
    if(!array_key_exists($env_log_level, $LOG_LEVELS)){
        $env_log_level = "DEBUG";
    }
}else{
    $env_log_level = "DEBUG";
}
$LOG_LEVEL = $LOG_LEVELS($env_log_level);


function _myLog(string $logtext, int $level): void {
    global $LOG_LEVEL;
    global $env_log_level;
    if($level >= $LOG_LEVEL){
        error_log("[$env_log_level] $logtext");
    }
}
function debugLog(string $logtext){
    global $LOG_LEVELS;
    _myLog($logtext, $LOG_LEVELS["DEBUG"]);
}
function infoLog(string $logtext)
{
    global $LOG_LEVELS;
    _myLog($logtext, $LOG_LEVELS["INFO"]);
}
function warningLog(string $logtext)
{
    global $LOG_LEVELS;
    _myLog($logtext, $LOG_LEVELS["WARNING"]);
}
function errorLog(string $logtext)
{
    global $LOG_LEVELS;
    _myLog($logtext, $LOG_LEVELS["ERROR"]);
}
?>