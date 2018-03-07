import React from 'react'

export class List extends React.Component {
  createListPlayers(item) {
    return (
      <li key={item.player_id}>
        <h3>Player Name: {item.name}</h3>
        <p>Rank: {item.rank}</p>
        <h4>Roles</h4>
        <p>primary : {item.primary}</p>
        <p>secondary: {item.secondary}</p>
      </li>
    )
  }
  render() {
    return (
      <section>
        <h4>players</h4>
        <ul id="game-players">{this.props.players.map(this.createListPlayers)}</ul>
      </section>
    )
  }
}
