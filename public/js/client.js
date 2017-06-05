import axios from 'axios';
import dompurify from 'dompurify';

import '../sass/style.scss';
import { $ } from './modules/bling';
import handleSearch from './modules/handleSearch';
import handleAdd from './modules/handleAdd';
import makeCards from './modules/makeCards';
import getParameterByName from './modules/getParameterByName';

particlesJS.load('particles', 'particles.json');

const searchResults = $('.results');
const submitButton = $('#submit');
$('.search').addEventListener('submit', handleSearch);

const query = getParameterByName('q');
if (query) {
  submitButton.classList.add('is-loading');
  axios
    .get(`/search?q=${query}`)
    .then(res => {
      searchResults.innerHTML = dompurify.sanitize(makeCards(res.data));

      // Add handler to all .going forms
      [...searchResults.querySelectorAll('.going')].map(form =>
        form.addEventListener('submit', handleAdd)
      );

      submitButton.classList.remove('is-loading');
      searchResults.scrollIntoView({block: 'start', behavior: 'smooth'});
    })
    .catch(err => console.error(err));
}
