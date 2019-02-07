import React, { Component } from 'react';
import './FlashCard.scss';
import axios from 'axios';

const corsFetch = arg => {
  return axios(`${arg}`);
};

class FlashCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      crawl: "",
      charList: "",
      planetList: "",
      starshipList: "",
      visibleElement: 'crawl'
    };
  }

  componentDidMount() {
    if (this.props.splash) {
      this.setState({ crawl: this.props.splash });
    }
  }

  handleClick = (arrayOfUrls, stateKey) => {
    if (this.state[stateKey].length > 0) {
      return this.setState({ visibleElement: stateKey });
    }
    return Promise.all(arrayOfUrls.map(corsFetch))
      .then(responsesArray => {
        console.log(responsesArray.map(resp => resp.data.name));
        const newState = { visibleElement: stateKey };
        newState[stateKey] = responsesArray.map(resp => { 
          return (
            <li key={resp.data.name}>{resp.data.name}</li>
          )
            });
        return this.setState(newState);
      })
      .catch(err => {
        console.log(err);
        throw err;
      });
  };
  render() {
    return (
      <div className = 'card'>
        <h1 className='cardTitle'>{this.props.title}</h1>
        <nav>
          <button onClick={() => this.handleClick([], 'crawl')}>Crawl</button>
          <button onClick={() => this.handleClick(this.props.characters, 'charList')}>Characters</button>
          <button onClick={() => this.handleClick(this.props.planets, 'planetList')}>Planets</button>
          <button onClick={() => this.handleClick(this.props.starships, 'starshipList')}>Starships</button>
        </nav>
        <p>{this.state[this.state.visibleElement]}</p>
      </div>
    );
  }
}

export default FlashCard;