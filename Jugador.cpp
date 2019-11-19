#include "Jugador.h"
#include "string.h"

Jugador::Jugador(int id, char nombre[10], char color[6]){
    this->id = id;
    strcpy(this->nombre, nombre);
    strcpy(this->color, color);
}


Jugador::~Jugador(){
    //delete[] datos;
}