function ejecutarRegistro () {			

	var nombre = $("#regNombre").val();
	var apellido = $("#regApellido1").val();
	var nombreUsuario = $("#regNombreUsuario").val();
	var password1 = $("#regPasswordUsuario").val();
	var password2 = $("#regPasswordUsuarioVerificar").val();
	
	// Comprobamos que están rellenos los campos obligatiorios!!
	if (nombre.length > 0 && apellido.length > 0 && nombreUsuario.length > 0 && 
		password1.length > 0 && password2.length > 0) {
	
		// Obtenemos las contraseñas y comprobamos su igualdad!!
		if (password1 == password2) {
		
			$.ajax({
				type: "POST",
				url: ip + "insertarRegistro.php",
				data: "usu=" + nombreUsuario + "&pass=" + password1,
				dataType: "html",
				error: function(){
					alert ("Algo imprevisto ha ocurrido mientras se registraba al usuario!!. Repítalo si desea");
				}, 
									
				success: function(data){ 
					alert ("Usuario registrado correctamente!!");
					
					$.mobile.changePage($("#page2"), "flip"); 
				}
			});
			
		} else {
			alert ("ERROR: Compruebe que los datos introducidos son correctos e incompletos!! (ej. verifique password)");
		}
		
	}
} 
