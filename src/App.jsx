import Sidebar from './components/Sidebar.jsx';
import TopBar from './components/TopBar.jsx';
import GamesSection from './components/GamesSection.jsx';
import TesterToolbar from './components/TesterToolbar.jsx';
import { PromoProvider } from './context/PromoContext.jsx';
import { SECTIONS } from './data/games.js';
import './App.css';

function App() {
  return (
    <PromoProvider>
      <div className="app">
        <Sidebar />
        <div className="main">
          <TopBar />
          <div className="content">
            <TesterToolbar />
            {SECTIONS.map((section) => (
              <GamesSection key={section.id} section={section} />
            ))}
          </div>
        </div>
      </div>
    </PromoProvider>
  );
}

export default App;
