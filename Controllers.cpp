#include "Controllers.h"

using namespace rapidjson;

void onGetGame(struct mg_connection *nc, struct http_message *hm)
{
    /*
    Traducimos cuerpo de la petición con el siguiente contendo:
    {
        boardId: string,
        playerName: string,
        playerIsBot: bool,
        playerColor: string
    }
    */
    //Opcion 1: con Json, pero falla
    /*
    std::string body(hm->body.p, hm->body.len);
    Document req;
    req.Parse(body.c_str());
    const char *boardid = req["boardId"].GetString();
    const char *playerName = req["playerName"].GetString();
    bool playerIsBot = req["playerIsBot"].GetBool();
    const char *playerColor = req["playerColor"].GetString();
    */
    //Opcion 2
    char boardid[10];
    char playerName[20];
    char booleano[10];
    char playerColor[10];
    bool playerIsBot = false;

    mg_get_http_var(&hm->body, "boardId", boardid,sizeof(boardid));
    mg_get_http_var(&hm->body, "playerName", playerName,sizeof(playerName));
    mg_get_http_var(&hm->body, "playerIsBot", booleano,sizeof(booleano));
    mg_get_http_var(&hm->body, "playerColor", playerColor,sizeof(playerColor));

    if (strcmp ("true", booleano) == 0) {
        playerIsBot = true;
    }

    // Obtenemos el nombre del archivo donde se guarda el documento.
    char *filename = new char[strlen(boardid) + 6];
    sprintf(filename, "%s.json", boardid);

    printf("%s\n", filename);

    // Verificamos que exista el archivo
    if (access(filename, F_OK) != -1)
    {
        // Obtenemos y traducimos contenido de archivo.
        char *jsonboard;
        unsigned int bsize = fetchBoard(&jsonboard, filename);
        std::string boardstr(jsonboard, bsize);
        rapidjson::Document board;
        board.Parse(boardstr.c_str());

        // Si el jugador no existe y se puede unir, se une.
        if (!findPlayer(board, playerName))
        {
            // Se manda mensaje de error en caso de que ya no se pueda unir.
            if (board["jugadores"].Size() == 4)
            {
                sendError(nc);
            }
            else
            {
                // Se agrega jugador al archivo.
                addPlayer(board, playerName, playerIsBot, playerColor);
                board["enCurso"] = true; // Para este punto ya deberían haber al menos 2 jugadores.
                unsigned int newbsize;
                const char * newBoard = stringify(board, newbsize);
                saveBoard(newBoard, filename, newbsize);
                sendSuccess(nc);
            }
        }
        else
        {
            sendSuccess(nc);
        }
    }
    // El archivo no existe.
    else
    {
        // Se genera tablero y cartas.
        char *templ;
        unsigned int tempsize = fetchBoardTemplate(&templ);
        std::string boardstr(templ, tempsize);
        rapidjson::Document board;
        board.Parse(boardstr.c_str());
        // Se agrega jugador.
        addPlayer(board, playerName, playerIsBot, playerColor);
        unsigned int newbsize;
        const char *newjsonboard = stringify(board, newbsize);
        //  Se guarda tablero y cartas
        saveBoard(newjsonboard, filename, newbsize);
        generateCards(boardid);
        // Se manda conrifmación para unirse a juego.
        sendSuccess(nc);
    }
}

void onGetBoard(struct mg_connection *nc, struct http_message *hm)
{
    // Recibe una petición cuyo cuerpo es el id del tablero que pide.
    char *filename = new char[hm->query_string.len + 6];
    mg_get_http_var(&hm->query_string, "boardId", filename, sizeof(filename));
    sprintf(filename, "%s.json", filename);
    // Obtiene el archivo correspondiente.
    char *jsonBoard;
    unsigned int boardBytes = fetchBoard(&jsonBoard, filename);
    mg_send_head(nc, 200, boardBytes, "Content-Type: application/json");
    mg_send(nc, jsonBoard, boardBytes);
}

void onPostBoard(struct mg_connection *nc, struct http_message *hm)
{

    std::string jsonTablero(hm->body.p, hm->body.len);
    char *filename = new char[hm->query_string.len + 6];
    mg_get_http_var(&hm->query_string, "boardId", filename, sizeof(filename));
    sprintf(filename, "%s.json", filename);
    saveBoard(jsonTablero.c_str(), filename, jsonTablero.size());

    // Se envía confirmación /board?id=1231
    sendSuccess(nc);
}

void onGetCard(struct mg_connection *nc, struct http_message *hm)
{
    /*
        Cuerpo de petición:
        {
            color: number // 0: blue, 1:red
            boardId: string
        }
    */
    //Opcion 1. Con RapidJson
    /*
    std::string reqbody(hm->body.p, hm->body.len);
    Document req;
    printf("%s\n", reqbody.c_str());
    req.Parse(reqbody.c_str());
    int color = req["color"].GetInt();
    const char *boardid = req["boardId"].GetString();
    */
    //Opcion 2
    char colorChar[10];
    char boardid[10];
    int color = 0;

    mg_get_http_var(&hm->body, "color", colorChar,sizeof(colorChar));
    mg_get_http_var(&hm->body, "boardId", boardid,sizeof(boardid));

    if (strcmp ("1", colorChar) == 0) {
        color = 1;
    }

    printf("%s\n", getFileName(color, boardid));

    const char *blueCard = rollCards(getFileName(color, boardid));
    unsigned int cardSize = strlen(blueCard);
    mg_send_head(nc, 200, cardSize, "Content-Type: application/json");
    mg_send(nc, blueCard, cardSize);
}

void sendError(struct mg_connection *nc)
{
    const char *res = "ERROR";
    int reslen = strlen(res);
    mg_send_head(nc, 200, reslen, "Content-Type: text/plain");
    mg_send(nc, res, reslen);
}

void sendSuccess(struct mg_connection *nc)
{
    const char *res = "SUCCESS";
    int reslen = strlen(res);
    mg_send_head(nc, 200, reslen, "Content-Type: text/plain");
    mg_send(nc, res, reslen);
}