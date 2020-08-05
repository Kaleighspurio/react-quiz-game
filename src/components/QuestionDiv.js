import React, { useState } from 'react';

export default function QuestionDiv(props) {
  

  return (
    <div className="container">
      {props.apiResults.map((result) => (
        <div key={result.question}>
          <p>Category: {result.category}</p>
          <p>{decodeURIComponent(result.question)}</p>
          <form className="control">
            <input type="radio" />
          </form>
        </div>
      ))}
    </div>
  );
}
