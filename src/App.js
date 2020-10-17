import React, { Component } from "react";
import CardList from "./components/card-list/card-list.component";
import SearchBox from "./components/search-box/search-box.component";
import "./styles.css";

// import logo from "./logo.svg";

export default class App extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      monsters: [],
      searchField: "",
    };
  }

  handelChange = (e) => {
    this.setState({ searchField: e.target.value });
  };
  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((users) => {
        //console.log("json Rseponce", users);
        return this.setState({ monsters: users });
      });
  }

  render() {
    const { monsters, searchField } = this.state;
    const filteredMonsters = monsters.filter((monster) =>
      monster.name.toLowerCase().includes(searchField.toLowerCase())
    );
    return (
      <div className="App">
        <h1 className="App-title">Liste des monstres</h1>
        <SearchBox
          placeholder="Search Monster"
          handelChange={this.handelChange}
        />

        <CardList monsters={filteredMonsters} />
      </div>
    );
  }
}
