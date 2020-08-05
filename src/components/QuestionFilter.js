import React, { useState, useEffect } from 'react';
import API from '../utils/API';

export default function QuestionFilter() {
  // Lets have some state...
  const [state, setState] = useState({
    apiResults: [],
    categoryId: '9',
    allCategories: [],
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
    API.getQuestionsAnyCategory().then((response) => {
        console.log(response.data);
        setState({
            ...state,
            apiResults: response.data.results
        });
    });
  };

//   When the select box is changed, set the state.categoryId to the id of the selected category
  const handleChange = (event) => {
    event.preventDefault();
    setState({
        ...state,
        category: event.target.value
    });
  }

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
          I Want All Categories!
        </button>
      </div>
      <h2 className='my-4'>OR</h2>
      <div className="select is-rounded">
        <select onChange={handleChange}>
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
