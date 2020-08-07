import React from 'react';
import './FilterForm.css';

export default function FilterForm(props) {
    return (
        <form className="my-6">
        <div className="is-grouped">
          <p className="control">
            <button
            id='allbtn'
              className="button is-fullwidth"
              type="submit"
              onClick={props.handleAllSubmit}
            >
              I Want Questions from All Categories!
            </button>
          </p>
          <h2 className="my-4 control">OR...</h2>
          <div className="field is-grouped">
            <div className="control is-expanded">
              <div className="select is-fullwidth">
                <select onChange={props.handleChange} id='select'>
                  {props.allCategories.map((category) => (
                    <option id="options" key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <p className="control">
              <button
                id='searchbtn'
                className="button is-info"
                type="submit"
                onClick={props.handleCategorySubmit}
              >
                Choose Category
              </button>
            </p>
          </div>
        </div>
      </form>
    )
}