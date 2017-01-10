<?php

$errors = '';
$myemail = 'contact@minelegends.us';//<-----Put Your email address here.
if(empty($_POST['name'])  ||
    empty($_POST['uemail']) ||
    empty($_POST['msg'])) {
    $errors .= "\n Error: all fields are required";
    header('Location: http://minelegends.us/index.html#contact');
}

$name = $_POST['name'];
$email_address = $_POST['uemail'];
$message = $_POST['msg'];

if(empty($errors)) {
    $email_subject = "Contact form submission: ".$name;

    $email_body = "You have received a new message. ".

        " Here are the details:\n Name: ".$name."\n ".

        "Email: ".$email_address."\n Message: \n". $message;

    $headers = "From: ". $myemail."\n";

    $headers .= "Reply-To: ".$email_address;

    mail($myemail,$email_subject,$email_body,$headers);

//redirect to the 'thank you' page

    header('Location: http://minelegends.us/thanks.html');
}
?>