import React from 'react';

const PlayerBlock = ({ player }) => {
  return (
    <div className='PlayerBlock body-block'>
      <h3 className='body-header'>{player.name}</h3>
      <div className='player-teams'>
        {player.teams.map((team) => {
          return (
            <div className='player-team'>
              <div className='team'>{team.name}</div>
              <div className='points'>{team.points}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PlayerBlock;
