import React, { Component } from 'react'
import logo from './logo.svg'
import Header from './components/Header.js'
import { Section } from './components/EventList'

import './App.css'

var baseUrl = 'https://lol-planner.herokuapp.com/'

class App extends Component {
  state = {
    events: []
  }

  // componentDidMount() {
  //   fetch(baseUrl)
  //     .then(response => response.json())
  //     .then(data => {
  //       this.setState({
  //         events: data.event,
  //         players: data.players,
  //         event_players: data.event_players
  //       })
  //     })
  // }

  componentDidMount() {
    this.getEvents()
  }

  getEvents = () => {
    fetch(baseUrl + 'event_players')
      .then(res => res.json())
      .then(events => {
        this.setState({ events: events })
        // this.filterEvents(events)
      })
  }

  filterEvents = events => {
    return this.state.events.reduce((newArray, eventValue) => {
      if (eventValue.event_id !== eventValue.event_id) {
        newArray.push(
          eventValue.title,
          eventValue.description,
          eventValue.time,
          eventValue.date,
          eventValue.event_id
        )
      }
      console.log(newArray)
      return newArray
    }, [])
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
