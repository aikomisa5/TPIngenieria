  function RunnersLoader(url) {
    this.url = url;
    this.finishedLoad = false;

    var runners = [];
    this.loadRunnersTo = function(race, positionsLoader) {

      // recibe los runners a procesar
      function generarArrayDeRunners(runnersData) {
        console.log("generando array de runners:");
        for (var i in runnersData) {
          var runner = new Runner(runnersData[i].id,
            runnersData[i].name,
            runnersData[i].surname,
            runnersData[i].sponsor,
            runnersData[i].surname                  
          );
          console.log(runner.showDetails());
          runners.push(runner);
        }
      }

      function cargarRunners(runnersResponse, self) {
        console.log("callback llamado");
        generarArrayDeRunners(runnersResponse.runners);

        console.log("añadiendo runners a carrera");
        runners.forEach(function(runner) {
          race.addRunner(runner);
          console.log(runner.showDetails() + " añadido");
        });

        console.log("loadPositions");
        positionsLoader.loadRunnersPositionsTo(race);
        self.finishedLoad = true;      }

      console.log("ejecutando request sobre url: " + url);
      requestJSON(url, cargarRunners, this);

    }
  }