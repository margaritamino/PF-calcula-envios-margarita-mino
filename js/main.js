const provincias = [
    {
        nombre: "Rosario",
        tarifaBase: 100,
        kilosBase: 10,
        costoExcedente: 10
    },
    {
        nombre: "Cordoba",
        tarifaBase: 150,
        kilosBase: 10,
        costoExcedente: 15
    },
    {
        nombre: "Tucuman",
        tarifaBase: 200,
        kilosBase: 10,
        costoExcedente: 20
    },   
    {
        nombre: "Salta",
        tarifaBase: 250,
        kilosBase: 10,
        costoExcedente: 25
    }

];

function calcularEnvio(event) {
    event.preventDefault(); 

    const provinciaSeleccionada = document.getElementById("provincia").value;
    const kilos = parseFloat(document.getElementById("kilos").value);
    let costo = 0;

    if (isNaN(kilos) || kilos < 0) {
        alert("Por favor, ingresa un número válido de kilos.");
        return;
    }

    const provincia = provincias.find(p => p.nombre === provinciaSeleccionada);

    if (provincia) {
        costo = provincia.tarifaBase;
        if (kilos > provincia.kilosBase) {
            costo += (kilos - provincia.kilosBase) * provincia.costoExcedente;
        }
    }

    guardarResultado(provincia.nombre, kilos, costo);

    document.getElementById("resultado").innerText = `El costo del envío a ${provincia.nombre} es: $${costo}`;
    mostrarHistorial();
}

function guardarResultado(provincia, kilos, costo) {
    const envios = JSON.parse(localStorage.getItem("envios")) || [];
    envios.push({ provincia, kilos, costo });
    localStorage.setItem("envios", JSON.stringify(envios));
}

function mostrarHistorial() {
    const listaHistorial = document.getElementById("historial");
    listaHistorial.innerHTML = ""; 

    const envios = JSON.parse(localStorage.getItem("envios")) || [];
    let total = 0; 

    envios.forEach(envio => {
        const li = document.createElement("li");
        li.textContent = `Envío a ${envio.provincia}: ${envio.kilos} kilos - Costo: $${envio.costo}`;
        listaHistorial.appendChild(li);
        total += envio.costo;
    });

    const totalLi = document.createElement("li");
    totalLi.textContent = `Total acumulado de envíos: $${total}`;
    listaHistorial.appendChild(totalLi);
}

function limpiarHistorial() {
    localStorage.removeItem("envios"); 
    mostrarHistorial();
}

function mostrarProvincias() {
    const listaProvincias = document.getElementById("listaProvincias");
    provincias.forEach(provincia => {
        const li = document.createElement("li");
        li.textContent = `${provincia.nombre}: Tarifa base $${provincia.tarifaBase}, Hasta ${provincia.kilosBase} kilos, Costo adicional $${provincia.costoExcedente} por kilo adicional.`;
        listaProvincias.appendChild(li);
    });
}

window.onload = () => {
    mostrarProvincias();
    mostrarHistorial();

    const formulario = document.getElementById("formulario");
    formulario.addEventListener("submit", calcularEnvio);
    
    document.getElementById("limpiarHistorialBtn").onclick = limpiarHistorial;
};
