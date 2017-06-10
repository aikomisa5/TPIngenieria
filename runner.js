var Runner = function(id, name, surname, sponsor, positions) {
  
  this.id = id; 
  this.name = name;
  this.surname = surname;  
  this.sponsor = sponsor;  
  this.historyPositions = positions;

  //inicialización del indice para recorrer el arreglo de posiciones
  //historicas
  var indiceActual = 0;
  //function que recorre las posiciones una a una
  //ejecutando la function callback pasada como parametro
  //(esta function seguramente dibuja en el mapa.)
  this.run = function(mapUpdaterCorredor) {
    var self = this;
    setTimeout(function() {
      mapUpdaterCorredor(historyPositions[indiceActual]);
      indiceActual++;
      if (indiceActual < historyPositions.length) {
        self.run(mapUpdaterCorredor);
      }
    }, 1000); //1000 ms -> 1 s, la function se ejecuta cada 1 segundo.
  }
};