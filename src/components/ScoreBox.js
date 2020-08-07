import React from 'react';
import './ScoreBox.css';

export default function ScoreBox(props) {

    const displayScore = () => {
        if (props.score === 0) {
            return <span></span>
        } else {
        return <span>{props.score} %</span>
        }
    }
    return (
        <div className='tile is-child is-success'>
            <p className='title is-4 my-4'>Your Score: {displayScore()}</p>
            <button id="playagain" className='button' onClick={props.handlePlayAgain}>Play Again?</button>
        </div>
    )
}