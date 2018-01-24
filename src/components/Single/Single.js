import React, { Component } from "react";
import "./Single.css";

const URL = "http://localhost:3004/home";

export default class Single extends Component {
  state = {
    data: [],
    name: ""
  };

  componentDidMount() {
    fetch(`${URL}?id=${this.props.match.params.id}`, { method: "GET" })
      .then(response => response.json())
      .then(json => {
        this.setState({ data: json });
      });
  }

  changeLocation = name => {
    fetch(`${URL}?id=${this.props.match.params.id}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name })
    })
      .then(res => res.json())
      .then(() => {
        this.setState({ name: "" });
      });
  };

  renderData({ data }) {
    return data.map(item => {
      console.log(item);
      return (
        <div className="single" key={item.name}>
          <h1 className="single_item">{item.name}</h1>
          <h1 className="single_item">{item.location}</h1>
          <h1 className="single_item">{item.currency}</h1>
        </div>
      );
    });
  }

  handleSumbit = e => {
    let name = this.state.name;
    if (name.length > 3) {
      this.changeLocation(name);
    }else {
      alert('name and location must have at least 3 symbols')
    }
  };

  render() {
    return (
      <div className="single_component">
        <div className="single_content">{this.renderData(this.state)}</div>
      </div>
    );
  }
}
