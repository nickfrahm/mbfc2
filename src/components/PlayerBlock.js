import React from 'react';
import uniqid from 'uniqid';

const PlayerBlock = ({ player }) => {
  return (
    <div className='PlayerBlock body-block'>
      <h3 className='body-header'>{player.name}</h3>
      <div className='player-teams'>
        {player.teamIds.map((team) => {
          return (
            <div className='player-team' key={uniqid()}>
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
