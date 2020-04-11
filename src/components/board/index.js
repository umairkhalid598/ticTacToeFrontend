import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { TicTacBoard, TicTacToe, TicTacToeButton } from "./style";
import {get, put} from "../../request";

const GAME_STATE = {
    RUNNING: "",
    O_WIN: "Congratulations! You won.",
    X_WIN: "You Lose",
    DRAW: "Game Draw. Please start a new Game",
};

const Board = () => {
    const gameId = useParams().id;

    const [winner, setWinner] = useState(null);
    const [gameStatus, setGameStatus] = useState("RUNNING");
    const [gameError, setGameError] = useState(null);
    const [moves, setMoves] = useState({
        1: '', 2: '', 3: '', 4: '', 5: '', 6: '', 7: '', 8: '', 9: ''
    });

    useEffect(() => {
        function getGame() {
            get(`/v1/games/${gameId}`).then((result) => {
                setMoves(result.body.board );
                setGameStatus(result.body.status);
                setWinner(GAME_STATE[result.body.status])
            }).catch((error)=> {
                setGameError(error.response.body.msg)
            })
        }
        getGame();
    }, [gameError, gameStatus, winner, gameId]);

    const handleClick = (id) => {
        if (winner) {
            return ;
        }
        if (moves[id]) {
            gameError("Please select available box");
            return;
        }
        setGameError(null)
        setMoves({ ...moves, [id]: 'user' });
        put(`/v1/games/${gameId}`, {
            board: { ...moves, [id]: 'user' },
        }).then((result) => {
            setMoves(result.body.board );
            setGameStatus(result.body.status);
            setWinner(GAME_STATE[result.body.status])
        })
    };
    return (
        <React.Fragment>
            {!gameError && !winner && gameStatus}
            {!gameError && winner}
            {gameError ? gameError :
                <TicTacToe>
                    <TicTacBoard className="App">
                        {Object.keys(moves).map((i) => <TicTacToeButton
                            key={i}
                            onClick={() => handleClick(i)}
                            className="btn btn-light"
                        >
                            {moves[i] === 'user' && 'X'}
                            {moves[i] === 'ai' && 'O'}
                        </TicTacToeButton>)}
                    </TicTacBoard>
                </TicTacToe>
            }
        </React.Fragment>
    );
};

export default Board;
