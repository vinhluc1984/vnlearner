import React, { useState, useEffect } from 'react';

interface MathProblem {
  question: string;
  answer: number;
}

interface Animal {
  name: string;
  emoji: string;
  continent: string;
  color: string;
  fact: string;
}

const animalData: Animal[] = [
  { name: 'Sư tử', emoji: '🦁', continent: 'Châu Phi', color: '#4CAF50', fact: 'Sư tử là chúa tể rừng xanh và sống theo bầy đàn.' },
  { name: 'Kangaroo', emoji: '🦘', continent: 'Châu Úc', color: '#795548', fact: 'Kangaroo có chiếc túi trước bụng để chở con.' },
  { name: 'Chim cánh cụt', emoji: '🐧', continent: 'Châu Nam Cực', color: '#9E9E9E', fact: 'Chim cánh cụt không biết bay nhưng bơi rất giỏi.' },
  { name: 'Hổ', emoji: '🐯', continent: 'Châu Á', color: '#FFEB3B', fact: 'Hổ là loài mèo lớn nhất thế giới với bộ lông vằn.' },
  { name: 'Gấu Bắc Cực', emoji: '🐻‍❄️', continent: 'Bắc Mỹ', color: '#FF9800', fact: 'Gấu Bắc Cực có lớp mỡ dày để giữ ấm trong băng tuyết.' },
  { name: 'Vẹt Macaw', emoji: '🦜', continent: 'Nam Mỹ', color: '#E91E63', fact: 'Vẹt Macaw có bộ lông rực rỡ và rất thông minh.' },
  { name: 'Sói', emoji: '🐺', continent: 'Châu Âu', color: '#F44336', fact: 'Sói thường hú vào ban đêm để giao tiếp với nhau.' },
];

interface Props {
  onBack: () => void;
}

const MathQuest: React.FC<Props> = ({ onBack }) => {
  const [problem, setProblem] = useState<MathProblem | null>(null);
  const [options, setOptions] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState('Giải toán nào!');
  const [correctCount, setCorrectCount] = useState(0);
  const [rewardAnimal, setRewardAnimal] = useState<Animal | null>(null);

  const generateProblem = () => {
    const isAddition = Math.random() > 0.5;
    let num1, num2, answer, question;

    if (isAddition) {
      num1 = Math.floor(Math.random() * 10) + 1;
      num2 = Math.floor(Math.random() * 10) + 1;
      answer = num1 + num2;
      question = `${num1} + ${num2} = ?`;
    } else {
      num1 = Math.floor(Math.random() * 10) + 5;
      num2 = Math.floor(Math.random() * num1) + 1;
      answer = num1 - num2;
      question = `${num1} - ${num2} = ?`;
    }

    setProblem({ question, answer });

    // Generate 3 options
    const choices = [answer];
    while (choices.length < 3) {
      const offset = Math.floor(Math.random() * 5) + 1;
      const randomOption = Math.random() > 0.5 ? answer + offset : answer - offset;
      if (randomOption >= 0 && !choices.includes(randomOption)) {
        choices.push(randomOption);
      }
    }
    setOptions(choices.sort(() => Math.random() - 0.5));
    setMessage('Giải toán nào!');
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    generateProblem();
  }, []);

  const handleChoice = (choice: number) => {
    if (choice === problem?.answer) {
      const newScore = score + 10;
      const newCount = correctCount + 1;
      setScore(newScore);
      setCorrectCount(newCount);
      setMessage('Chính xác! 🌟');

      if (newCount === 4) {
        setTimeout(() => {
          const randomAnimal = animalData[Math.floor(Math.random() * animalData.length)];
          setRewardAnimal(randomAnimal);
          setCorrectCount(0);
        }, 1000);
      } else {
        setTimeout(generateProblem, 1500);
      }
    } else {
      setMessage('Thử lại nhé! 🧐');
    }
  };

  const closeReward = () => {
    setRewardAnimal(null);
    generateProblem();
  };

  if (!problem) return <div>Đang tải...</div>;

  return (
    <div className="math-game">
      <div className="game-header">
        <button className="btn-back" onClick={onBack}>⬅ Thoát</button>
        <div className="progress-container">
          <div className="progress-dots">
            {[...Array(4)].map((_, i) => (
              <div key={i} className={`dot ${i < correctCount ? 'dot-active' : ''}`}></div>
            ))}
          </div>
          <div className="score">Điểm: {score}</div>
        </div>
      </div>

      <div className="target-question">
        <h1>{problem.question}</h1>
      </div>

      <div className="options-grid">
        {options.map((option, index) => (
          <div 
            key={index} 
            className="option-card"
            onClick={() => handleChoice(option)}
          >
            <span className="option-number">{option}</span>
          </div>
        ))}
      </div>

      <div className="feedback-message">
        <h2>{message}</h2>
      </div>

      {rewardAnimal && (
        <div className="reward-overlay" onClick={closeReward}>
          <div className="animal-card" style={{ borderColor: rewardAnimal.color }} onClick={e => e.stopPropagation()}>
            <div className="card-header" style={{ backgroundColor: rewardAnimal.color }}>
              <h3>{rewardAnimal.name}</h3>
            </div>
            <div className="card-content">
              <div className="animal-emoji-large">{rewardAnimal.emoji}</div>
              <p className="continent-label">{rewardAnimal.continent}</p>
              <p className="animal-fact">{rewardAnimal.fact}</p>
            </div>
            <button className="btn btn-primary btn-collect" onClick={closeReward}>
              Tiếp tục 🚀
            </button>
          </div>
        </div>
      )}

      <style>{`
        .math-game {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          position: relative;
        }
        .game-header {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .progress-container {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }
        .progress-dots {
          display: flex;
          gap: 0.5rem;
        }
        .dot {
          width: 15px;
          height: 15px;
          border-radius: 50%;
          background: #ddd;
          border: 2px solid #ccc;
        }
        .dot-active {
          background: var(--secondary-color);
          border-color: var(--primary-color);
          transform: scale(1.2);
        }
        .score {
          font-size: 1.5rem;
          font-weight: bold;
          color: var(--accent-color);
        }
        .target-question h1 {
          font-size: 5rem;
          margin: 0;
          color: var(--primary-color);
          background: #f0f0f0;
          padding: 1rem 2rem;
          border-radius: 20px;
          box-shadow: inset 0 0 10px rgba(0,0,0,0.1);
        }
        .options-grid {
          display: flex;
          gap: 1.5rem;
          margin-top: 1rem;
        }
        .option-card {
          background: white;
          border: 3px solid #eee;
          border-radius: 20px;
          padding: 2rem;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          align-items: center;
          transition: all 0.2s;
          min-width: 80px;
        }
        .option-card:hover {
          border-color: var(--secondary-color);
          transform: translateY(-5px);
        }
        .option-number {
          font-size: 3rem;
          font-weight: bold;
          color: var(--text-color);
        }
        .feedback-message {
          height: 3rem;
          margin-top: 1rem;
          color: var(--accent-color);
        }

        /* Reward Modal */
        .reward-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0,0,0,0.7);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
          animation: fadeIn 0.3s ease;
        }
        .animal-card {
          background: white;
          width: 300px;
          border: 8px solid;
          border-radius: 15px;
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(0,0,0,0.3);
          animation: popIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .card-header {
          padding: 0.5rem;
          text-align: center;
          color: white;
        }
        .card-header h3 {
          margin: 0;
          font-size: 1.8rem;
          text-shadow: 1px 1px 2px rgba(0,0,0,0.2);
        }
        .card-content {
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }
        .animal-emoji-large {
          font-size: 6rem;
          margin-bottom: 1rem;
        }
        .continent-label {
          font-weight: bold;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: #666;
          margin-bottom: 0.5rem;
        }
        .animal-fact {
          font-size: 1.1rem;
          line-height: 1.4;
          color: #444;
          margin-bottom: 1.5rem;
        }
        .btn-collect {
          width: 80%;
          margin-bottom: 1.5rem;
          align-self: center;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes popIn {
          from { transform: scale(0.5); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default MathQuest;
