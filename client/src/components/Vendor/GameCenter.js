import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

function GameCenter() {
  const { apiCall } = useAuth();
  const [playerStats, setPlayerStats] = useState({
    level: 12,
    xp: 2450,
    nextLevelXp: 3000,
    totalOrders: 156,
    streakDays: 7,
    coins: 1250,
    gems: 45,
    rank: 'Gold Vendor',
    title: '🍜 Street Food Master',
    powerUps: ['2x XP Boost', 'Discount Finder', 'Speed Order'],
    achievements: [
      { id: 1, name: 'First Order', description: 'Complete your first order', unlocked: true, reward: 50 },
      { id: 2, name: 'Speed Demon', description: 'Complete 10 orders in one day', unlocked: true, reward: 100 },
      { id: 3, name: 'Game Master', description: 'Play all games', unlocked: false, reward: 200 },
      { id: 4, name: 'Coin Collector', description: 'Earn 1000 coins', unlocked: true, reward: 150 },
      { id: 5, name: 'Streak Master', description: 'Maintain 30-day streak', unlocked: false, reward: 500 }
    ]
  });
  const [loading, setLoading] = useState(false);
  const [activeGame, setActiveGame] = useState(null);
  const [activeTab, setActiveTab] = useState('games');
  const [leaderboard, setLeaderboard] = useState([
    { rank: 1, name: 'Rajesh Kumar', score: 15420, avatar: '👨‍🍳' },
    { rank: 2, name: 'Priya Sharma', score: 14850, avatar: '👩‍🍳' },
    { rank: 3, name: 'You', score: 12450, avatar: '🧑‍🍳' },
    { rank: 4, name: 'Amit Singh', score: 11200, avatar: '👨‍🍳' },
    { rank: 5, name: 'Sunita Devi', score: 10800, avatar: '👩‍🍳' }
  ]);

  const checkDailyLimit = (gameType) => {
    const today = new Date().toDateString();
    const lastPlayDate = localStorage.getItem(`${gameType}LastPlay`);
    return lastPlayDate === today;
  };

  const setDailyLimit = (gameType) => {
    const today = new Date().toDateString();
    localStorage.setItem(`${gameType}LastPlay`, today);
  };

  const resetDailyLimits = () => {
    const gameTypes = ['tapToWin', 'scratchCard', 'memoryGame', 'mathChallenge'];
    gameTypes.forEach(gameType => {
      localStorage.removeItem(`${gameType}LastPlay`);
    });
    window.location.reload();
  };

  // Purchase power-up function
  const purchasePowerUp = (item) => {
    if (playerStats.coins >= item.price) {
      // Deduct coins and add power-up
      setPlayerStats(prev => ({
        ...prev,
        coins: prev.coins - item.price,
        powerUps: [...prev.powerUps, item.name]
      }));
      
      // Show success message
      alert(`🎉 Successfully purchased ${item.name}! You now have ${playerStats.coins - item.price} coins remaining.`);
      
      // Apply power-up effect
      console.log(`Power-up activated: ${item.name}`);
    } else {
      alert(`❌ Not enough coins! You need ${item.price} coins but only have ${playerStats.coins}.`);
    }
  };

  const TapToWinGame = () => {
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(5);
    const [gameActive, setGameActive] = useState(false);
    const [gameState, setGameState] = useState('start');
    const [finalScore, setFinalScore] = useState(0);
    const [hasPlayedToday, setHasPlayedToday] = useState(false);
    const scoreRef = React.useRef(0);

    useEffect(() => {
      const hasPlayed = checkDailyLimit('tapToWin');
      setHasPlayedToday(hasPlayed);
      if (hasPlayed) {
        const lastScore = localStorage.getItem('tapToWinLastScore');
        if (lastScore) {
          setFinalScore(parseInt(lastScore));
          setGameState('finished');
        }
      }
    }, []);

    const startGame = () => {
      if (hasPlayedToday) {
        alert('You can only play once per day! Try again tomorrow.');
        return;
      }
      setScore(0);
      scoreRef.current = 0;
      setTimeLeft(5);
      setGameActive(true);
      setGameState('playing');

      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            endGame();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    };

    const handleTap = () => {
      if (gameActive) {
        setScore(prev => {
          const newScore = prev + 1;
          scoreRef.current = newScore;
          return newScore;
        });
      }
    };

    const endGame = () => {
      setGameActive(false);
      setGameState('finished');
      setDailyLimit('tapToWin');
      setHasPlayedToday(true);
      
      const currentScore = scoreRef.current;
      setFinalScore(currentScore);
      localStorage.setItem('tapToWinLastScore', currentScore.toString());
      
      const coins = calculateReward(currentScore);
      if (coins > 0) {
        setPlayerStats(prev => ({
          ...prev,
          coins: prev.coins + coins
        }));
      }
    };

    const calculateReward = (score) => {
      if (score >= 30) return 10;
      if (score >= 20) return 5;
      if (score >= 10) return 1;
      return 0;
    };

    return (
      <div style={{ textAlign: 'center' }}>
        <h4>🎮 Tap to Win</h4>
        <p>Tap as fast as you can in 5 seconds!</p>
        
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>
            Score: {gameState === 'finished' ? finalScore : score}
          </div>
          <div style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>
            Time: {timeLeft}s
          </div>
        </div>

        {gameState === 'start' && (
          <div>
            {hasPlayedToday ? (
              <div style={{
                background: '#ff6b6b',
                color: 'white',
                padding: '1rem',
                borderRadius: '10px',
                marginBottom: '1rem'
              }}>
                ⏰ Daily limit reached! Come back tomorrow.
              </div>
            ) : (
              <button className="btn btn-primary" onClick={startGame}>
                Start Game
              </button>
            )}
          </div>
        )}

        {gameState === 'playing' && (
          <button 
            className="btn btn-success"
            onClick={handleTap}
            style={{
              width: '200px',
              height: '200px',
              borderRadius: '50%',
              fontSize: '1.5rem',
              fontWeight: 'bold',
              background: 'linear-gradient(135deg, #28a745, #20c997)',
              border: 'none'
            }}
          >
            TAP ME!
          </button>
        )}

        {gameState === 'finished' && (
          <div>
            <div style={{ 
              background: '#f8f9fa',
              padding: '2rem',
              borderRadius: '10px',
              marginBottom: '1rem'
            }}>
              <h3>🎯 Game Over!</h3>
              <div style={{ fontSize: '2rem', margin: '1rem 0' }}>
                Final Score: {finalScore}
              </div>
              <div style={{ fontSize: '1.2rem', color: '#28a745' }}>
                {finalScore >= 30 && `🎊 Mega Win! +${calculateReward(finalScore)} Coins!`}
                {finalScore >= 20 && finalScore < 30 && `🏆 Great! +${calculateReward(finalScore)} Coins!`}
                {finalScore >= 10 && finalScore < 20 && `🎁 Good! +${calculateReward(finalScore)} Coin!`}
                {finalScore < 10 && '😊 Better luck next time!'}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const MemoryGame = () => {
    const [cards, setCards] = useState([]);
    const [flippedCards, setFlippedCards] = useState([]);
    const [matchedCards, setMatchedCards] = useState([]);
    const [moves, setMoves] = useState(0);
    const [gameState, setGameState] = useState('start');
    const [hasPlayedToday, setHasPlayedToday] = useState(false);

    const foodEmojis = ['🍕', '🍔', '🌮', '🍜', '🍱', '🥘', '🍛', '🥗'];

    useEffect(() => {
      const hasPlayed = checkDailyLimit('memoryGame');
      setHasPlayedToday(hasPlayed);
    }, []);

    const initializeGame = () => {
      if (hasPlayedToday) {
        alert('You can only play once per day! Try again tomorrow.');
        return;
      }
      
      const shuffledCards = [...foodEmojis, ...foodEmojis]
        .sort(() => Math.random() - 0.5)
        .map((emoji, index) => ({ id: index, emoji, flipped: false }));
      
      setCards(shuffledCards);
      setFlippedCards([]);
      setMatchedCards([]);
      setMoves(0);
      setGameState('playing');
    };

    const flipCard = (cardId) => {
      if (flippedCards.length === 2 || flippedCards.includes(cardId) || matchedCards.includes(cardId)) {
        return;
      }

      const newFlippedCards = [...flippedCards, cardId];
      setFlippedCards(newFlippedCards);

      if (newFlippedCards.length === 2) {
        setMoves(moves + 1);
        const [firstCard, secondCard] = newFlippedCards;
        const firstCardEmoji = cards.find(card => card.id === firstCard)?.emoji;
        const secondCardEmoji = cards.find(card => card.id === secondCard)?.emoji;

        if (firstCardEmoji === secondCardEmoji) {
          setMatchedCards([...matchedCards, firstCard, secondCard]);
          setFlippedCards([]);
          
          if (matchedCards.length + 2 === cards.length) {
            endGame();
          }
        } else {
          setTimeout(() => {
            setFlippedCards([]);
          }, 1000);
        }
      }
    };

    const endGame = () => {
      setGameState('finished');
      setDailyLimit('memoryGame');
      setHasPlayedToday(true);
      
      const coins = calculateMemoryReward(moves);
      if (coins > 0) {
        setPlayerStats(prev => ({
          ...prev,
          coins: prev.coins + coins
        }));
      }
    };

    const calculateMemoryReward = (moves) => {
      if (moves <= 12) return 15;
      if (moves <= 16) return 10;
      if (moves <= 20) return 5;
      return 2;
    };

    return (
      <div style={{ textAlign: 'center' }}>
        <h4>🧠 Memory Game</h4>
        <p>Match all the food pairs!</p>
        
        {gameState === 'start' && (
          <div>
            {hasPlayedToday ? (
              <div style={{
                background: '#ff6b6b',
                color: 'white',
                padding: '1rem',
                borderRadius: '10px',
                marginBottom: '1rem'
              }}>
                ⏰ Daily limit reached! Come back tomorrow.
              </div>
            ) : (
              <button className="btn btn-primary" onClick={initializeGame}>
                Start Memory Game
              </button>
            )}
          </div>
        )}

        {gameState === 'playing' && (
          <div>
            <div style={{ marginBottom: '1rem', fontSize: '1.2rem' }}>
              Moves: {moves}
            </div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '10px',
              maxWidth: '400px',
              margin: '0 auto'
            }}>
              {cards.map(card => (
                <div
                  key={card.id}
                  onClick={() => flipCard(card.id)}
                  style={{
                    width: '80px',
                    height: '80px',
                    background: flippedCards.includes(card.id) || matchedCards.includes(card.id) 
                      ? '#28a745' : '#6c757d',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '2rem',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                >
                  {(flippedCards.includes(card.id) || matchedCards.includes(card.id)) ? card.emoji : '?'}
                </div>
              ))}
            </div>
          </div>
        )}

        {gameState === 'finished' && (
          <div style={{ 
            background: '#f8f9fa',
            padding: '2rem',
            borderRadius: '10px',
            marginBottom: '1rem'
          }}>
            <h3>🎉 Congratulations!</h3>
            <div style={{ fontSize: '1.5rem', margin: '1rem 0' }}>
              Completed in {moves} moves!
            </div>
            <div style={{ fontSize: '1.2rem', color: '#28a745' }}>
              +{calculateMemoryReward(moves)} Coins earned!
            </div>
          </div>
        )}
      </div>
    );
  };

  const ScratchCardGame = () => {
    const [isScratched, setIsScratched] = useState(false);
    const [reward, setReward] = useState(0);
    const [hasPlayedToday, setHasPlayedToday] = useState(false);

    useEffect(() => {
      const hasPlayed = checkDailyLimit('scratchCard');
      setHasPlayedToday(hasPlayed);
    }, []);

    const scratchCard = () => {
      if (hasPlayedToday) {
        alert('You can only play once per day! Try again tomorrow.');
        return;
      }

      const rewards = [1, 2, 5, 10, 15, 20];
      const randomReward = rewards[Math.floor(Math.random() * rewards.length)];
      
      setReward(randomReward);
      setIsScratched(true);
      setDailyLimit('scratchCard');
      setHasPlayedToday(true);

      setPlayerStats(prev => ({
        ...prev,
        coins: prev.coins + randomReward
      }));
    };

    return (
      <div style={{ textAlign: 'center' }}>
        <h4>🎫 Scratch Card</h4>
        <p>Scratch to reveal your reward!</p>
        
        {hasPlayedToday && !isScratched ? (
          <div style={{
            background: '#ff6b6b',
            color: 'white',
            padding: '1rem',
            borderRadius: '10px',
            marginBottom: '1rem'
          }}>
            ⏰ Daily limit reached! Come back tomorrow.
          </div>
        ) : (
          <div
            onClick={scratchCard}
            style={{
              width: '200px',
              height: '200px',
              margin: '2rem auto',
              background: isScratched 
                ? 'linear-gradient(135deg, #ffd700, #ffed4e)' 
                : 'linear-gradient(135deg, #c0c0c0, #808080)',
              borderRadius: '15px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: hasPlayedToday ? 'not-allowed' : 'pointer',
              fontSize: '2rem',
              fontWeight: 'bold',
              color: isScratched ? '#333' : 'white',
              boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
              transition: 'all 0.3s ease'
            }}
          >
            {isScratched ? `🪙 ${reward} Coins!` : 'SCRATCH ME!'}
          </div>
        )}

        {isScratched && (
          <div style={{ 
            background: '#f8f9fa',
            padding: '2rem',
            borderRadius: '10px',
            marginTop: '1rem'
          }}>
            <h3>🎊 Lucky You!</h3>
            <div style={{ fontSize: '1.2rem', color: '#28a745' }}>
              You won {reward} coins!
            </div>
          </div>
        )}
      </div>
    );
  };

  const MathChallengeGame = () => {
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [userAnswer, setUserAnswer] = useState('');
    const [score, setScore] = useState(0);
    const [questionCount, setQuestionCount] = useState(0);
    const [gameState, setGameState] = useState('start');
    const [hasPlayedToday, setHasPlayedToday] = useState(false);
    const [feedback, setFeedback] = useState('');

    useEffect(() => {
      const hasPlayed = checkDailyLimit('mathChallenge');
      setHasPlayedToday(hasPlayed);
    }, []);

    const generateQuestion = () => {
      const operations = ['+', '-', '×'];
      const operation = operations[Math.floor(Math.random() * operations.length)];
      let num1, num2, correctAnswer;

      switch (operation) {
        case '+':
          num1 = Math.floor(Math.random() * 50) + 1;
          num2 = Math.floor(Math.random() * 50) + 1;
          correctAnswer = num1 + num2;
          break;
        case '-':
          num1 = Math.floor(Math.random() * 50) + 25;
          num2 = Math.floor(Math.random() * 25) + 1;
          correctAnswer = num1 - num2;
          break;
        case '×':
          num1 = Math.floor(Math.random() * 12) + 1;
          num2 = Math.floor(Math.random() * 12) + 1;
          correctAnswer = num1 * num2;
          break;
        default:
          num1 = 1;
          num2 = 1;
          correctAnswer = 2;
      }

      setQuestion(`${num1} ${operation} ${num2} = ?`);
      setAnswer(correctAnswer.toString());
      setFeedback(''); // Clear previous feedback
    };

    const startGame = () => {
      if (hasPlayedToday) {
        alert('You can only play once per day! Try again tomorrow.');
        return;
      }
      
      setScore(0);
      setQuestionCount(0);
      setGameState('playing');
      generateQuestion();
    };

    const submitAnswer = () => {
      // Convert both to numbers for proper comparison
      const userNum = parseInt(userAnswer.trim());
      const correctNum = parseInt(answer);
      
      console.log(`Question: ${question}`);
      console.log(`User entered: "${userAnswer}" → ${userNum}`);
      console.log(`Correct answer: "${answer}" → ${correctNum}`);
      
      // Check if the answer is correct
      if (!isNaN(userNum) && userNum === correctNum) {
        setScore(prev => prev + 1);
        setFeedback('✅ Correct!');
        console.log('✅ Correct answer! Score increased.');
      } else {
        setFeedback(`❌ Wrong! Correct answer was ${correctNum}`);
        console.log('❌ Wrong answer.');
      }
      
      setQuestionCount(prev => prev + 1);
      setUserAnswer('');

      // Show feedback briefly before moving to next question
      setTimeout(() => {
        if (questionCount + 1 >= 10) {
          endGame();
        } else {
          generateQuestion();
        }
      }, 1500);
    };

    const endGame = () => {
      setGameState('finished');
      setDailyLimit('mathChallenge');
      setHasPlayedToday(true);
      
      const coins = Math.floor(score * 2);
      if (coins > 0) {
        setPlayerStats(prev => ({
          ...prev,
          coins: prev.coins + coins
        }));
      }
    };

    return (
      <div style={{ textAlign: 'center' }}>
        <h4>🧮 Math Challenge</h4>
        <p>Solve 10 math problems correctly!</p>
        
        {gameState === 'start' && (
          <div>
            {hasPlayedToday ? (
              <div style={{
                background: '#ff6b6b',
                color: 'white',
                padding: '1rem',
                borderRadius: '10px',
                marginBottom: '1rem'
              }}>
                ⏰ Daily limit reached! Come back tomorrow.
              </div>
            ) : (
              <button className="btn btn-primary" onClick={startGame}>
                Start Math Challenge
              </button>
            )}
          </div>
        )}

        {gameState === 'playing' && (
          <div>
            <div style={{ marginBottom: '2rem' }}>
              <div style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>
                Question {questionCount + 1}/10 | Score: {score}/10
              </div>
              <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>
                {question}
              </div>
              
              {/* Feedback display */}
              {feedback && (
                <div style={{ 
                  fontSize: '1.2rem', 
                  marginBottom: '1rem',
                  color: feedback.includes('✅') ? '#28a745' : '#dc3545',
                  fontWeight: 'bold'
                }}>
                  {feedback}
                </div>
              )}
              
              <input
                type="number"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                style={{
                  padding: '0.5rem',
                  fontSize: '1.2rem',
                  borderRadius: '5px',
                  border: '2px solid #ddd',
                  marginRight: '1rem',
                  width: '100px'
                }}
                onKeyPress={(e) => e.key === 'Enter' && submitAnswer()}
                disabled={feedback !== ''}
              />
              <button 
                className="btn btn-success" 
                onClick={submitAnswer}
                disabled={feedback !== '' || userAnswer.trim() === ''}
              >
                Submit
              </button>
            </div>
          </div>
        )}

        {gameState === 'finished' && (
          <div style={{ 
            background: '#f8f9fa',
            padding: '2rem',
            borderRadius: '10px',
            marginBottom: '1rem'
          }}>
            <h3>🎯 Challenge Complete!</h3>
            <div style={{ fontSize: '1.5rem', margin: '1rem 0' }}>
              Final Score: {score}/10
            </div>
            <div style={{ fontSize: '1.2rem', color: '#28a745' }}>
              +{Math.floor(score * 2)} Coins earned!
            </div>
            <div style={{ fontSize: '1rem', color: '#666', marginTop: '1rem' }}>
              {score >= 8 && '🏆 Excellent work!'}
              {score >= 6 && score < 8 && '👍 Good job!'}
              {score >= 4 && score < 6 && '📚 Keep practicing!'}
              {score < 4 && '💪 Try again tomorrow!'}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="container" style={{ padding: '2rem 0' }}>
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h1 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0 }}>
            🎮 Vendor Game Center
          </h1>
          <button 
            className="btn btn-secondary btn-small"
            onClick={resetDailyLimits}
            style={{ background: '#6c757d' }}
          >
            🔄 Reset Daily Limits
          </button>
        </div>
        <p style={{ color: '#666' }}>
          Level up your vendor journey with games and rewards!
        </p>
      </div>

      {/* Player Stats Card */}
      <div className="card" style={{ marginBottom: '2rem', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
        <div style={{ padding: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <div>
              <h3 style={{ color: 'white', marginBottom: '0.5rem' }}>{playerStats.title}</h3>
              <div style={{ fontSize: '1.1rem', opacity: '0.9' }}>Level {playerStats.level} • {playerStats.rank}</div>
            </div>
            <div style={{ fontSize: '3rem' }}>🏆</div>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>🪙 {playerStats.coins}</div>
              <div style={{ fontSize: '0.875rem', opacity: '0.9' }}>Coins</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>💎 {playerStats.gems}</div>
              <div style={{ fontSize: '0.875rem', opacity: '0.9' }}>Gems</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>⚡ {playerStats.xp}</div>
              <div style={{ fontSize: '0.875rem', opacity: '0.9' }}>XP</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>🔥 {playerStats.streakDays}</div>
              <div style={{ fontSize: '0.875rem', opacity: '0.9' }}>Day Streak</div>
            </div>
          </div>

          {/* XP Progress Bar */}
          <div style={{ marginBottom: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.875rem', opacity: '0.9' }}>
              <span>Progress to Level {playerStats.level + 1}</span>
              <span>{playerStats.xp}/{playerStats.nextLevelXp} XP</span>
            </div>
            <div style={{ 
              background: 'rgba(255,255,255,0.2)', 
              borderRadius: '10px', 
              height: '8px',
              overflow: 'hidden'
            }}>
              <div style={{ 
                background: 'rgba(255,255,255,0.8)', 
                height: '100%', 
                width: `${(playerStats.xp / playerStats.nextLevelXp) * 100}%`,
                borderRadius: '10px',
                transition: 'width 0.3s ease'
              }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ 
          display: 'flex', 
          gap: '1rem', 
          borderBottom: '2px solid #e9ecef',
          marginBottom: '2rem'
        }}>
          {[
            { id: 'games', label: '🎮 Games', icon: '🎮' },
            { id: 'achievements', label: '🏆 Achievements', icon: '🏆' },
            { id: 'leaderboard', label: '📊 Leaderboard', icon: '📊' },
            { id: 'shop', label: '🛒 Shop', icon: '🛒' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '1rem 1.5rem',
                border: 'none',
                background: activeTab === tab.id ? '#667eea' : 'transparent',
                color: activeTab === tab.id ? 'white' : '#666',
                borderRadius: '10px 10px 0 0',
                fontSize: '1rem',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                borderBottom: activeTab === tab.id ? '3px solid #667eea' : '3px solid transparent'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Games Tab */}
      {activeTab === 'games' && (
        <div className="card" style={{ marginBottom: '2rem' }}>
          <div className="card-header">
            <h3>🎮 Interactive Games</h3>
            <p style={{ color: '#666', margin: 0 }}>Play games to earn coins and XP!</p>
          </div>
          
          {!activeGame ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', padding: '2rem' }}>
              {/* Tap to Win Game */}
              <div 
                className="card" 
                style={{ 
                  height: '100%', 
                  cursor: checkDailyLimit('tapToWin') ? 'not-allowed' : 'pointer',
                  opacity: checkDailyLimit('tapToWin') ? 0.6 : 1,
                  transition: 'all 0.3s ease'
                }} 
                onClick={() => !checkDailyLimit('tapToWin') && setActiveGame('tapToWin')}
              >
                <div style={{ textAlign: 'center', padding: '2rem' }}>
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎮</div>
                  <h4>Tap to Win</h4>
                  <p style={{ color: '#666' }}>Tap as fast as you can in 5 seconds!</p>
                  <div style={{ 
                    background: checkDailyLimit('tapToWin') ? '#6c757d' : '#28a745',
                    color: 'white',
                    padding: '0.5rem 1rem',
                    borderRadius: '20px',
                    display: 'inline-block',
                    marginBottom: '1rem'
                  }}>
                    {checkDailyLimit('tapToWin') ? 'Played Today' : 'Up to 10 coins'}
                  </div>
                  <div style={{ fontSize: '0.875rem', color: '#666' }}>
                    Difficulty: Easy • Time: 5 seconds
                  </div>
                </div>
              </div>

              {/* Memory Game */}
              <div 
                className="card" 
                style={{ 
                  height: '100%', 
                  cursor: checkDailyLimit('memoryGame') ? 'not-allowed' : 'pointer',
                  opacity: checkDailyLimit('memoryGame') ? 0.6 : 1,
                  transition: 'all 0.3s ease'
                }} 
                onClick={() => !checkDailyLimit('memoryGame') && setActiveGame('memoryGame')}
              >
                <div style={{ textAlign: 'center', padding: '2rem' }}>
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🧠</div>
                  <h4>Memory Game</h4>
                  <p style={{ color: '#666' }}>Match all the food pairs!</p>
                  <div style={{ 
                    background: checkDailyLimit('memoryGame') ? '#6c757d' : '#17a2b8',
                    color: 'white',
                    padding: '0.5rem 1rem',
                    borderRadius: '20px',
                    display: 'inline-block',
                    marginBottom: '1rem'
                  }}>
                    {checkDailyLimit('memoryGame') ? 'Played Today' : 'Up to 15 coins'}
                  </div>
                  <div style={{ fontSize: '0.875rem', color: '#666' }}>
                    Difficulty: Medium • 16 cards
                  </div>
                </div>
              </div>

              {/* Scratch Card */}
              <div 
                className="card" 
                style={{ 
                  height: '100%', 
                  cursor: checkDailyLimit('scratchCard') ? 'not-allowed' : 'pointer',
                  opacity: checkDailyLimit('scratchCard') ? 0.6 : 1,
                  transition: 'all 0.3s ease'
                }} 
                onClick={() => !checkDailyLimit('scratchCard') && setActiveGame('scratchCard')}
              >
                <div style={{ textAlign: 'center', padding: '2rem' }}>
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎫</div>
                  <h4>Scratch Card</h4>
                  <p style={{ color: '#666' }}>Scratch to reveal your reward!</p>
                  <div style={{ 
                    background: checkDailyLimit('scratchCard') ? '#6c757d' : '#ffc107',
                    color: checkDailyLimit('scratchCard') ? 'white' : '#333',
                    padding: '0.5rem 1rem',
                    borderRadius: '20px',
                    display: 'inline-block',
                    marginBottom: '1rem'
                  }}>
                    {checkDailyLimit('scratchCard') ? 'Played Today' : 'Up to 20 coins'}
                  </div>
                  <div style={{ fontSize: '0.875rem', color: '#666' }}>
                    Difficulty: Luck • Instant win
                  </div>
                </div>
              </div>

              {/* Math Challenge */}
              <div 
                className="card" 
                style={{ 
                  height: '100%', 
                  cursor: checkDailyLimit('mathChallenge') ? 'not-allowed' : 'pointer',
                  opacity: checkDailyLimit('mathChallenge') ? 0.6 : 1,
                  transition: 'all 0.3s ease'
                }} 
                onClick={() => !checkDailyLimit('mathChallenge') && setActiveGame('mathChallenge')}
              >
                <div style={{ textAlign: 'center', padding: '2rem' }}>
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🧮</div>
                  <h4>Math Challenge</h4>
                  <p style={{ color: '#666' }}>Solve 10 math problems!</p>
                  <div style={{ 
                    background: checkDailyLimit('mathChallenge') ? '#6c757d' : '#dc3545',
                    color: 'white',
                    padding: '0.5rem 1rem',
                    borderRadius: '20px',
                    display: 'inline-block',
                    marginBottom: '1rem'
                  }}>
                    {checkDailyLimit('mathChallenge') ? 'Played Today' : 'Up to 20 coins'}
                  </div>
                  <div style={{ fontSize: '0.875rem', color: '#666' }}>
                    Difficulty: Hard • 10 questions
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div style={{ marginBottom: '1rem', textAlign: 'center', padding: '1rem' }}>
                <button 
                  className="btn btn-secondary" 
                  onClick={() => setActiveGame(null)}
                  style={{ marginBottom: '1rem' }}
                >
                  ← Back to Games
                </button>
              </div>
              
              <div style={{ padding: '2rem', background: '#f8f9fa', borderRadius: '10px', margin: '1rem' }}>
                {activeGame === 'tapToWin' && <TapToWinGame />}
                {activeGame === 'memoryGame' && <MemoryGame />}
                {activeGame === 'scratchCard' && <ScratchCardGame />}
                {activeGame === 'mathChallenge' && <MathChallengeGame />}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Achievements Tab */}
      {activeTab === 'achievements' && (
        <div className="card" style={{ marginBottom: '2rem' }}>
          <div className="card-header">
            <h3>🏆 Achievements</h3>
            <p style={{ color: '#666', margin: 0 }}>Unlock achievements to earn rewards!</p>
          </div>
          <div style={{ padding: '2rem' }}>
            <div style={{ display: 'grid', gap: '1rem' }}>
              {playerStats.achievements.map(achievement => (
                <div 
                  key={achievement.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '1.5rem',
                    background: achievement.unlocked 
                      ? 'linear-gradient(135deg, #28a745, #20c997)' 
                      : 'linear-gradient(135deg, #f8f9fa, #e9ecef)',
                    borderRadius: '15px',
                    color: achievement.unlocked ? 'white' : '#666',
                    boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <div style={{ 
                    fontSize: '2.5rem', 
                    marginRight: '1.5rem',
                    opacity: achievement.unlocked ? 1 : 0.5
                  }}>
                    {achievement.unlocked ? '🏆' : '🔒'}
                  </div>
                  <div style={{ flex: 1 }}>
                    <h4 style={{ 
                      margin: '0 0 0.5rem 0', 
                      color: achievement.unlocked ? 'white' : '#333'
                    }}>
                      {achievement.name}
                    </h4>
                    <p style={{ 
                      margin: '0 0 0.5rem 0', 
                      opacity: achievement.unlocked ? 0.9 : 0.7
                    }}>
                      {achievement.description}
                    </p>
                    <div style={{ 
                      fontSize: '0.875rem',
                      fontWeight: 'bold',
                      opacity: achievement.unlocked ? 0.9 : 0.6
                    }}>
                      Reward: {achievement.reward} coins
                    </div>
                  </div>
                  {achievement.unlocked && (
                    <div style={{ 
                      background: 'rgba(255,255,255,0.2)',
                      padding: '0.5rem 1rem',
                      borderRadius: '20px',
                      fontSize: '0.875rem',
                      fontWeight: 'bold'
                    }}>
                      ✅ UNLOCKED
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Leaderboard Tab */}
      {activeTab === 'leaderboard' && (
        <div className="card" style={{ marginBottom: '2rem' }}>
          <div className="card-header">
            <h3>📊 Leaderboard</h3>
            <p style={{ color: '#666', margin: 0 }}>See how you rank against other vendors!</p>
          </div>
          <div style={{ padding: '2rem' }}>
            <div style={{ display: 'grid', gap: '1rem' }}>
              {leaderboard.map((player, index) => (
                <div 
                  key={player.rank}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '1.5rem',
                    background: player.name === 'You' 
                      ? 'linear-gradient(135deg, #667eea, #764ba2)' 
                      : index === 0 
                        ? 'linear-gradient(135deg, #ffd700, #ffed4e)'
                        : index === 1
                          ? 'linear-gradient(135deg, #c0c0c0, #a8a8a8)'
                          : index === 2
                            ? 'linear-gradient(135deg, #cd7f32, #b8860b)'
                            : 'linear-gradient(135deg, #f8f9fa, #e9ecef)',
                    borderRadius: '15px',
                    color: player.name === 'You' || index < 3 ? 'white' : '#333',
                    boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <div style={{ 
                    fontSize: '2rem', 
                    marginRight: '1rem',
                    minWidth: '60px',
                    textAlign: 'center',
                    fontWeight: 'bold'
                  }}>
                    {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `#${player.rank}`}
                  </div>
                  <div style={{ fontSize: '2rem', marginRight: '1rem' }}>
                    {player.avatar}
                  </div>
                  <div style={{ flex: 1 }}>
                    <h4 style={{ 
                      margin: '0 0 0.5rem 0',
                      fontWeight: player.name === 'You' ? 'bold' : 'normal'
                    }}>
                      {player.name}
                      {player.name === 'You' && ' 👑'}
                    </h4>
                    <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                      {player.score.toLocaleString()} points
                    </div>
                  </div>
                  {player.name === 'You' && (
                    <div style={{ 
                      background: 'rgba(255,255,255,0.2)',
                      padding: '0.5rem 1rem',
                      borderRadius: '20px',
                      fontSize: '0.875rem',
                      fontWeight: 'bold'
                    }}>
                      YOU
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Shop Tab */}
      {activeTab === 'shop' && (
        <div className="card" style={{ marginBottom: '2rem' }}>
          <div className="card-header">
            <h3>🛒 Power-Up Shop</h3>
            <p style={{ color: '#666', margin: 0 }}>Spend your coins on useful power-ups!</p>
          </div>
          <div style={{ padding: '2rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
              {[
                { name: '2x XP Boost', description: 'Double XP for 24 hours', price: 100, icon: '⚡' },
                { name: 'Coin Magnet', description: 'Earn 50% more coins for 12 hours', price: 150, icon: '🧲' },
                { name: 'Lucky Charm', description: 'Better rewards in games for 6 hours', price: 200, icon: '🍀' },
                { name: 'Time Freeze', description: 'Pause daily limits for one day', price: 300, icon: '⏰' }
              ].map((item, index) => (
                <div 
                  key={index}
                  style={{
                    padding: '2rem',
                    background: 'linear-gradient(135deg, #f8f9fa, #e9ecef)',
                    borderRadius: '15px',
                    textAlign: 'center',
                    boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
                    transition: 'all 0.3s ease',
                    cursor: playerStats.coins >= item.price ? 'pointer' : 'not-allowed',
                    opacity: playerStats.coins >= item.price ? 1 : 0.7
                  }}
                  onClick={() => purchasePowerUp(item)}
                  onMouseEnter={(e) => {
                    if (playerStats.coins >= item.price) {
                      e.target.style.transform = 'translateY(-5px)';
                      e.target.style.boxShadow = '0 10px 25px rgba(0,0,0,0.15)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
                  }}
                >
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{item.icon}</div>
                  <h4 style={{ marginBottom: '1rem', color: '#333' }}>{item.name}</h4>
                  <p style={{ color: '#666', marginBottom: '1.5rem' }}>{item.description}</p>
                  <div style={{ 
                    background: playerStats.coins >= item.price ? '#28a745' : '#6c757d',
                    color: 'white',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '25px',
                    fontWeight: 'bold',
                    cursor: playerStats.coins >= item.price ? 'pointer' : 'not-allowed'
                  }}>
                    🪙 {item.price} Coins
                  </div>
                  {playerStats.coins < item.price && (
                    <div style={{ 
                      fontSize: '0.875rem', 
                      color: '#dc3545', 
                      marginTop: '0.5rem',
                      fontWeight: 'bold'
                    }}>
                      Need {item.price - playerStats.coins} more coins
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default GameCenter;