#include "Controllers.h"

void onGetBoard(struct mg_connection *nc, struct http_message *hm)
{
    char *jsonBoard;
    unsigned int boardBytes = fetchBoard(&jsonBoard);
    mg_send_head(nc, 200, boardBytes, "Content-Type: application/json");
    mg_send(nc, jsonBoard, boardBytes);
}

void onPostBoard(struct mg_connection *nc, struct http_message *hm)
{
    const char *jsonBoard = hm->body.p;
    unsigned int boardSize = hm->body.len;
    saveBoard(jsonBoard, boardSize);
    
    // Se envía confirmación (pendiente)
    char reply[10] = "SAVED";
    int replyLen = strlen(reply);
    mg_send_head(nc, 200, replyLen, "Content-Type: text/plain");
    mg_send(nc, reply, replyLen + 1);
}

void onGetCard(struct mg_connection *nc, struct http_message *hm)
{

}