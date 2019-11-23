#include "Controllers.h"

void onGetGame(struct mg_connection *nc, struct http_message *hm)
{
    
}

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

/*
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
*/