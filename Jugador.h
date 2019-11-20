#ifndef JUGADOR_H
#define JUGADOR_H

#include "Casilla.h"

#include <set>


class Jugador{
private:
    bool status;    //false = Castigado por x turnos, true = Disponible
    int turnos;     //Se complementa con status, si status = false, son la cantidad de veces que estara en false
    int id;
    char nombre[10]; //Nombre del jugador
    char color[6]; // FFFFFF
    int casilla;
    int vueltas;
    int saldo;
    //Casilla casillas[26]; //Puede ser poseedor de hasta 26 casillas del tipo Propiedad
    std::set<Casilla &> propiedades;
    //std::vector<Casilla> casillas;
public:
    Jugador(int id, char nombre[10], char color[6]);
    void setStatus(bool status);
    void setTurnos(int turnos);
    void setCasilla(int casilla);
    void setVueltas(int vueltas);
    void setSaldo(int saldo);
    void insertPropiedad(Casilla &propiedad);
    ~Jugador();
};

#endif