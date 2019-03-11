<?php
if($_POST){
    $telefono = $_REQUEST['data'];
    

	//send email
    $send = mail("loversareinsane@gmail.com", "Solicitud de contacto", "Contactar al siguiente número:" .$telefono,"From: info@eshipping.com.mx");
    
?>