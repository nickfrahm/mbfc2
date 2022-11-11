import React from 'react';

const PlayerBlock = ({ player }) => {
  return (
    <div className='PlayerBlock body-block'>
      <h3 className='body-header'>{player.name}</h3>
      <div className='player-teams'>
        {player.teams.map((team) => {
          return <div>{team.name}</div>;
        })}
      </div>
    </div>
  );
};

export default PlayerBlock;
