<?php
	$usuario = $_POST['user'];
     
	if(!empty($usuario)) {
        buscar($usuario);
	} 
	
    function buscar($usuario) {
        $host='mysql.hostinger.es';
		$us='u282225314_jefe';
		$pas='Amoelrap1991';
		$nombreBD='u282225314_tf';
		$con = mysql_connect($host,$us,$pas);
		if (!$con) {
			die('Not connected : ' . mysql_error());
		}
			
        mysql_select_db($nombreBD, $con);
		
        $sql = mysql_query("SELECT * FROM usuarios WHERE nombre='$usuario'", $con);
			
        $contar = mysql_num_rows($sql);
             
        if ($contar == 0){
            echo "No se han encontrado resultados para '<b>".$usuario."</b>";
            
		} else {
            while ($row = mysql_fetch_array ($sql)){
                $pass = $row['password'];			
				echo $pass;
            }
        }
    }
       
?>