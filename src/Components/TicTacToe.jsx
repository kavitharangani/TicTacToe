import React, { useState } from "react";
import './TicTacToe.css';
import circle_icon from '../Assests/circle.png';
import cross_icon from '../Assests/cross.png';

const TicTacToe = () => {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [isXNext, setIsXNext] = useState(true);
    const [winner, setWinner] = useState(null);
    const [isDraw, setIsDraw] = useState(false);

    const handleClick = (index) => {
        if (board[index] || winner || isDraw) return;

        const newBoard = board.slice();
        newBoard[index] = isXNext ? 'X' : 'O';
        setBoard(newBoard);
        setIsXNext(!isXNext);
        const win = calculateWinner(newBoard);
        if (win) {
            setWinner(win);
        } else if (newBoard.every(cell => cell !== null)) {
            setIsDraw(true);
        }
    };

    const calculateWinner = (squares) => {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
        return null;
    };

    const renderCell = (index) => {
        return (
            <div className="cell" onClick={() => handleClick(index)}>
                {board[index] === 'X' && <img src={cross_icon} alt="X" />}
                {board[index] === 'O' && <img src={circle_icon} alt="O" />}
            </div>
        );
    };

    const resetGame = () => {
        setBoard(Array(9).fill(null));
        setIsXNext(true);
        setWinner(null);
        setIsDraw(false);
    };

    return (
        <div className="container">
            <h1 className="title"> <span>Tic Tac Toe Game In React</span></h1>
            <div className="board">
                {board.map((_, index) => renderCell(index))}
            </div>
            {winner && <p className="winner-message">{winner} is the winner!</p>}
            {isDraw && <p className="draw-message">Points are equal!</p>}
            <button className="reset" onClick={resetGame}>Reset</button>
        </div>
    );
};

export default TicTacToe;
