import React from 'react';

export default function FilterForm(props) {
    return (
        <form className="my-6">
        <div className="is-grouped">
          <p className="control">
            <button
              className="button is-warning"
              type="submit"
              onClick={props.handleAllSubmit}
            >
              I Want All Categories!
            </button>
          </p>
          <h2 className="my-4 control">OR...</h2>
          <div className="field is-grouped">
            <div className="control is-expanded">
              <div className="select is-fullwidth">
                <select onChange={props.handleChange}>
                  {props.allCategories.map((category) => (
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
                onClick={props.handleCategorySubmit}
              >
                Search
              </button>
            </p>
          </div>
        </div>
      </form>
    )
}