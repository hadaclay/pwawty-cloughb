import axios from 'axios';
import dompurify from 'dompurify';

const searchResults = document.querySelector('.results');
const submitButton = document.querySelector('#submit');

function makeCards(bars) {
  let output = [];
  // Build columns from every result
  let html = bars.map(bar => {
    return `
      <div class="column is-4">
        <div class="card">
          <div class="card-image">
            <figure class="image is-4by3">
              <a href="${bar.url}">
                <img src="${bar.image_url}">
              </a>
            </figure>
          </div>
          <div class="card-content has-text-centered">
            <h3 class="title is-3">${bar.name}</h3>
            <form onsubmit="#" class="going" method="POST" action="/going/${bar._id}">
              <button type="submit" class="button">${bar.amountGoing || 0} Going</button>
            </form>
          </div>
        </div>
      </div>
    `;
  });

  // Split columns into rows of 3
  while (html.length > 0)
    output.push(html.splice(0, 3));
  return output
    .map(row => {
      return `
      <div class="columns">
        ${row.join('')}
      </div>
    `;
    })
    .join('');
}

function handleSearch(e) {
  e.preventDefault();

  if (!this.search.value) {
    searchResults.style.display = 'none';
    return;
  }

  searchResults.style.display = 'block';

  submitButton.classList.add('is-loading');
  axios
    .get(`/search?q=${document.querySelector('input[name="search"]').value}`)
    .then(res => {
      searchResults.innerHTML = dompurify.sanitize(makeCards(res.data));

      // Add handler to all .going forms
      [...searchResults.querySelectorAll('.going')]
        .map(form => form.addEventListener('submit', handleAdd));

      submitButton.classList.remove('is-loading');
    })
    .catch(err => console.error(err));
}

function handleAdd(e) {
  e.preventDefault();
  const buttonText = e.srcElement.firstElementChild.innerText;
  const update = buttonText.split(' ');
  axios
    .post(e.target.action)
    .then(json => {
      if (json.data.hasOwnProperty('redirectURL')) {
        window.location.replace('/login');
      }
      else if (json.data.success === 'remove') {
        // Increment text on button
        update[0] = parseInt(update[0], 10) - 1;
        e.srcElement.firstElementChild.innerText = update.join(' ');
      }
      else {
        // Decrement text on button
        update[0] = parseInt(update[0], 10) + 1;
        e.srcElement.firstElementChild.innerText = update.join(' ');
      }
    })
}

function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

const searchForm = document.querySelector('.search');
searchForm.addEventListener('submit', handleSearch);

window.onload = () => {
  const query = getParameterByName('q');
  if (query) {
    submitButton.classList.add('is-loading');
    axios
      .get(`/search?q=${query}`)
      .then(res => {
        searchResults.innerHTML = dompurify.sanitize(makeCards(res.data));

        // Add handler to all .going forms
        [...searchResults.querySelectorAll('.going')]
          .map(form => form.addEventListener('submit', handleAdd));

        submitButton.classList.remove('is-loading');
      })
      .catch(err => console.error(err));
  }
}
