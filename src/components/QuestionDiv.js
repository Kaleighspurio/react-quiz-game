import React, { useState } from 'react';

export default function QuestionDiv(props) {

    // if there are questions, display the end of game button
    const displayButton = () => {
        if (props.apiResults.length > 1) {
           return <button type='submit' className="button" onClick={props.handleQuizSubmit} >Done!</button>
        }
    }

    const displayAnswers = (n) => {
        if (props.showAnswers) {
        return <span className="has-text-weight-bold has-text-link" >Correct Answer: {props.correctAnswers[n-1]}</span>
        }
    }

    // these help give the questions and radios numbers
    let i = 1;
    let j = 1;
    let k = 1;
    let l = 1;
    let m = 1;
    let n = 1;

  return (
    <div className="container">
      {props.apiResults.map((result) => (
        <div key={result.question} name={result.question} onChange={props.handleRadioChange}>
          <p>Category: {result.category}</p>
      <p>{i++}. {result.question}</p>
        <p>{displayAnswers(n++)}</p>
          <form>
            <div className="control my-3">
              <input
                className="mx-1"
                type="radio"
                name={'question' + (j++)}
                value={result.all_answers[0]}
              />
              {result.all_answers[0]}
              <br />
              <input
                className="mx-1"
                type="radio"
                name={'question' + (k++)}
                value={result.all_answers[1]}
              />
              {result.all_answers[1]}
              <br />
              <input
                className="mx-1"
                type="radio"
                name={'question' + (l++)}
                value={result.all_answers[2]}
              />
              {result.all_answers[2]}
              <br />
              <input
                className="mx-1"
                type="radio"
                name={'question' + (m++)}
                value={result.all_answers[3]}
              />
              {result.all_answers[3]}
            </div>
          </form>
        </div>
      ))}
      {displayButton()}
    </div>
  );
}

//  TODO: Next steps- 

// * add code to make sure all questions have been answered
// * add function that will check answers
// * Deal with calculating the score and displaying it
// * Change the score to a modal?
