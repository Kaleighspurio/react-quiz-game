import React from 'react';
import ScoreBox from './ScoreBox';

export default function Header() {
  return (
    <section className="hero level">
      <div className="hero-body tile is-ancestor">
        
        <div className="container">
          <h1 className="title">Trivia Quiz!</h1>
          <h2 className="subtitle">
            Test your knowledge of trivia! Select a category or answer questions
            from all possible categories.
          </h2>
        </div>
        <div className="container">
          <div className="level-left tile is-parent mx-4">
            <ScoreBox />
          </div>
        </div>
      </div>
    </section>
  );
}
