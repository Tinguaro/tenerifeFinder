<?php
	
      $buscar = $_POST['tipo'];
       
      if(!empty($buscar)) {
            buscar($buscar);
      }
       
      function buscar($buscar) {
            $con = mysql_connect('localhost', 'root');
			if (!$con) {
				die('Not connected : ' . mysql_error());
			}
            mysql_select_db('interfaces', $con);
       
            $sql = mysql_query("SELECT * FROM establecimientos WHERE tipo='$buscar'", $con);
			
            $contar = mysql_num_rows($sql);
             
            if ($contar == 0){
                echo "No se han encontrado resultados para '<b>".$buscar."</b>'.";
            
			} else {
                while ($row = mysql_fetch_array ($sql)){
					$nom = $row['nombre'];
					$dir = $row['dir'];
					$type = $row['tipo'];
					$cap = $row['plazas'];
                    $lat = $row['lat'];
					$long = $row['long'];
                    echo $nom . "_" . $lat . "_" . $long . "_" . $type . "_" . $dir . "_" . $cap . ";";    
                }
            }
      }
       
?>