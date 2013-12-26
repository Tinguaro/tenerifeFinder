function insertarValoracion (local, usuario, puntos) {								 																								   

	// Ponemos la "rueda de espera" visible mientras dure la petici�n ajax
	$.mobile.changePage($("#page4"), "flip"); 
	
	//hace la b�squeda
	$.ajax({
			type: "POST",
			url: ip + "insertarValoracion.php",
			data: "user=" + usuario + "&loc=" + local + "&pts=" + puntos, 
			dataType: "html",
			error: function(){
				// Ponemos la "rueda de espera" visible mientras dure la petici�n ajax
				$.mobile.changePage($("#page3"), "flip");
				alert ("ERROR: no fue posible realizar la valoraci�n. Int�ntelo m�s tarde!!")
			}, 
								
			success: function(data){ 
				if (data == "OK" || data == "ok")
					alert ("Local valorado correctamente!!");
				

				// Ponemos la "rueda de espera" visible mientras dure la petici�n ajax
				$.mobile.changePage($("#page3"), "flip"); 
			}
	});					 										   
}  

function valorarLocal (num) {
	var local = nombreLocal;
	var usua = $("#user").val ();
	insertarValoracion (local, usua, num);
	visualizarInfoLocal ();
}  