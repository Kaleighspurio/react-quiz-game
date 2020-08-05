import React from 'react';

export default function QuestionDiv(props) {
  return (
    <div className="container">
      {props.apiResults.map((result) => (
        <div key={result.question}>
          <p>Category: {result.category}</p>
          <p>{result.question}</p>
          <form>
            <div className="control my-3">
              <input
                className="mx-1"
                type="radio"
                name="answer"
                value={result.all_answers[0]}
              />
              {result.all_answers[0]}
              <br />
              <input
                className="mx-1"
                type="radio"
                name="answer"
                value={result.all_answers[1]}
              />
              {result.all_answers[1]}
              <br />
              <input
                className="mx-1"
                type="radio"
                name="answer"
                value={result.all_answers[2]}
              />
              {result.all_answers[2]}
              <br />
              <input
                className="mx-1"
                type="radio"
                name="answer"
                value={result.all_answers[3]}
              />
              {result.all_answers[3]}
            </div>
          </form>
        </div>
      ))}
    </div>
  );
}
