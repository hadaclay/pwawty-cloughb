import axios from 'axios';
import dompurify from 'dompurify';

import { $ } from './bling';
import makeCards from './makeCards';
import handleAdd from './handleAdd';

function handleSearch(e) {
  e.preventDefault();

  const searchResults = $('.results');
  const submitButton = $('#submit');

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
      [...searchResults.querySelectorAll('.going')].map(form =>
        form.addEventListener('submit', handleAdd)
      );

      submitButton.classList.remove('is-loading');
      searchResults.scrollIntoView({ block: 'start', behavior: 'smooth' });
    })
    .catch(err => console.error(err));
}

export default handleSearch;
