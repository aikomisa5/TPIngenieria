function bootstrap() {

  //Este modulo inicializa el mapa y pone en marcha la carrera.      

//   var query0 = function(url, output) {
//     var xhttp = new XMLHttpRequest(); // esto es magia!
//     xhttp.onreadystatechange = function() {
//       if (this.readyState == 4 && this.status == 200) {
//         var res = xhttp.responseText;
//         output(res);
//         var obRes = JSON.parse(res); //parseamos para obtener el objeto js
//         output(obRes); // output de la connversion de esa respuesta
//       }
//     };
//     xhttp.open("GET", url, true); //mensaje de bienvenida donde dice las url que estan definidas que luego podremos usar
//     xhttp.send();
//   }
  
//    var query1 = function(url, output) {
//     var xhttp = new XMLHttpRequest(); // esto es magia!
//     xhttp.onreadystatechange = function() {
//       if (this.readyState == 4 && this.status == 200) {
//         var res = xhttp.responseText;        
//         var obRes = JSON.parse(res); //parseamos para obtener el objeto js
//         output(obRes.runner); // output de la connversion de esa respuesta
       
//       }
//     };
//     xhttp.open("GET", url, true); //mensaje de bienvenida donde dice las url que estan definidas que luego podremos usar
//     xhttp.send();
//   }

   var asignarCorredor = function(request){
     var res = request.responseText;
     var resultado = JSON.parse(res); //parseamos para obtener el objeto js
     return resultado.runner;
   }
  
   var runner780;
   
  //query0("https://fastspeedster.herokuapp.com/api/runners/780",console.log);
  // yo puse en un txt las url del pizzaron (esta en la carpeta del TP)
  
  var asignar1 = function load(url) {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      asignarCorredor(this);
    }
  };
  xmlhttp.open("GET", url, true);
  xmlhttp.send();
}
  
//   var asignadorDeRunner = function(url, asignador,runner) {
//     var xhttp = new XMLHttpRequest(); // esto es magia!
//     xhttp.onreadystatechange = function() {
//       if (this.readyState == 4 && this.status == 200) {
//         var res = xhttp.responseText;
//         var resultado = JSON.parse(res); //parseamos para obtener el objeto js
//         console.log(resultado.runner)
//         runner780 = runner;
//         console.log(runner);
//       }
//     };
//     xhttp.open("GET", url, false); //mensaje de bienvenida donde dice las url que estan definidas que luego podremos usar
//     xhttp.send();    
//     console.log("console log de DENTRO " + runner780);
//   }
// asignadorDeRunner("https://fastspeedster.herokuapp.com/api/runners/780", asignarCorredor, runner780);

//   console.log("console log de afuera " + runner780);


// <script>
// function loadXMLDoc() {
//   var xmlhttp = new XMLHttpRequest();
//   xmlhttp.onreadystatechange = function() {
//     if (this.readyState == 4 && this.status == 200) {
//       myFunction(this);
//     }
//   };
//   xmlhttp.open("GET", "cd_catalog.xml", true);
//   xmlhttp.send();
// }
// function myFunction(xml) {
//   var i;
//   var xmlDoc = xml.responseXML;
//   var table="<tr><th>Artist</th><th>Title</th></tr>";
//   var x = xmlDoc.getElementsByTagName("CD");
//   for (i = 0; i <x.length; i++) { 
//     table += "<tr><td>" +
//     x[i].getElementsByTagName("ARTIST")[0].childNodes[0].nodeValue +
//     "</td><td>" +
//     x[i].getElementsByTagName("TITLE")[0].childNodes[0].nodeValue +
//     "</td></tr>";
//   }
//   document.getElementById("demo").innerHTML = table;
// }
// </script>



  // Ubicación de la UNGS.
  var ungsLocation = [-34.5221554, -58.7000067];

  // Creación del componente mapa de Leaflet.
  //L es Leaflet, al parecer.
  var map = L.map('mapid').setView(ungsLocation, 15);

  // Agregamos los Layers de OpenStreetMap.
  var baseLayer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    /* aca se carga el mapa de openStreetMap
      en LEAFLET ->>> L = objeto de leaflet*/
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  // Agregamos el control para seleccionar Layers al mapa
  var layersControl = L.control.layers({
    "Base": baseLayer
  });
  layersControl.addTo(map);

  map.layersControl = layersControl; // aca se setea como controlador de capas que se muestran en el mapa al objeto "layersControl":

  //Ejemplos de como agregar marcadores y poligonos al mapa.

  // Creamos un círculo con centro en la UNGS.
  var circle = L.circle(ungsLocation, {
    color: '#0000AA',
    fillColor: '#0000CC',
    fillOpacity: 0.2,
    radius: 300
  }).addTo(map);

  // Creamos un polígono.
  L.polygon([
    L.latLng(-34.515594, -58.705654),
    L.latLng(-34.523503, -58.714062),
    L.latLng(-34.519177, -58.719890),
    L.latLng(-34.511089, -58.711374),
    L.latLng(-34.514062, -58.707909),
    L.latLng(-34.513824, -58.707584),
  ]).addTo(map);

  // Creamos un marker sobre la UNGS.
  var ungsMarker = L.marker(ungsLocation);
  ungsMarker.addTo(map);

  // Creamos una carrera
  var race1K = new Race("1K", map);

  // Pepe, le asigna el nombre junto con la lista de todas sus posiciones.
//   var pepe = new Runner("Pepe", [{
//     lon: -58.695290,
//     lat: -34.524297
//   }, {
//     lon: -58.697030,
//     lat: -34.522856
//   }, {
//     lon: -58.698210,
//     lat: -34.521874
//   }]);

//   //Agregando al corredor pepe a la carrera (race.js)
//   race1K.addRunner(pepe);

//   // Bolt!, le asigna el nombre junto con la lista de todas sus posiciones.
//   var bolt = new Runner("Bolt", [{
//     lon: -58.702329,
//     lat: -34.522739
//   }, {
//     lon: -58.702572,
//     lat: -34.522992
//   }, {
//     lon: -58.702801,
//     lat: -34.523191
//   }, {
//     lon: -58.703056,
//     lat: -34.523412
//   }, {
//     lon: -58.703299,
//     lat: -34.523643
//   }]);
//   //Agregando al corredor bolt la carrer (race.js)
//   race1K.addRunner(bolt);


  // lanza el metodo start de la carrera (race.js). 
  // cada un segundo, lee la lista de posiciones de cada participante y las muestra
  // en el mapa.
  race1K.start();
}

$(bootstrap); // alguna tecnologia de javaScript, investigar.