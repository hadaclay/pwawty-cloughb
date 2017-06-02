import axios from 'axios';

function handleAdd(e) {
  e.preventDefault();

  const buttonText = e.target.firstElementChild.innerText;
  const update = buttonText.split(' ');

  axios.post(e.target.action).then(json => {
    if (json.data.hasOwnProperty('redirectURL')) {
      window.location.replace('/login');
    } else if (json.data.success === 'remove') {
      // Increment text on button
      update[0] = parseInt(update[0], 10) - 1;
      e.target.firstElementChild.innerText = update.join(' ');
    } else {
      // Decrement text on button
      update[0] = parseInt(update[0], 10) + 1;
      e.target.firstElementChild.innerText = update.join(' ');
    }
  });
}

export default handleAdd;
