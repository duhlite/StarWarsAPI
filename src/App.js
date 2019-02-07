import React, { Component } from 'react';
import './App.scss';
import FlashCard from './FlashCard.js';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      films: []
    };
  }

  componentDidMount() {
    fetch("https://swapi.co/api/films/")
      .then(results => {
        return results.json();
      })
      .then(data => {
        let films = data.results.map(film => {
          return (
              <FlashCard
                key = {film.title}
                title={film.title}
                splash={film.opening_crawl}
                characters={film.characters}
                planets={film.planets}
                starships={film.starships}
              />
          );
        });
        this.setState({ films: films });
        console.log(this.state.films);
      })
      .catch(error => {
        console.log(error);
      });
  }
  render() {
    return (
      <div className='page'>
      <h1 className='title'>STAR WARS</h1>
      <h2 className='subtitle'>An API Adventure</h2>
      <div className = 'container'>{this.state.films}</div>
      </div>
    );
  }
}

export default App;
