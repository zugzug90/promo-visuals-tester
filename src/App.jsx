import { useState } from 'react';
import Sidebar from './components/Sidebar.jsx';
import GamesSection from './components/GamesSection.jsx';
import IconStrip from './components/IconStrip.jsx';
import TesterToolbar from './components/TesterToolbar.jsx';
import { PromoProvider } from './context/PromoContext.jsx';
import { SECTIONS } from './data/games.js';
import { AppConfig } from './config/AppConfig.js';
import './App.css';

function App() {
  const { watermarkColor, watermarkOpacity } = AppConfig;
  const [isGrayscaleMode, setIsGrayscaleMode] = useState(false);
  const toggleGrayscaleMode = () => setIsGrayscaleMode((prev) => !prev);

  return (
    <PromoProvider>
      <div className={`app${isGrayscaleMode ? ' grayscale' : ''}`}>
        <div
          className="watermark"
          style={{ color: watermarkColor, opacity: watermarkOpacity }}
        >
          @TheRoom606
        </div>
        <Sidebar />
        <div className="main">
          <div className="content">
            <TesterToolbar
              isGrayscaleMode={isGrayscaleMode}
              toggleGrayscaleMode={toggleGrayscaleMode}
            />
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
