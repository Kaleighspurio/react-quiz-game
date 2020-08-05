import React, { useState, useEffect } from 'react';
import ScoreBox from './ScoreBox';
import API from '../utils/API';
import QuestionDiv from './QuestionDiv';
import { Base64 } from 'js-base64';

export default function QuestionFilter() {
  // Lets have some state...
  const [state, setState] = useState({
    apiResults: [],
    categoryId: '9',
    allCategories: [],
    score: '',
  });

  // when the component loads, get all possible trivia categories to use in the select dropdown
  useEffect(() => {
    API.getPossibleCategories().then((response) => {
      setState({ ...state, allCategories: response.data.trivia_categories });
    });
  }, []);

  //   If the user clicks the 'I Want All Categories' button, send request to the API for those quesitons
  const handleAllSubmit = (event) => {
    event.preventDefault();
    const decoded = [];
    API.getQuestionsAnyCategory().then((response) => {
      console.log(response.data.results);
      response.data.results.forEach((object) => {
        const questionObject = {
            category: Base64.decode(object.category),
            question: Base64.decode(object.question),
            correct_answer: Base64.decode(object.correct_answer),
            all_answers: [Base64.decode(object.incorrect_answers[0]), Base64.decode(object.incorrect_answers[1]), Base64.decode(object.incorrect_answers[2]), Base64.decode(object.correct_answer)]
        }
        decoded.push(questionObject);
    });
    console.log(decoded)
    setState({
        ...state,
        apiResults: decoded
    });
    });
  };

  //   When the select box is changed, set the state.categoryId to the id of the selected category
  const handleChange = (event) => {
    event.preventDefault();
    setState({
      ...state,
      categoryId: event.target.value,
    });
  };

  //   When a particular category is indicated, call the API and pass in the categoryId
  const handleCategorySubmit = (event) => {
    event.preventDefault();
    const decoded = [];
    API.getQuestionsByCategory(state.categoryId).then((response) => {
      console.log(response.data);
      response.data.results.forEach((object) => {
        const questionObject = {
            category: Base64.decode(object.category),
            question: Base64.decode(object.question),
            correct_answer: Base64.decode(object.correct_answer),
            all_answers: [Base64.decode(object.incorrect_answers[0]), Base64.decode(object.incorrect_answers[1]), Base64.decode(object.incorrect_answers[2]), Base64.decode(object.correct_answer)]
        }
        decoded.push(questionObject);
    });
    console.log(decoded)
    setState({
        ...state,
        apiResults: decoded
    });
    });
  
  };

//   const decoded = [];
//   const decodeApiResults = () => {
//     state.apiResults.forEach((object) => {
//         const questionObject = {
//             category: Base64.decode(object.category),
//             question: Base64.decode(object.question),
//             correct_answer: Base64.decode(object.correct_answer),
//             all_answers: [Base64.decode(object.incorrect_answers[0]), Base64.decode(object.incorrect_answers[1]), Base64.decode(object.incorrect_answers[2]), Base64.decode(object.correct_answer)]
//         }
//         decoded.push(questionObject);
//     });
//     console.log(decoded)
//     setState({
//         ...state,
//         decodedResults: decoded
//     });
//   };
  

  return (
    <div className="container">
      <ScoreBox />
      <form className="my-6">
        <div className="is-grouped">
          <p className="control">
            <button
              className="button is-warning"
              type="submit"
              onClick={handleAllSubmit}
            >
              I Want All Categories!
            </button>
          </p>
          <h2 className="my-4 control">OR...</h2>
          <div className="field is-grouped">
            <div className="control is-expanded">
              <div className="select is-fullwidth">
                <select onChange={handleChange}>
                  {state.allCategories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <p className="control">
              <button
                className="button is-info"
                type="submit"
                onClick={handleCategorySubmit}
              >
                Search
              </button>
            </p>
          </div>
        </div>
      </form>
      <QuestionDiv apiResults={state.apiResults} />
    </div>
  );
}
