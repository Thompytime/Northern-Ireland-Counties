const countyData = {
    "Antrim": {
        "Armagh": { "miles": 40, "kilometers": 64, "direction": "SW" },
        "Down": { "miles": 25, "kilometers": 40, "direction": "S" },
        "Fermanagh": { "miles": 66, "kilometers": 106, "direction": "SW" },
        "Londonderry": { "miles": 30, "kilometers": 48, "direction": "W" },
        "Tyrone": { "miles": 35, "kilometers": 56, "direction": "W" }
    },
    "Armagh": {
        "Antrim": { "miles": 40, "kilometers": 64, "direction": "NE" },
        "Down": { "miles": 20, "kilometers": 32, "direction": "E" },
        "Fermanagh": { "miles": 40, "kilometers": 64, "direction": "W" },
        "Londonderry": { "miles": 50, "kilometers": 80, "direction": "NW" },
        "Tyrone": { "miles": 25, "kilometers": 40, "direction": "NW" }
    },
    "Down": {
        "Antrim": { "miles": 25, "kilometers": 40, "direction": "N" },
        "Armagh": { "miles": 20, "kilometers": 32, "direction": "W" },
        "Fermanagh": { "miles": 68, "kilometers": 110, "direction": "W" },
        "Londonderry": { "miles": 55, "kilometers": 88, "direction": "NW" },
        "Tyrone": { "miles": 50, "kilometers": 80, "direction": "W" }
    },
    "Fermanagh": {
        "Antrim": { "miles": 66, "kilometers": 106, "direction": "NE" },
        "Armagh": { "miles": 40, "kilometers": 64, "direction": "E" },
        "Down": { "miles": 68, "kilometers": 110, "direction": "E" },
        "Londonderry": { "miles": 35, "kilometers": 56, "direction": "N" },
        "Tyrone": { "miles": 20, "kilometers": 32, "direction": "NE" }
    },
    "Londonderry": {
        "Antrim": { "miles": 30, "kilometers": 48, "direction": "E" },
        "Armagh": { "miles": 50, "kilometers": 80, "direction": "SE" },
        "Down": { "miles": 55, "kilometers": 88, "direction": "SE" },
        "Fermanagh": { "miles": 35, "kilometers": 56, "direction": "S" },
        "Tyrone": { "miles": 20, "kilometers": 32, "direction": "S" }
    },
    "Tyrone": {
        "Antrim": { "miles": 35, "kilometers": 56, "direction": "E" },
        "Armagh": { "miles": 25, "kilometers": 40, "direction": "SE" },
        "Down": { "miles": 50, "kilometers": 80, "direction": "E" },
        "Fermanagh": { "miles": 20, "kilometers": 32, "direction": "SW" },
        "Londonderry": { "miles": 20, "kilometers": 32, "direction": "N" }
    }
};

const countyCoordinates = {
    "Antrim": { "lat": 54.8, "lon": -6.1 },
    "Armagh": { "lat": 54.3, "lon": -6.6 },
    "Down": { "lat": 54.4, "lon": -5.9 },
    "Fermanagh": { "lat": 54.4, "lon": -7.6 },
    "Londonderry": { "lat": 54.9, "lon": -7.0 },
    "Tyrone": { "lat": 54.6, "lon": -7.3 }
};

const countyImages = ['Antrim.svg', 'Armagh.svg', 'Down.svg', 'Fermanagh.svg', 'Londonderry.svg', 'Tyrone.svg'];
const countyNames = countyImages.map(image => image.replace('.svg', ''));

const guessInput = document.getElementById('guess-input');
const dropdown = document.getElementById('dropdown-options');

let currentCountyIndex = Math.floor(Math.random() * countyImages.length);
let attemptsLeft = 5;
let incorrectGuesses = [];
let correctAnswer = countyImages[currentCountyIndex].replace('.svg', '');
let gameOver = false;
const maxDistanceKm = 120; // Maximum distance between counties in Northern Ireland

document.getElementById('county-image').src = 'imagesni/' + countyImages[currentCountyIndex];
document.getElementById('attempts-left').value = `Attempts left: ${attemptsLeft}`;

// Dropdown functionality for guess input
guessInput.addEventListener('input', function () {
    const inputValue = guessInput.value.trim().toLowerCase();
    dropdown.innerHTML = '';
    let filteredCounties;

    if (inputValue.length === 0) {
        // Show all counties if input is empty
        filteredCounties = countyNames;
    } else {
        // Filter counties based on input
        filteredCounties = countyNames.filter(county => county.toLowerCase().includes(inputValue));
    }

    filteredCounties.forEach(county => {
        const option = document.createElement('div');
        option.classList.add('dropdown-option');
        option.textContent = county;
        option.addEventListener('click', () => {
            guessInput.value = county;
            dropdown.style.display = 'none';
        });
        dropdown.appendChild(option);
    });
    dropdown.style.display = filteredCounties.length > 0 ? 'block' : 'none';
});

// Show all options on click
guessInput.addEventListener('click', function () {
    dropdown.innerHTML = '';
    countyNames.forEach(county => {
        const option = document.createElement('div');
        option.classList.add('dropdown-option');
        option.textContent = county;
        option.addEventListener('click', () => {
            guessInput.value = county;
            dropdown.style.display = 'none';
        });
        dropdown.appendChild(option);
    });
    dropdown.style.display = 'block';
});

// Hide dropdown when clicking outside
document.addEventListener('click', event => {
    if (!guessInput.contains(event.target) && !dropdown.contains(event.target)) {
        dropdown.style.display = 'none';
    }
});

// Modal functions
function showModal(message) {
    const modal = document.createElement('div');
    modal.classList.add('modal');
    modal.innerHTML = `
        <p>${message}</p>
        <button class="modal-button" onclick="closeModal()">OK</button>
    `;
    document.body.appendChild(modal);
    modal.style.display = 'block';
}

function closeModal() {
    const modal = document.querySelector('.modal');
    if (modal) {
        modal.style.display = 'none';
        document.body.removeChild(modal);
    }
}

// Alert for invalid guesses
function showAlert(message) {
    const alertModal = document.createElement('div');
    alertModal.classList.add('modal');
    alertModal.innerHTML = `
        <p>${message}</p>
        <button class="modal-button" onclick="closeAlert()">OK</button>
    `;
    document.body.appendChild(alertModal);
    alertModal.style.display = 'block';
}

function closeAlert() {
    const alertModal = document.querySelector('.modal');
    if (alertModal) {
        alertModal.style.display = 'none';
        document.body.removeChild(alertModal);
    }
}

// Submit guess event listener
document.getElementById('submit-guess').addEventListener('click', function () {
    if (gameOver) return;

    const userGuess = guessInput.value.trim();

    // Validate input
    if (!countyNames.map(name => name.toLowerCase()).includes(userGuess.toLowerCase())) {
        showAlert("Unknown County!");
        return;
    }

    const correctAnswerClean = correctAnswer;

    if (userGuess.toLowerCase() === correctAnswer.toLowerCase()) {
        document.getElementById('feedback').textContent = `The correct county is ${correctAnswer}. You know your County Lines!`;
        document.getElementById('feedback').style.color = 'green';
        showModal(`The correct county is ${correctAnswer}. You know your County Lines!`);
        gameOver = true;
    } else {
        attemptsLeft--;
        document.getElementById('attempts-left').value = `Attempts left: ${attemptsLeft}`;
        incorrectGuesses.push(userGuess);

        let distanceMessage = "Incorrect, distance data not available for this guess.";
        let distanceMiles = null;
        let distanceKms = null;
        let direction = null;
        let percentage = 0;

        if (countyData[correctAnswerClean]?.[userGuess]) {
            distanceMiles = countyData[correctAnswerClean][userGuess].miles;
            distanceKms = countyData[correctAnswerClean][userGuess].kilometers;
            direction = countyData[correctAnswerClean][userGuess].direction;
            percentage = 100 * (1 - distanceKms / maxDistanceKm);
            if (percentage < 0) percentage = 0;
        } else if (countyData[userGuess]?.[correctAnswerClean]) {
            distanceMiles = countyData[userGuess][correctAnswerClean].miles;
            distanceKms = countyData[userGuess][correctAnswerClean].kilometers;
            direction = countyData[userGuess][correctAnswerClean].direction;
            percentage = 100 * (1 - distanceKms / maxDistanceKm);
            if (percentage < 0) percentage = 0;
        }

        if (distanceMiles !== null && distanceKms !== null && direction !== null) {
            distanceMessage = `Incorrect, ${userGuess} is approximately ${Math.round(distanceMiles)} miles / ${Math.round(distanceKms)} km away.<br>`;

            // Direction to arrow mapping - CORRECTED
            const directionToArrow = {
                "N": "South", "NE": "South West", "E": "West", "SE": "North West",
                "S": "North", "SW": "North East", "W": "East", "NW": "South East"
            };
            const arrowFileName = directionToArrow[direction] || "North";

            const arrowImage = document.createElement('img');
            arrowImage.src = `images/Arrow ${arrowFileName}.svg`;
            arrowImage.alt = `Direction: ${direction}`;
            arrowImage.classList.add('direction-arrow');

            const currentRow = 4 - attemptsLeft;
            document.getElementById(`incorrect-guess-${currentRow}`).value = userGuess;
            document.getElementById(`distance-${currentRow}`).value = `${Math.round(distanceMiles)} miles / ${Math.round(distanceKms)} km`;
            const arrowContainer = document.getElementById(`direction-arrow-container-${currentRow}`);
            arrowContainer.innerHTML = '';
            arrowContainer.appendChild(arrowImage);
            document.getElementById(`percentage-${currentRow}`).value = `${Math.round(percentage)}%`;

            distanceMessage += ` The desired county is ${directionToArrow[direction] || direction} of ${userGuess}.`;
        }

        document.getElementById('feedback').innerHTML = distanceMessage;
        document.getElementById('feedback').style.color = 'red';

        if (attemptsLeft === 0) {
            document.getElementById('feedback').innerHTML = `Incorrect! The correct county is <span style="color: black;">${correctAnswer}</span>. You are in a Right State!`;
            document.getElementById('feedback').style.color = 'red';
            showModal(`Incorrect! The correct county is ${correctAnswer}. You are in a Right State!`);
            gameOver = true;
        }
    }

    if (gameOver) {
        guessInput.disabled = true;
        document.getElementById('submit-guess').disabled = true;
    }

    guessInput.value = '';
    dropdown.style.display = 'none';
});

// Reload game event listener
document.getElementById('reload-button').addEventListener('click', function () {
    attemptsLeft = 5;
    incorrectGuesses = [];
    gameOver = false;

    for (let i = 0; i <= 4; i++) {
        document.getElementById(`incorrect-guess-${i}`).value = '';
        document.getElementById(`distance-${i}`).value = '';
        document.getElementById(`direction-arrow-container-${i}`).innerHTML = '';
        document.getElementById(`percentage-${i}`).value = '';
    }
    document.getElementById('feedback').textContent = '';
    document.getElementById('attempts-left').value = `Attempts left: ${attemptsLeft}`;

    currentCountyIndex = Math.floor(Math.random() * countyImages.length);
    correctAnswer = countyImages[currentCountyIndex].replace('.svg', '');
    document.getElementById('county-image').src = 'imagesni/' + countyImages[currentCountyIndex];

    guessInput.disabled = false;
    document.getElementById('submit-guess').disabled = false;
    guessInput.value = '';
    dropdown.style.display = 'none';
    closeModal();
});

document.getElementById('play-button').addEventListener('click', function () {
    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('game-container').style.display = 'block';
});