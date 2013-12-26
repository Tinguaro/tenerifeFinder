function insertarComentario () {			
	
	var nombre = $("#user").val();
	var local = nombreLocal;
	var comentario = $("#comentar").val();
	
	$.ajax({
			type: "POST",
			url: ip + "insertarComentario.php",
			data: "user=" + nombre + "&loc=" + local + "&cmt=" + comentario, 
			dataType: "html",
			error: function(){

				// Ponemos la "rueda de espera" visible mientras dure la petición ajax
				$.mobile.changePage($("#page3"), "flip"); 
				alert ("Algo imprevisto ha ocurrido mientras se insertaba el comentario. Repítalo si desea");
			}, 
								
			success: function(data){ 
				alert ("Comentario insertado correctamente!!");
				$("#comentar").html = "";
				

				// Ponemos la "rueda de espera" visible mientras dure la petición ajax
				$.mobile.changePage($("#page4"), "flip"); 
				
				visualizarComentarios ();
				$.mobile.changePage($("#page3"), "flip");
			}
	});
} 

function visualizarComentarios () {								 																								   
	var local = nombreLocal;
	
	$.ajax({
			type: "POST",
			url: ip + "consultarComentarios.php",
			data: "loc=" + local, 
			dataType: "html",
			error: function(){
				alert ("AVISO: algo sucedi al obtener los comentarios!!");
				// Ponemos la "rueda de espera" visible mientras dure la petición ajax
				$.mobile.changePage($("#page3"), "flip");
		
			},
								
			success: function(data){ 
				var tuplas = data.split(";");
				var linea;
				var nombre, comentario;
				if (data != "ERROR") {
					for (var i in tuplas) {
						linea = tuplas[i].split("_");
						if (linea[1] != undefined) {
							nombre = linea[0];
							comentario = linea[1];
							$("#comentarios").append ("<p>" + "Usuario: " + nombre + "</p>" + 
								"<p data-role='p' data-theme='a'>"+comentario+"</p>");
						}
					}
				} else
					console.log("No existen comentarios para el local " + local);
				
				// Ponemos la "rueda de espera" visible mientras dure la petición ajax
				$.mobile.changePage($("#page3"), "flip"); 
				
			}
	});
	$.mobile.changePage($("#page3"), "flip");
} 