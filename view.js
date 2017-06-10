//Este modulo inicializa el mapa y pone en marcha la carrera. 
function bootstrap() {
  var trackSource = "https://fastspeedster.herokuapp.com/api/tracks/";
  var runnersSource = "https://fastspeedster.herokuapp.com/api/runners/";
  var webcamsSource = "https://fastspeedster.herokuapp.com/api/webcams/42/";


  // Creación del componente mapa de Leaflet.  
  map = L.map("mapid"); // no se declara var para que sea global a todas las clases.

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

  // ejecuta una http request al server y cuando la respuesta es OK, ejecuta un
  // callback sobre los datos recibidos.
  requestJSON = function(url, callback) { // no se declara var para que sea global a todas las clases
    var xhttp;
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        console.log("Request OK");
        console.log("llamando funcion callback: " + callback);
        callback(JSON.parse(this.responseText));
      }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
  }

  map.layersControl = layersControl; // aca se setea como controlador de capas que se muestran en el mapa al objeto "layersControl":

  console.log("creando Trackloader");
  var trackLoader = new TrackLoader(trackSource, 42);
  console.log("loadTrack");
  trackLoader.loadTrack();
  
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

$(bootstrap);