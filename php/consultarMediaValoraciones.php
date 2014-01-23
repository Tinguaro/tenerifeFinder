<?php
    
	$local = $_POST['nombre'];
	
    $con = mysql_connect('localhost', 'root');
	if (!$con) {
		die('Not connected : ' . mysql_error());
	}
			
    mysql_select_db('interfaces', $con);
    $sql = mysql_query("SELECT AVG(puntos) FROM valoraciones WHERE nombreLocal='$local' GROUP BY nombreLocal", $con);
             
	$contar = mysql_num_rows($sql);
             
        if ($contar == 0){
            echo "ERROR";
            
		} else {
            while ($row = mysql_fetch_array ($sql)){
				$media = $row[0];
				echo $media;    
            }
        }
       
?>