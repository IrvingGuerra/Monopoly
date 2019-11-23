#include "Cards.h"

unsigned int fetchCards(char **jsonCards, int color)
{
    // Se abre el archivo.
    const char *file = color == BLUE ? "azules.json" : "rojas.json";
    int fd = open(file, O_RDONLY);
    if (fd == -1)
    {
        perror("Error al abrir archivo.");
        exit(EXIT_FAILURE);
    }

    // Se obtiene longitud del archivo.
    struct stat data;
    int res = fstat(fd, &data);
    if (res == -1)
    {
        perror("Error al obtener metadatos del archivo.");
        close(fd);
        exit(EXIT_FAILURE);
    }
    unsigned int cardsSize = data.st_size;

    // Se lee el archivo
    *jsonCards = new char[cardsSize];
    int bytesRead = read(fd, (void *)*jsonCards, cardsSize);
    if (bytesRead == -1)
    {
        perror("Error en lectura de archivo.");
        close(fd);
        exit(EXIT_FAILURE);
    }

    // Se cierra el archivo.
    close(fd);

    return cardsSize;
}

void saveCards(const char *jsonCards, unsigned int cardsSize, int color)
{
    const char *file = color == BLUE ? "azules.json" : "rojas.json";
    // Se abre el archivo.
    int fd = open(file, O_CREAT | O_WRONLY | O_TRUNC | O_APPEND, S_IRUSR | S_IWUSR);
    if (fd == -1)
    {
        perror("Error al abrir el archivo.\n");
        exit(EXIT_FAILURE);
    }

    // Se escribe el archivo.
    int res = write(fd, jsonCards, cardsSize);
    if (res == -1)
    {
        perror("Error al escribir el archivo.\n");
        exit(EXIT_FAILURE);
    }
    fsync(fd);

    // Se cierra el archivo.
    close(fd);
}

const char *rollCards(int color)
{
    // Obtiene JSON.
    char *jsonCards;
    unsigned int cardsSize = fetchCards(&jsonCards, color);

    // Lo parsea.
    rapidjson::Document cards;
    cards.Parse(jsonCards);

    // Preparamos buffer para serializar.
    rapidjson::StringBuffer buffer;
    rapidjson::Writer<rapidjson::StringBuffer> writer(buffer);

    // Se copia primer elemento.
    rapidjson::Value card(cards[0], cards.GetAllocator());
    card.Accept(buffer);

    // Se guarda json para retornar.
    char *strCard = new char[buffer.GetSize()];
    strcpy(strCard, buffer.GetString());

    // Se cambia de posición.
    cards.Erase(cards.Begin());
    cards.PushBack(card, cards.GetAllocator());

    // Se guarda el JSON resultante.
    cards.Accept(writer);
    saveCards(buffer.GetString(), buffer.GetSize(), color);

    return strCard;
}