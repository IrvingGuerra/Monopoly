#ifndef CASILLA_H
#define CASILLA_H


class Casilla{
private:
    int numero;
 	int type;	//1 = Casilla Vacia, 2 = Propiedad, 3 = Carta roja, 4 = Carta Azul, 5 = Carcel, 6 = Salida
 	bool inout; //true = el jugador paga, false = el jugador recibe
 	int cantidad; //Se complementa con inout, es la cantidad que dara o recibira
 	int propietario; //Guarda el id del jugador
 	char[20] nombre; //Sirve para casillas del tipo Propiedad
 	char[6] color;

public:
    Casilla();
    ~Casilla();
};

#endif