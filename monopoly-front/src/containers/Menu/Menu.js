import React, { useState } from 'react'
import "./Menu.css"

import Board from "../BoardPage/Board/Board";


const Menu = props => {

    const [menu, setMenu] = useState(true);

    const onOnePlayerGame = event => {
        setMenu(false);
    };

    const onMultiPlayerGame = event => {

    };

    const onShowRules = event => {

    };

    return (
        menu ?
            <div className="contenido">
                <img src="./img/logo.png" />
                <div className="modo">
                    <h1>MODO DE JUEGO</h1>
                    <button className="btn" onClick={onOnePlayerGame}>SOLO</button>
                    <button className="btn rojo" onClick={onMultiPlayerGame}>MULTIJUGADOR</button>
                </div>
                <div className="reglas">
                    <h1>REGLAS</h1>
                    <button className="btn" onClick={onShowRules}>VER LAS REGLAS</button>
                </div>
            </div> : <Board />
    );
};

export default Menu;