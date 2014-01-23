var ip = "../tenerifeFinder/php/";
var nombreLocal = "";
var latlng, map, infoWindow;
var markersBeber = [], markersComer = [], markersNoche = [];
var info = [];

function initialize() {
		
	latlng = new google.maps.LatLng(28.489665, -16.315926);
	var mapOptions = {
			zoom: 20,
			center: latlng,
			mapTypeId: google.maps.MapTypeId.ROADMAP,
			zoomControl: true,

	};
	var mapaDiv = document.getElementById ('mapa');
	mapaDiv.style.display = "block";
	map = new google.maps.Map(mapaDiv,
			mapOptions);

	var marker = new google.maps.Marker({
	      position: latlng,
	      map: map,
	      title: 'aqui',
	      draggable:true,
	      icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png', 
	      animation: google.maps.Animation.BOUNCE
	});
	
    infowindow = new google.maps.InfoWindow({
    	content: $("#contenido")[0] 	// Es como hacer  -> infowindow.setContent($("#contenido")[0]);
    });
    
    
    google.maps.event.addListener(marker, 'click', function() {
    	infowindow.open(map, marker);
    });
    //peticionMarkers ();
	$("#textoAsistente").empty();
	$("#textoAsistente").append($('<div class="notice marker-on-bottom bg-amber fg-white">Puedes buscar locales en tu zona</div>'));

}

function irAPagina3() {
	$.mobile.changePage($("#page3"),"flip");
	visualizarInfoLocal ();
	visualizarComentarios ();
}
function visualizarInfoLocal () {
	var media;
	var dir, cap;
	var tupla = [];
	/*Direccion y capacidad*/
	$("#infoLocal").empty();
	$.ajax({
		type: "POST",
		url: ip + "consultarLocal.php",
		data: "nombre=" + nombreLocal,
		dataType: "html",
		error: function(){
		}, 								 	
		success: function(data){
			if (data != "ERROR") { 
				console.log("DAAAATA   = " + data);
				
				tupla = data.split("_");
				dir = tupla[0]; 
				cap = tupla[1]; 
				$("#infoLocal").append("<p>Nombre: " + nombreLocal + "</p>" +
									   "<p>Direccion: " + dir + "</p>" +
									   "<p>Plazas del local: " + cap + "</p>");
				$.ajax({
					type: "POST", 
					url: ip + "consultarMediaValoraciones.php",
					data: "nombre=" + nombreLocal, 
					dataType: "html",
					error: function(){
					}, 								 	
					success: function(data){
						if (data != "ERROR") {
							media = data; 
						} else {
							media = 0;
						}
						$("#infoLocal").append("<p>Media de valoraciones: " + media + "</p>");
					}
				});
			} else {
				console.log("No se pudo encontrar el local");
			}
		}
	}); 
}


/* *****************************************************************************************
 * 			Geolocalización, Markers, ...
 ******************************************************************************************/

function anteElExito(position) {
	// Nos Geolocalizamos
	latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
	console.log(position.coords.latitude + " --- " + position.coords.longitude);
}

function anteElError(error) {
	console.log("ERROR : " + error.code);
    alert("ERROR: no ha sido posible GEO-LOCALIZARLE. Pulse REFRESCAR");
}


/* *****************************************************************************************
 * 			Notificaciones, ....
 ******************************************************************************************/

function mostrarAlertaBeber() {
	$("#textoAsistente").empty();
	$("#textoAsistente").append($('<div class="notice marker-on-bottom bg-amber fg-white">Has elegido la opci&oacuten de Beber</div>'));
	peticionMarkers ("beber");
}

function mostrarAlertaComer() {
	$("#textoAsistente").empty();
	$("#textoAsistente").append($('<div class="notice marker-on-bottom bg-amber fg-white">Has elegido la opci&oacuten de Comer</div>'));
	peticionMarkers ("comer");
}

function mostrarAlertaNoche() {
	$("#textoAsistente").empty();
	$("#textoAsistente").append($('<div class="notice marker-on-bottom bg-amber fg-white">Has elegido la opci&oacuten de Noche</div>'));
	peticionMarkers ("noche");
}

function onConfirm () {}  

/* *****************************************************************************************
 * 			Consultas a la Base de datos de los Establecimientos
 ******************************************************************************************/
function peticionMarkers (tipo) {
	alert ("entra a peticion markers");
	$.ajax({
			type: "POST",
			url: ip + "consultarGeoloc.php",
			data: "tipo=" + tipo,
			dataType: "html",
			error: function(){
				alert("error en peticion markers");
			}, 									
			success: function(data){  
				crearMarkers(data);
			}
	});													   
}
 
function crearMarkers(data) {
	console.log("--------Petición markers");
	console.log(data);
	var nombre, latitud, longitud, tipo, direccion, capacidad;
	var marker;
	var tuplas = data.split(";");
	var linea;
	var ventanitaInfo;

	esconderMarkers (markersBeber);
	esconderMarkers (markersComer);
	esconderMarkers (markersNoche);
	for (var i in tuplas) {
	console.log(i);
		linea = tuplas[i].split("_");
			nombre = linea[0];
			latitud = linea[1];
			longitud = linea[2]; 
			tipo = linea[3];
			direccion = linea[4];
			capacidad = linea[5];
			if (tipo == "BEBER") {
				marker = new google.maps.Marker({
				      position: new google.maps.LatLng(latitud, longitud),
				      map: map, 
				      title: nombre,
				      icon: "icons/beber.icon"
				}); 
				markersBeber.push (marker);
				
			} else if (tipo == "COMER") {
				marker = new google.maps.Marker({
				      position: new google.maps.LatLng(latitud, longitud),
				      map: map,
				      title: nombre,
				      icon: "icons/comer.icon"
				});
				markersComer.push (marker);
			} else if (tipo == "NOCHE") {
				marker = new google.maps.Marker({
				      position: new google.maps.LatLng(latitud, longitud),
				      map: map,
				      title: nombre,
				      icon: "icons/noche.icon" 
				}); 
				markersNoche.push (marker);
			}
		
			ventanitaInfo = new google.maps.InfoWindow({
				content: "<p>" + "Nombre: " + nombre + "<br>" +
						 "<p>" + "Dir.: " + direccion + "<br>" +
						 "<p>" + "N.Plazas: " + capacidad + "<br>" +
						 "<button id='botonAmpliarInfo' onclick='irAPagina3();' data-transition='flip' data-direction='reverse'>" +          
							"Ir al sitio" +  
						 "</button>"
			});
			
			info.push(ventanitaInfo);
	}
	inicializarVentanasInfo(markersBeber);
	inicializarVentanasInfo(markersComer);
	inicializarVentanasInfo(markersNoche);
}

function esconderMarkers(markers) {
	for (var i in markers) {
		markers[i].setMap(null);
	}
}

function asignarMarkers(markers) {
	for (var i in markers) {
		markers[i].setMap(map);
	}
}

function buscarMarker (markers, nombre) {
	var indice = -1;
	for(var i in markers) {
		if (markers[i].title == nombre)
			indice = i;
	}
	return indice;	
}

function setNombreLocal (valor) {
	nombreLocal = valor;
}

function inicializarVentanasInfo (markers) {
	for (var i in markers) {
		google.maps.event.addListener(markers[i], 'click', function() {
			var indice = buscarMarker(markers, this.title);
			setNombreLocal(this.title);
			info[indice].open(map, this); 
		}); 
	}
}

