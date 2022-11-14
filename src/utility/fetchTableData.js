const leagues = [
  parseInt(process.env.REACT_APP_ENG_ID),
  parseInt(process.env.REACT_APP_ESP_ID),
  parseInt(process.env.REACT_APP_FRA_ID),
  parseInt(process.env.REACT_APP_GER_ID),
  parseInt(process.env.REACT_APP_ITA_ID),
];

const url = process.env.REACT_APP_API_FOOTBALL_URL;

const fetchTableData = () => {
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
      const top5 = parseResponse(leagueData.response);
      console.log(top5);
    })
    .catch((err) => {
      console.log(err);
    });
};

const parseResponse = (resp) => {
  const top5Leagues = resp.filter((lg) => {
    return leagues.includes(lg.league.id);
  });

  return top5Leagues;
};

export { fetchTableData };
