import React from 'react'

export class Section extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      toggleClass: true,
      togglePanels: []
    }
    // this.toggleFunction = this.toggleFunction.bind(this)
    this.createListItem = this.createListItem.bind(this)
    this.deleteEvent = this.deleteEvent.bind(this)
    this.updateEvent = this.updateEvent.bind(this)
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

  // toggleFunction = item => {
  //   const { togglePanels } = this.state
  //   const index = togglePanels.indexOf(item.id)
  //   if (index !== -1) {
  //     togglePanels.splice(index, 1)
  //   } else {
  //     togglePanels.push(item.id)
  //   }
  //   this.setState({ togglePanels })
  // }

  createListItem(item) {
    return (
      <li key={item.event_id}>
        <h3>Event {item.title}</h3>
        <small>Date: {item.date}</small>
        <p>Time: {item.time}</p>
        <p>Description: {item.description}</p>
        <div>
          <button className="delete" onClick={() => this.deleteThisEvent(item.id)}>
            Delete
          </button>
          <button className="update" onClick={() => this.props.updateEventObj(item)}>
            Update
          </button>
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
