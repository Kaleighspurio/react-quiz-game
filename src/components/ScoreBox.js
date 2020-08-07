import React from 'react';

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
            <p className='title is-4'>Your Score: {displayScore()}</p>
        </div>
    )
}