
//hacemos focus al campo de b�squeda
$("#busqueda").focus();
																										
//comprobamos si se pulsa una tecla
$("#busqueda").keyup(function(e){
									 																								   
	//hace la b�squeda
	$.ajax({
			type: "POST",
			url: ip + "/php/consultarGeoloc.php",
			data: "b=" + $("#busqueda").val(),
			dataType: "html",
			error: function(){
				//alert("error petici�n ajax");
				$("#resultado").empty();
				$("#resultado").append("Error en la peticion de Ajax!!");
			}, 
								
			success: function(data){ 
				//alert(data);
				$("#resultado").empty();
				$("#resultado").append(data);
			}
	});															   
});