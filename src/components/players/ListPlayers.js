import React from 'react'
import { Button, Icon, Modal } from 'antd'

export default class ListPlayers extends React.Component {
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

  onClick = (e) => {
    this.setState({
      visible: false
    })
    }

  render() {
    return (
      <li className="playerCard" key={this.props.item.id}>
        <div>
          <h3>Player Name: {this.props.item.name}</h3>
          <p>Rank: {this.props.item.rank}</p>
          <h4>Roles</h4>
          <p>primary : {this.props.item.primary}</p>
          <p>secondary: {this.props.item.secondary}</p>
        </div>
        <div className="buttonBox">
          <Button
            type="danger"
            className="delete"
            onClick={() => this.props.deleteThisPlayer(this.props.item.id)}
          >
            Delete <Icon type="delete" />
          </Button>
          <Button type="primary" onClick={this.showModal}>
            Update <Icon type="edit" />
          </Button>
        </div>
        <Modal
          title="update this event"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={null}
        >
          <form className="update-form" onSubmit={this.props.onSubmitUpdate}>
            <label htmlFor="name">
              name:
              <input
                type="text"
                name="name"
                rows="2"
                cols="50"
                id="name"
                defaultValue={this.props.item.name}
              />
            </label>
            <br />
            <label htmlFor="primary">
              Primary role:
              <input
                type="text"
                name="primary"
                rows="2"
                cols="50"
                id="primary"
                defaultValue={this.props.item.primary}
              />
            </label>
            <br />
            <label htmlFor="secondary">
              Secondary Role:
              <input
                type="text"
                name="secondary"
                id="secondary"
                size="20"
                defaultValue={this.props.item.secondary}
              />
            </label>
            <br />
            <label htmlFor="rank">
              Rank:
              <input
                type="text"
                name="rank"
                id="rank"
                size="35"
                defaultValue={this.props.item.rank}
              />
            </label>
            <br />
            <input type="hidden" name="id" defaultValue={this.props.item.id} id="id" />
            <button onClick={this.onClick} type="submit" value="Submit">
              <h3>SUBMIT</h3>
            </button>
          </form>
        </Modal>
      </li>
    )
  }
}
