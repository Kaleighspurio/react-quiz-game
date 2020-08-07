# Trivia Quiz

## Description

This is a front end React application that functions as a trivia app using the Open Trivia Database API.  The user is prompted to select a category for their quiz, or else can be given questions from a random assortment of categories.  Once the user selects their choice, 15 multiple choice questions are displayed.  The user answers their questions and clicks the "Done" button when finished.  If they missed a question, they are prompted to check that all questions are answered.  If all questions are answered, the score is calculated and displayed and all of the correct answers appear below each question- styled to indicate whether the user answered them right or wrong by using either red or green font.  The user is also brought back to the top of the page so they can view their score.

This app was made to help me get the hang of React and to help me get a feel for things like conditional rendering, Hooks, ternaries, and functional Components.

## Technologies

* React
* Javascript
* HTML5
* CSS
* Bulma
* Open Trivia Database API
* axios
* js-base64

When using the default encoding in the responses from the API, some of the questions were not fully decoded, which resulted in funky symbols in some of the questions- so I ended up getting the API responses with base64 encoding and used js-base64 to decode them.

## Installation

Clone down the repo and run `npm install` to install the necessary dependencies.  Then run `npm start` to run it locally.

## Demo



### Screenshots

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

