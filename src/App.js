import React, { useState } from 'react';
import axios from 'axios';
import styled from "styled-components";

const TicTacToe = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TicTacBoard = styled.div`
  flex: 0 1 150px;
`;

const TicTacToeButton = styled.button`
  width: 50px;
  height: 50px;
  
`;
const App = () => {
  const [winner, setWinner] = useState(null)
  const [error, setError] = useState(null)
  const [moves, setMoves] = useState({
    1: '', 2: '', 3: '', 4: '', 5: '', 6: '', 7: '', 8: '', 9: ''
  });
  const handleClick = (id) => {
    if (winner) {
      return ;
    }
    if (moves[id]) {
      setError("Please select available box");
      return;
    }
    setError(null)
    setMoves({ ...moves, [id]: 'user' });
    axios.post("http://localhost:4000/api/tic-tac-toe/move", {
      data: { ...moves, [id]: 'user' },
    }).then((result) => {
      console.log(result)
      setMoves(result.data.data.game );
      setWinner(result.data.data.gameOver)
    })
  };
  return (
      <>
        {winner && winner}
        {error && error}
        <TicTacToe>
          <TicTacBoard className="App">
            {Object.keys(moves).map((i) => <TicTacToeButton
                key={i}
                onClick={() => handleClick(i)}
            >
              {moves[i] === 'user' && 'O'}
              {moves[i] === 'ai' && 'X'}
            </TicTacToeButton>)}
          </TicTacBoard>
        </TicTacToe>
      </>
  );
};

export default App;
