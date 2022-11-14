import './App.css';
import Body from './components/Body';
import Nav from './components/Nav';
import playerData from './PlayerData';
import { fetchTableData } from './utility/fetchTableData';
import { useState, useEffect } from 'react';

function App() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    setPlayers(playerData);
    //if local storage doesn't have league data,
    //or it does and it's older than 6 hours --> fetch league data
    fetchTableData();
  }, []);

  return (
    <div className='App'>
      <Nav />
      <Body players={players} />
    </div>
  );
}

export default App;
