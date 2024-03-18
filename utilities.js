// Utility function to get a randomly selected item from an array
function getRandomElement(array) {
  const i = Math.floor(Math.random() * array.length);
  return array[i];
}

// Utility function to shuffle the order of items in an array in-place
function shuffleArray(array) {
  return array.sort((a, b) => Math.random() - 0.5);
}

function getMultipleChoices(n, correctAnswer, possibleChoises) {
  const choices = [];
  choices.push(correctAnswer);

  while (choices.length < n) {
    let randomElement = getRandomElement(possibleChoises);

    if (!choices.includes(randomElement)) {
      choices.push(randomElement);
    }
  }

  return shuffleArray(choices);
}

export { getRandomElement, shuffleArray, getMultipleChoices };
