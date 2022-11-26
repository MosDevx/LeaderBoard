async function getGameID(){
	let response = await fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/',{
		method:'POST',
		body: JSON.stringify({
			"name":"cool-name"
		}),
		headers: {
			'Content-type': 'application/json; charset=UTF-8',
		},
	})

	let json = await response.json()
	let gameID = Array.from(json.result.split(' '))[3]
	// console.log(gameID);
	return gameID
}

export default getGameID