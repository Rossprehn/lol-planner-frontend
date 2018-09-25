import React from 'react'
import { Button, Icon, Modal, TimePicker } from 'antd'
import moment from 'moment'

export default class ListItem extends React.Component {
  state = {
    visible: false
  }

  showModal = () => {
    this.setState({
      visible: true
    })
  }
  handleOk = e => {
    console.log(e)
    this.setState({
      visible: false
    })
  }

  handleCancel = e => {
    console.log(e)
    this.setState({
      visible: false
    })
  }

  render() {
    function onChange(time, timeString) {
      console.log(time, timeString)
    }

    const format = 'HH:mm'

    return (
      <li className="eventCard" key={this.props.item.id}>
        <div className="eventInfo">
          <h3>
            Event: <small className="eventName">{this.props.item.title}</small>
          </h3>
          <p className="dateDisplay">Date: {this.props.item.date}</p>
          <p className="timeDisplay">Time: {this.props.item.time}</p>
          <p className="descriptionDisplay">Description: {this.props.item.description}</p>
        </div>
        <div className="buttonBox">
          <Button
            type="danger"
            className="delete"
            onClick={() => this.props.deleteThisEvent(this.props.item.id)}
          >
            Delete <Icon type="delete" />
          </Button>
          <Button type="primary" onClick={this.showModal}>
            Update <Icon type="edit" />
          </Button>
          <Modal
            title="update this event"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            footer={null}
          >
            <form className="update-form" onSubmit={this.props.onSubmitUpdate}>
              <label htmlFor="title">
                Title:
                <input
                  type="text"
                  name="title"
                  rows="2"
                  cols="50"
                  id="title"
                  defaultValue={this.props.item.title}
                />
              </label>
              <br />
              <label htmlFor="date">
                Date:
                <input
                  type="text"
                  name="date"
                  rows="2"
                  cols="50"
                  id="date"
                  defaultValue={this.props.item.date}
                />
              </label>
              <br />
              <label htmlFor="time" />
              <TimePicker
                name="time"
                use12Hours
                minuteStep={15}
                defaultValue={moment(this.props.item.time, format)}
              />

              <br />
              <label htmlFor="description">
                Description:
                <input
                  type="text"
                  name="description"
                  id="description"
                  size="35"
                  defaultValue={this.props.item.description}
                />
              </label>
              <br />
              <input type="hidden" name="id" defaultValue={this.props.item.id} id="id" />
              <button type="submit" value="Submit">
                <h3>SUBMIT</h3>
              </button>
            </form>
          </Modal>
        </div>
      </li>
    )
  }
}
