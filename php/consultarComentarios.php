<?php
    
	$local = $_POST['loc'];
	
    $host='mysql.hostinger.es';
	$us='u282225314_jefe';
	$pas='Amoelrap1991';
	$nombreBD='u282225314_tf';
	$con = mysql_connect($host,$us,$pas);
	if (!$con) {
		die('Not connected : ' . mysql_error());
	}
			
    mysql_select_db($nombreBD, $con);
    $sql = mysql_query("SELECT * FROM comentarios WHERE nombreLocal='$local'", $con);
             
	$contar = mysql_num_rows($sql);
             
        if ($contar == 0){
            echo "ERROR";
            
		} else {
            while ($row = mysql_fetch_array ($sql)){
				$nom = $row['nombreUsuario'];
				$comment = $row['texto'];
				echo $nom . "_" . $comment . ";";    
                }
            }
       
?>