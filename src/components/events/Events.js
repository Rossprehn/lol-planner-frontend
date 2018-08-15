import React from 'react'
import ListItem from './ListEvents'
import AddEvent from './AddNewEvent.js'
import { Modal, Button, Icon } from 'antd'

export class Section extends React.Component {
  constructor(props) {
    super(props)
    this.createListItem = this.createListItem.bind(this)
    this.deleteEvent = this.deleteEvent.bind(this)
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
      <ListItem
        key={item.id}
        item={item}
        deleteThisEvent={this.deleteThisEvent}
        onSubmitUpdate={this.props.onSubmitUpdate}
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
