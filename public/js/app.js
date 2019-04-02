const forecastResult = (location, messageOne, messageTwo) =>
  fetch(`http://localhost:3000/weather?address=${location}`)
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        messageOne.textContent = data.error;
      } else {
        messageOne.textContent = data.location;
        messageTwo.textContent = data.forecast;
      }
    });

const weatherForm = document.querySelector('form');
const searchTerm = document.querySelector('input');

const messageOne = document.querySelector('#messageOne');
const messageTwo = document.querySelector('#messageTwo');

weatherForm.addEventListener('submit', event => {
  event.preventDefault();
  const location = searchTerm.value;
  messageOne.textContent = 'Loading...';
  messageTwo.textContent = '';
  searchTerm.value = '';
  forecastResult(location, messageOne, messageTwo);
});
