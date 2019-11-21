#ifndef CASILLA_H
#define CASILLA_H

class Casilla
{
private:
	int numero;
	char tipo[10]; // (NO USADOS) 1 = Casilla Vacia, 2 = Propiedad, 3 = Carta roja, 4 = Carta Azul, 5 = Carcel, 6 = Salida
	int valor;	//Se complementa con type y status, es la cantidad que dara o recibira
	int propietario; //Guarda el id del jugador
	char nombre[10]; //Sirve para casillas del tipo Propiedad
	char color[6];

public:
	Casilla(int numero, char tipo[10], int valor, char nombre[10], char color[6]);

	void setTipo(int tipo);
	void setCantidad(int cantidad);
	void setPropietario(int propietario);
	void setNombre(char nombre[10]);
	void setColor(char color[6]);

	char *getTipo(void);
	int getCantidad(void);
	int getPropietario(void);
	char *getNombre(void);
	char *getColor(void);

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