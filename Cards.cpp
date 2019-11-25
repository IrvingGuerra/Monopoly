#include "Cards.h"

unsigned int fetchCards(char **jsonCards, const char *filename)
{
    // Se abre el archivo.
    int fd = open(filename, O_RDONLY);
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

unsigned int fetchCardsTemplate(char **jsonCardsTemplate, int color)
{
    if (color == BLUE)
    {
        return fetchCards(jsonCardsTemplate, "azules.json");
    }
    else
    {
        return fetchCards(jsonCardsTemplate, "rojas.json");
    }
}

void saveCards(const char *jsonCards, const char *filename, unsigned int cardsLen)
{
    // Se abre el archivo.
    int fd = open(filename, O_CREAT | O_WRONLY | O_TRUNC | O_APPEND, S_IRUSR | S_IWUSR);
    if (fd == -1)
    {
        perror("Error al abrir el archivo.\n");
        exit(EXIT_FAILURE);
    }

    // Se escribe el archivo.
    int res = write(fd, jsonCards, cardsLen);
    if (res == -1)
    {
        perror("Error al escribir el archivo.\n");
        exit(EXIT_FAILURE);
    }
    fsync(fd);

    // Se cierra el archivo.
    close(fd);
}

const char *rollCards(const char *filename)
{
    // Obtiene JSON.
    char *jsonCards;
    unsigned int clen = fetchCards(&jsonCards, filename);
    
    // Lo parsea.
    rapidjson::Document root;
    root.Parse(jsonCards);

    // Preparamos buffer para serializar.
    rapidjson::StringBuffer buffer;
    rapidjson::Writer<rapidjson::StringBuffer> writer(buffer);

    // Se copia primer elemento.
    rapidjson::Value card(root["cards"][0], root.GetAllocator());
    card.Accept(writer);

    // Se guarda json para retornar.
    char *strCard = new char[buffer.GetSize()];
    strcpy(strCard, buffer.GetString());

    // Se cambia de posición.
    root["cards"].Erase(root["cards"].Begin());
    root["cards"].PushBack(card, root.GetAllocator());

    // Se guarda el JSON resultante.
    saveCards(stringify(root), filename, clen);

    return strCard;
}

const char *getFileName(int color, const char *boardid)
{
    const char *colorstr = color == BLUE ? "azules.json" : "rojas.json";
    int buffSize = strlen(colorstr) + strlen(boardid) + 2;
    char *filename = new char[buffSize];
    sprintf(filename, "%s_%s", boardid, colorstr);
    return (const char *)filename;
}

void generateCards(const char *boardid)
{
    char *red;
    char *blue;
    unsigned int rlen = fetchCardsTemplate(&red, RED);
    unsigned int blen = fetchCardsTemplate(&blue, BLUE);
    saveCards(red, getFileName(RED, boardid), rlen);
    saveCards(blue, getFileName(BLUE, boardid), blen);
}