import React, { Component } from 'react'
import Header from './components/header/Header.js'
import { Section } from './components/events/Events.js'
import { List } from './components/players/Players.js'

import './css/reset.css'
// import './App.css'

// var baseUrl = 'https://lol-planner.herokuapp.com/'
// var baseUrl = 'http://localhost3000'

class App extends Component {
  state = {
    events: [],
    players: []
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

  componentDidMount() {
    this.getEvents()
  }

  getEvents = () => {
    fetch('https://lol-planner.herokuapp.com/')
      .then(response => response.json())
      .then(data => {
        this.setState({
          events: data.event,
          players: data.players
        })
      })
  }

  render() {
    return (
      <div className="App">
        <Header />
        <div className="body">
          <Section events={this.state.events} getEvents={this.getEvents} />

          <List players={this.state.players} getEvents={this.getEvents} />
        </div>
      </div>
    )
  }
}

export default App
