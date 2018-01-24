import React, { Component } from "react";
import "./AddNewItem.css";

export default class AddNewItem extends Component {
  state = {
    name: "",
    location: "",
    isNameSubmitted: false,
    isLocationSubmitted: false,
    error: false
  };

  saveData = (name, location) => {
    const URL = "http://localhost:3004/home";

    fetch(URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, location })
    })
      .then(res => res.json())
      .then(() => {
        this.setState({ name: "", location: "" });
      });
  };

  handleSubmit = e => {
    let name = this.state.name;
    let location = this.state.location;

    if (name.length > 3 && location.length > 3) {
      this.saveData(name, location);
    } else {
      alert('name and location must have at least 3 symbols')
    }
  };

  render() {
    return (
      <div>
        <form className="add_container" onSubmit={this.handleSubmit}>
          <input
            className="add_input"
            placeholder="name..."
            type="text"
            value={this.state.name}
            onChange={e => this.setState({ name: e.target.value })}
          />
          <input
            className="add_input"
            placeholder="location..."
            type="text"
            value={this.state.location}
            onChange={e => this.setState({ location: e.target.value })}
          />
          <button className="add_button">add</button>
        </form>
      </div>
    );
  }
}
