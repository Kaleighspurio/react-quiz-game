import React, { useState } from 'react';

export default function QuestionDiv(props) {


    // const [answers, setAnswers] = useState({
    //     correctAnswers: correctAnswers,
    //     usersAnswers: [],
    // })

    


    // if there are questions, display the end of game button
    const displayButton = () => {
        if (props.apiResults.length > 1) {
           return <button type='submit' className="button" onClick={handleQuizSubmit} >Done!</button>
        }
    }

    const handleQuizSubmit = (event) => {
        event.preventDefault();
    }

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
      {displayButton()}
    </div>
  );
}

//  TODO: Next steps- 
// * add button to complete quiz
// * add code to make sure all questions have been answered
// * add function that will check answers
// * Deal with calculating the score and displaying it
// * Change the score to a modal?
