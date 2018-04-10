import React from 'react'

export default function UpdateForm({ onUpdate, updateObj }) {
  return (
    <form className="update-form" onSubmit={onUpdate}>
      <label htmlFor="title" />
      <input type="text" name="title" rows="2" cols="50" id="title" defaultValue={item.title} />
      <label htmlFor="date" />
      <input type="text" name="date" rows="2" cols="50" id="date" defaultValue={item.date} />
      <label htmlFor="time" />
      <input type="text" name="time" id="time" size="20" defaultValue={item.time} />
      <label htmlFor="description" />
      <input
        type="text"
        name="description"
        id="description"
        size="35"
        defaultValue={item.description}
      />
      <button type="submit" value="Submit">
        <h3>SUBMIT</h3>
      </button>
    </form>
  )
}
