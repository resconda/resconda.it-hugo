<?php
// echo "PHP working";

require "config.php";

// TRUE means REQUIRED
$VALID_INPUT_FIELDS = [
    "name" => FALSE,
    "email" => TRUE,
    "phone" => FALSE,
    "message" => TRUE,
    "frc-captcha-solution" => TRUE,
];

$captchaSecret = getenv("FRIENDLY_CAPTCHA_SECRET");
$captchaKey = getenv("FRIENDLY_CAPTCHA_SITEKEY");

// DEBUG
error_log("Raw input: " . print_r($_POST, TRUE));
$INPUT = array_intersect_key($_POST, array_keys($VALID_INPUT_FIELDS));
// DEBUG
error_log("Filtered: " print_r($INPUT, TRUE));
$missing = array_diff_key(array_filter($VALID_INPUT_FIELDS), $INPUT);
if(count($missing) > 0){
    echo json_encode([
        "errors" => ["Missing input: " . join(", ", array_keys($missing))],
    ]);
    die();
}

$verified = captchaVerify($INPUT['frc-captcha-solutoin'], $captchaSecret, $captchaKey);
if($verified === TRUE){
    // TODO: send email to site master
    $inputstr = "";
    foreach ($INPUT as $key => $value) {
        $inputstr .= "$key: $value\n";
    }
    $message = <<<EOF
A new contact request was sent from website's contact form.

$inputstr
EOF;
    $enqueued = mail($SITEADMIN['email'], "New contact request", $message);
    $errors = [];
    if($enqueued != TRUE){
        $errors[] = "Error in PHP mail function. The notification email could not be sent to Site Master";
    }
    echo json_encode([
        "errors" => $errors,
        "name" => $INPUT['name']
    ]);
}else{
    echo json_encode([
        "errors" => ["Captcha verification failed"],
    ]);
    die();
}
// end of main


function captchaVerify($solution, $secret, $sitekey){
    $ret = FALSE;
    $data = [
        "solution" => $solution,
        "secret" => $secret,
        "sitekey" => $sitekey,
    ];
    $ch = curl_init("https://api.friendlycaptcha.com/api/v1/siteverify");
    curl_setopt($ch, CURLOPT_POST, TRUE);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
    $response = curl_exec($ch);
    if (curl_error($ch)) {
        error_log(curl_error($ch));
    }else{
        $parsed = json_decode($response, TRUE);
        if($parsed['success'] == "true"){
            $ret = TRUE;
        }else{
            $errorstr = join(". ", $parsed['errors']);
            error_log("Captcha verification failed: $errorstr");
            $ret = FALSE;
        }
    }
    curl_close($ch);
    return $ret;
}
?>