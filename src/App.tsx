import { useState } from 'react';
import './App.css';
import AlphabetMatch from './games/AlphabetMatch';

type GameState = 'MENU' | 'MAP' | 'ALPHABET_MATCH' | 'TONE_QUEST';

function App() {
  const [gameState, setGameState] = useState<GameState>('MENU');

  const renderContent = () => {
    switch (gameState) {
      case 'MENU':
        return (
          <div className="menu-container">
            <h1 className="title">vnLearner</h1>
            <p className="subtitle">Học Tiếng Việt vui vẻ!</p>
            <div className="button-group">
              <button 
                className="btn btn-primary" 
                onClick={() => setGameState('MAP')}
              >
                🚀 Bắt đầu Hành trình
              </button>
              <button className="btn btn-secondary">
                ⚙️ Cài đặt
              </button>
            </div>
          </div>
        );
      case 'MAP':
        return (
          <div className="map-container">
            <button className="btn-back" onClick={() => setGameState('MENU')}>
              ⬅ Quay lại
            </button>
            <h2>Bản đồ Hành trình</h2>
            <div className="adventure-map">
              <div 
                className="map-node node-active" 
                onClick={() => setGameState('ALPHABET_MATCH')}
              >
                🔠 Bảng chữ cái
              </div>
              <div className="map-node node-locked">
                🔊 Thanh dấu
              </div>
              <div className="map-node node-locked">
                🐯 Động vật
              </div>
            </div>
          </div>
        );
      case 'ALPHABET_MATCH':
        return (
          <div className="game-container">
            <AlphabetMatch onBack={() => setGameState('MAP')} />
          </div>
        );
      default:
        return <div>Lỗi: Trạng thái không hợp lệ</div>;
    }
  };

  return (
    <div className="App">
      {renderContent()}
    </div>
  );
}

export default App;
