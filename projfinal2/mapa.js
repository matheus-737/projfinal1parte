var map = L.map('map').fitWorld();

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);

map.locate({setView: true, maxZoom: 16});

function onLocationFound(e) {
    var radius = e.accuracy;

    L.marker(e.latlng).addTo(map)
        .bindPopup("You are within " + radius + " meters from this point").openPopup();

    // Chamada da função para carregar localidades após a localização do usuário
    carregarLocalidades(e.latlng);
}

map.on('locationfound', onLocationFound);

function onLocationError(e) {
    alert(e.message);
}

map.on('locationerror', onLocationError);

function carregarLocalidades(userLocation) {
    $.getJSON("recife.json", function(data) {
        var bounds = L.latLngBounds(); // Inicializa os limites vazios

        $.each(data, function(key, localidade) {
            var marker = L.marker([localidade.lat, localidade.lng]).addTo(map);
            var popupContent = "<b>" + localidade.nome + "</b><br>";
            
            if (localidade.data) {
                popupContent += "Data de Visita: " + localidade.data + "<br>";
            }
            marker.bindPopup(popupContent); // Adiciona um popup com as informações do local
            
            bounds.extend([localidade.lat, localidade.lng]); // Estende os limites para incluir esta localidade
        });

        // Adiciona um marcador para a localização do usuário
        L.marker(userLocation).addTo(map)
            .bindPopup("Sua localização").openPopup();
            
        // Estende os limites para incluir a localização do usuário
        bounds.extend(userLocation);
        
        
        // Ajusta a visualização do mapa para incluir a localização do usuário e as localidades
        map.fitBounds(bounds);
    });
}



