var Race = function(name, map) {
  this.name = name; // nombre de la carrera
  this.map = map; // mapa de la carrera
  this.runnersData = []; //arreglo de corredores, aca se agregan instancias de runner.

  // dada una posición, busca el runner al que le corresponde
  // y la asocia al mismo.
  this.bindRunnerPosition = function(runnerPosition) {
    this.runnersData.forEach(function(data) {
      var runner = data.runner;
      if (runner.id == runnerPosition.id) {
        console.log("Posiciones a cargar: ");
        for( var i in runnerPosition.positions){
          runner.addPosition(runnerPosition.positions[i].lat,runnerPosition.positions[i].lon);
        }
        console.log("posiciones asociadas a " + runner.showDetails() + " posiciones: " + runner.historyPositions);
      }
    });

    this.start();
  }

  this.addRunner = function(runner) {

    //Creamos el layer en el mapa para ese runner
    var runnerLayer = L.featureGroup().addTo(this.map); // es un featureGroup
    //porque el mismo permite bindear comportamiento a todos los elementos del layer.

    runnerLayer.bindPopup("Corredor " + runner.name + "!"); // bindeo de un popup a todos los markers del grupo.
    // Agregamos el layer al control
    this.map.layersControl.addOverlay(runnerLayer, runner.name);

    var updater = function(newPosition) {
      if (typeof newPosition != "undefined"){
      console.log("Updating view for runner: " + runner.name + "!!");
      console.log(newPosition);

      // borando los markers ya mostrados.
      runnerLayer.clearLayers();

      // Opción 1.
      runnerLayer.addLayer(L.marker([newPosition.lat,newPosition.lon]));

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
