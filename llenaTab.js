const fs = require("fs");

function argsToObject(numero, tipo, valor, nombre, color) {
    return {
        "numero": numero,
        "tipo": tipo,
        "comprada": false,
        "valor": valor,
        "propietario": 0,
        "nombre": nombre,
        "color": color
    };
}

fs.readFile("./tablero.json", (err, data) => {
    const tablero = JSON.parse(data);
    tablero.casillas.length = 0;
    tablero.casillas.push(argsToObject(0, "SALIDA", 1000, "SALIDA", "FFFFFF"));
    tablero.casillas.push(argsToObject(1, "PROPIEDAD", 20000, "TORNIQUETES CAFE", "8449A3"));
    tablero.casillas.push(argsToObject(2, "ROJA", 0, "CARTA ROJA", "D50E0E"));
    tablero.casillas.push(argsToObject(3, "VACIA", 0, "VACIA", "FFFFFF"));
    tablero.casillas.push(argsToObject(4, "PROPIEDAD", 80000, "CAFETERIA", "3953BB"));
    tablero.casillas.push(argsToObject(5, "PROPIEDAD", 40000, "CAFETERIA SILLAS", "3953BB"));
    tablero.casillas.push(argsToObject(6, "VACIA", 0, "VACIA", "FFFFFF"));
    tablero.casillas.push(argsToObject(7, "AZUL", 0, "CARTA AZUL", "3953BB"));
    tablero.casillas.push(argsToObject(8, "VACIA", 0, "VACIA", "FFFFFF"));
    tablero.casillas.push(argsToObject(9, "PROPIEDAD", 40000, "BAÑOS MUJERES", "D50E0E"));
    tablero.casillas.push(argsToObject(10, "PROPIEDAD", 40000, "BAÑOS HOMBRES", "D50E0E"));
    tablero.casillas.push(argsToObject(11, "VACIA", 0, "VACIA", "FFFFFF"));
    tablero.casillas.push(argsToObject(12, "PROPIEDAD", 60000, "PAPELERIA", "27902C"));
    tablero.casillas.push(argsToObject(13, "CARCEL", 5000, "CARCEL", "FFFFFF"));
    tablero.casillas.push(argsToObject(14, "ROJA", 0, "CARTA ROJA", "D50E0E"));
    tablero.casillas.push(argsToObject(15, "PROPIEDAD", 50000, "CAFETERIA", "3953BB"));
    tablero.casillas.push(argsToObject(16, "VACIA", 0, "VACIA", "FFFFFF"));
    tablero.casillas.push(argsToObject(17, "AZUL", 0, "CARTA AZUL", "3953BB"));
    tablero.casillas.push(argsToObject(18, "VACIA", 0, "VACIA", "FFFFFF"));
    tablero.casillas.push(argsToObject(19, "PROPIEDAD", 80000, "PAPELERIA IMPRESIONES", "27902C"));
    tablero.casillas.push(argsToObject(20, "PROPIEDAD", 40000, "PAPELERIA COPIAS", "27902C"));
    tablero.casillas.push(argsToObject(21, "ROJA", 0, "CARTA ROJA", "D50E0E"));
    tablero.casillas.push(argsToObject(22, "VACIA", 0, "VACIA", "FFFFFF"));
    tablero.casillas.push(argsToObject(23, "PROPIEDAD", 30000, "BAÑOS SUCIOS", "D50E0E"));
    tablero.casillas.push(argsToObject(24, "AZUL", 0, "CARTA AZUL", "3953BB"));
    tablero.casillas.push(argsToObject(25, "PROPIEDAD", 20000, "TORNIQUETES ESTACIONAMIENTO", "8449A3"));
    fs.writeFile("./tablero.json", JSON.stringify(tablero), console.log);

}
);