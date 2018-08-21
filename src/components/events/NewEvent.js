import React from 'react'
import { DatePicker, TimePicker } from 'antd'
import moment from 'moment'

const { MonthPicker, RangePicker } = DatePicker

const dateFormat = 'YYYY/MM/DD'
const monthFormat = 'YYYY/MM'

function onChange(time, timeString) {
  console.log(time, timeString)
}

export default function Form({ onSubmit }) {
  return (
    <form className="addform" id="form" onSubmit={onSubmit}>
      <label htmlFor="title" />
      <input name="title" rows="2" cols="50" id="title" placeholder="Enter title here..." />
      <br />
      <label htmlFor="date" />
      <DatePicker defaultValue={moment('2015/01/01', dateFormat)} format={dateFormat} />
      <br />
      <TimePicker use12Hours format="h:mm a" onChange={onChange} />
      <br />
      <input
        type="text"
        name="description"
        id="description"
        size="35"
        placeholder="What kind of event?"
      />
      <br />

      <button type="submit" value="Submit">
        <h3>SUBMIT</h3>
      </button>
    </form>
  )
}
