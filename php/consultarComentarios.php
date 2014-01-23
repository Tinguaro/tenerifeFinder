<?php
    
	$local = $_POST['loc'];
	
    $con = mysql_connect('localhost', 'root');
	if (!$con) {
		die('Not connected : ' . mysql_error());
	}
			
    mysql_select_db('interfaces', $con);
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