import React from 'react'

export class Section extends React.Component {
  createListItem(item) {
    return (
      <li key={item.id}>
        <h3>{item.title}</h3>
        <small>{item.data}</small>
        <p>{item.time}</p>
        <p>{item.description}</p>
        <ul key={item.player_id}>
          <li>
            <h4>{item.name}</h4>
            <p>{item.primary}</p>
            <p>{item.secondary}</p>
            <p>{item.rank}</p>
          </li>
        </ul>
      </li>
    )
  }
  render() {
    return (
      <section>
        <h4>games</h4>
        <ul id="game-events">{this.props.events.map(this.createListItem)}</ul>
      </section>
    )
  }
}
