#ifndef JUGADOR_H
#define JUGADOR_H

#include "Casilla.h"

class Jugador{
private:
    bool gamemode; // false = Solo, true = Multi

    bool status;    //false = Castigado por x turnos, true = Disponible
    int turnos;     //Se complementa con status, si status = false, son la cantidad de veces que estara en false

    int id;
    char[10] nombre; //Nombre del jugador
    char[6] color; // FFFFFF
    int casilla;
    int vueltas;
    int saldo;

    Casilla[26] casillas; //Puede ser poseedor de hasta 26 casillas del tipo Propiedad


public:
    Jugador(bool gamemode, char[6] color);
    ~Jugador();
};

#endif