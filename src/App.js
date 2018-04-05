import React, { Component } from 'react'
import logo from './logo.svg'
import Header from './components/Header.js'
import { Section } from './components/EventListings.js'
import { List } from './components/Players.js'
import Add from './components/AddNewEvent.js'

import './App.css'

var baseUrl = 'https://lol-planner.herokuapp.com/'

class App extends Component {
  state = {
    events: [],
    players: []
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

  onSubmit = e => {
    e.preventDefault()
    const form = e.target
    const data = new FormData(form)
    const events = this.state.events
    const event = {
      title: data.get('title'),
      date: data.get('date'),
      time: data.get('time'),
      description: data.get('description')
    }
    this.addEvent(event)
    this.setState({ events })
    e.target.reset()
  }

  addEvent = event => {
    fetch('https://lol-planner.herokuapp.com/event', {
      method: 'POST',
      body: JSON.stringify(event),
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

  render() {
    return (
      <div className="App">
        <Header />
        <Add onSubmit={this.onSubmit} />

        <Section events={this.state.events} getEvents={this.getEvents} />
        <List players={this.state.players} />
        <h3>ADD A QUESTION</h3>
      </div>
    )
  }
}

export default App
