const fs = require("fs");

function argsToObject(descripcion) {

    // Crea valores para insertar.
    const num = Math.round(Math.random() * 9) + 1;

    // Adapta descripción.
    const desc = descripcion.split("#").join(`${num} mil`);

    return {
        descripcion: desc,
        dinero: num * 1000,
        turnos: 0
    };
}

fs.readFile("./azules.json", (err, data) => {
    const redCards = JSON.parse(data);
    redCards.length = 0;
    redCards.push(argsToObject("Confiaste en el corazón de las cartas has ganado # pesos"));
    redCards.push(argsToObject("Mandrake te ha hecho levitar por lo que se te ha dado # pesos por el nivel de divinidad"));
    redCards.push(argsToObject("¡Mira! Alguien dejo su una carta en tu casillero y venían # pesos para ti"));
    redCards.push(argsToObject("Un sabio consejero te ha librado de dictamen, la comisión de honor te ha dado # pesos de compensación"));
    redCards.push(argsToObject("Pansaste en extra eso te ha hecho ahorrar # pesos que gastarías en ETS"));
    redCards.push(argsToObject("Tu Wardadito ha rendido frutos y al final de la semana obtienes # pesos"));
    redCards.push(argsToObject("Un inversor le ha apostado a tu TT, te ha otorgado # pesos para impulsarlo"));
    redCards.push(argsToObject("¡Ya depositaron la beca! Tome sus buenos # pesos"));
    redCards.push(argsToObject("Se te ha otorgado la beca prohambres tenga sus # pesos buen samaritano"));
    redCards.push(argsToObject("Te han pagado por casarte en la KermESCOM aquí esta sus # pesos buen joven"));
    redCards.push(argsToObject("El sueño se hizo realidad usted obtiene # pesos por beca alimenticia "));
    redCards.push(argsToObject("Has aplicado correctamente un Mandrakazo así que obtienes # pesos"));
    redCards.push(argsToObject("La has reventado en una dinámica de liderazgo, así que has recibido # pesos de premio"));
    redCards.push(argsToObject("Te ha reclutado IBM para un proyecto durante la semana de la ISC tenga sus primeros # pesos"));
    redCards.push(argsToObject("Has ganado un hackaton y recibes # pesos por tu esfuerzo ¡Felicidaes!"));
    redCards.push(argsToObject("Después de meses siendo el chic@ de los dulces, tus esfuerzos dan frutos, recibe estos # pesos extra para seguir adelante."));
    redCards.push(argsToObject("¡Felicidades! Ganaste la competencia de la ACM y te han recompensado con # pesos"));
    redCards.push(argsToObject("¡Falsa alarma! Tu compu sigue viva, recibe # pesos para el susto"));
    redCards.push(argsToObject("Monti te ha invitado a su clase en el laboratorio, ganaste una apuesta y aquí está la recompensa, recibe # pesos "));
    redCards.push(argsToObject("Un error en la café te ha dado un baucher de # pesos, disfruta un café a nuestra salud"));
    fs.writeFile("./azules.json", JSON.stringify(redCards), console.log);
}
);