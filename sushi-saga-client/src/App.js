import React, { Component } from 'react';
import SushiContainer from './containers/SushiContainer';
import Table from './containers/Table';

// Endpoint!
const API = "http://localhost:3000/sushis"

class App extends Component {

  state = {
    sushis: [],
    startIndex: 0,
    budget: 100
  }

  componentDidMount() {
    fetch(API)
      .then(r => r.json())
      .then(sushisData => {
        const sushis = sushisData.map(sushiObj => ({
          ...sushiObj,
          eaten: false
        }));
        this.setState({ sushis });
      });
  }
  handleEatSushi = (id, price) => {
    if (this.state.budget >= price) {
      const newSushiData = this.state.sushis.map(sushiObj => {
        if (sushiObj.id === id) {
          return { ...sushiObj, eaten: true };
        } else {
          return sushiObj;
        }
      });
      this.setState(currentState => ({
        sushis: newSushiData,
        budget: currentState.budget - price
      }));
    } else {
      alert("Sorry");
    }
  };

  handleMoreSushi = event => {
    //debugger;
    this.setState(currentState => {
      return { startIndex: currentState.startIndex + 4 };
    });
  };

  sushiToDisplay(){
    return this.state.sushis.slice(
      this.state.startIndex,
      this.state.startIndex + 4
    );
  }
  

  render() {
    return (
      <div className="app">
        <SushiContainer 
          sushiToDisplay={this.sushiToDisplay()}
          handleMoreSushi={this.handleMoreSushi}
          handleEatSushi={this.handleEatSushi} />
        <Table budget={this.state.budget}/>
      </div>
    );
  }
}

export default App;