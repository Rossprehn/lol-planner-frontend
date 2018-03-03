import React, { Component } from 'react'
import logo from './logo.svg'
import Header from './components/Header.js'
import { Section } from './components/EventList'

import './App.css'

var baseUrl = 'https://lol-planner.herokuapp.com/'

class App extends Component {
  state = { events: [] }

  componentDidMount() {
    this.getEvents()
  }

  getEvents = () => {
    fetch(baseUrl + 'event_players')
      .then(res => res.json())
      .then(events => {
        this.setState({ events: events })
      })
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Section events={this.state.events} />
      </div>
    )
  }
}

export default App
