<?php
	$usuario = $_POST['user'];
    $local = $_POST['loc'];
	$comments = $_POST['cmt'];
	
    $con = mysql_connect('localhost', 'root');
	if (!$con) {
		die('Not connected : ' . mysql_error());
	}

	if ($usuario.length <= 3)
		$usuario = "No Identificado";
	
    mysql_select_db('interfaces', $con);
    $sql = mysql_query("INSERT INTO comentarios VALUES ('$usuario', '$local', '$comments')", $con);
             
	echo "OK";
     
       
?>