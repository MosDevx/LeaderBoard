import './style.css';

import getGameID from './modules/getGameID.js';
import getScores from './modules/getScores.js';
import postScore from './modules/postScores.js';

const scoresTable = document.getElementById('scores-table')
const refreshButton = document.getElementById('refresh-button')


const addForm = document.getElementById('add-form')
const nameField = document.getElementById('name-field')
const scoreField = document.getElementById('score-field')

let gameID = null


refreshButton.addEventListener('click',async ()=>{
	let scores = await getScores(gameID)
	let scoresArray = generateScores(scores)
	appendScores(scoresArray)
})

const generateScores =(JSONObject) =>{
	let data = []
	for (const [key,value] of Object.entries(JSONObject.result)){
		// console.log(value.score, value.user);
		data.push(`${value.user} : ${value.score}`)
	}
	console.log(data)
	return data
}

const createTR=(data)=>{
	let tr = document.createElement('tr')
	let td = document.createElement('td')
	td.textContent = data
	tr.appendChild(td)
	return tr
}

const  appendScores =(arrayData)=>{
	arrayData.forEach((data)=>{
		let tr = createTR(data)
		scoresTable.appendChild(tr)
	})
}

console.log(addForm);

addForm.addEventListener('',()=>{

})

if (typeof addForm === 'object' && addForm !== null && 'addEventListener' in addForm) {
  addForm.addEventListener('submit',(e)=> {
		e.preventDefault()
    console.log('box clicked');
		let name = nameField.value
		let score = scoreField.value
		if(name && score){

			postScore(name,score,gameID)
			nameField.value = ''
			scoreField.value =''
		}
		}
  )
	
}


(async() =>{
	try{
	  gameID = await getGameID()
		console.log(gameID); 
		let scores = await getScores(gameID)
		let scoresArray = generateScores(scores)
		appendScores(scoresArray)
	}catch(err){
		console.log(err)
	}
}
)()

