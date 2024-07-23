

const enviosA = ["Rosario", "Cordoba", "Tucuman", "Salta"]


const rosario = () => {
    let kilos = parseFloat(prompt("Ingrese el peso en kilogramos:"));
    if (kilos <= 10) {
        return 1000;
    } else {
        return 1000 + (kilos - 10) * 50;
    }
   
};

const costoEnvioRosario = ["Rosario: ","Bultos menor a 10kg $1000 ", "excedente por kg $50"]

const cordoba = () => {
    let kilos = parseFloat(prompt("Ingrese el peso en kilogramos:"));
    if (kilos <= 10) {
        return 1500;
    } else {
        return 1500 + (kilos - 10) * 70;
    }
};
const costoEnvioCordoba = ["Cordoba: ","Bultos menor a 10kg $1500 ", "excedente por kg $70"]

const tucuman = () => {
    let kilos = parseFloat(prompt("Ingrese el peso en kilogramos:"));
    if (kilos <= 10) {
        return 2000;
    } else {
        return 2000 + (kilos - 10) * 100;
    }
};
const costoEnvioTucuman = ["Tucuman: ","Bultos menor a 10kg $2000 ", "excedente por kg $100"]

const salta = () => {
    let kilos = parseFloat(prompt("Ingrese el peso en kilogramos:"));
    if (kilos <= 10) {
        return 2500;
    } else {
        return 2500 + (kilos - 10) * 120;
    }
};
const costoEnvioSalta = ["Salta: ","Bultos menor a 10kg $2500 ", "excedente por kg $120"]


alert("Si su paquete pesa hasta 10kg tiene una tarifa standar pasados esos kilos se cobrara un excedente por kilo")

alert("Realizamos envios a: "+enviosA)

let menu = parseInt(prompt("Donde desea enviar su paquete: \n 1: Rosario \n 2: Cordoba \n 3: Tucuman \n 4: Salta \n 5: salir"))

while(menu !== 5) {
    switch(menu) {
        case 1:
            alert(costoEnvioRosario)
            alert("El Costo de envio a Rosario es: "+rosario())
            break 
        case 2:
            alert(costoEnvioCordoba)
            alert("El Costo de envio a Cordoba es: "+cordoba())
            break
        case 3:
            alert(costoEnvioTucuman)
            alert("El Costo de envio a Tucuman es: "+tucuman())
            break
        case 4:
            alert(costoEnvioSalta)
            alert("El Costo de envio a Salta es: "+salta())
            break
        default:
            alert("Opcion incorrecta")
            break
    }

    menu = parseInt(prompt("Donde desea enviar su paquete: \n 1: Rosario \n 2: Cordoba \n 3: Tucuman \n 4: Salta \n 5: salir"))
}

alert("Gracias por su consulta")
