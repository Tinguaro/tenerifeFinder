<?php
	$usuario = $_POST['user'];
    $local = $_POST['loc'];
	$puntos = $_POST['pts'];
	
    $con = mysql_connect('localhost', 'root');
	if (!$con) {
		die('Not connected : ' . mysql_error());
	}
			
    mysql_select_db('interfaces', $con);
    $sql = mysql_query("INSERT INTO valoraciones VALUES ('$usuario', '$local', '$puntos')", $con);
             
	echo "OK";
     
       
?>