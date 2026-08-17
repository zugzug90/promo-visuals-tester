import React from 'react';
import Sidebar from './components/Sidebar.jsx';
import TopBar from './components/TopBar.jsx';
import GamesSection from './components/GamesSection.jsx';
import { SECTIONS } from './data/games.js';
import './App.css';

function App() {
  return (
    <div className="app">
      <Sidebar />
      <div className="main">
        <TopBar />
        <div className="content">
          {SECTIONS.map((section) => (
            <GamesSection key={section.id} section={section} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
