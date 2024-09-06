// Muestra el presupuesto de envíos en una tabla HTML.
function mostrarPresupuesto() {
    const tbody = document.querySelector("#historial tbody");
    tbody.innerHTML = "";

    let envios = [];
    let total = 0;

    try {
        envios = JSON.parse(localStorage.getItem("envios")) || [];

        envios.forEach(envio => {
            const tr = document.createElement("tr");

            const tdProvincia = document.createElement("td");
            tdProvincia.textContent = envio.provincia;
            tr.appendChild(tdProvincia);

            const tdKilos = document.createElement("td");
            tdKilos.textContent = envio.kilos;
            tr.appendChild(tdKilos);

            const tdCosto = document.createElement("td");
            tdCosto.textContent = `$${envio.costo}`;
            tr.appendChild(tdCosto);

            tbody.appendChild(tr);
            total += envio.costo;
        });

        const trTotal = document.createElement("tr");
        const tdTotal = document.createElement("td");
        tdTotal.colSpan = 2;
        tdTotal.textContent = "Total acumulado de envíos:";
        trTotal.appendChild(tdTotal);

        const tdTotalCosto = document.createElement("td");
        tdTotalCosto.textContent = `$${total}`;
        trTotal.appendChild(tdTotalCosto);

        tbody.appendChild(trTotal);
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Ocurrió un error al mostrar el presupuesto.',
            footer: `<p>${error.message}</p>`
        });
    } finally {
        Swal.fire({
            icon: 'info',
            title: 'Proceso Completado',
            text: 'Proceso de mostrar presupuesto completado.',
        });
    }
}

// Asocia un evento al botón con id "volverBtn" para redirigir al usuario a la página "index.html" al hacer clic.
document.getElementById("volverBtn").addEventListener("click", () => {
    window.location.href = "index.html";
});

// Al cargar la página, muestra el nombre y apellido del usuario y llama a la función `mostrarPresupuesto`.
window.onload = () => {
    const user = JSON.parse(localStorage.getItem('user')) || { name: 'Usuario', lastname: '' };

    document.getElementById('user-name').textContent = `Nombre: ${user.name}`;
    document.getElementById('user-lastname').textContent = `Apellido: ${user.lastname}`;

    mostrarPresupuesto();
};
