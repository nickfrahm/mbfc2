import './App.css';
import Body from './components/Body';
import Nav from './components/Nav';
import playerData from './PlayerData';
import Spinner from './components/Spinner';
import { fetchTop5Tables } from './utility/api_football';
import { getLocalTableData, setLocalTableData } from './utility/localStorage';
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

  const leagues = [
    parseInt(process.env.REACT_APP_ENG_ID),
    parseInt(process.env.REACT_APP_ESP_ID),
    parseInt(process.env.REACT_APP_FRA_ID),
    parseInt(process.env.REACT_APP_GER_ID),
    parseInt(process.env.REACT_APP_ITA_ID),
  ];

  useEffect(() => {
    console.log('start App.js useEffect');

    const fetchTablesFromApi = async () => {
      const url = process.env.REACT_APP_API_FOOTBALL_URL;
      const parseTable = (resp) => {
        return resp[0].league.standings[0].map((team) => {
          return {
            points: team.points,
            teamId: team.team.id,
            name: team.team.name,
            leagueId: resp[0].league.id,
          };
        });
      };
      let tables = [];

      await Promise.all(
        leagues.map(async (lg) => {
          await fetch(
            url +
              'standings?league=' +
              lg +
              '&season=' +
              process.env.REACT_APP_SEASON,
            {
              method: 'GET',
              headers: {
                'x-rapidapi-host': 'v3.football.api-sports.io',
                'x-rapidapi-key': process.env.REACT_APP_API_FOOTBALL_KEY,
              },
            }
          )
            .then((res) => res.json())
            .then((data) => {
              console.log('pushing table data to table array');
              const table = parseTable(data.response);
              tables.push(table);
            })
            .catch((err) => {
              console.log(err);
            });
        })
      );
      setTables(tables);
      setTablesLoaded(true);
      setLocalTableData(currentTime, tables);
    };

    if (!ref.current) {
      ref.current = true; //prevent from running the initial mount useEffect again
      console.log('ref set to false');
      const oneHour = 1000 * 60 * 60;

      //if there is tables in local storage
      if (getLocalTableData() !== null) {
        //if local table data is older than an hour, get new data
        if (currentTime - oneHour > getLocalTableData().time) {
          fetchTablesFromApi();
        } else {
          //use what's in storage
          setTables(getLocalTableData().tables);
          setTablesLoaded(true);
          console.log('TABLES FROM STORAGE');
        }
      } else {
        console.log('no table data in storage');
        fetchTablesFromApi();
      }
    }
  }, []);

  const updatePlayers = (arr) => {
    setPlayers(arr);
  };

  return (
    <div className='App'>
      <Nav />
      {tablesLoaded ? (
        <Body
          players={players}
          tables={tables}
          setPlayers={updatePlayers}
          tablesLoaded={tablesLoaded}
        />
      ) : (
        <Spinner />
      )}
    </div>
  );
}

export default App;
