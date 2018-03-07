import React from 'react'

export class Section extends React.Component {
  createListItem(item) {
    return (
      <li key={item.event_id}>
        <h3>Event {item.title}</h3>
        <small>Date: {item.date}</small>
        <p>Time: {item.time}</p>
        <p>Description: {item.description}</p>
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
