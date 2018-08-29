import React from 'react'
import { DatePicker, TimePicker } from 'antd'
import moment from 'moment'
import 'moment/locale/zh-cn'

const { MonthPicker } = DatePicker

const dateFormat = 'YYYY-MM-DD'

const date = 'YYYY-MM-DD'
const monthFormat = 'YYYY/MM'
var now = moment()

function onChange(date, dateString) {
  console.log(date, dateString)
}

export default function Form({ onSubmit }) {
  return (
    <form className="addform" id="form" onSubmit={onSubmit}>
      <label htmlFor="title" />
      <input name="title" rows="2" cols="50" id="title" placeholder="Enter title here..." />
      <br />
      <label htmlFor="date">
        <DatePicker
          defaultValue={moment(now, dateFormat)}
          format={dateFormat}
          name="date"
          id="date"
        />
      </label>
      <br />
      <TimePicker name="time" use12Hours minuteStep={15} format="h:mm a" />
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
