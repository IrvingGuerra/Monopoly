import React, { useState } from "react";

import "./Board.css"

const Board = props => {

    /*
        {
            casillas:[
                {
                    id:1,
                    jugadores:[1,2,3],
                    propieratio: 4,
                }
                ...
            ]
        }
    */

    const [jugadores, setJugadores] = useState([null, <div className="player1"></div>]);

    // useEffect(() => {
    //     setJugadores([]);
    //     props.casillas.forEach(casilla => {
    //         const jugadoresHTML = casilla.jugadores.map(jugador => <div className={`player${jugador}`}></div>);
    //         jugadores[casilla.id] = jugadoresHTML;
    //     });
    // })


    return (
        <div className="tablero">
            <div className="col izquierda">
                <div className="casilla">
                    <div className="carcel">
                        <img src="img/jail.jpg" />
                        <div className="numero">13</div>
                    </div>
                </div>
                <div className="casilla">
                    <div className="color_propiedad verde"></div>
                    <div className="info_propiedad">
                        <div className="titulo">PAPELERIA</div>
                        <div className="propietario">SIN PROPIETARIO</div>
                        <div className="precio">PRECIO $200</div>
                        <div className="numero">12</div>
                    </div>
                </div>
                <div className="casilla">
                    <div className="numero">11</div>
                </div>
                <div className="casilla">
                    <div className="color_propiedad rojo"></div>
                    <div className="info_propiedad">
                        <div className="titulo">BAÑOS HOMBRES</div>
                        <div className="propietario">PROPIETARIO</div>
                        <div className="precio">PRECIO $200</div>
                        <div className="numero">10</div>
                    </div>
                </div>
                <div className="casilla">
                    <div className="color_propiedad rojo"></div>
                    <div className="info_propiedad">
                        <div className="titulo">BAÑOS MUJERES</div>
                        <div className="propietario">SIN PROPIETARIO</div>
                        <div className="precio">PRECIO $200</div>
                        <div className="numero">9</div>
                    </div>
                </div>
            </div>
            <div className="cambiaFila">
                <div className="fila superior">
                    <div className="casilla">
                        <div className="tarjeta rojo">
                            <i className="fa fa-question-circle"></i>
                            <div className="numero">14</div>
                        </div>
                    </div>
                    <div className="casilla">
                        <div className="color_propiedad azulOscuro"></div>
                        <div className="info_propiedad">
                            <div className="titulo">BARRA DE CAFE</div>
                            <div className="propietario">SIN PROPIETARIO</div>
                            <div className="precio">PRECIO $50</div>
                            <div className="numero">15</div>
                        </div>
                    </div>
                    <div className="casilla">
                        <div className="numero">16</div>
                    </div>
                    <div className="casilla">
                        <div className="tarjeta azul">
                            <i className="fa fa-question-circle"></i>
                            <div className="numero">7</div>
                        </div>
                    </div>
                    <div className="casilla">
                        <div className="numero">18</div>
                    </div>
                    <div className="casilla">
                        <div className="color_propiedad verde"></div>
                        <div className="info_propiedad">
                            <div className="titulo">PAPELERIA IMPRESIONES</div>
                            <div className="propietario">SIN PROPIETARIO</div>
                            <div className="precio">PRECIO $200</div>
                            <div className="numero">19</div>
                        </div>
                    </div>
                    <div className="casilla">
                        <div className="color_propiedad verde"></div>
                        <div className="info_propiedad">
                            <div className="titulo">PAPELERIA COPIAS</div>
                            <div className="propietario">SIN PROPIETARIO</div>
                            <div className="precio">PRECIO $200</div>
                            <div className="numero">20</div>
                        </div>
                    </div>
                    <div className="casilla">
                        <div className="tarjeta rojo">
                            <i className="fa fa-question-circle"></i>
                            <div className="numero">7</div>
                        </div>
                    </div>
                </div>
                <div className="cartasYDado">
                    <div className="logo">
                        <img src="img/logo.png" />
                    </div>
                    <div
                        className="cartasRojas disabled"
                        onclick="getTarjeta(event,'roja')"
                    >
                        <i className="fa fa-question-circle"></i>
                    </div>
                    <div
                        className="cartasAzules disabled"
                        onclick="getTarjeta(event,'azul')"
                    >
                        <i className="fa fa-question-circle"></i>
                    </div>
                    <div className="dado">
                        <img id="dado" src="img/dado/1.png" onclick="randomDado(event)" />
                    </div>
                    <div className="alert">
                        <span
                            className="closebtn"
                            onclick="$(this.parentElement).fadeOut();"
                        >
                            &times;
            </span>
                        <label>
                            <strong>Información!</strong> Descripcion mas mas mas larga xd
            </label>
                    </div>
                </div>
                <div className="fila inferior">
                    <div className="casilla">
                        <div className="numero">8</div>
                    </div>
                    <div className="casilla">
                        <div className="tarjeta azul">
                            <i className="fa fa-question-circle"></i>
                            <div className="numero">7</div>
                        </div>

                    </div>
                    <div className="casilla">
                        <div className="numero">6</div>
                    </div>
                    <div className="casilla">
                        <div className="color_propiedad azulOscuro"></div>
                        <div className="info_propiedad">
                            <div className="titulo">CAFETERIA SILLAS</div>
                            <div className="propietario">SIN PROPIETARIO</div>
                            <div className="precio">PRECIO $50</div>
                            <div className="numero">5</div>
                        </div>
                    </div>
                    <div className="casilla">
                        <div className="color_propiedad azulOscuro"></div>
                        <div className="info_propiedad">
                            <div className="titulo">CAFETERIA</div>
                            <div className="propietario">SIN PROPIETARIO</div>
                            <div className="precio">PRECIO $50</div>
                            <div className="numero">4</div>
                        </div>
                    </div>
                    <div className="casilla">
                        <div className="numero">3</div>
                    </div>
                    <div className="casilla">
                        <div className="tarjeta rojo">
                            <i className="fa fa-question-circle"></i>
                            <div className="numero">2</div>
                        </div>
                    </div>
                    <div className="casilla">
                        <div className="color_propiedad morado"></div>
                        <div className="info_propiedad">
                            <div className="titulo">TORNIQUETES CAFE</div>
                            <div className="propietario">{"yo"/*props.casilla[1].propietario*/}</div>
                            <div className="precio">PRECIO ${"5"/*props.casilla[1].precio*/}</div>
                            <div className="numero">1</div>
                        </div>
                        {jugadores[1]}
                    </div>
                </div>
            </div>
            <div className="col derecha">
                <div className="casilla">
                    <div className="numero">22</div>
                </div>
                <div className="casilla">
                    <div className="color_propiedad rojo"></div>
                    <div className="info_propiedad">
                        <div className="titulo">BAÑOS SUCIOS</div>
                        <div className="propietario">PROPIETARIO</div>
                        <div className="precio">PRECIO $200</div>
                        <div className="numero">23</div>
                    </div>
                </div>
                <div className="casilla">
                    <div className="tarjeta azul">
                        <i className="fa fa-question-circle"></i>
                        <div className="numero">7</div>
                    </div>
                </div>
                <div className="casilla">
                    <div className="color_propiedad morado"></div>
                    <div className="info_propiedad">
                        <div className="titulo">TORNIQUETES ESTACIONAMIENTO</div>
                        <div className="propietario">SIN PROPIETARIO</div>
                        <div className="precio">PRECIO $200</div>
                        <div className="numero">25</div>
                    </div>
                </div>
                <div className="casilla">
                    <div className="salida">
                        <strong>SALIDA</strong>
                        <br />
                        Cobra $200 cada vez que pases por aqui!
            <br />
                        <i className="fa fa-long-arrow-left"></i>
                    </div>
                    <div className="player1"></div>
                    <div className="player2"></div>
                    <div className="player3"></div>
                    <div className="player4"></div>
                </div>
            </div>
        </div>
    );
};

export default Board;
