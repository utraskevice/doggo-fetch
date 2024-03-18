import {
  getRandomElement,
  shuffleArray,
  getMultipleChoices,
} from './utilities.js';

import { RANDOM_IMG_ENDPOINT, BREEDS } from './bread-list.js';

function getBreedFromURL(url) {
  const [...parts] = url.split('/');
  const [, , , , breedName] = parts;
  const breed = breedName.split('-').reverse().join(' ');
  return breed;
}

async function fetchMessage(url) {
  const response = await fetch(url);
  const { message } = await response.json();
  return message;
}

// Function to add the multiple-choice buttons to the page
function renderButtons(choicesArray, correctAnswer) {
  function buttonHandler(e) {
    if (e.target.value === correctAnswer) {
      e.target.classList.add('correct');
    } else {
      e.target.classList.add('incorrect');
      document
        .querySelector(`button[value="${correctAnswer}"]`)
        .classList.add('correct');
    }
    setTimeout(function () {
      window.location.reload();
    }, 2000);
  }

  const options = document.getElementById('options');

  // 1 OPTION:
  // for (let choice of choicesArray) {
  //   const button = document.createElement('button');
  //   button.textContent = choice;
  //   button.value = choice;
  //   button.name = choice;
  //   button, addEventListener('click', buttonHandler);
  //   options.appendChild(button);
  // }

  // 2 OPTION
  choicesArray.map((choice) => {
    let button = document.createElement('button');
    button.value = button.name = button.textContent = choice;
    button.addEventListener('click', buttonHandler);
    options.appendChild(button);
  });
}

// Function to add the quiz content to the page
function renderQuiz(imgUrl, correctAnswer, choices) {
  const image = document.createElement('img');
  image.setAttribute('src', imgUrl);
  const frame = document.getElementById('image-frame');

  image.addEventListener('load', () => {
    // Wait until the image has finished loading before trying to add elements to the page
    frame.replaceChildren(image);
    renderButtons(choices, correctAnswer);
  });
}

// Function to load the data needed to display the quiz
async function loadQuizData() {
  document.getElementById('image-frame').textContent = 'Fetching doggo...';

  const doggoImgUrl = await fetchMessage(RANDOM_IMG_ENDPOINT);
  const correctBreed = getBreedFromURL(doggoImgUrl);
  const breedChoices = getMultipleChoices(3, correctBreed, BREEDS);

  return [doggoImgUrl, correctBreed, breedChoices];
}

const [imageUrl, correctAnswer, choices] = await loadQuizData();
renderQuiz(imageUrl, correctAnswer, choices);
