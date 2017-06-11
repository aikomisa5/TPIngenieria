  function PositionsLoader(url) {
    this.url = url;

    var runnersPositions = [];
    this.loadRunnersPositionsTo = function(race) {

      // recibe las positions a procesar
      function generarArrayDeRunnersPositions(runnersPositionsData) {
        var self = this;
        console.log("generando array de positions:");
        for (var i in runnersPositionsData) {
          var positionsData = [];
          for(j in runnersPositionsData[i].positions){
            positionsData.push(new Position(runnersPositionsData[i].positions[j].lat,
              runnersPositionsData[i].positions[j].lon));
          }
          var runnerPosition = {id: runnersPositionsData[i].runner,
                                positions: positionsData
                               };
                               console.log(runnerPosition.positions);
          runnersPositions.push(runnerPosition);
        }
      }

      function cargarRunnersPositions(RunnersPositionsResponse) {
        console.log("callback llamado");
        generarArrayDeRunnersPositions(RunnersPositionsResponse.positions);

        console.log("asociando posiciones a corredores");
        runnersPositions.forEach(function (runnerPosition){
          race.bindRunnerPosition(runnerPosition);
        });
      }

      console.log("ejecutando request sobre url: " + url);
      requestJSON(url, cargarRunnersPositions);

    }

  }
