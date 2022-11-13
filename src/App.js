import './App.css';
import Body from './components/Body';
import Nav from './components/Nav';
import { useState, useEffect } from 'react';

function App() {
  const [players, setPlayers] = useState([
    {
      id: 1,
      name: 'Frahmba',
      teams: [
        { name: 'Man City', points: 95 },
        { name: 'Man City', points: 95 },
      ],
    },
    {
      id: 2,
      name: 'Mo',
      teams: [
        { name: 'Man Utd', points: 95 },
        { name: 'Man City', points: 95 },
      ],
    },
    {
      id: 3,
      name: 'Mooch',
      teams: [
        { name: 'Arsenal', points: 95 },
        { name: 'Man City', points: 95 },
      ],
    },
    {
      id: 4,
      name: 'Weast',
      teams: [
        { name: 'Chelsea', points: 95 },
        { name: 'Man City', points: 95 },
      ],
    },
  ]);

  const testApi = () => {
    fetch('https://v3.football.api-sports.io/standings?league=39&season=2022', {
      method: 'GET',
      headers: {
        'x-rapidapi-host': 'v3.football.api-sports.io',
        'x-rapidapi-key': process.env.REACT_APP_API_FOOTBALL_KEY,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((value) => {
        console.log(
          value.response[0].league.standings[0].forEach((team) => {
            console.log(team.team);
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className='App'>
      <Nav />
      <button onClick={() => testApi()}>test api</button>
      <Body players={players} />
    </div>
  );
}

export default App;
