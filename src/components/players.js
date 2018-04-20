import React from 'react'
import Add from './AddNewPlayer.js'
import { Button, Icon, Select, Modal } from 'antd'
import ListPlayers from './ListPlayers'

export class List extends React.Component {
  constructor(props) {
    super(props)
    // this.handleitem = this.handleitem.bind(this)
    this.createListPlayers = this.createListPlayers.bind(this)
    this.deletePlayer = this.deletePlayer.bind(this)
    // this.updatePlayer = this.updatePlayer.bind(this)
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
    console.log(player)
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
  }

  createListPlayers(item) {
    return (
      <ListPlayers
        key={item.id}
        item={item}
        deleteThisPlayer={this.deleteThisPlayer}
        onSubmitUpdate={this.props.onSubmitUpdate}
      />
    )
  }
  render() {
    return (
      <section>
        <h4>players</h4>
        <ul id="game-players">{this.props.players.map(this.createListPlayers)}</ul>
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
      </section>
    )
  }
}
