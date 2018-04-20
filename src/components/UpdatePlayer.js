import React from 'react'

export default function UpdateForm({ onUpdate, updateObj }) {
  return (
    <form className="update-form" onSubmit={onUpdate}>
      <label htmlFor="name" />
      <input type="text" name="name" rows="2" cols="50" id="name" defaultValue={item.name} />
      <label htmlFor="primary" />
      <input
        type="text"
        name="primary"
        rows="2"
        cols="50"
        id="primary"
        defaultValue={item.primary}
      />
      <label htmlFor="secondary" />
      <input type="text" name="secondary" id="secondary" size="20" defaultValue={item.secondary} />
      <label htmlFor="rank" />
      <input type="text" name="rank" id="rank" size="35" defaultValue={item.rank} />
      <button type="submit" value="Submit">
        <h3>SUBMIT</h3>
      </button>
    </form>
  )
}
