import React, { Component } from 'react';
import './App.css';
import BookList from './components/BookList'

class App extends Component {
  render() {
    return (
      <div className="App">
        <section className="App-content">
          <BookList />
        </section>
      </div>
    );
  }
}

export default App;
