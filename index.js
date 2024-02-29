const RANDOM_IMG_ENDPOINT = 'https://dog.ceo/api/breeds/image/random';

const BREEDS = [
  'affenpinscher',
  'african',
  'airedale',
  'akita',
  'appenzeller',
  'shepherd australian',
  'basenji',
  'beagle',
  'bluetick',
  'borzoi',
  'bouvier',
  'boxer',
  'brabancon',
  'briard',
  'norwegian buhund',
  'boston bulldog',
  'english bulldog',
  'french bulldog',
  'staffordshire bullterrier',
  'australian cattledog',
  'chihuahua',
  'chow',
  'clumber',
  'cockapoo',
  'border collie',
  'coonhound',
  'cardigan corgi',
  'cotondetulear',
  'dachshund',
  'dalmatian',
  'great dane',
  'scottish deerhound',
  'dhole',
  'dingo',
  'doberman',
  'norwegian elkhound',
  'entlebucher',
  'eskimo',
  'lapphund finnish',
  'bichon frise',
  'germanshepherd',
  'italian greyhound',
  'groenendael',
  'havanese',
  'afghan hound',
  'basset hound',
  'blood hound',
  'english hound',
  'ibizan hound',
  'plott hound',
  'walker hound',
  'husky',
  'keeshond',
  'kelpie',
  'komondor',
  'kuvasz',
  'labradoodle',
  'labrador',
  'leonberg',
  'lhasa',
  'malamute',
  'malinois',
  'maltese',
  'bull mastiff',
  'english mastiff',
  'tibetan mastiff',
  'mexicanhairless',
  'mix',
  'bernese mountain',
  'swiss mountain',
  'newfoundland',
  'otterhound',
  'caucasian ovcharka',
  'papillon',
  'pekinese',
  'pembroke',
  'miniature pinscher',
  'pitbull',
  'german pointer',
  'germanlonghair pointer',
  'pomeranian',
  'medium poodle',
  'miniature poodle',
  'standard poodle',
  'toy poodle',
  'pug',
  'puggle',
  'pyrenees',
  'redbone',
  'chesapeake retriever',
  'curly retriever',
  'flatcoated retriever',
  'golden retriever',
  'rhodesian ridgeback',
  'rottweiler',
  'saluki',
  'samoyed',
  'schipperke',
  'giant schnauzer',
  'miniature schnauzer',
  'english setter',
  'gordon setter',
  'irish setter',
  'sharpei',
  'english sheepdog',
  'shetland sheepdog',
  'shiba',
  'shihtzu',
  'blenheim spaniel',
  'brittany spaniel',
  'cocker spaniel',
  'irish spaniel',
  'japanese spaniel',
  'sussex spaniel',
  'welsh spaniel',
  'english springer',
  'stbernard',
  'american terrier',
  'australian terrier',
  'bedlington terrier',
  'border terrier',
  'cairn terrier',
  'dandie terrier',
  'fox terrier',
  'irish terrier',
  'kerryblue terrier',
  'lakeland terrier',
  'norfolk terrier',
  'norwich terrier',
  'patterdale terrier',
  'russell terrier',
  'scottish terrier',
  'sealyham terrier',
  'silky terrier',
  'tibetan terrier',
  'toy terrier',
  'welsh terrier',
  'westhighland terrier',
  'wheaten terrier',
  'yorkshire terrier',
  'tervuren',
  'vizsla',
  'spanish waterdog',
  'weimaraner',
  'whippet',
  'irish wolfhound',
];

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
