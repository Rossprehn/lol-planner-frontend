import React from 'react'
import Add from './AddNewPlayer.js'
import { Button, Icon, Modal } from 'antd'
import ListPlayers from './ListPlayers'
import Success from './../events/Message'

export class List extends React.Component {
  constructor(props) {
    super(props)
    // this.handleitem = this.handleitem.bind(this)
    this.createListPlayers = this.createListPlayers.bind(this)
    this.deletePlayer = this.deletePlayer.bind(this)
    // this.updatePlayer = this.updatePlayer.bind(this)
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

  deletePlayer = e => {
    this.props.deletePlayer(this.state.item)
    e.target.reset()
    this.setState({ item: false })
  }

  deleteThisPlayer = id => {
    return fetch('https://lol-planner.herokuapp.com/players/' + id, {
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
    const player = {
      id: data.get('id'),
      name: data.get('name'),
      primary: data.get('primary'),
      secondary: data.get('secondary'),
      rank: data.get('rank')
    }
    console.log(player)
    this.updateEvent(player)
  }

  updateEvent = player => {
    let url = 'https://lol-planner.herokuapp.com/players/' + player.id
    fetch(url, {
      method: 'PUT',
      body: JSON.stringify(player),
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

  createListPlayers(item) {
    return (
      <ListPlayers
        key={item.id}
        item={item}
        deleteThisPlayer={this.deleteThisPlayer}
        onSubmitUpdate={this.onSubmitUpdate}
      />
    )
  }
  render() {
    return (
      <section>
        <div className="playersHeader">
          <h4>Current players</h4>
          <div>
            <Button type="primary" onClick={this.showModal}>
              Add Player <Icon type="plus" />
            </Button>
            <Modal
              title="Add Player"
              visible={this.state.visible}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
              footer={null}
            >
              <Add onSubmit={this.onSubmit} />
            </Modal>
          </div>
        </div>
        <ul id="game-players">{this.props.players.map(this.createListPlayers)}</ul>
      </section>
    )
  }
}
