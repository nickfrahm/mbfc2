import { setLocalTableData } from './localStorage';

const leagues = [
  parseInt(process.env.REACT_APP_ENG_ID),
  parseInt(process.env.REACT_APP_ESP_ID),
  parseInt(process.env.REACT_APP_FRA_ID),
  parseInt(process.env.REACT_APP_GER_ID),
  parseInt(process.env.REACT_APP_ITA_ID),
];

const url = process.env.REACT_APP_API_FOOTBALL_URL;

function fetchLeagueData() {
  fetch(url + 'leagues?current=true', {
    method: 'GET',
    headers: {
      'x-rapidapi-host': 'v3.football.api-sports.io',
      'x-rapidapi-key': process.env.REACT_APP_API_FOOTBALL_KEY,
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((leagueData) => {
      const top5 = parseLeagueResponse(leagueData.response);
      console.log(top5);
    })
    .catch((err) => {
      console.log(err);
    });
}

function parseLeagueResponse(resp) {
  const top5Leagues = resp.filter((lg) => {
    return leagues.includes(lg.league.id);
  });

  return top5Leagues;
}

function fetchTop5Tables(currentTime, setState, setLoaded, loaded) {
  if (!loaded) {
    let tables = [];

    leagues.forEach(async (lg) => {
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

          //setState(tables);
          //setLocalTableData(currentTime, tables);
          setLoaded(true);
          //console.log('Setting table state in fetch');
        })
        .catch((err) => {
          console.log(err);
        });
    });
    return tables;
  }
}

async function fetchSingleTable(league, year, currentTime, setState) {
  const res = await fetch(
    url + 'standings?league=' + league + '&season=' + year,
    {
      method: 'GET',
      headers: {
        'x-rapidapi-host': 'v3.football.api-sports.io',
        'x-rapidapi-key': process.env.REACT_APP_API_FOOTBALL_KEY,
      },
    }
  ).catch((err) => {
    console.log(err);
  });

  const data = await res.json();
  const tables = parseTable(data.response);
  setState(tables);
  setLocalTableData(currentTime, tables);
}

function parseTable(resp) {
  return resp[0].league.standings[0].map((team) => {
    return {
      points: team.points,
      teamId: team.team.id,
      name: team.team.name,
      leagueId: resp[0].league.id,
    };
  });
}

export { fetchLeagueData, fetchTop5Tables, fetchSingleTable };
