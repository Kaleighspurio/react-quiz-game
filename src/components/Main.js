import React, { useState, useEffect } from 'react';
import ScoreBox from './ScoreBox';
import API from '../utils/API';
import QuestionDiv from './QuestionDiv';
import { Base64 } from 'js-base64';
import FilterForm from './FilterForm';

export default function Main() {
  // Lets have some state...
  //   * apiResults: Where the decoded results (trivia questions and answers) are stored
  // * categoryId: Where the selected category is stored, if the user wants trivia of a certain category
  //  * allCategories: all category options possible, used in the select dropdown
  //  * correctAnswers: all of the correct answers to the current questions
  //  * question1-15: stores all of the answers that the user selected
  //  * userAnswers: is used to display the correct answers after scoring
  //  * score: stores the user's score after the quiz
  //  * showAnswers: gets changed after the quiz is submitted and when changed to true, will display the correct answer for each quesiton.
  const [state, setState] = useState({
    apiResults: [],
    categoryId: '9',
    allCategories: [],
    correctAnswers: [],
    question1: '',
    question2: '',
    question3: '',
    question4: '',
    question5: '',
    question6: '',
    question7: '',
    question8: '',
    question9: '',
    question10: '',
    question11: '',
    question12: '',
    question13: '',
    question14: '',
    question15: '',
    userAnswers: [],
    score: 0,
    showAnswers: false,
    filterDisplay: true,
    displayScore: false
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
    // this function will grab the correct answers and will set the state for the correctAnswers AND apiResults
    grabCorrectAnswers(decoded);
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
    setState({
      ...state,
      apiResults: results,
      correctAnswers: correctAnswers,
      filterDisplay: false,
    });
  };

  //   when the radio buttons are changed, the state is set according to which question
  const handleRadioChange = (event) => {
    const { name, value } = event.target;
    setState({
      ...state,
      [name]: value,
    });
  };

  const handleQuizSubmit = (event) => {
    event.preventDefault();
    allAnswered();
  };

  const allAnswered = () => {
    //   check that all questions have been answered
    if (
      !state.question1 ||
      !state.question2 ||
      !state.question3 ||
      !state.question4 ||
      !state.question5 ||
      !state.question6 ||
      !state.question7 ||
      !state.question8 ||
      !state.question9 ||
      !state.question10 ||
      !state.question11 ||
      !state.question12 ||
      !state.question13 ||
      !state.question14 ||
      !state.question15
    ) {
      return alert('oops you forgot at least one question');
    } else {
      // if all questions answers, call the check answers function
      checkAnswers();
      //   And scroll back to the top of the page
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };

  const checkAnswers = () => {
    const userAnswerArray = [
      state.question1,
      state.question2,
      state.question3,
      state.question4,
      state.question5,
      state.question6,
      state.question7,
      state.question8,
      state.question9,
      state.question10,
      state.question11,
      state.question12,
      state.question13,
      state.question14,
      state.question15,
    ];
    //   check which answers are correct/incorrect
    let rawScore = 0;
    let i = 0;
    userAnswerArray.forEach((userAnswer) => {
      if (userAnswer === state.correctAnswers[i]) {
        rawScore++;
      }
      i++;
    });
    console.log(rawScore, 'this is the rawscore');
    calculateScore(rawScore, userAnswerArray);
  };

  // calculate the score to a percentage
  const calculateScore = (score, userAnswerArray) => {
    const percentCorrect = Math.round((score / 15) * 100);
    // set the state.showAnswers to be true, so then the answers will be displayed.
    setState({
      ...state,
      score: percentCorrect,
      showAnswers: true,
      userAnswers: userAnswerArray,
      displayScore: true
    });
  };

  const handlePlayAgain = () => {
    window.location.reload(false);
  }

  // handles conditional rendering for the filterform and quiz questiondiv
  const displayFilter = () => {
    if (state.filterDisplay === true) {
      return (
        <FilterForm
        handleAllSubmit={handleAllSubmit}
        handleChange={handleChange}
        allCategories={state.allCategories}
        handleCategorySubmit={handleCategorySubmit}
        filterDisplay={state.filterDisplay}
      />
      )
    } else {
      return (
        <QuestionDiv
        apiResults={state.apiResults}
        handleRadioChange={handleRadioChange}
        handleQuizSubmit={handleQuizSubmit}
        showAnswers={state.showAnswers}
        correctAnswers={state.correctAnswers}
        userAnswers={state.userAnswers}
      />
      )
    }
  };

  // handles conditional rendering of the scorebox
  const displayScore = () => {
    if (state.displayScore === true ) {
      return <ScoreBox score={state.score} handlePlayAgain={handlePlayAgain} />
    }
  }

  return (
    <div className="container">
      {displayScore()}
      {displayFilter()}
    </div>
  );
}
