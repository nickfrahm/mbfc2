import React, { useEffect } from 'react';
import Leaderboard from './Leaderboard';
import PlayerBlock from './PlayerBlock';

const Body = ({ players, tables, setPlayers, tablesLoaded }) => {
  useEffect(() => {
    console.log('useEffect Body');
    if (tablesLoaded) {
      console.log(tablesLoaded);
      console.log(tables);
      console.log(players);
      const playersWithTeamsArr = players.map((player) => {
        let teams = [];
        player.teamIds.forEach((team) => {
          tables.forEach((table) => {
            table.forEach((t) => {
              if (t.teamId === team.team && t.leagueId == team.league) {
                teams.push(t);
              }
            });
          });
        });

        return {
          id: player.id,
          name: player.name,
          teamIds: teams,
        };
      });
      console.log(playersWithTeamsArr);
      setPlayers(playersWithTeamsArr);
    }
  }, [tablesLoaded]);

  return (
    <div className='container'>
      <Leaderboard players={players} tables={tables} />
      {players.map((player) => (
        <PlayerBlock key={player.id} player={player} />
      ))}
    </div>
  );
};

export default Body;
