<?php
	echo "PHP consulta Geolocalizacione"
	function conectaDb(){
	    try {
		$db = new PDO("sqlite:./TenerifeFinder.sqlite");
		return($db);
	    } catch (PDOException $e) {
			//print "<p>Error: No puede conectarse con la base de datos.</p>\n";
	    }
	}
	
      $buscar = $_POST['tipo'];
       
      if(!empty($buscar)) {
            buscar($buscar);
      }
       
	 
      function buscar($buscar) {
            $db = conectaDb();
			$tabla = "establecimientos";
			$tipo = "tipo";
			$consulta = "SELECT * FROM &tabla WHERE $tipo='$buscar'";
            $sql = db->query($consulta);
            if (!$sql){
                echo "No se han encontrado resultados para '<b>".$buscar."</b>'.";
			} else {
                foreach ($sql as $row)){
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
       
	   //db = NULL;
?>