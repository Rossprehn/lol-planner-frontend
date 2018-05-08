import React from 'react'
import { Button, Icon, Select, Modal, Calendar } from 'antd'
import ListItem from './ListItem'

export class Section extends React.Component {
  constructor(props) {
    super(props)
    this.createListItem = this.createListItem.bind(this)
    this.deleteEvent = this.deleteEvent.bind(this)
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
        <h4>upcoming events</h4>
        <ul id="game-events">{this.props.events.map(this.createListItem)}</ul>
      </section>
    )
  }
}
