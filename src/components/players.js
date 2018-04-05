import React from 'react'
import { Modal, Button } from 'react-bootstrap'

export class List extends React.Component {
  constructor(props) {
    super(props)
    // this.handleitem = this.handleitem.bind(this)
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
    }).catch(error => console.error('Error', error))
  }
  onDelete = e => {
    e.preventDefault()
  }

  // renderDeleteButton = item => {
  //   if (item.id > 3) {
  //     return (
  //       <div onClick={this.handleClose}>
  //         <button className="delete" onClick={() => this.deleteThisPlayer(item.id)}>
  //           <h3>DELETE</h3>
  //         </button>
  //       </div>
  //     )
  //   }
  // }

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
      </section>
    )
  }
}
