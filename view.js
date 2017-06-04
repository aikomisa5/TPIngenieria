
function bootstrap() {

    // Ubicación de la UNGS.
    var ungsLocation = [-34.5221554, -58.7000067];

    // Creación del componente mapa de Leaflet.
    var map = L.map('mapid').setView(ungsLocation, 15);

    // Agregamos los Layers de OpenStreetMap.
    var baseLayer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Agregamos el control para seleccionar Layers al mapa
    var layersControl = L.control.layers({
        "Base": baseLayer
    });
    layersControl.addTo(map);
    // hack:
    map.layersControl = layersControl;

    // Creamos un círculo con centro en la UNGS.
    var circle = L.circle(ungsLocation, {
        color: '#0000AA',
        fillColor: '#0000CC',
        fillOpacity: 0.2,
        radius: 300
    }).addTo(map);

    // Creamos un polígono.
    L.polygon([
        L.latLng(-34.515594, -58.705654),
        L.latLng(-34.523503, -58.714062),
        L.latLng(-34.519177, -58.719890),
        L.latLng(-34.511089, -58.711374),
        L.latLng(-34.514062, -58.707909),
        L.latLng(-34.513824, -58.707584),
    ]).addTo(map);

    // Creamos un marker sobre la UNGS.
    var ungsMarker = L.marker(ungsLocation);
    ungsMarker.addTo(map);

    // Creamos una carrera
    var race1K = new Race("1K", map);

    // Pepe!
    var pepe = new Runner("Pepe", [
            {lon: -58.695290, lat: -34.524297},
            {lon: -58.697030, lat: -34.522856},
            {lon: -58.698210, lat: -34.521874}
        ]);
    //
    race1K.addRunner(pepe);

    // Bolt!
    var bolt = new Runner("Bolt", [
            {lon: -58.702329, lat: -34.522739},
            {lon: -58.702572, lat: -34.522992},
            {lon: -58.702801, lat: -34.523191},
            {lon: -58.703056, lat: -34.523412},
            {lon: -58.703299, lat: -34.523643}
        ]);
    //
    race1K.addRunner(bolt);

    // START!
    race1K.start();
}

$(bootstrap);