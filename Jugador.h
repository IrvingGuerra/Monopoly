#ifndef JUGADOR_H
#define JUGADOR_H

#include <set>
#include <cstring>

#include "Casilla.h"

class Jugador
{

private:
    // Total de instancias.
    static int instances;

    // Identificador único para el jugador.
    int id;

    // Nombre corto o nickname para jugador.
    char nombre[10];

    // Cadena que indica el hex del color. Ej.: ffffff.
    char color[7];

    // Bandera que indica que el jugador es un bot.
    bool esBot;

    // Casilla en la que se encuentra el jugdor
    int casilla = 0;

    // Vueltas alrededor del tablero que se han dado
    int vueltas = 0;

    // Saldo del jugador.
    int saldo = 40000;

    // Indica si es el turno para que el jugador tire.
    // REEMPLAZADO POR ATRIBUTO TURNO EN TABLERO
    // bool esTurno = false;

    // Turnos en que el jugador está castigado.
    int turnosEnCastigo = 0;

    //Casilla casillas[26]; //Puede ser poseedor de hasta 26 casillas del tipo Propiedad
    std::set<Casilla, CasillaComparator> propiedades;

public:
    // Getter para obtener las instancias.
    static int getInstances();

    // Constructor. Se auto-incrementa el id, entonces no se requiere en la template.
    Jugador(char nombre[10], char color[6], bool esBot);

    // Getters/Setters.

    void setCasilla(int casilla);
    void setVueltas(int vueltas);
    void setSaldo(int saldo);
    void setTurnosEnCastigo(int turnos);

    int getCasilla(void);
    int getVueltas(void);
    int getSaldo(void);
    int getTurnosEnCastigo(void);

    // Guarda una propiedad y modifica el tablero.
    void insertPropiedad(Casilla propiedad);

    // Crea una cadena JSON con los datos del jugador.
    char * toJSON(void);


    // Destructor.
    ~Jugador();
};

#endif