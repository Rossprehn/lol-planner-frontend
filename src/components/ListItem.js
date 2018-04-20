import React from 'react'
import { Button, Icon, Select, Modal, Calendar } from 'antd'

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
    return (
      <li key={this.props.item.id}>
        <h3>Event {this.props.item.title}</h3>
        <small>Date: {this.props.item.date}</small>
        <p>Time: {this.props.item.time}</p>
        <p>Description: {this.props.item.description}</p>
        <div>
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
          >
            <form className="update-form" onSubmit={this.props.onSubmitUpdate}>
              <label htmlFor="title" />
              <input
                type="text"
                name="title"
                rows="2"
                cols="50"
                id="title"
                defaultValue={this.props.item.title}
              />
              <label htmlFor="date" />
              <input
                type="text"
                name="date"
                rows="2"
                cols="50"
                id="date"
                defaultValue={this.props.item.date}
              />
              <label htmlFor="time" />
              <input
                type="text"
                name="time"
                id="time"
                size="20"
                defaultValue={this.props.item.time}
              />
              <label htmlFor="description" />
              <input
                type="text"
                name="description"
                id="description"
                size="35"
                defaultValue={this.props.item.description}
              />
              <input type="text" name="id" defaultValue={this.props.item.id} id="id" />
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
