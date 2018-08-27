import React from 'react'
import { DatePicker, TimePicker } from 'antd'
import moment from 'moment'

const { MonthPicker } = DatePicker

const date = 'YYYY-MM-DD'
const monthFormat = 'YYYY/MM'
var now = moment()

// function onChange(time, timeString) {
//   console.log(time, timeString)
// }

// function onChange(value, dateString) {
//   console.log('Selected Time: ', value)
//   console.log('Formatted Selected Time: ', dateString)
// }

function onChange(date, dateString) {
  console.log(date, dateString)
}

function onOk(value) {
  console.log('onOk: ', value)
}

export default function Form({ onSubmit }) {
  return (
    <form className="addform" id="form" onSubmit={onSubmit}>
      <label htmlFor="title" />
      <input name="title" rows="2" cols="50" id="title" placeholder="Enter title here..." />
      <br />
      <DatePicker
        name="date"
        defaultValue={moment(now, date)}
        format={date}
        onChange={onChange}
        showTime
        format="YYYY-MM-DD"
      />
      <label htmlFor={date} />
      <br />
      <TimePicker name="time" use12Hours format="h:mm a" />
      <label htmlFor="time" />
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
      <button type="submit" value="Submit">
        <h3>SUBMIT</h3>
      </button>
    </form>
  )
}
