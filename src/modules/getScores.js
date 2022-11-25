async function getScores(){
	let response = await fetch( 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${gameID}/scores/');

	let json = await response.json()
	console.log(json)
}