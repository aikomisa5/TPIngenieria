var Runner = function(id, name, surname, sponsor, positions) {
  //el nombre del corredor
  this.id = id;
  
  this.name = name;
  this.surname = surname;
  this.sponsor = sponsor;
  //el arreglo de posiciones en las que estuvo
  this.positions = positions;

  //inicialización del indice para recorrer el arreglo de posiciones
  //historicas
  var indiceActual = 0;
  //function que recorre las posiciones una a una
  //ejecutando la function callback pasada como parametro
  //(esta function seguramente dibuja en el mapa.)
  this.run = function(callback) {
    var self = this;
    setTimeout(function() {
      callback(historyPositions[indiceActual]);

      indiceActual++;
      if (indiceActual < historyPositions.length) {
        self.run(callback);
      }
    }, 1000); //1000 ms -> 1 s, la function se ejecuta cada 1 segundo.
  }
};