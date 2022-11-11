import './App.css';
import Body from './components/Body';
import Nav from './components/Nav';
import { useState } from 'react';

function App() {
  const [players, setPlayers] = useState([
    {
      id: 1,
      name: 'Frahmba',
      teams: [{ name: 'Man City' }],
    },
    {
      id: 2,
      name: 'Mo',
      teams: [{ name: 'Man Utd' }],
    },
    {
      id: 3,
      name: 'Mooch',
      teams: [{ name: 'Arsenal' }],
    },
    {
      id: 4,
      name: 'Weast',
      teams: [{ name: 'Chelsea' }],
    },
  ]);

  return (
    <div className='App'>
      <Nav />
      <Body players={players} />
    </div>
  );
}

export default App;
