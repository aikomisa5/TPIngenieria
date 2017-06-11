//Este modulo inicializa el mapa y pone en marcha la carrera.
function bootstrap() {
  var trackSource = "https://fastspeedster.herokuapp.com/api/tracks/";
  var runnersSource = "https://fastspeedster.herokuapp.com/api/runners/";
  var positionsSource = "https://fastspeedster.herokuapp.com/api/positions/";
  var webcamsSource = "https://fastspeedster.herokuapp.com/api/webcams/42/";


  // Creación del componente mapa de Leaflet.
  var map = L.map("mapid"); // no se declara var para que sea global a todas las clases.

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

  // ejecuta un http request al server y cuando la respuesta es OK, ejecuta un
  // callback sobre los datos recibidos.
  requestJSON = function(url, callback) { // no se declara var para que sea global a todas las clases
    var xhttp;
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        console.log("Request status " + this.statusText);
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
  trackLoader.loadTrack(map);

  console.log("creando Race");
  var race1K = new Race("1K", map);

  console.log("creando Runnersloader");
  var runnersLoader = new RunnersLoader(runnersSource);

  console.log("creando Positionsloader");
  var positionsLoader = new PositionsLoader(positionsSource);

  console.log("loadRunners");
  runnersLoader.loadRunnersTo(race1K, positionsLoader);

}

$(bootstrap);