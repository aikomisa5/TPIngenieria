//Este modulo inicializa el mapa y pone en marcha la carrera. 
function bootstrap() {
  var trackSource = "https://fastspeedster.herokuapp.com/api/tracks/";
  var runnersSource = "https://fastspeedster.herokuapp.com/api/runners/";
  var webcamsSource = "https://fastspeedster.herokuapp.com/api/webcams/42/";


  // Ubicación de la UNGS.
  var ungsLocation = [-34.5221554, -58.7000067]; //default location

  // Creación del componente mapa de Leaflet.
  //L es Leaflet, al parecer.
  var map = L.map("mapid").setView(ungsLocation, 15);

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
  function requestJSON(url, callback) {
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

  function TrackLoader(url, trackID) {
    this.url = url;
    this.trackID = trackID;
    
    var latlngs = [];
    this.loadTrack = function() {
      // recibe el track a procesar
      
      function generarArrayDeTrackPositions(track) {
        console.log("generando array de coordenadas de mapa: "+ track.id);
        for (var i in track.coordinates) {
          console.log("coordenada "+ i + ": " + track.coordinates[i].lat + ", " + track.coordinates[i].lon);
          latlngs.push([track.coordinates[i].lat, track.coordinates[i].lon]);
        }
      }
      
      function cargarMapa(trackResponse) {
        console.log("callback llamado");
        generarArrayDeTrackPositions(trackResponse.track);
        
        console.log("añadiendo circuito a mapa");
        var circuito = L.polygon(latlngs, {color: 'red'}).addTo(map);
        // zoom the map to the polygon
        map.fitBounds(circuito.getBounds());
      }       
      
      console.log("ejecutando request sobre url: "+ url + trackID);
      requestJSON(url + trackID, cargarMapa);
     
    }

  }

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

$(bootstrap); // alguna tecnologia de javaScript, investigar.