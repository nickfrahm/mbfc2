import React from 'react';

const PlayerBlock = ({ player }) => {
  return (
    <div className='PlayerBlock body-block'>
      <h3 className='body-header'>{player.name}</h3>
      <div className='player-teams'>
        {player.teamIds.map((team) => {
          return (
            <div className='player-team' key={team.teamId * team.leagueId}>
              <div className='team'>{team.team}</div>
              <div className='points'>{team.points}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PlayerBlock;
