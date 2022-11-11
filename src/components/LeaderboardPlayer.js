import React from 'react';

const LeaderboardPlayer = ({ player }) => {
  return (
    <div className='LeaderboardPlayer'>
      <div className='lb-player'>{player.name}</div>
      <div className='lb-points'>1000</div>
    </div>
  );
};

export default LeaderboardPlayer;
