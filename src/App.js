import './App.css';
import Body from './components/Body';
import Nav from './components/Nav';
import playerData from './PlayerData';
import Spinner from './components/Spinner';
import { fetchTop5Tables } from './utility/api_football';
import { getLocalTableData } from './utility/localStorage';
import { useState, useEffect, useRef } from 'react';

function App() {
  const [players, setPlayers] = useState(playerData);
  const [currentTime, setCurrentTime] = useState(() => {
    const date = new Date();
    return date.getTime();
  });
  const [tables, setTables] = useState([]);
  const [tablesLoaded, setTablesLoaded] = useState(false);
  const ref = useRef(false); //prevent from running the initial mount useEffect again

  useEffect(() => {
    console.log('start App.js useEffect');
    if (!ref.current) {
      ref.current = true; //prevent from running the initial mount useEffect again
      console.log('ref set to false');
      const oneHour = 1000 * 60 * 60;

      //if there is tables in local storage
      if (getLocalTableData() !== null) {
        //if local table data is older than an hour, get new data
        if (currentTime - oneHour > getLocalTableData().time) {
          fetchTop5Tables(currentTime, setTables, setTablesLoaded);
        } else {
          //use what's in storage
          setTables(getLocalTableData().tables);
          setTablesLoaded(true);
          console.log('TABLES FROM STORAGE');
        }
      } else {
        console.log('no table data in storage');
        fetchTop5Tables(currentTime, setTables, setTablesLoaded);
      }
    }
  }, [players]);

  const updatePlayers = (arr) => {
    setPlayers(arr);
  };

  return (
    <div className='App'>
      <Nav />
      {!tablesLoaded ? (
        <Spinner />
      ) : (
        <Body
          players={players}
          tables={tables}
          setPlayers={updatePlayers}
          tablesLoaded={tablesLoaded}
        />
      )}
    </div>
  );
}

export default App;
