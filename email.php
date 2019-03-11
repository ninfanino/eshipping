<?php
if($_POST){
    $name = $_REQUEST['name'];
    $email = $_REQUEST['email'];
    $telefono = $_REQUEST['telefono'];
    $mensaje = $_REQUEST['mensaje'];

    $msj = utf8_decode($name)."\r\n";
	$msj .= "Email: ".utf8_decode($email)."\r\n";
	$msj .= "Teléfono: ".utf8_decode($telefono)."\r\n";
	$msj .= "Mensaje: ".utf8_decode($mensaje);

	//send email
    $send = mail("info@eshipping.com.mx", "Este es un email de:" .$email, $mensaje,"From: $email");
    if($send) {
    	echo "Your Account is Successfully Created. You must Activate your account.";
	} else
    	echo "Failed to send";
	}
?>