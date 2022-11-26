async function getScores(gameID) {
  const response = await fetch(`https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${gameID}/scores/`);

  const json = await response.json();
  return json;
}

export default getScores;