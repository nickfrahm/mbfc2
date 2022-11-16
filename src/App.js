import './App.css';
import Body from './components/Body';
import Nav from './components/Nav';
import playerData from './PlayerData';
import { fetchSingleTable, fetchTop5Tables } from './utility/api_football';
import { getLocalTableData, setLocalTableData } from './utility/localStorage';
import { useState, useEffect } from 'react';

function App() {
  const [players, setPlayers] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date().getTime());
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    setPlayers(playerData);
    const oneHour = 1000 * 60 * 60;

    //if there is tableData in local storage
    if (getLocalTableData() !== null) {
      //if local table data is older than an hour, get new data
      if (currentTime - oneHour > getLocalTableData().time) {
        setTableData(
          fetchSingleTable(
            process.env.REACT_APP_ENG_ID,
            process.env.REACT_APP_SEASON
          )
        );
        console.log('new table data after its an hour old');
        console.log(tableData);
      } else {
        //use what's in storage
        setTableData(getLocalTableData().tableData);
        console.log('tableData from storage');
        console.log(tableData);
      }
    } else {
      console.log('no table data in storage');
      console.log(tableData);
      //no table data in storage
      setTableData(
        fetchSingleTable(
          process.env.REACT_APP_ENG_ID,
          process.env.REACT_APP_SEASON
        )
      );
    }
  }, []);

  useEffect(() => {
    console.log('use effect [tableData]');
    console.log(tableData);
    setLocalTableData(currentTime, tableData);
  }, [tableData]);

  return (
    <div className='App'>
      <Nav />
      <Body players={players} />
    </div>
  );
}

export default App;
