[
  {
    teamId: 42,
    name: 'Arsenal',
    leagueId: 39,
  },
  {
    teamId: 50,
    name: 'Manchester City',
    leagueId: 39,
  },
  {
    teamId: 34,
    name: 'Newcastle',
    leagueId: 39,
  },
  {
    teamId: 47,
    name: 'Tottenham',
    leagueId: 39,
  },
  {
    teamId: 33,
    name: 'Manchester United',
    leagueId: 39,
  },
  {
    teamId: 40,
    name: 'Liverpool',
    leagueId: 39,
  },
  {
    teamId: 51,
    name: 'Brighton',
    leagueId: 39,
  },
  {
    teamId: 49,
    name: 'Chelsea',
    leagueId: 39,
  },
  {
    teamId: 36,
    name: 'Fulham',
    leagueId: 39,
  },
  {
    teamId: 55,
    name: 'Brentford',
    leagueId: 39,
  },
  {
    teamId: 52,
    name: 'Crystal Palace',
    leagueId: 39,
  },
  {
    teamId: 66,
    name: 'Aston Villa',
    leagueId: 39,
  },
  {
    teamId: 46,
    name: 'Leicester',
    leagueId: 39,
  },
  {
    teamId: 35,
    name: 'Bournemouth',
    leagueId: 39,
  },
  {
    teamId: 63,
    name: 'Leeds',
    leagueId: 39,
  },
  {
    teamId: 48,
    name: 'West Ham',
    leagueId: 39,
  },
  {
    teamId: 45,
    name: 'Everton',
    leagueId: 39,
  },
  {
    teamId: 65,
    name: 'Nottingham Forest',
    leagueId: 39,
  },
  {
    teamId: 41,
    name: 'Southampton',
    leagueId: 39,
  },
  {
    teamId: 39,
    name: 'Wolves',
    leagueId: 39,
  },
];

const oneHour = 1000 * 60 * 60;

//if there is tableData in local storage
if (getLocalTableData() !== null) {
  //if local table data is older than an hour, get new data
  if (currentTime - oneHour > getLocalTableData().time) {
    fetchSingleTable(
      setTableData,
      process.env.REACT_APP_ENG_ID,
      process.env.REACT_APP_SEASON
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
  fetchSingleTable(
    setTableData,
    process.env.REACT_APP_ENG_ID,
    process.env.REACT_APP_SEASON
  );
  //no table data in storage
  console.log(tableData);
  setLocalTableData({ currentTime, tableData });
}
