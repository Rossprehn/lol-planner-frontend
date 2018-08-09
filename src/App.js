import React, { Component } from 'react'
import Header from './components/header/Header.js'
import { Section } from './components/EventListings.js'
import { List } from './components/players/Players.js'
import AddEvent from './components/AddNewEvent.js'
import { Modal, Button, Icon } from 'antd'

import './css/reset.css'
// import './App.css'

// var baseUrl = 'https://lol-planner.herokuapp.com/'
// var baseUrl = 'http://localhost3000'

class App extends Component {
  state = {
    events: [],
    players: [],
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

  onSubmitUpdate = e => {
    e.preventDefault()
    const form = e.target
    const data = new FormData(form)
    // const events = this.state.events
    const event = {
      id: data.get('id'),
      title: data.get('title'),
      date: data.get('date'),
      time: data.get('time'),
      description: data.get('description')
    }
    console.log(event)
    this.updateEvent(event)
  }

  updateEvent = event => {
    let url = 'https://lol-planner.herokuapp.com/event/' + event.id
    fetch(url, {
      method: 'PUT',
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
        <div className="body">
          <Section
            events={this.state.events}
            getEvents={this.getEvents}
            onSubmitUpdate={this.onSubmitUpdate}
          />
          <div>
            <Button type="primary" onClick={this.showModal}>
              Add Event <Icon type="plus" />
            </Button>
            <Modal
              title="Add Event"
              visible={this.state.visible}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
              footer={null}
            >
              <AddEvent onSubmit={this.onSubmit} />
            </Modal>
          </div>
          <List players={this.state.players} getEvents={this.getEvents} />
        </div>
      </div>
    )
  }
}

export default App
