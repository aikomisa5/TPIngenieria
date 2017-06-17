//Este modulo inicializa el mapa y pone en marcha la carrera.
function bootstrap() {
              
    var trackSource = "https://fastspeedster.herokuapp.com/api/tracks/";
    var runnersSource = "https://fastspeedster.herokuapp.com/api/runners/";
    var positionsSource = "https://fastspeedster.herokuapp.com/api/positions/";
    var webcamsSource = "https://fastspeedster.herokuapp.com/api/webcams/"; // este es solo la camara 42 no?¿

    // Creación del componente mapa de Leaflet.
    var map = L.map("mapid"); // no se declara var para que sea global a todas las clases.

    // Agregamos los Layers de OpenStreetMap.
    var baseLayer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        /* aca se carga el mapa de openStreetMap en LEAFLET ->>> L = objeto de leaflet*/
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Agregamos el control para seleccionar Layers al mapa
    var layersControl = L.control.layers({
        "Base": baseLayer
    });
    layersControl.addTo(map);

    // ejecuta un http request al server y cuando la respuesta es OK, ejecuta un
    // callback sobre los datos recibidos.
    requestJSON = function(url, callback, caller) { // no se declara var para que sea global a todas las clases
        var xhttp;
        xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) { // Maxi: sigo sin saber por que ese 4 y 200 jaja
                console.log("Request status " + this.statusText);
                console.log("llamando funcion callback: " + callback);
                callback(JSON.parse(this.responseText), caller);
            }
        };
        xhttp.open("GET", url, true);
        xhttp.send();
    }

    map.layersControl = layersControl; // aca se setea como controlador de capas que se muestran en el mapa al objeto "layersControl":
    $("#runners").hide();
    console.log("creando Trackloader");
    var trackLoader = new TrackLoader(trackSource, 42);

    console.log("loadTrack");
    trackLoader.loadTrack(map);

    console.log("creando WebcamsLoader");
    var webcamsLoader = new WemcamsLoader(webcamsSource, 42);

    console.log("loadWebCams");
    webcamsLoader.loadWebcams(map);

    console.log("creando Race");
    var race1K = new Race("1K", map);

    console.log("creando Runnersloader");
    var runnersLoader = new RunnersLoader(runnersSource);

    console.log("creando Positionsloader");
    var positionsLoader = new PositionsLoader(positionsSource);

    console.log("loadRunners");
    runnersLoader.loadRunnersTo(race1K, positionsLoader);
    
    $(document).ready(function() {
        
        $("#myBtn").click(function() {
            if (trackLoader.finishedLoad && race1K.finishedLoad &&
                runnersLoader.finishedLoad && positionsLoader.finishedLoad) {                
                race1K.start();
                $("#runners").show(500); 
            } else {
                console.log("track loaded: " + trackLoader.finishedLoad);
                console.log("race loaded: " + race1K.finishedLoad);
                console.log("runners loaded: " + runnersLoader.finishedLoad);
                console.log("positions loaded: " + positionsLoader.finishedLoad);
            }
        });
    });

    /*posible cambio para quitar el boton
    var result = confirm("¿Quieres iniciar la carrera?");
    if (result) // sera true si el usuario pone aceptar
      alert("Carrera Iniciada!");
    */

}

$(bootstrap);
