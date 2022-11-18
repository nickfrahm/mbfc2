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
import { useState, useEffect, useRef } from 'react';

function App() {
  const [players, setPlayers] = useState(playerData);
  const [currentTime, setCurrentTime] = useState(() => {
    const date = new Date();
    return date.getTime();
  });
  const [tables, setTables] = useState([]);
  const ref = useRef(false); //prevent from running the initial mount useEffect again

  useEffect(() => {
    console.log('start useEffect');
    if (!ref.current) {
      ref.current = true; //prevent from running the initial mount useEffect again
      console.log('ref set to false');
      const oneHour = 1000 * 60 * 60;

      //if there is tables in local storage
      if (getLocalTableData() !== null) {
        //if local table data is older than an hour, get new data
        if (currentTime - oneHour > getLocalTableData().time) {
          fetchTop5Tables(currentTime, setTables);
        } else {
          //use what's in storage
          setTables(getLocalTableData().tables);
          console.log('tables from storage');
        }
      } else {
        console.log('no table data in storage');
        fetchTop5Tables(currentTime, tables, setTables);
      }
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
