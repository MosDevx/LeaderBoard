async function getGameID() {
  const response = await fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/', {
    method: 'POST',
    body: JSON.stringify({
      name: 'cool-name',
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });

  const json = await response.json();
  const gameID = Array.from(json.result.split(' '))[3];
  return gameID;
}

export default getGameID;