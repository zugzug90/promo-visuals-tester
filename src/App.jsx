import Sidebar from './components/Sidebar.jsx';
import GamesSection from './components/GamesSection.jsx';
import IconStrip from './components/IconStrip.jsx';
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
          <div className="content">
            <TesterToolbar />
            <IconStrip />
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
