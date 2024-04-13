document.addEventListener("DOMContentLoaded", function() {
    const localidadesList = document.getElementById("localidades-list");

    fetch("recife.json")
        .then(response => response.json())
        .then(data => {
            data.forEach(localidade => {
                const nome = localidade.nome;
                const latitude = localidade.lat;
                const longitude = localidade.lng;
                const dataVisita = localidade.data;

                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${nome}</td>
                    <td>${latitude}</td>
                    <td>${longitude}</td>
                    <td>${dataVisita}</td>
                `;
                localidadesList.appendChild(row);
            });
        })
        .catch(error => {
            console.error("Erro ao carregar o arquivo JSON:", error);
        });
});

