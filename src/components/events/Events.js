import React from 'react'
import ListItem from './ListEvents'
import AddEvent from './AddNewEvent.js'
import { Modal, Button, Icon } from 'antd'
import Success from './Message'
import Warning from './Delete'


export class Section extends React.Component {
  constructor(props) {
    super(props)
    this.createListItem = this.createListItem.bind(this)
    this.deleteEvent = this.deleteEvent.bind(this)
    this.handleOk = this.handleOk.bind(this)
  }
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

  deleteEvent = e => {
    this.deleteEvent(this.state.item)
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
      Warning()
  }

  onDelete = e => {
    e.preventDefault()
    const data = new FormData(e.target)
    this.deleteThisEvent(data.get('id'))
  }

  onSubmit = e => {
    e.preventDefault()
    const form = e.target
    const data = new FormData(form)
    const events = this.state.events
    const event = {
      title: data.get('title'),
      date: data.get('date'),
      time: data.get('time'),
      description: data.get('description')
    }
    this.addEvent(event)
    console.log(e)
    this.setState({ events })
    e.target.reset()
  }

  addEvent = event => {
    fetch('https://lol-planner.herokuapp.com/event', {
      method: 'POST',
      body: JSON.stringify(event),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
      .then(res => res.json())
      .then(data => {
        this.props.getEvents()
      })
      .catch(error => console.error('Error:', error))
      Success()
      this.handleOk()
  }

  onSubmitUpdate = e => {
    e.preventDefault()
    const form = e.target
    const data = new FormData(form)
    const event = {
      id: data.get('id'),
      title: data.get('title'),
      date: data.get('date'),
      time: data.get('time'),
      description: data.get('description')
    }
    console.log(event)
    this.updateEvent(event)
  }

  updateEvent = event => {
    let url = 'https://lol-planner.herokuapp.com/event/' + event.id
    fetch(url, {
      method: 'PUT',
      body: JSON.stringify(event),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
      .then(res => res.json())
      .then(data => {
        this.props.getEvents()
      })
      .catch(error => console.error('Error:', error))
      Success()
      this.handleOk()
  }

  createListItem(item) {
    return (
      <ListItem
        key={item.id}
        item={item}
        deleteThisEvent={this.deleteThisEvent}
        onSubmitUpdate={this.onSubmitUpdate}
      />
    )
  }
  render() {
    return (
      <section>
        <div className="playersHeader">
          <h4>Upcoming events</h4>
          <div>
            <Button type="primary" onClick={this.showModal}>
              Add Event <Icon type="plus" />
            </Button>
            <Modal
              title="Add Event"
              visible={this.state.visible}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
              footer={null}
            >
              <AddEvent onSubmit={this.onSubmit} />
            </Modal>
          </div>
        </div>
        <ul id="game-events">{this.props.events.map(this.createListItem)}</ul>
      </section>
    )
  }
}
