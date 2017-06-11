  function PositionsLoader(url) {
    this.url = url;    

    var runnersPositions = [];
    this.loadRunnersPositionsTo = function(race) {
      
      // recibe las positions a procesar
      function generarArrayDeRunnersPositions(runnersPositionsData) {
        console.log("generando array de positions:");
        for (var i in runnersPositionsData) { 
          var runnerPosition = {id: runnersPositionsData[i].id,
                                positions: runnersPositionsData[i].positions
                               };
          
          runnersPositions.push(runnerPosition);
        }
      }

      function cargarRunnersPositions(RunnersPositionsResponse) {
        console.log("callback llamado");
        generarArrayDeRunnersPositions(RunnersPositionsResponse.positions);

        console.log("asociando posiciones a corredores");
        runnersPositions.forEach(function (runnerPosition){
          console.log(race);
          race.bindRunnerPosition(runnerPosition);            
        });        
      }

      console.log("ejecutando request sobre url: " + url);      
      requestJSON(url, cargarRunnersPositions);

    }

  }