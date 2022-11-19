import React from 'react';
import LeaderboardPlayer from './LeaderboardPlayer';

const Leaderboard = ({ players, tables }) => {
  return (
    <div className='Leaderboard body-block'>
      <h2 className='body-header'>Leaderboard</h2>
      <div className='players'>
        {players.map((player) => {
          return (
            <LeaderboardPlayer
              key={player.id}
              player={player}
              tables={tables}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Leaderboard;
