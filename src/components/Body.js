import React from 'react';
import Leaderboard from './Leaderboard';
import PlayerBlock from './PlayerBlock';

const Body = ({ players }) => {
  return (
    <div className='container'>
      <Leaderboard players={players} />
      {players.map((player) => (
        <PlayerBlock player={player} />
      ))}
    </div>
  );
};

export default Body;
