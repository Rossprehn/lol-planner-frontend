import React from 'react'

//Not being used at this time!

export class Section extends React.Component {
  createListItem(item) {
    // console.log('LIST ITEMS ', item)

    return (
      <li key={item.event_id}>
        <h3>Event {item.title}</h3>
        <small>Date: {item.date}</small>
        <p>Time: {item.time}</p>
        <p>Description: {item.description}</p>
        <ul key={item.player_id}>
          <li className="">
            <h4>player name: {item.name}</h4>
            <p>Primary Role: {item.primary}</p>
            <p>Secondary Role: {item.secondary}</p>
            <p>Player Rank: {item.rank}</p>
          </li>
        </ul>
      </li>
    )
  }
  flattenEvents = allEventsArray => {
    let eventId = []
    let flatEventAryId = []
    for (let i = 0; i < allEventsArray.length; i++) {
      if (eventId.includes(allEventsArray[i].event_id) === false) {
        eventId.push(allEventsArray[i].event_id)
        flatEventAryId.push(allEventsArray[i])
      }
    }
    console.log('FLAT EID: ', eventId)
    console.log('flatEventsArray: ', flatEventAryId)
    return flatEventAryId
  }
  render() {
    return (
      <section>
        <h4>game</h4>
        {console.log('DATA:', this.props.events)}
        <ul id="game-events">
          {this.flattenEvents(this.props.events).map(item => {
            return this.createListItem(item)
          })}
        </ul>
      </section>
    )
  }
}
