import axios from 'axios';

//const searchInput = document.querySelector('input[name="search"]');
const searchResults = document.querySelector('.results');

document.querySelector('.search').addEventListener('submit', function(e) {
  e.preventDefault();
  if (!this.search.value) {
    searchResults.style.display = 'none';
    return;
  }

  searchResults.style.display = 'block';

  axios
    .get(`/search?q=${this.value}`)
    .then(res => {
      searchResults.innerHTML = `<pre>${JSON.stringify(res.data)}</pre>`
    })
    .catch(err => {
      console.error(err);
    });
});
