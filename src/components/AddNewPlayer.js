import React from 'react'

export default function Form({ onPlayerSubmit }) {
  return (
    <form className="addform" id="form" onSubmit={onPlayerSubmit}>
      <label htmlFor="name" />
      <input name="name" type="text" side="20" id="name" placeholder="Enter name here..." />
      <label htmlFor="primary" />
      <input
        name="primary"
        type="text"
        cols="50"
        id="primary"
        placeholder="Enter primary role here..."
      />
      <label htmlFor="secondary" />
      <input
        type="text"
        name="secondary"
        id="secondary"
        size="20"
        placeholder="Enter secondary role here..."
      />
      <label htmlFor="rank" />
      <input type="text" name="rank" id="rank" size="35" placeholder="what is your current Rank" />
      <button type="submit" value="Submit">
        <h3>SUBMIT</h3>
      </button>
    </form>
  )
}
