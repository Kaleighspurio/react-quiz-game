# Trivia Quiz

## Description

This is a front end React application that functions as a trivia quiz game using the Open Trivia Database API.  The user is prompted to select a category for their quiz, or else can be given questions from a random assortment of categories.  Once the user selects their choice, 15 multiple choice questions are displayed.  The user answers their questions and clicks the "Done" button when finished.  If they missed a question, they are prompted to check that all questions are answered.  If all questions are answered, the score is calculated and displayed and all of the correct answers appear below each question- styled to indicate whether the user answered them right or wrong by using either red or green font.  The user is also brought back to the top of the page so they can view their score and can play again.


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

Try out the Trivia Quiz!: [https://kaleighspurio.github.io/react-quiz-game/](https://kaleighspurio.github.io/react-quiz-game/)

### Screenshots

![Quiz starting filter](images/Screen%20Shot%202020-08-07%20at%201.39.37%20PM.png)
![Quiz Questions](images/Screen%20Shot%202020-08-07%20at%201.39.59%20PM.png)
![Quiz End](images/Screen%20Shot%202020-08-07%20at%201.41.04%20PM.png)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

