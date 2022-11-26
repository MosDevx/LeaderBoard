import './style.css';

import getGameID from './modules/getGameID.js';
import getScores from './modules/getScores.js';
import postScore from './modules/postScores.js';

const scoresTable = document.getElementById('scores-table');
const refreshButton = document.getElementById('refresh-button');

const addForm = document.getElementById('add-form');
const nameField = document.getElementById('name-field');
const scoreField = document.getElementById('score-field');

let gameID = null;

const generateScores = (JSONObject) => {
  const data = [];
  const values = Object.values(JSONObject.result);
  // entries.forEach(([value]) => {

  // });
  // console.log('entries',entries)
  for (let i = 0; i < values.length; i += 1) {
    // console.log(values[i].user);
    data.push(`${values[i].user} : ${values[i].score}`);
  }
  return data;
};

const createTR = (data) => {
  const tr = document.createElement('tr');
  const td = document.createElement('td');
  td.textContent = data;
  tr.appendChild(td);
  return tr;
};

const appendScores = (arrayData) => {
  arrayData.forEach((data) => {
    const tr = createTR(data);
    scoresTable.appendChild(tr);
  });
};
async function populateTable() {
  scoresTable.innerHTML = '';
  const scores = await getScores(gameID);
  const scoresArray = generateScores(scores);
  appendScores(scoresArray);
}

refreshButton.addEventListener('click', async () => {
  populateTable();
});

if (typeof addForm === 'object' && addForm !== null && 'addEventListener' in addForm) {
  addForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = nameField.value;
    const score = scoreField.value;
    if (name && score) {
      await postScore(name, score, gameID);
      nameField.value = '';
      scoreField.value = '';
      await populateTable();
    }
  });
}

(async () => {
  try {
    gameID = await getGameID();
    const scores = await getScores(gameID);
    const scoresArray = generateScores(scores);
    appendScores(scoresArray);
  } catch (err) {
    // pass
  }
}
)();
