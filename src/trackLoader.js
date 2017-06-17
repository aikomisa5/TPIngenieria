  function TrackLoader(url, trackID) {
    this.url = url;
    this.trackID = trackID;
    var latlngs = [];
    this.finishedLoad = false;

    this.loadTrack = function(map) {

      // recibe el track a procesar
      function generarArrayDeTrackPositions(track) {
        console.log("generando array de coordenadas de mapa: " + track.id);
        for (var i in track.coordinates) {
          console.log("coordenada " + i + ": " + track.coordinates[i].lat + ", " + track.coordinates[i].lon);
          latlngs.push([track.coordinates[i].lat, track.coordinates[i].lon]);
        }
      }

      function cargarMapa(trackResponse, self) {
        console.log("callback llamado");
        generarArrayDeTrackPositions(trackResponse.track);

        console.log("añadiendo circuito a mapa");
        var circuito = L.polyline(latlngs, {
          color: '#4088ff',
          weight: "10"          
        }).addTo(map);
        // zoom the map to the polygon
        map.fitBounds(circuito.getBounds());
        self.finishedLoad = true;
      }

      console.log("ejecutando request sobre url: " + url + trackID);
      requestJSON(url + trackID, cargarMapa, this);

    }

  }
