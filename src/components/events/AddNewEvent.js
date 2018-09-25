import React from 'react'
import { message } from 'antd'

export default function Form({ onSubmit }) {

  const success = () => {
    message.success('This is a message of success');
  };


  return (
    <form className="addform" id="form" onSubmit={onSubmit}>
      <label htmlFor="title" />
      <input name="title" rows="2" cols="50" id="title" placeholder="Enter title here..." />
      <br />
      <label htmlFor="date" />
      <input name="date" rows="2" cols="50" id="date" placeholder="Enter date here..." />
      <br />
      <label htmlFor="time" />
      <input type="text" name="time" id="time" size="20" placeholder="Enter time of event..." />
      <br />
      <label htmlFor="description" />
      <input
        type="text"
        name="description"
        id="description"
        size="35"
        placeholder="What kind of event?"
      />
      <br />
      <button onClick={success} type="submit" value="Submit">
        <h3>SUBMIT</h3>
      </button>
    </form>
  )
}
