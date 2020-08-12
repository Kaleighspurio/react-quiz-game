import React from 'react';
import './QuestionDiv.css';

export default function QuestionDiv(props) {
  // if there are questions, display the end of game button
  const displayButton = () => {
    if (props.apiResults.length > 1) {
      return (
        <button
          type="submit"
          id="done-button"
          className="button mb-6 mt-3"
          onClick={props.handleQuizSubmit}
        >
          Done!
        </button>
      );
    }
  };

  const displayAnswers = (n) => {
    if (props.showAnswers) {
      return (
        <span
          className="has-text-weight-bold"
          style={
            props.correctAnswers[n - 1] === props.userAnswers[n - 1]
              ? { color: '#0c7c59' }
              : { color: '#800000' }
          }
        >
          Correct Answer: {props.correctAnswers[n - 1]}
        </span>
      );
    }
  };

  // these help give the questions and radios numbers
  let i = 0;

  return (
    <div className="container">
      {props.apiResults.map((result) => (
        <div
          className="my-4 question-div"
          key={result.question}
          name={result.question}
          onChange={props.handleRadioChange}
        >
          <p className="my-2 left">Category: {result.category}</p>
          <p className="left question">
            {1 + i++}. {result.question}
          </p>
          <p>{displayAnswers(i)}</p>
          <form className="form">
            <div className="control my-3 radio-div">
              <label>
                <input
                  className="mx-1"
                  type="radio"
                  name={'question' + i}
                  value={result.all_answers[0]}
                />
                {result.all_answers[0]}
              </label>
              <br />
              <label>
                <input
                  className="mx-1"
                  type="radio"
                  name={'question' + i}
                  value={result.all_answers[1]}
                />
                {result.all_answers[1]}
              </label>
              <br />
              <label>
                <input
                  className="mx-1"
                  type="radio"
                  name={'question' + i}
                  value={result.all_answers[2]}
                />
                {result.all_answers[2]}
              </label>
              <br />
              <label>
                <input
                  className="mx-1"
                  type="radio"
                  name={'question' + i}
                  value={result.all_answers[3]}
                />
                {result.all_answers[3]}
              </label>
            </div>
          </form>
        </div>
       ))}
      {displayButton()}
    </div>
  );
}
