import React from 'react'
import { Button, Icon, Select, Modal, Calendar } from 'antd'

export class Section extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false
    }

    // this.toggleFunction = this.toggleFunction.bind(this)

    this.createListItem = this.createListItem.bind(this)
    this.deleteEvent = this.deleteEvent.bind(this)
    this.updateEvent = this.updateEvent.bind(this)
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

  updateEvent = e => {
    this.props.updateEvent(this.state.item)
  }

  deleteEvent = e => {
    this.props.deleteEvent(this.state.item)
  }

  deleteThisEvent = id => {
    return fetch('https://lol-planner.herokuapp.com/event/' + id, {
      method: 'DELETE',
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
      .then(response => this.props.getEvents())
      .catch(error => console.error('Error', error))
  }

  onDelete = e => {
    e.preventDefault()
    const data = new FormData(e.target)
    this.deleteThisEvent(data.get('id'))
  }

  createListItem(item) {
    return (
      <li key={item.event_id}>
        <h3>Event {item.title}</h3>
        <small>Date: {item.date}</small>
        <p>Time: {item.time}</p>
        <p>Description: {item.description}</p>
        <div>
          <Button type="danger" className="delete" onClick={() => this.deleteThisEvent(item.id)}>
            Delete
          </Button>
          <Button id="delete" onClick={() => this.deleteThisEvent(item.id)} type="danger">
            Delete <Icon type="delete" />
          </Button>

          <Button type="primary" onClick={this.showModal}>
            Update
          </Button>
          <Modal
            title="Basic Modal"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
          >
            <form className="update-form" onSubmitUpdate={this.props.onSubmitUpdate}>
              <label htmlFor="title" />
              <input
                type="text"
                name="title"
                rows="2"
                cols="50"
                id="title"
                defaultValue={item.title}
              />
              <label htmlFor="date" />
              <input
                type="text"
                name="date"
                rows="2"
                cols="50"
                id="date"
                defaultValue={item.date}
              />
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
          </Modal>
        </div>
      </li>
    )
  }
  render() {
    return (
      <section>
        <h4>upcoming events</h4>
        <ul id="game-events">{this.props.events.map(this.createListItem)}</ul>
      </section>
    )
  }
}
