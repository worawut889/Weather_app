console.log("Hello from client!")

const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

const form = document.querySelector('form');
const input = document.querySelector('input');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const location = input.value
  fetch('/api/weather?location=' + location).then(response => {
    response.json().then((value) => {
      if (value.error) {
        return messageOne.textContent = value.error, 
               messageTwo.textContent = ""
      }
      messageOne.textContent = value.messageOne
      messageTwo.textContent = value.messageTwo
    })

  })
})
