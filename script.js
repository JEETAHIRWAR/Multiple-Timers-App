// Get the container element
const container = document.querySelector('.container');

// Create a Timer Set Container
const timerSetContainer = document.createElement('div');
timerSetContainer.classList.add('timerSetContainer');

// Create a paragraph element
const setTime = document.createElement('span');
setTime.textContent = 'Set Time :';
setTime.classList.add('timeLabel');
// Append the paragraph to the Timer Set Container
timerSetContainer.appendChild(setTime);

// Create input elements for hours, minutes, and seconds
const hoursInput = document.createElement('input');
hoursInput.type = 'number';
hoursInput.placeholder = 'hh';
hoursInput.min = '0';
hoursInput.max = '23';
hoursInput.classList.add('timeInput');

const hoursSeparator = document.createElement('span');
hoursSeparator.textContent = ':';
hoursSeparator.classList.add('separator');

const minutesInput = document.createElement('input');
minutesInput.type = 'number';
minutesInput.placeholder = 'mm';
minutesInput.min = '0';
minutesInput.max = '59';
minutesInput.classList.add('timeInput');

const minutesSeparator = document.createElement('span');
minutesSeparator.textContent = ':';
minutesSeparator.classList.add('separator');

const secondsInput = document.createElement('input');
secondsInput.type = 'number';
secondsInput.placeholder = 'ss';
secondsInput.min = '0';
secondsInput.max = '59';
secondsInput.classList.add('timeInput');

// Append input elements to the Timer Set Container
timerSetContainer.appendChild(hoursInput);
timerSetContainer.appendChild(hoursSeparator);
timerSetContainer.appendChild(minutesInput);
timerSetContainer.appendChild(minutesSeparator);
timerSetContainer.appendChild(secondsInput);

// Create a "Set" button
const setButton = document.createElement('button');
setButton.textContent = 'Set';
setButton.classList.add('Button');
setButton.style.marginLeft = '50px';

// Append the "Set" button to the Timer Set Container
timerSetContainer.appendChild(setButton);

// Insert the Timer Set Container after the h1 element
const h1Element = container.querySelector('h1');
container.insertBefore(timerSetContainer, h1Element.nextSibling);

// Add a click event listener to the Set button
setButton.addEventListener('click', () => {
    const container = document.querySelector('.container');

    // Get input values
    const hours = parseInt(hoursInput.value);
    const minutes = parseInt(minutesInput.value);
    const seconds = parseInt(secondsInput.value);

    // Check if input values are not numbers
    if (isNaN(hours) || isNaN(minutes) || isNaN(seconds)) {
        // Add styles for input validation
        hoursInput.classList.remove('timeInput');
        hoursInput.classList.add('timeInputs');
        minutesInput.classList.remove('timeInput');
        minutesInput.classList.add('timeInputs');
        secondsInput.classList.remove('timeInput');
        secondsInput.classList.add('timeInputs');

        // Add shake animation for invalid input
        hoursInput.classList.add('shake');
        minutesInput.classList.add('shake');
        secondsInput.classList.add('shake');

        return;
    }

    // Reset styles for valid input
    hoursInput.classList.remove('timeInputs');
    hoursInput.classList.add('timeInput');
    minutesInput.classList.remove('timeInputs');
    minutesInput.classList.add('timeInput');
    secondsInput.classList.remove('timeInputs');
    secondsInput.classList.add('timeInput');

    // Remove shake animation
    hoursInput.classList.remove('shake');
    minutesInput.classList.remove('shake');
    secondsInput.classList.remove('shake');

    // Create the leftTimerContainer
    const leftTimerContainer = document.createElement('div');
    leftTimerContainer.classList.add('timerSetContainer');
    leftTimerContainer.style.marginBottom = '20px';

    // Create a label for "Time Left"
    const timeLeft = document.createElement('span');
    timeLeft.textContent = 'Time Left :';
    timeLeft.classList.add('timeLabel');
    timeLeft.style.marginRight = '105px';
    timeLeft.style.marginLeft = '15px';

    // Append the "Time Left" label to leftTimerContainer
    leftTimerContainer.appendChild(timeLeft);

    // Create elements to display updated hours, minutes, and seconds
    const updateHours = document.createElement('span');
    updateHours.textContent = `${formatTime(hours)}`;
    updateHours.classList = 'updateHhMmSs';

    const hoursSeparator = document.createElement('span');
    hoursSeparator.textContent = ':';
    hoursSeparator.classList.add('separator');
    hoursSeparator.style.marginLeft = '40px';
    hoursSeparator.style.marginRight = '18px';

    const updateMinutes = document.createElement('span');
    updateMinutes.textContent = `${formatTime(minutes)}`;
    updateMinutes.classList = 'updateHhMmSs';

    const minutesSeparator = document.createElement('span');
    minutesSeparator.textContent = ':';
    minutesSeparator.classList.add('separator');
    minutesSeparator.style.marginLeft = '40px';
    minutesSeparator.style.marginRight = '18px';

    // Responsive adjustment for separators
    window.addEventListener('resize', () => {
        if (window.innerWidth <= 600) {
            hoursSeparator.style.marginLeft = '10px';
            hoursSeparator.style.marginRight = '10px';
            minutesSeparator.style.marginLeft = '10px';
            minutesSeparator.style.marginRight = '10px';
        } else {
            hoursSeparator.style.marginLeft = '40px';
            hoursSeparator.style.marginRight = '18px';
            minutesSeparator.style.marginLeft = '40px';
            minutesSeparator.style.marginRight = '18px';
        }
    });

    // Append minutesSeparator to the DOM
    document.body.appendChild(minutesSeparator);

    const updateSeconds = document.createElement('span');
    updateSeconds.textContent = `${formatTime(seconds)}`;
    updateSeconds.classList = 'updateHhMmSs';

    // Append elements to leftTimerContainer
    leftTimerContainer.appendChild(updateHours);
    leftTimerContainer.appendChild(hoursSeparator);
    leftTimerContainer.appendChild(updateMinutes);
    leftTimerContainer.appendChild(minutesSeparator);
    leftTimerContainer.appendChild(updateSeconds);

    // Insert leftTimerContainer after the "CurrentTimer" div
    const currentTimerDiv = document.querySelector('.CurrentTimer');
    container.insertBefore(leftTimerContainer, currentTimerDiv.nextSibling);

    // Create a "Delete" button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('Button');
    deleteButton.style.marginLeft = '80px';
    deleteButton.style.marginRight = '18px';

    // Append the "Delete" button to leftTimerContainer
    leftTimerContainer.appendChild(deleteButton);

    // Hide the "No Timers" message
    const div = document.querySelector('.noTimers');
    div.style.display = 'none';

    // Start the timer and update the timeLeft span
    let totalSeconds = hours * 3600 + minutes * 60 + seconds;

    // Set interval to update timer every second
    const timerInterval = setInterval(() => {
        if (totalSeconds <= 0) {
            clearInterval(timerInterval);

            // Hide the timer container
            leftTimerContainer.style.display = 'none';

            // Play audio when the timer is up
            const audio = new Audio('./Audio/iphone-6.mp3');
            audio.play();

            // Create a container for timeUp message
            const timeUpContainer = document.createElement('div');
            timeUpContainer.classList.add('timerSetContainer');
            timeUpContainer.style.backgroundColor = '#F9F07A';

            // Append a span tag for "Timer Is Up!"
            container.appendChild(timeUpContainer);
            const timerExpiredSpan = document.createElement('span');
            timerExpiredSpan.textContent = 'Timer Is Up !';
            timerExpiredSpan.classList.add('timeIsUp');
            timeUpContainer.appendChild(timerExpiredSpan);

            // Create a "Stop" button to stop the audio
            const stopButton = document.createElement('button');
            stopButton.textContent = 'Stop';
            stopButton.classList.add('Button');
            stopButton.style.marginLeft = '140px';
            stopButton.style.marginRight = '18px';
            stopButton.style.backgroundColor = '#34344A';
            stopButton.style.color = '#F9F07A';

            // Append the "Stop" button to timeUpContainer
            timeUpContainer.appendChild(stopButton);

            // Add event listeners for "Stop" button
            stopButton.addEventListener('click', () => {
                clearInterval(timerInterval);
                timeUpContainer.remove();
                audio.pause();
            });

            stopButton.addEventListener('mouseover', () => {
                stopButton.style.backgroundColor = '#F9F07A';
                stopButton.style.color = '#34344A';
                stopButton.style.cursor = 'pointer';
                stopButton.style.border = '2px solid #34344A';
            });

            stopButton.addEventListener('mouseout', () => {
                stopButton.style.backgroundColor = '#34344A';
                stopButton.style.color = '#F9F07A';
            });
        } else {
            // Calculate hours, minutes, and seconds from totalSeconds
            const hours = Math.floor(totalSeconds / 3600);
            const minutes = Math.floor((totalSeconds % 3600) / 60);
            const seconds = totalSeconds % 60;

            // Update the displayed hours, minutes, and seconds
            updateHours.textContent = `${formatTime(hours)}`;
            updateMinutes.textContent = `${formatTime(minutes)}`;
            updateSeconds.textContent = `${formatTime(seconds)}`;
            totalSeconds--;
        }
    }, 1000);

    // Add a click event listener to the "Delete" button
    deleteButton.addEventListener('click', () => {
        clearInterval(timerInterval);
        leftTimerContainer.remove();
    });

    // Reset input values
    hoursInput.value = '';
    minutesInput.value = '';
    secondsInput.value = '';
});

// Function to format time with leading zero
function formatTime(value) {
    return value < 10 ? `0${value}` : value;
}
