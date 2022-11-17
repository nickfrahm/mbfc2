import './App.css';
import Body from './components/Body';
import Nav from './components/Nav';
import playerData from './PlayerData';
import { fetchSingleTable, fetchTop5Tables } from './utility/api_football';
import {
  useLocalStorage,
  getLocalTableData,
  setLocalTableData,
} from './utility/localStorage';
import { useState, useEffect } from 'react';

function App() {
  console.log('App Rendered');
  const [players, setPlayers] = useState([]);
  const [currentTime, setCurrentTime] = useState(() => {
    const date = new Date();
    return date.getTime();
  });
  const [tables, setTables] = useState(getLocalTableData());

  useEffect(() => {
    console.log('useEffect Rendered');
    setPlayers(playerData);
    if (!tables) {
      setTables(
        fetchSingleTable(
          process.env.REACT_APP_ENG_ID,
          process.env.REACT_APP_SEASON
        )
      );
    }
  }, []);

  return (
    <div className='App'>
      <Nav />
      <Body players={players} />
    </div>
  );
}

export default App;
