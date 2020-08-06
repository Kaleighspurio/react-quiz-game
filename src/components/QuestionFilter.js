import React, { useState, useEffect } from 'react';
import ScoreBox from './ScoreBox';
import API from '../utils/API';
import QuestionDiv from './QuestionDiv';
import { Base64 } from 'js-base64';

export default function QuestionFilter() {
  // Lets have some state...
  //   * apiResults: Where the decoded results (trivia questions and answers) are stored
  // * categoryId: Where the selected category is stored, if the user wants trivia of a certain category
  //  * allCategories: all category options possible, used in the select dropdown
  //  * correctAnswers: all of the correct answers to the current questions
  //  * 1-15: stores all of the answers that the user selected
  //  * score: stores the user's score after the quiz
  const [state, setState] = useState({
    apiResults: [],
    categoryId: '9',
    allCategories: [],
    correctAnswers: [],
    1: '',
    2: '',
    3: '',
    4: '',
    5: '',
    6: '',
    7: '',
    8: '',
    9: '',
    10: '',
    11: '',
    12: '',
    13: '',
    14: '',
    15: '',
    score: '',
  });

  // when the component loads, get all possible trivia categories to use in the select dropdown
  useEffect(() => {
    API.getPossibleCategories().then((response) => {
      setState({ ...state, allCategories: response.data.trivia_categories });
    });
  }, []);

  //   API response comes with base64 encoding, so the js-base64 package will decode it.  The grabCorrectAnswers function is also called to set the correctAnswers in the state.
  const decodeResults = (results) => {
    const decoded = [];
    results.forEach((object) => {
      const allOptions = [
        Base64.decode(object.incorrect_answers[0]),
        Base64.decode(object.incorrect_answers[1]),
        Base64.decode(object.incorrect_answers[2]),
        Base64.decode(object.correct_answer),
      ];
      // lets put all 4 answer options in alphabetical order and we will display them in alphabetically order so that it is random...
      allOptions.sort();
      const questionObject = {
        category: Base64.decode(object.category),
        question: Base64.decode(object.question),
        correct_answer: Base64.decode(object.correct_answer),
        all_answers: allOptions,
      };
      // push the object we created with the api results into an array
      decoded.push(questionObject);
    });
    grabCorrectAnswers(decoded);
    //   set the state to the array we created with all of the results decoded.
    setState({
      ...state,
      apiResults: decoded,
    });
  };

  //   If the user clicks the 'I Want All Categories' button, send request to the API for those quesitons. Then calls the function decodeResults which sets the state apiResults to the decoded results
  const handleAllSubmit = (event) => {
    event.preventDefault();
    API.getQuestionsAnyCategory().then((response) => {
      decodeResults(response.data.results);
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

  //   When a particular category is indicated, call the API and pass in the categoryId.  Then the results are decoded and the state.apiResults is set.
  const handleCategorySubmit = (event) => {
    event.preventDefault();
    API.getQuestionsByCategory(state.categoryId).then((response) => {
      decodeResults(response.data.results);
    });
  };

  const grabCorrectAnswers = (results) => {
    const correctAnswers = [];
    results.forEach((result) => {
      correctAnswers.push(result.correct_answer);
    });
    console.log(correctAnswers, 'correct answers');
    setState({
      ...state,
      correctAnswers: correctAnswers,
    });
  };

  const handleRadioChange = (event) => {
    event.preventDefault();
    console.log('radio clicked');
    const { name, value } = event.target;
    setState({
        ...state,
        [name]: value
    });
  }

  const handleQuizSubmit = (event) => {
      event.preventDefault();

  }

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
      <QuestionDiv apiResults={state.apiResults} handleRadioChange={handleRadioChange} />
    </div>
  );
}
