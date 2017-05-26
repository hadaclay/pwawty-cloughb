import axios from 'axios';
import dompurify from 'dompurify';

const searchForm = document.querySelector('.search');
const searchResults = document.querySelector('.results');

function makeCards(bars) {
  let output = [];
  // Build columns from every result
  let html = bars.map(bar => {
    return `
      <div class="column is-4">
        <div class="card">
          <div class="card-image">
            <figure class="image is-4by3">
              <img src="${bar.image_url}">
            </figure>
          </div>
          <div class="card-content has-text-centered">
            <h3 class="title is-3">${bar.name}</h3>
            <button class="button">0 Going</button>
          </div>
        </div>
      </div>
    `;
  });

  // Split columns into rows of 3
  while (html.length > 0) output.push(html.splice(0, 3));
  return output.map(row => {
    return `
      <div class="columns">
        ${row.join('')}
      </div>
    `;
  }).join('');
}

function handleSearch(e) {
  e.preventDefault();
  if(!this.search.value) {
    searchResults.style.display = 'none';
    return;
  }

  searchResults.style.display = 'block';

  axios
    .get(`/search?q=${document.querySelector('input[name="search"]').value}`)
    .then(res => {
      searchResults.innerHTML = dompurify.sanitize(makeCards(res.data));
    })
    .catch(err => {
      console.error(err);
    });
}

searchForm.addEventListener('submit', handleSearch);
