import React from "react";
import { useHistory } from "react-router-dom";
import { GamePathButton } from "./style";
import { post } from "../../request";

const Home = () => {
    const history = useHistory();
    const gameUrl = () => {
        post("/v1/games",{
            board: {
                1: '', 2: '', 3: '', 4: '', 5: '', 6: '', 7: '', 8: '', 9: ''
            }
        }).then((response) => {
            history.push(response.body.url)
        })
    }
    return (
        <div>
            <h3>
                Welcome Tic Toc World.
            </h3>
                <GamePathButton className="btn btn-light" onClick={gameUrl}>
                    Start Game
                </GamePathButton>
        </div>
    )
};

export default Home;
