// Calcula el costo de envío basado en los datos ingresados.
function calcularEnvio(event) {
    event.preventDefault();
    let errorOccurred = false;

    try {
        const provinciaSeleccionada = document.getElementById("provincia").value;
        const kilos = parseFloat(document.getElementById("kilos").value);
        let costo = 0;

        if (isNaN(kilos) || kilos < 0) {
            Swal.fire({
                title: "Error",
                text: "Por favor, ingresa un número válido de kilos.",
                icon: "error"
            });
            return;
        }

        const provincia = provincias.find(p => p.nombre === provinciaSeleccionada);

        if (provincia) {
            costo = provincia.tarifaBase;
            if (kilos > provincia.kilosBase) {
                costo += (kilos - provincia.kilosBase) * provincia.costoExcedente;
            }
        } else {
            throw new Error('Provincia no encontrada');
        }

        guardarResultado(provincia.nombre, kilos, costo);

        document.getElementById("resultado").innerText = `El costo del envío a ${provincia.nombre} es: $${costo}`;
        mostrarHistorial();
    } catch (error) {
        console.error(error);
        Swal.fire({
            title: "Error",
            text: `Ocurrió un error: ${error.message}`,
            icon: "error"
        });
        errorOccurred = true;
    } finally {
        if (errorOccurred) {
            Swal.fire({
                title: "Información",
                text: "El cálculo del envío ha fallado. Por favor revisa los datos ingresados.",
                icon: "info"
            });
        }
    }
}

// Guarda el resultado del envío en el almacenamiento local.
function guardarResultado(provincia, kilos, costo) {
    try {
        const envios = JSON.parse(localStorage.getItem("envios")) || [];
        envios.push({ provincia, kilos, costo });
        localStorage.setItem("envios", JSON.stringify(envios));
    } catch (error) {
        console.error(error);
        Swal.fire({
            title: "Error",
            text: `Ocurrió un error al guardar el resultado: ${error.message}`,
            icon: "error"
        });
    }
}

// Muestra el historial de envíos en la tabla y calcula el total acumulado.
function mostrarHistorial() {
    try {
        const tbody = document.querySelector("#historial tbody");
        tbody.innerHTML = "";

        const envios = JSON.parse(localStorage.getItem("envios")) || [];
        let total = 0;

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
        console.error(error);
        Swal.fire({
            title: "Error",
            text: `Ocurrió un error al mostrar el historial: ${error.message}`,
            icon: "error"
        });
    }
}

// Limpia el historial de envíos y restablece los campos de entrada.
function limpiarHistorial() {
    try {
        localStorage.removeItem("envios");

        const kilosInput = document.getElementById("kilos");
        kilosInput.value = '';

        document.getElementById("resultado").innerText = '';

        mostrarHistorial();
    } catch (error) {
        console.error(error);
        Swal.fire({
            title: "Error",
            text: `Ocurrió un error al limpiar el historial: ${error.message}`,
            icon: "error"
        });
    }
}

// Muestra un mensaje para ingresar nombre y apellido antes de redirigir a la página de presupuesto.
document.getElementById("verPresupuestoBtn").addEventListener("click", () => {
    try {
        const envios = JSON.parse(localStorage.getItem("envios")) || [];

        if (envios.length === 0) {
            Swal.fire({
                title: "Error",
                text: "No hay datos de envíos guardados. Por favor, realiza un envío antes de ver el presupuesto.",
                icon: "error"
            });
        } else {
            Swal.fire({
                title: 'Introduce tus datos',
                html: `
                    <input id="swal-input-name" class="swal2-input" placeholder="Nombre">
                    <input id="swal-input-lastname" class="swal2-input" placeholder="Apellido">
                `,
                confirmButtonText: 'Generar Presupuesto',
                focusConfirm: false,
                preConfirm: () => {
                    const name = Swal.getPopup().querySelector('#swal-input-name').value;
                    const lastname = Swal.getPopup().querySelector('#swal-input-lastname').value;
                    if (!name || !lastname) {
                        Swal.showValidationMessage(`Por favor ingresa ambos, nombre y apellido.`);
                    }
                    return { name, lastname };
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    const { name, lastname } = result.value;
                    localStorage.setItem('user', JSON.stringify({ name, lastname }));
                    window.location.href = "presupuesto.html";
                }
            });
        }
    } catch (error) {
        console.error(error);
        Swal.fire({
            title: "Error",
            text: `Ocurrió un error al procesar el presupuesto: ${error.message}`,
            icon: "error"
        });
    }
});

// Al cargar la página, muestra el historial, asocia eventos a los botones y carga las provincias.
window.onload = () => {
     mostrarHistorial();

    const formulario = document.getElementById("formulario");
    formulario.addEventListener("submit", calcularEnvio);

    document.getElementById("limpiarHistorialBtn").onclick = limpiarHistorial;

    try {
        fetch("./db/data.json")
            .then(response => response.json())
            .then(provincias => {
                const listaProvincias = document.getElementById("provincia");
                provincias.forEach(provincia => {
                    const option = document.createElement("option");
                    option.value = provincia.nombre;
                    option.textContent = `${provincia.nombre}`;
                    listaProvincias.appendChild(option);
                });

                const listaProvinciasLi = document.getElementById("listaProvincias");
                provincias.forEach(provincia => {
                    const li = document.createElement("li");
                    li.textContent = `${provincia.nombre}: Tarifa base $${provincia.tarifaBase}, Hasta ${provincia.kilosBase} kilos, Costo adicional $${provincia.costoExcedente} por kilo adicional.`;
                    listaProvinciasLi.appendChild(li);
                });
            });
    } catch (error) {
        console.error(error);
        Swal.fire({
            title: "Error",
            text: `Ocurrió un error al cargar las provincias: ${error.message}`,
            icon: "error"
        });
    }
};
