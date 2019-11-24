#include "Controllers.h"

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
    rapidjson::Document req;
    req.Parse(hm->body.p);
    const char *boardid = req["boardId"].GetString();
    const char *playerName = req["playerName"].GetString();
    bool playerIsBot = req["playerIsBot"].GetBool();
    const char *playerColor = req["playerColor"].GetString();

    // Obtenemos el nombre del archivo donde se guarda el documento.
    char *filename = new char[strlen(boardid) + 6];
    sprintf(filename, "%s.json", boardid);

    // Verificamos que exista el archivo
    if (access(filename, F_OK) != -1)
    {
        // Obtenemos y traducimos contenido de archivo.
        char *jsonboard;
        fetchBoard(&jsonboard, filename);
        rapidjson::Document board;
        board.Parse(jsonboard);

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
                saveBoard(stringify(board), filename);
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
        // Se genera tablero.
        const char * jsonboard = generateBoard(boardid);
        rapidjson::Document board;
        board.Parse(jsonboard);
        // Se agrega jugador.
        addPlayer(board, playerName, playerIsBot, playerColor);
        const char * newjsonboard = stringify(board);
        //  Se guarda tablero y se manda conrifmación para unirse a juego.
        saveBoard(newjsonboard, filename);
        sendSuccess(nc);
    }
}

void onGetBoard(struct mg_connection *nc, struct http_message *hm)
{
    // Recibe una petición cuyo cuerpo es el id del tablero que pide.
    char *filename = new char[hm->body.len + 6];
    sprintf(filename, "%s.json", hm->body.p);

    // Obtiene el archivo correspondiente.
    char *jsonBoard;
    unsigned int boardBytes = fetchBoard(&jsonBoard, filename);
    mg_send_head(nc, 200, boardBytes, "Content-Type: application/json");
    mg_send(nc, jsonBoard, boardBytes);
}

void onPostBoard(struct mg_connection *nc, struct http_message *hm)
{
    const char *jsonBoard = hm->body.p;
    rapidjson::Document board;
    board.Parse(jsonBoard);
    char * filename = new char[board["id"].GetStringLength() + 6];
    sprintf(filename, "%s.json", board["id"].GetString());
    saveBoard(jsonBoard, filename);

    // Se envía confirmación
    sendSuccess(nc);
}

void onGetRedCard(struct mg_connection *nc, struct http_message *hm)
{
    const char *redCard = rollCards(RED);
    unsigned int cardSize = strlen(redCard);
    mg_send_head(nc, 200, cardSize, "Content-Type: application/json");
    mg_send(nc, redCard, cardSize);
}

void onGetBlueCard(struct mg_connection *nc, struct http_message *hm)
{
    const char *blueCard = rollCards(BLUE);
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