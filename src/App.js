import React, { Component } from "react";
import CardList from "./components/card-list/card-list.component";
import SearchBox from "./components/search-box/search-box.component";
import "./styles.css";
import { FcNext } from "react-icons/fc";
import { FcPrevious } from "react-icons/fc";

// import logo from "./logo.svg";

export default class App extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      monsters: [],
      activeSet:{set:"set1", categoryName:"Robots"},
      sets:[
        {set:"set1", categoryName:"Robots"},
        {set:"set2", categoryName:"Monstres"},
        {set:"set3", categoryName:"Tête de robot"},
        {set:"set4", categoryName:"Chates"},
    ],
      searchField: "",
    };

  }

  handelChange = (e) => {
    this.setState({ searchField: e.target.value });
  };

  handlePrevious = (e) => {
       this.setState((prevState, prevProps) => {
         let index = prevState.sets.findIndex(
           (el)=>{
           return (JSON.stringify(el) === JSON.stringify(prevState.activeSet))
         })
         index = (index === 0)? 3 : (index-1);
         console.log('NPrevious ', prevState.sets[index].categoryName);
         return {activeSet: prevState.sets[index]}
       });
      
  }

  handleNext = (e) => {
     this.setState((prevState, prevProps) => {
         let index = prevState.sets.findIndex(
           (el)=>{
           return (JSON.stringify(el) === JSON.stringify(prevState.activeSet))
         })
         index = (index === 3)? 0  : (index+ 1);
         console.log('Next ', prevState.sets[index].categoryName);
         return {activeSet: prevState.sets[index]}
       });
  }

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((users) => {
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
        <button className="btn" style={{display:'inline'}} onClick = {this.handlePrevious}> <FcPrevious/> </button>
        <h1 className="App-title">Liste des {this.state.activeSet.categoryName}</h1>
        <button className="btn" onClick = {this.handleNext}>  <FcNext/>  </button>
        <SearchBox
          placeholder ="Chercher " 
          handelChange= {this.handelChange}
        />

        <CardList monsters={filteredMonsters} set={this.state.activeSet} />
      </div>
    );
  }
}
