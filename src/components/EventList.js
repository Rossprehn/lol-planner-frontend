import React from 'react'

export class Section extends React.Component {
  createListItem(item) {
    // console.log(item)

    return (
      <li key={item.event_id}>
        <h3>Event {item.title}</h3>
        <small>Date: {item.date}</small>
        <p>Time: {item.time}</p>
        <p>Description: {item.description}</p>
        <ul key={item.event_id}>
          <li>
            <h4>player name: {item.name}</h4>
            <p>Primary Role: {item.primary}</p>
            <p>Secondary Role: {item.secondary}</p>
            <p>Player Rank: {item.rank}</p>
          </li>
        </ul>
      </li>
    )
  }

  render() {
    return (
      <section>
        <h4>game</h4>
        <ul id="game-events">{this.props.events.map(this.createListItem)}</ul>
      </section>
    )
  }
}
