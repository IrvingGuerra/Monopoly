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
    let root;
    if (err) {
        root = {
            cards: []
        };
    } else {
        root = JSON.parse(data);
    }
    root.cards.length = 0;
    root.cards.push(argsToObject("Confiaste en el corazón de las cartas has ganado # pesos"));
    root.cards.push(argsToObject("Mandrake te ha hecho levitar por lo que se te ha dado # pesos por el nivel de divinidad"));
    root.cards.push(argsToObject("¡Mira! Alguien dejo su una carta en tu casillero y venían # pesos para ti"));
    root.cards.push(argsToObject("Un sabio consejero te ha librado de dictamen, la comisión de honor te ha dado # pesos de compensación"));
    root.cards.push(argsToObject("Pansaste en extra eso te ha hecho ahorrar # pesos que gastarías en ETS"));
    root.cards.push(argsToObject("Tu Wardadito ha rendido frutos y al final de la semana obtienes # pesos"));
    root.cards.push(argsToObject("Un inversor le ha apostado a tu TT, te ha otorgado # pesos para impulsarlo"));
    root.cards.push(argsToObject("¡Ya depositaron la beca! Tome sus buenos # pesos"));
    root.cards.push(argsToObject("Se te ha otorgado la beca prohambres tenga sus # pesos buen samaritano"));
    root.cards.push(argsToObject("Te han pagado por casarte en la KermESCOM aquí esta sus # pesos buen joven"));
    root.cards.push(argsToObject("El sueño se hizo realidad usted obtiene # pesos por beca alimenticia "));
    root.cards.push(argsToObject("Has aplicado correctamente un Mandrakazo así que obtienes # pesos"));
    root.cards.push(argsToObject("La has reventado en una dinámica de liderazgo, así que has recibido # pesos de premio"));
    root.cards.push(argsToObject("Te ha reclutado IBM para un proyecto durante la semana de la ISC tenga sus primeros # pesos"));
    root.cards.push(argsToObject("Has ganado un hackaton y recibes # pesos por tu esfuerzo ¡Felicidaes!"));
    root.cards.push(argsToObject("Después de meses siendo el chic@ de los dulces, tus esfuerzos dan frutos, recibe estos # pesos extra para seguir adelante."));
    root.cards.push(argsToObject("¡Felicidades! Ganaste la competencia de la ACM y te han recompensado con # pesos"));
    root.cards.push(argsToObject("¡Falsa alarma! Tu compu sigue viva, recibe # pesos para el susto"));
    root.cards.push(argsToObject("Monti te ha invitado a su clase en el laboratorio, ganaste una apuesta y aquí está la recompensa, recibe # pesos "));
    root.cards.push(argsToObject("Un error en la café te ha dado un baucher de # pesos, disfruta un café a nuestra salud"));
    fs.writeFile("./azules.json", JSON.stringify(root), console.log);
}
);