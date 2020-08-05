import React, { useState, useEffect } from 'react';
import API from '../utils/API';

export default function QuestionFilter() {
  // Lets have some state...
  const [state, setState] = useState({
    apiResults: [],
    category: '',
    allCategories: [],
  });

  // when the component loads, get all possible trivia categories to use in the select dropdown
  useEffect(() => {
    API.getPossibleCategories().then((response) => {
      setState({ ...state, allCategories: response.data.trivia_categories });
      console.log(response.data.trivia_categories);
    });
  }, []);

  const handleAllSubmit = (event) => {
    event.preventDefault();
  };

  const handleCategorySubmit = (event) => {
    event.preventDefault();
  };

  return (
    <form>
      <div>
        <button
          className="button is-warning"
          type="submit"
          onClick={handleAllSubmit}
        >
          All Categories!
        </button>
      </div>
      <div className="select is-rounded">
        <select>
          {state.allCategories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <button
          className="button is-info"
          type="submit"
          onClick={handleCategorySubmit}
        >
          Submit
        </button>
      </div>
    </form>
  );
}
