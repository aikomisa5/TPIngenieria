function centrosLoader(url) {
    this.url = url;
    var latlngs = [];
    this.finishedLoad = false;

  /*  this.cargarCiertoTipoDeCentro = function(enum tipoCentro){

  }*/

    this.loadCentros = function(map) {
        //modifica el html para mostrar la info del centro
      /*  function mostrarDatos(centro) {
            centro = "<h3 > Centro " +
                centro.id +
                "<small> Nombre: " +
                centro.nombre +
                "</small>" +
                "<small> Calle: " +
                centro.calle +
                "</small>" +
                "<small> Numero: " +
                centro.numero +
                "</small>" +
                "</h3>";
            $("#centro").hide();
            $("#centro").empty();
            $("#centro").append(centro);
            $("#centro").show(500);
        }
*/
        // recibe el listado de centros a procesar
        function generarArrayDeCentrosPositions(centrosList) {
            console.log("generando array de coordenadas de centros");

            centrosList.forEach(function(centro) {
                console.log("coordenada centro: " + centro.lat + ", " + centro.lon);
                latlngs.push([centro.lat, centro.lon]);
            });
        }

        function cargarMapa(centrosListResponse, self) {
            console.log("callback llamado");
            var centroLayer = L.featureGroup().addTo(map); // es un featureGroup
            // Agregamos el layer al control
            map.layersControl.addOverlay(centroLayer, "Centros Medicos");
            console.log("Añadiendo Centros Medicos al Mapa");
            centrosListResponse.centros.forEach(function(centro) {

                marker = L.marker([centro.coordinate.lat, centro.coordinate.lon]);

                marker.bindPopup("<b>"+centro.nombre+"</b>"+"<br>"+centro.calle + " " + centro.numero).openPopup();
              //  "<b>Hello world!</b><br>I am a popup."
                /*marker.on('click', function() {
                    mostrarDatos(centro);
                });*/
                centroLayer.addLayer(marker);

            });

            self.finishedLoad = true;
        }

        console.log("ejecutando request sobre url: " + url);
        requestJSON(url , cargarMapa, this);

    }

}
