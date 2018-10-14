import React from 'react'
import { message } from 'antd'

export default function Form({ onSubmit }) {
  return (
    <form className="addform" id="form" onSubmit={onSubmit}>
      <label htmlFor="title">
      Title:
      <input name="title" rows="2" cols="50" id="title" placeholder="Enter title here..." />
      </label>
      <br />
      <label htmlFor="date">
      Date:
      <input name="date" rows="2" cols="50" id="date" placeholder="Enter date here..." />
      </label>
      <br />
      <label htmlFor="time">
      Time:
      <input type="text" name="time" id="time" size="20" placeholder="Enter time of event..." />
      </label>
      <br />
      <label htmlFor="description">
      Description:
      <input
        type="text"
        name="description"
        id="description"
        size="35"
        placeholder="What kind of event?"
      />
      </label>
      <br />
      <button type="submit" value="Submit">
        <h3>SUBMIT</h3>
      </button>
    </form>
  )
}
