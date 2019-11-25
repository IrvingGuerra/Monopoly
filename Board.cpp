#include "Board.h"

unsigned int fetchBoardTemplate(char **jsonBoard)
{
    return fetchBoard(jsonBoard, "tablero.json");
}

unsigned int fetchBoard(char **jsonBoard, const char *filename)
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
    unsigned int boardSize = data.st_size;

    // Se lee el archivo
    *jsonBoard = new char[boardSize];
    int bytesRead = read(fd, (void *)*jsonBoard, boardSize);
    if (bytesRead == -1)
    {
        perror("Error en lectura de archivo.");
        close(fd);
        exit(EXIT_FAILURE);
    }

    // Se cierra el archivo.
    close(fd);

    return boardSize;
}

void saveBoard(const char *jsonBoard, const char *filename, unsigned int bsize)
{
    // Se abre el archivo.
    int fd = open(filename, O_CREAT | O_WRONLY | O_TRUNC | O_APPEND, S_IRUSR | S_IWUSR);
    if (fd == -1)
    {
        perror("Error al abrir el archivo.\n");
        exit(EXIT_FAILURE);
    }

    // Se escribe el archivo.
    int res = write(fd, jsonBoard, bsize);
    if (res == -1)
    {
        perror("Error al escribir el archivo.\n");
        exit(EXIT_FAILURE);
    }
    fsync(fd);

    // Se cierra el archivo.
    close(fd);
}

void addPlayer(rapidjson::Document &board, const char *name, bool isBot, const char *color)
{
    rapidjson::Value player;
    player.SetObject();
    player.AddMember("nombre", rapidjson::GenericStringRef<char>(name), board.GetAllocator());
    player.AddMember("color", rapidjson::GenericStringRef<char>(color), board.GetAllocator());
    player.AddMember("esBot", isBot, board.GetAllocator());
    player.AddMember("casilla", 0, board.GetAllocator());
    player.AddMember("vueltas", 0, board.GetAllocator());
    player.AddMember("saldo", 100000, board.GetAllocator());
    player.AddMember("turnosEnCastigo", 0, board.GetAllocator());
    rapidjson::Value props;
    props.SetArray();
    player.AddMember("propiedades", props, board.GetAllocator());
    board["jugadores"].PushBack(player, board.GetAllocator());
}

bool findPlayer(rapidjson::Document &board, const char *name)
{
    bool playerExists = false;
    for (register unsigned int i = 0; i < board["jugadores"].Size(); i++)
    {
        if (strcmp(board["jugadores"][i]["nombre"].GetString(), name) == 0)
        {
            playerExists = true;
            break;
        }
    }

    return playerExists;
}

const char * stringify(rapidjson::Document &board, unsigned int &newbsize)
{
    rapidjson::StringBuffer buffer;
    rapidjson::Writer<rapidjson::StringBuffer> writer(buffer);
    buffer.Flush();
    board.Accept(writer);
    unsigned int bytes = buffer.GetSize();
    char *newjson = new char[bytes + 1];
    strcpy(newjson, buffer.GetString());

    // Retornamos tablero.
    newbsize = bytes;
    return newjson;
}

// unsigned int updateTurn(char **jsonBoard)
// {
//     // Obtiene valores para actualizar.
//     rapidjson::Document root;
//     root.Parse(*jsonBoard);
//     int turno = root["turno"].GetInt();
//     int numJugadores = root["jugadores"].Size();

//     // Actualiza valor de turno de acuerdo a los jugadores.
//     turno = turno == numJugadores ? 1 : turno + 1;
//     root["turno"] = turno;

//     // Enlaza con buffer y writer.
//     rapidjson::StringBuffer buffer;
//     rapidjson::Writer<rapidjson::StringBuffer> writer(buffer);
//     root.Accept(writer);

//     // Reasigna memoria para el json reslutante.
//     unsigned int toReserve = strlen(buffer.GetString());
//     *jsonBoard = (char *)realloc(*jsonBoard, toReserve);

//     // Guarda nuevo json en misma variable.
//     strcpy (*jsonBoard, buffer.GetString());

//     return toReserve;
// }