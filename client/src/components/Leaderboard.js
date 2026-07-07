import React, { useState, useEffect } from 'react';
import '../styles/Leaderboard.css';

function Leaderboard() {
  const [topPlayers, setTopPlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaderboard();
    const interval = setInterval(fetchLeaderboard, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/players/leaderboard/top');
      const data = await response.json();
      setTopPlayers(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
      setLoading(false);
    }
  };

  const getMedalEmoji = (rank) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return `#${rank}`;
  };

  const getPhaseEmoji = (phase) => {
    const emojis = {
      birth: '🍼',
      vrindavan: '🌳',
      battles: '⚔️',
      dwaraka: '🏰',
      mahabharata: '🎭',
      final: '✨'
    };
    return emojis[phase] || '📍';
  };

  const phaseDescriptions = {
    birth: 'Birth & Childhood',
    vrindavan: 'Vrindavan Years',
    battles: 'Battles & Demons',
    dwaraka: 'Dwaraka Kingdom',
    mahabharata: 'Mahabharata War',
    final: 'Final Days'
  };

  return (
    <div className="leaderboard-container">
      <h2>🏆 Global Leaderboard</h2>
      <p className="leaderboard-subtitle">See how you rank among all Krishna Chronicles players worldwide!</p>

      {loading ? (
        <div className="loading-state">Loading leaderboard...</div>
      ) : topPlayers.length > 0 ? (
        <div className="leaderboard-table-wrapper">
          <table className="leaderboard-table">
            <thead>
              <tr>
                <th className="rank-col">Rank</th>
                <th className="player-col">Player</th>
                <th className="points-col">Total Points</th>
                <th className="phase-col">Current Phase</th>
              </tr>
            </thead>
            <tbody>
              {topPlayers.map((player, index) => (
                <tr key={index} className={`rank-${index + 1} ${index < 3 ? 'top-rank' : ''}`}>
                  <td className="rank-cell">
                    <span className="medal">{getMedalEmoji(index + 1)}</span>
                  </td>
                  <td className="player-cell">
                    <span className="player-name">{player.username}</span>
                  </td>
                  <td className="points-cell">
                    <span className="points-value">{player.totalPoints.toLocaleString()}</span>
                  </td>
                  <td className="phase-cell">
                    <span className="phase-badge">
                      {getPhaseEmoji(player.currentPhase)} {phaseDescriptions[player.currentPhase]}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="empty-state">
          <p>No players have started their journey yet. Be the first!</p>
        </div>
      )}

      <div className="leaderboard-info">
        <h3>ℹ️ How the Leaderboard Works</h3>
        <ul>
          <li>Players are ranked by total points earned throughout the game</li>
          <li>Complete stories, quests, and daily challenges to earn points</li>
          <li>Your position updates in real-time as you progress</li>
          <li>The leaderboard resets seasonally to give all players a chance to compete</li>
          <li>Special seasonal events offer bonus points and exclusive rewards</li>
        </ul>
      </div>

      <div className="achievement-showcase">
        <h3>🌟 Current Season Highlights</h3>
        <div className="highlight-cards">
          <div className="highlight-card">
            <h4>Highest Points</h4>
            <p className="highlight-value">
              {topPlayers.length > 0 ? topPlayers[0].totalPoints.toLocaleString() : '0'}
            </p>
            <p className="highlight-player">
              {topPlayers.length > 0 ? topPlayers[0].username : 'None yet'}
            </p>
          </div>
          <div className="highlight-card">
            <h4>Most Advanced</h4>
            <p className="highlight-value">
              {topPlayers.length > 0 ? phaseDescriptions[topPlayers[0].currentPhase] : 'Birth'}
            </p>
            <p className="highlight-player">
              {topPlayers.length > 0 ? topPlayers[0].username : 'None yet'}
            </p>
          </div>
          <div className="highlight-card">
            <h4>Active Players</h4>
            <p className="highlight-value">{topPlayers.length}</p>
            <p className="highlight-player">In this season</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;
