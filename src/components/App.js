import React from 'react'
import '../css/app.css';
import Header from './Header'
import NewsFeed from './NewsFeed';
import Stats from './Stats'

function App() {
  return (
    <div className="app">
      <div className="app__header">
        <Header />
      </div>

      <div className="app__body">
        <div className="app__container">
          <NewsFeed />
          <Stats />
        </div>
      </div>
    </div>
  );
}

export default App;
