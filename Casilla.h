#ifndef CASILLA_H
#define CASILLA_H

class Casilla
{
private:
	
	int numero;
	int type; //1 = Casilla Vacia, 2 = Propiedad, 3 = Carta roja, 4 = Carta Azul, 5 = Carcel, 6 = Salida

	// Valores necesarios para tipo propiedad
	bool status;	 //false = Si es propiedad nadie la compro, saldra aviso si se desea comprar, true = ya tiene propietario
	int cantidad;	//Se complementa con type y status, es la cantidad que dara o recibira
	int propietario; //Guarda el id del jugador
	char nombre[10]; //Sirve para casillas del tipo Propiedad
	char color[6];

public:
	Casilla(int numero, int type, int cantidad,char nombre[10], char color[6]);

	void setType(int type);
	void setStatus(bool status);
	void setCantidad(int cantidad);
	void setPropietario(int propietario);
	void setNombre(char nombre[10]);
	void setColor(char color[6]);

	int getType();
	bool getStatus();
	int getCantidad();
	int getPropietario();
	char* getNombre();
	char* getColor();


	int getNumero() const;
	~Casilla();
};

struct CasillaComparator
{
	bool operator()(const Casilla &c1, const Casilla &c2) const
	{
		return c1.getNumero() < c2.getNumero();
	}
};

#endif