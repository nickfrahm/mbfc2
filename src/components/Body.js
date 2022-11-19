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
        let pointsTotal = 0;
        player.teamIds.forEach((team) => {
          tables.forEach((table) => {
            table.forEach((t) => {
              if (
                t.teamId === team.team &&
                t.leagueId.toString() === team.league
              ) {
                teams.push(t);
                pointsTotal += t.points;
              }
            });
          });
        });
        return {
          id: player.id,
          name: player.name,
          teamIds: teams,
          points: pointsTotal,
        };
      });
      console.log(playersWithTeamsArr);
      const sortedArr = playersWithTeamsArr.map((player) => {
        let teamSort = player.teamIds.sort((a, b) => {
          return a.points < b.points;
        });
        return {
          id: player.id,
          name: player.name,
          teamIds: teamSort,
          points: player.points,
        };
      });

      const sortLeaderBoard = sortedArr.sort((a, b) => {
        return a.points < b.points;
      });

      setPlayers(sortLeaderBoard);
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
