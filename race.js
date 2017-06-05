var Race = function(name, map) {
    this.name = name; // nombre de la carrera
    this.map = map; // mapa de la carrera
    this.runnersData = []; //arreglo de corredores, aca se agregan instancias de runner.

    
    this.addRunner = function(runner) {      
        //Creamos el layer en el mapa para ese runner
        var runnerLayer = L.layerGroup().addTo(this.map);
        // Agregamos el layer al control
        this.map.layersControl.addOverlay(runnerLayer, runner.name);

        var updater = function(newPosition) {
            console.log("Updating view for runner: " + runner.name + "!!");
            console.log(newPosition);

            // Opción 1.            
            runnerLayer.addLayer(L.marker(newPosition));
            // Opción 2.
             runnerLayer.addLayer(L.circleMarker(newPosition, {
                                     radius: 7,
                                     fillColor: "#00AA00",
                                     color: "#DDD",
                                     weight: 1,
                                     opacity: 1,
                                     fillOpacity: 0.3
                                 }));
        }

        // agregar a la carrera cada corredor, con el updater asociado
        this.runnersData.push({
            runner: runner,
            updater: updater
        })
    }

    // toma cada uno de esos runners que estan en runnersdata y lo dibuja en el mapa
    this.start = function() {
        this.runnersData.forEach(function(data) {
            var runner = data.runner;
            runner.run(data.updater);
        });
    }
};