import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import AddNewItem from "../addNewItem/AddNewItem";

const URL = "http://localhost:3004/home";

export default class Home extends Component {
  state = {
    data: [],
    filtered: [],
    total: '',
    keyword: ""
  };

  componentDidMount = () => {
    fetch(URL, { method: "GET" })
      .then(response => response.json())
      .then(json => {
        this.setState({
          data: json,
          filtered: json
        });
      });
  };

  

  searchData = event => {
    const keyword = event.target.value;
    if (keyword !== "") {
      const list = this.state.data.filter(item => {
        return item.name.toLowerCase().indexOf(keyword.toLowerCase()) > -1;
      });
      this.setState({
        filtered: list,
        keyword
      });
    } else {
      this.setState({
        filtered: this.state.data,
        keyword
      });
    }
  };
  

  

  renderList = ({ filtered }) => {
    return filtered.map(item => {
      return (
        <Link to={`/${item.id}`} className="table-row" key={item.id}>
          <h4 className="table-item">{item.name}</h4>
          <h4 className="table-item">{item.location}</h4>
          <h4 className="table-item">{item.currency}</h4>
        </Link>
      );
    });
  };

  render() {
  
    return (
      <div className="home_component">
        <h1 style={{ fontSize: "2rem", marginTop: '3rem' }}>
          Добавляем новый обьект и сразу его находим. Для детальной информации -
          кликаем по обьект
        </h1>
        <div className="home_add">
          <AddNewItem />
        </div>
        <div className="home_input">
          <input
            value={this.state.keyword}
            placeholder="search by name here..."
            type="text"
            onChange={e => this.searchData(e)}
          />
        </div>
        <div className="home">
          <div className="home_header">
            <h1>name</h1>
            <h1>location</h1>
            <h1>currency</h1>
          </div>
          <div className="home_content">{this.renderList(this.state)}</div>
        </div>
      </div>
    );
  }
}
