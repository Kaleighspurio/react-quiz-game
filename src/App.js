import React from 'react';
import Header from './components/Header';
import QuestionFilter from './components/QuestionFilter';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="container">
        <Header />
        <QuestionFilter />
      </div>
    </div>
  );
}

export default App;
