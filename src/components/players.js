import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import Add from './AddNewPlayer.js'

export class List extends React.Component {
  constructor(props) {
    super(props)
    // this.handleitem = this.handleitem.bind(this)
    this.createListPlayers = this.createListPlayers.bind(this)
    this.deletePlayer = this.deletePlayer.bind(this)
    // this.updatePlayer = this.updatePlayer.bind(this)
  }

  deletePlayer = e => {
    this.props.deletePlayer(this.state.item)
    e.target.reset()
    this.setState({ item: false })
  }

  deleteThisPlayer = id => {
    return fetch('https://lol-planner.herokuapp.com/playes' + id, {
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
  }

  onSubmit = e => {
    e.preventDefault()
    const form = e.target
    const data = new FormData(form)
    const players = this.state.players
    const player = {
      name: data.get('name'),
      primary: data.get('primary'),
      secondary: data.get('secondary'),
      rank: data.get('rank')
    }
    this.addPlayer(player)
    this.setState({ players })
    e.target.reset()
  }

  addPlayer = player => {
    fetch('https://lol-planner.herokuapp.com/players', {
      method: 'POST',
      body: JSON.stringify(player),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
      .then(res => res.json())
      .then(data => {
        this.getEvents()
      })
      .catch(error => console.error('Error:', error))
  }

  createListPlayers(item) {
    return (
      <li key={item.player_id}>
        <h3>Player Name: {item.name}</h3>
        <p>Rank: {item.rank}</p>
        <h4>Roles</h4>
        <p>primary : {item.primary}</p>
        <p>secondary: {item.secondary}</p>
        <button className="delete" onClick={() => this.deleteThisPlayer(item.id)}>
          <h3>DELETE</h3>
        </button>
      </li>
    )
  }
  render() {
    return (
      <section>
        <h4>players</h4>
        <ul id="game-players">{this.props.players.map(this.createListPlayers)}</ul>
        <Add onSubmit={this.onSubmit} />
      </section>
    )
  }
}
