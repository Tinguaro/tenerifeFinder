<?php
	$usuario = $_POST['user'];
    $local = $_POST['loc'];
	$puntos = $_POST['pts'];
	
    $host='mysql.hostinger.es';
	$us='u282225314_jefe';
	$pas='Amoelrap1991';
	$nombreBD='u282225314_tf';
	$con = mysql_connect($host,$us,$pas);
	if (!$con) {
		die('Not connected : ' . mysql_error());
	}
			
    mysql_select_db($nombreBD, $con);
    $sql = mysql_query("INSERT INTO valoraciones VALUES ('$usuario', '$local', '$puntos')", $con);
             
	echo "OK";
     
       
?>