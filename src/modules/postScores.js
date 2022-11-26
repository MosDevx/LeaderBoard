async function postScore(user,score,gameID){

	let response = await fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${gameID}/scores/',{
		method:'POST',
		body: JSON.stringify({
			"user":user,
			"score":score
		}),
		headers: {
			'Content-type': 'application/json; charset=UTF-8',
		},
	})

	let json = await response.json()
	console.log(json)
}

export default postScore