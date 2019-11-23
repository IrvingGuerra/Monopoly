const fs = require("fs");

function argsToObject(descripcion) {

    // Crea valores para insertar.
    const num = Math.round(Math.random() * 9) + 1;
    const turnos = Math.round(Math.random() * 4) + 1;

    // Adapta descripción.
    let desc = descripcion;
    const splitDinero = desc.split("#");
    desc = splitDinero.join(`${num} mil`);
    const splitTurnos = desc.split("&");
    desc = splitTurnos.join(turnos);

    return {
        descripcion: desc,
        dinero: splitDinero.length > 1 ? num * 1000 : 0,
        turnos: splitTurnos.length > 1 ? turnos : 0
    };
}

fs.readFile("./rojas.json", (err, data) => {
    const redCards = JSON.parse(data);
    redCards.length = 0;
    redCards.push(argsToObject("Denunciado por enviar fotos indebidas a una alumna!!, ve a la cárcel por & turnos."));
    redCards.push(argsToObject("Perdiste un torneo de Smash, pagas # pesos al banco."));
    redCards.push(argsToObject("No viniste disfrazado el día de la KermESCOM, pagas al banco # pesos."));
    redCards.push(argsToObject("Te cacharon robando una laptop, entras a la cárcel por & turnos y pagas # pesos al banco."));
    redCards.push(argsToObject("Te asaltaron enfrente de la Ford, entregas al banco # pesos."));
    redCards.push(argsToObject("No eres suficientemente otaku, pagas # pesos."));
    redCards.push(argsToObject("Dejaste tu locker abierto, pierdes # pesos."));
    redCards.push(argsToObject("Te enteraste de que la niña que te gustaba era un metalero, pierdes # pesos y entras a la cárcel por & turnos por acoso."));
    redCards.push(argsToObject("Te bañas diario, eso no es de escomios. Pierdes # pesos."));
    redCards.push(argsToObject("Hiciste corto en el laboratorio de circuitos y descompusiste una fuente, paga al banco # pesos."));
    redCards.push(argsToObject("¡¡Te cachan copiando en un examen, cárcel por & turnos por jugarle al vivo!!"));
    redCards.push(argsToObject("Se te olvidó tu credencial y te tocó el poli que si la pide, pagas al banco # pesos."));
    redCards.push(argsToObject("Empezaste la lista de ecuaciones diferenciales un día antes y te quedaste dormido."));
    redCards.push(argsToObject("Compraste una tarjeta del metro de las que cuestan 50 y traen 120 de saldo, vas a la cárcel por & turnos y pagas # pesos."));
    redCards.push(argsToObject("Le pediste un pie a la chica de los pies y se te olvidó verla en el punto de reunión, pagas # pesos."));
    redCards.push(argsToObject("No te gusta el anime y estudias en ESCOM, ¿cómo es eso?. Pagas # pesos."));
    redCards.push(argsToObject("Pediste cambio de ESIME a ESCOM, pierdes # pesos, eso no se hace chavo."));
    redCards.push(argsToObject("Le hackeaste el Facebook a un amigo, vas a la cárcel por & turnos."));
    redCards.push(argsToObject("Tu TT está bien chafa, pagas # pesos por hacer pasar vergüenza a tu director."));
    redCards.push(argsToObject("Hablas inglés fluido, un buen ESCOMIO no hace eso, pagas # pesos."));
    fs.writeFile("./rojas.json", JSON.stringify(redCards), console.log);
}
);