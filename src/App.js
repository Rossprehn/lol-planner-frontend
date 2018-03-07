import React, { Component } from 'react'
import logo from './logo.svg'
import Header from './components/Header.js'
import { Section } from './components/EventListings.js'
import { List } from './components/Players.js'

import './App.css'

var baseUrl = 'https://lol-planner.herokuapp.com/'

class App extends Component {
  state = {
    events: [],
    players: []
  }

  componentDidMount() {
    fetch(baseUrl)
      .then(response => response.json())
      .then(data => {
        this.setState({
          events: data.event,
          players: data.players
        })
      })
  }

  addevent = event => {
    var url = baseUrl + 'events'
    fetch(url, {
      method: 'POST', // or 'PUT'
      body: JSON.stringify(event),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
      .then(res => res.json())
      .then(res => {
        window.location.href = './success'
        return res
      })
      .then(data => {
        this.setState({ events: data })
      })
      .catch(error => console.error('Error:', error))
  }

  // used for the join table (will return someday)
  // componentDidMount() {
  //   this.getEvents()
  // }
  //
  // getEvents = () => {
  //   fetch(baseUrl + 'event_players')
  //     .then(res => res.json())
  //     .then(events => {
  //       this.setState({ events: events })
  //       // this.filterEvents(events)
  //     })
  // }

  render() {
    return (
      <div className="App">
        <Header />
        <Section events={this.state.events} />
        <List players={this.state.players} />
      </div>
    )
  }
}

export default App
