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
  const { watermarkColor, watermarkOpacity, defaultIconBlurPercent } = AppConfig;
  const [isGrayscaleMode, setIsGrayscaleMode] = useState(false);
  const [isBlurMode, setIsBlurMode] = useState(false);
  const toggleGrayscaleMode = () => setIsGrayscaleMode((prev) => !prev);
  const toggleBlurMode = () => setIsBlurMode((prev) => !prev);
  const iconBlurPixels = `${defaultIconBlurPercent / 5}px`;

  return (
    <PromoProvider>
      <div
        className={`app${isGrayscaleMode ? ' grayscale' : ''}${isBlurMode ? ' blur' : ''}`}
        style={{ '--icon-blur': iconBlurPixels }}
      >
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
              isBlurMode={isBlurMode}
              toggleBlurMode={toggleBlurMode}
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
