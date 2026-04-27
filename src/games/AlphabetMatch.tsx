import React, { useState, useEffect } from 'react';

interface AlphabetItem {
  letter: string;
  word: string;
  emoji: string;
}

const alphabetData: AlphabetItem[] = [
  { letter: 'A', word: 'Cá', emoji: '🐟' },
  { letter: 'Ă', word: 'Mắt', emoji: '👁️' },
  { letter: 'Â', word: 'Gấu', emoji: '🐻' },
  { letter: 'B', word: 'Bóng', emoji: '⚽' },
  { letter: 'C', word: 'Cú', emoji: '🦉' },
  { letter: 'D', word: 'Dê', emoji: '🐐' },
  { letter: 'Đ', word: 'Đàn', emoji: '🎸' },
  { letter: 'E', word: 'Xe', emoji: '🚗' },
  { letter: 'Ê', word: 'Ếch', emoji: '🐸' },
  { letter: 'G', word: 'Gà', emoji: '🐔' },
];

interface Props {
  onBack: () => void;
}

const AlphabetMatch: React.FC<Props> = ({ onBack }) => {
  const [currentItem, setCurrentItem] = useState<AlphabetItem | null>(null);
  const [options, setOptions] = useState<AlphabetItem[]>([]);
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState('Chọn hình đúng nhé!');

  const generateLevel = () => {
    const randomItem = alphabetData[Math.floor(Math.random() * alphabetData.length)];
    setCurrentItem(randomItem);

    // Get 3 random options (including the correct one)
    let choices = [randomItem];
    while (choices.length < 3) {
      const randomOption = alphabetData[Math.floor(Math.random() * alphabetData.length)];
      if (!choices.find(c => c.letter === randomOption.letter)) {
        choices.push(randomOption);
      }
    }
    setOptions(choices.sort(() => Math.random() - 0.5));
    setMessage('Chọn hình đúng nhé!');
  };

  useEffect(() => {
    generateLevel();
  }, []);

  const handleChoice = (choice: AlphabetItem) => {
    if (choice.letter === currentItem?.letter) {
      setScore(score + 10);
      setMessage('Giỏi quá! 🎉');
      setTimeout(generateLevel, 1500);
    } else {
      setMessage('Thử lại nhé! 🧐');
    }
  };

  if (!currentItem) return <div>Đang tải...</div>;

  return (
    <div className="alphabet-game">
      <div className="game-header">
        <button className="btn-back" onClick={onBack}>⬅ Thoát</button>
        <div className="score">Điểm: {score}</div>
      </div>

      <div className="target-letter">
        <h1>{currentItem.letter}</h1>
      </div>

      <div className="options-grid">
        {options.map((option, index) => (
          <div 
            key={index} 
            className="option-card"
            onClick={() => handleChoice(option)}
          >
            <span className="option-emoji">{option.emoji}</span>
            <span className="option-word">{option.word}</span>
          </div>
        ))}
      </div>

      <div className="feedback-message">
        <h2>{message}</h2>
      </div>

      <style>{`
        .alphabet-game {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }
        .game-header {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .score {
          font-size: 1.5rem;
          font-weight: bold;
          color: var(--accent-color);
        }
        .target-letter h1 {
          font-size: 8rem;
          margin: 0;
          color: var(--primary-color);
          background: #f0f0f0;
          width: 200px;
          height: 200px;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 20px;
          box-shadow: inset 0 0 10px rgba(0,0,0,0.1);
        }
        .options-grid {
          display: flex;
          gap: 1rem;
          margin-top: 1rem;
        }
        .option-card {
          background: white;
          border: 3px solid #eee;
          border-radius: 20px;
          padding: 1.5rem;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          align-items: center;
          transition: all 0.2s;
          width: 120px;
        }
        .option-card:hover {
          border-color: var(--secondary-color);
          transform: translateY(-5px);
        }
        .option-emoji {
          font-size: 3rem;
        }
        .option-word {
          font-size: 1.2rem;
          font-weight: bold;
          margin-top: 0.5rem;
        }
        .feedback-message {
          height: 3rem;
          margin-top: 1rem;
          color: var(--accent-color);
        }
      `}</style>
    </div>
  );
};

export default AlphabetMatch;
