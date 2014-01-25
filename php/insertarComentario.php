<?php
	$usuario = $_POST['user'];
    $local = $_POST['loc'];
	$comments = $_POST['cmt'];
	
    $host='mysql.hostinger.es';
	$us='u282225314_jefe';
	$pas='Amoelrap1991';
	$nombreBD='u282225314_tf';
	$con = mysql_connect($host,$us,$pas);
	if (!$con) {
		die('Not connected : ' . mysql_error());
	}

	if ($usuario.length <= 3)
		$usuario = "No Identificado";
	
    mysql_select_db($nombreBD, $con);
    $sql = mysql_query("INSERT INTO comentarios VALUES ('$usuario', '$local', '$comments')", $con);
             
	echo "OK";
     
       
?>