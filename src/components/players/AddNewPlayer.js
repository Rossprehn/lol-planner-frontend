import React from 'react'
import { message } from 'antd'

export default function Form({ onSubmit }) {

  const success = () => {
    message.success('This is a message of success');
  };

  return (
    <form className="addform" id="form" onSubmit={onSubmit}>
      <label htmlFor="name" />
      <input name="name" type="text" side="20" id="name" placeholder="Enter name here..." />
      <br />
      <label htmlFor="primary" />
      <input
        name="primary"
        type="text"
        cols="50"
        id="primary"
        placeholder="Enter primary role here..."
      />
      <br />
      <label htmlFor="secondary" />
      <input
        type="text"
        name="secondary"
        id="secondary"
        size="20"
        placeholder="Enter secondary role here..."
      />
      <br />
      <label htmlFor="rank" />
      <input type="text" name="rank" id="rank" size="35" placeholder="what is your current Rank" />
      <br />
      <button onClick={success} type="submit" value="Submit">
        <h3>SUBMIT</h3>
      </button>
    </form>
  )
}
